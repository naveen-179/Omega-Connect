/* ============================================
   Omega Connect — script.js v2.0
   Complete refactor: clean architecture, single
   DOMContentLoaded, proper Firebase cleanup.
   ============================================ */

// ============================================
// 1. CONFIGURATION & CONSTANTS
// ============================================

const CONFIG = {
    PATHS: {
        QUEUE: 'queue',
        ACTIVE_CHATS: 'activeChats',
        MESSAGES: 'messages',
        REPORTS: 'reports',
        FEEDBACK: 'feedback',
        STATS: 'stats'
    },
    TIMEOUTS: {
        TOAST: 3000,
        TYPING: 1500,
        SEARCH_STATUS: 5000,
        MAX_WAIT: 120000
    },
    MAX_INTERESTS: 5,
    MAX_MESSAGE_LENGTH: 1000,
    AVATARS: {
        male: ['avatars/avatar_male_pixar_1.png', 'avatars/avatar_male_anime_1.png'],
        female: ['avatars/avatar_female_pixar_1.png', 'avatars/avatar_female_anime_1.png'],
        all: [
            'avatars/avatar_male_pixar_1.png',
            'avatars/avatar_male_anime_1.png',
            'avatars/avatar_female_pixar_1.png',
            'avatars/avatar_female_anime_1.png'
        ]
    }
};

const EMOJIS = {
    smileys: ['😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔','😟','😕','🙁','😣','😖','😫','😩','🥺','😢','😭','😤','😠','😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😧','😮','😲','🥱','😴','🤤','😪','😵','🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕'],
    hands: ['👋','🤚','🖐','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲','🤝','🙏','✍️','💪','🦾','👂','👃','👀','👅','👄','💋'],
    hearts: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','💕','💞','💓','💗','💖','💘','💝','💟'],
    animals: ['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🙈','🙉','🙊','🐔','🐧','🐦','🐤','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦄','🐝','🐛','🦋','🐌','🐞','🐜','🐢','🐍','🐙','🦑','🦐','🦞','🦀','🐡','🐠','🐟','🐬','🐳','🐋','🦈'],
    food: ['🍎','🍊','🍋','🍌','🍍','🥭','🍓','🍇','🍒','🍑','🥝','🍅','🥑','🍆','🥔','🥕','🌽','🌶','🥒','🥦','🧄','🧅','🍔','🍟','🍕','🌭','🍿','🥓','🥚','🍳','🧇','🥞','🍞','🥐','🧀','🍗','🍖','🍣','🍱','🍤','🍙','🧁','🍰','🎂','🍮','🍭','🍬','🍫','🍩','🍪','☕','🍵','🍺','🍻','🥂','🍷'],
    travel: ['🚗','🚕','🚙','🚌','🏎','🚑','🚒','🚐','🚚','🚛','🏍','🚲','🛸','🚀','🛶','⛵','🚤','🛳','🚢','✈️','🛫','🛬','💺','🗺','🗿','🗽','🗼','🏰','🏯','🎡','🎢','⛲','🌅','🌄','🌠','🎇','🎆','🌇','🏙','🌃','🌉','🌁'],
    objects: ['⌚','📱','💻','⌨','🖥','🖨','💾','📷','📸','📹','🎥','📞','📺','📻','⏰','💡','🔦','🕯','💰','💳','💎','🔧','🔨','🔩','🔫','💣','🔪','🔑','🔒','🔓','📦','📫','📝','📒','📚','📖','🔗','📎','✂️','📌','📍','🏷','🔖'],
    symbols: ['❤','💛','💚','💙','💜','⭐','🌟','💫','✨','🎵','🎶','🔔','✅','❌','❎','🆗','🆕','🔝','🚫','⛔','⚠️','💯','🔞','❓','❔','❕','❗','💬','💭','🔤','▶','◀','🔼','🔽','➕','➖','✖','💲','♻️','✔','☑']
};

const GAMES = {
    truth: [
        "What's your most embarrassing moment?",
        "What's a secret you've never told anyone?",
        "What's the biggest lie you've ever told?",
        "What's your guilty pleasure?",
        "What's the most childish thing you still do?",
        "Have you ever stalked someone on social media?",
        "What's your biggest fear?",
        "What's the last thing you searched on Google?",
        "If you could be invisible for a day, what would you do?",
        "What's the weirdest dream you've ever had?"
    ],
    dare: [
        "Send a message using only emojis",
        "Type the next 3 messages in ALL CAPS",
        "Share your most unpopular opinion",
        "Make up a poem right now",
        "Describe yourself in 3 words",
        "Type with your eyes closed for the next message",
        "Share a fun fact about yourself",
        "Compliment the stranger",
        "Tell a joke",
        "Describe your ideal day"
    ]
};

const ICEBREAKERS = [
    "If you could have dinner with anyone, dead or alive, who would it be?",
    "What's the best trip you've ever taken?",
    "If you won the lottery tomorrow, what's the first thing you'd do?",
    "What's a skill you wish you had?",
    "What's the best advice you've ever received?",
    "If you could live anywhere in the world, where would it be?",
    "What's your favorite way to spend a weekend?",
    "What's the most interesting thing you've learned recently?",
    "If you could master any instrument overnight, which one?",
    "What's a movie that changed your perspective?",
    "Coffee or tea? Defend your answer.",
    "What's the weirdest food combination you enjoy?",
    "If you could time travel, past or future?",
    "What's your go-to karaoke song?",
    "Describe your perfect pizza."
];

const BAD_WORDS = ['spam','scam','whatsapp','telegram','instagram','snapchat','facebook','kik','discord','skype','venmo','cashapp','paypal','onlyfans'];

const SEARCH_MESSAGES = [
    "Looking for someone interesting...",
    "Scanning the universe...",
    "Almost there...",
    "Patience, good things take time...",
    "Searching for your match..."
];


// ============================================
// 2. STATE
// ============================================

const state = {
    userId: null,
    username: null,
    avatar: null,
    selectedRoom: 'general',
    partnerId: null,
    partnerName: null,
    partnerAvatar: null,
    chatId: null,
    friendRoomId: null,
    isFriendHost: false,
    isConnected: false,
    isSearching: false,
    disconnectHandled: false,
    gender: null,
    genderPref: 'any',
    country: null,
    interests: [],
    chatHistory: [],
    messageCount: 0,
    chatStartTime: null,
    pendingAction: null,
    replyingTo: null,
    tttGameActive: false, // Tic-Tac-Toe state
    initiatedTtt: false,
    pollGameActive: false, // Would You Rather state
    initiatedPoll: false,
    pendingReconnectPartnerId: null, // Reconnect state
    showingInviteFromId: null,       // Track currently showing invite sender
    localStream: null,               // WebRTC local stream
    remoteStream: null,              // WebRTC remote stream
    peerConnection: null,            // WebRTC peer connection
    isMuted: false,                  // Mic mute state
    isVideoOff: false,               // Camera off state
    isRemoteMuted: false,            // Mute stranger's mic
    facingMode: 'user',              // Front ('user') vs Rear ('environment') camera
    mediaRecorder: null,
    audioChunks: [],
    isRecordingVoice: false,
    voiceStartTime: 0,
    listeners: {},       // Firebase listener refs for cleanup
    timers: {},          // setInterval/setTimeout refs for cleanup
    settings: {
        soundEnabled: true,
        notificationsEnabled: false,
        enterToSend: true,
        fontSize: 16
    }
};


// ============================================
// 3. UTILITIES
// ============================================

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

function selectAvatar(gender) {
    let pool = CONFIG.AVATARS.all;
    if (gender === 'male') pool = CONFIG.AVATARS.male;
    else if (gender === 'female') pool = CONFIG.AVATARS.female;
    return pool[Math.floor(Math.random() * pool.length)];
}

function generateUsername() {
    const adjectives = ['Happy','Cool','Chill','Brave','Witty','Kind','Bold','Calm','Sly','Zen',
                        'Swift','Keen','Wise','Wild','Warm','Star','Moon','Sun','Sky','Ace'];
    const nouns = ['Fox','Bear','Wolf','Hawk','Owl','Cat','Lion','Panda','Tiger','Eagle',
                   'Otter','Raven','Seal','Lynx','Dove','Hare','Deer','Swan','Frog','Crow'];
    return adjectives[Math.floor(Math.random()*adjectives.length)] + 
           nouns[Math.floor(Math.random()*nouns.length)] + 
           Math.floor(Math.random()*100);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function filterBadWords(text) {
    let filtered = text;
    BAD_WORDS.forEach(word => {
        const re = new RegExp(word, 'gi');
        filtered = filtered.replace(re, '*'.repeat(word.length));
    });
    return filtered;
}

function formatTime(timestamp) {
    const d = new Date(timestamp);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(ms) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
}

function showToast(message, duration = CONFIG.TIMEOUTS.TOAST) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;
    msgEl.textContent = message;
    toast.classList.add('show');
    clearTimeout(state.timers.toast);
    state.timers.toast = setTimeout(() => toast.classList.remove('show'), duration);
}

function playSound(type) {
    if (!state.settings.soundEnabled) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        gain.gain.value = 0.08;
        
        if (type === 'send') { osc.frequency.value = 600; osc.type = 'sine'; }
        else if (type === 'receive') { osc.frequency.value = 800; osc.type = 'sine'; }
        else if (type === 'connect') { osc.frequency.value = 523; osc.type = 'sine'; }
        else { osc.frequency.value = 400; osc.type = 'sine'; }
        
        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.stop(ctx.currentTime + 0.15);
    } catch(e) {}
}


// ============================================
// 4. UI MANAGEMENT
// ============================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const page = document.getElementById(pageId);
    if (page) page.classList.add('active');
    
    // Body class management
    document.body.classList.toggle('chat-mode', pageId === 'chat-page');
}

function showModal(id) {
    const modal = document.getElementById(id + '-modal') || document.getElementById(id);
    if (modal) {
        modal.style.display = '';
        modal.classList.add('active');
    }
}

function closeModal(id) {
    const modal = document.getElementById(id) || document.getElementById(id + '-modal');
    if (modal) modal.classList.remove('active');
}

function setChatControlsEnabled(enabled) {
    const input = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const emojiBtn = document.getElementById('emojiBtn');
    const gameBtn = document.getElementById('gameBtn');
    const questionBtn = document.getElementById('questionBtn');
    const drawBtn = document.getElementById('drawBtn');
    const voiceBtn = document.getElementById('voiceBtn');
    const playBtn = document.getElementById('playBtn');
    const playMenu = document.getElementById('playMenu');

    if (input) {
        input.disabled = !enabled;
        if (!enabled) {
            input.placeholder = 'Chat disconnected';
            input.value = '';
        } else {
            input.placeholder = 'Type a message…';
        }
    }
    if (sendBtn) sendBtn.disabled = !enabled;
    if (emojiBtn) emojiBtn.disabled = !enabled;
    if (gameBtn) gameBtn.disabled = !enabled;
    if (questionBtn) questionBtn.disabled = !enabled;
    if (drawBtn) drawBtn.disabled = !enabled;
    if (voiceBtn) voiceBtn.disabled = !enabled;
    if (playBtn) playBtn.disabled = !enabled;
    if (playMenu && !enabled) playMenu.classList.add('hidden');
}

function scrollToBottom() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    // Keep typing indicator at bottom
    const typing = document.getElementById('typingIndicator');
    if (typing && typing.parentNode === container) container.appendChild(typing);
    requestAnimationFrame(() => { container.scrollTop = container.scrollHeight; });
}

function getInterestLabel(key) {
    const labels = {
        music: '🎵 Music', gaming: '🎮 Gaming', movies: '🎬 Movies',
        sports: '⚽ Sports', tech: '💻 Tech', art: '🎨 Art',
        travel: '✈️ Travel', anime: '🌸 Anime', food: '🍜 Food',
        fitness: '🏋️ Fitness'
    };
    return labels[key] || key;
}


// ============================================
// 5. FIREBASE OPERATIONS
// ============================================

const db = window.db;

function joinQueue() {
    if (!state.userId) return;
    const entry = {
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        gender: state.gender || null,
        genderPref: state.genderPref || 'any',
        interests: state.interests.length > 0 ? state.interests : null,
        country: state.country || null,
        username: state.username,
        avatar: state.avatar
    };
    const queueRef = db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`);
    queueRef.onDisconnect().remove().catch(() => {});
    return queueRef.set(entry);
}

function leaveQueue() {
    if (!state.userId) return;
    if (state.listeners.match) {
        state.listeners.match.off();
        delete state.listeners.match;
    }
    try {
        db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).onDisconnect().cancel();
    } catch(e) {}
    return db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).remove().catch(() => {});
}

async function getWaitingUsers() {
    try {
        const snap = await db.ref(CONFIG.PATHS.QUEUE).once('value');
        if (!snap.exists()) return [];
        const users = [];
        snap.forEach(child => {
            if (child.key !== state.userId) {
                users.push({ id: child.key, ...child.val() });
            }
        });
        return users;
    } catch(e) { return []; }
}

function matchesPreferences(me, them) {
    // Gender preference matching
    if (me.genderPref && me.genderPref !== 'any' && them.gender && them.gender !== me.genderPref) return false;
    if (them.genderPref && them.genderPref !== 'any' && me.gender && me.gender !== them.genderPref) return false;
    return true;
}

function scoreMatch(me, them) {
    let score = 0;
    if (me.interests && them.interests) {
        const common = me.interests.filter(i => them.interests.includes(i));
        score += common.length * 10;
    }
    return score;
}

async function findMatch() {
    const users = await getWaitingUsers();
    if (users.length === 0) return null;

    const me = {
        gender: state.gender,
        genderPref: state.genderPref,
        interests: state.interests
    };

    // Filter compatible, then sort by score
    const compatible = users.filter(u => matchesPreferences(me, u));
    if (compatible.length === 0) return null;

    compatible.sort((a, b) => scoreMatch(me, b) - scoreMatch(me, a));
    return compatible[0];
}

function listenForMatch() {
    const ref = db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}/matched`);
    state.listeners.match = ref;
    
    ref.on('value', snap => {
        const data = snap.val();
        if (data && data.chatId && data.partnerId) {
            ref.off();
            delete state.listeners.match;
            
            state.chatId = data.chatId;
            state.partnerId = data.partnerId;
            state.partnerName = data.partnerName || 'Stranger';
            state.partnerAvatar = data.partnerAvatar || null;
            
            // Find common interests
            const commonInterests = [];
            if (data.partnerInterests && state.interests.length > 0) {
                state.interests.forEach(i => {
                    if (data.partnerInterests.includes(i)) commonInterests.push(i);
                });
            }
            
            leaveQueue();
            startChat(commonInterests);
        }
    });
}

// ============================================
// Matchmaking Operations
// ============================================

async function matchWithPartner(partner) {
    const chatId = generateId();
    const myName = state.username;
    const myAvatar = state.avatar;
    const partnerQueueRef = db.ref(`${CONFIG.PATHS.QUEUE}/${partner.id}`);

    try {
        let matchClaimed = false;
        await partnerQueueRef.transaction((currentValue) => {
            if (currentValue === null) {
                // Partner left the queue
                return currentValue;
            }
            if (currentValue.matched) {
                // Partner is already matched by someone else
                return; // Aborts transaction
            }
            
            // Claim the partner!
            currentValue.matched = {
                chatId: chatId,
                partnerId: state.userId,
                partnerName: myName,
                partnerAvatar: myAvatar,
                partnerInterests: state.interests.length > 0 ? state.interests : null
            };
            return currentValue;
        }, (error, committed, snapshot) => {
            if (committed && snapshot.exists()) {
                matchClaimed = true;
            }
        });

        if (!matchClaimed) {
            // Failed to claim partner, return false to continue search
            return false;
        }

        // Successfully claimed partner! Create the active chat room
        await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${chatId}`).set({
            userA: state.userId,
            userB: partner.id,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            status: 'active'
        });

        // Set our own match data
        state.chatId = chatId;
        state.partnerId = partner.id;
        state.partnerName = partner.username || 'Stranger';
        state.partnerAvatar = partner.avatar || null;

        // Find common interests
        const commonInterests = [];
        if (partner.interests && state.interests.length > 0) {
            state.interests.forEach(i => {
                if (partner.interests.includes(i)) commonInterests.push(i);
            });
        }

        leaveQueue();
        startChat(commonInterests);
        return true;
    } catch (e) {
        console.error("Error matching with partner:", e);
        return false;
    }
}


// ============================================
// 6. CHAT LIFECYCLE
// ============================================

function initMatchInterval() {
    if (state.timers.matchInterval) {
        clearInterval(state.timers.matchInterval);
    }
    state.timers.matchInterval = setInterval(async () => {
        if (!state.isSearching || state.chatId) {
            clearInterval(state.timers.matchInterval);
            return;
        }
        const partner = await findMatch();
        if (partner) {
            // Lexicographical tie-breaker to prevent cross-matching race conditions.
            // Only the user with the smaller userId initiates the match. The other waits to be claimed.
            if (state.userId < partner.id) {
                clearInterval(state.timers.matchInterval);
                const success = await matchWithPartner(partner);
                if (!success && state.isSearching && !state.chatId) {
                    initMatchInterval();
                }
            }
        }
    }, 2000);
}

function generateFriendLink() {
    const ageCheckbox = document.getElementById('age-confirm');
    if (ageCheckbox && !ageCheckbox.checked) {
        showToast("Please confirm you are 18 years or older first.");
        return;
    }

    initUserIdentity();
    state.avatar = selectAvatar(state.gender);
    localStorage.setItem('omega_avatar', state.avatar);

    const code = generateId();
    state.friendRoomId = code;
    state.isFriendHost = true;
    state.chatHistory = [];
    state.messageCount = 0;
    state.disconnectHandled = false;
    state.isSearching = true;

    const inviteUrl = window.location.origin + window.location.pathname + '?friend=' + code;

    navigator.clipboard.writeText(inviteUrl).then(() => {
        showToast("Invite link copied to clipboard! Share it with your friend.");
    }).catch(err => {
        console.error("Clipboard copy failed:", err);
        showToast("Link generation failed. Please copy the link manually.");
    });

    showPage('waiting-page');
    const statusEl = document.getElementById('matching-status');
    if (statusEl) {
        statusEl.innerHTML = `Waiting for your friend to join...<br><br><span style="font-size: 0.85rem; opacity: 0.8; word-break: break-all; user-select: all; background: rgba(0,0,0,0.2); padding: 6px 10px; border-radius: var(--radius-sm); border: 1px solid rgba(255,255,255,0.05); display: inline-block; margin-top: 5px;">${inviteUrl}</span>`;
    }
    const waitTimeEl = document.getElementById('wait-time');
    if (waitTimeEl) waitTimeEl.textContent = '0';

    let waitSeconds = 0;
    state.timers.waitTimer = setInterval(() => {
        waitSeconds++;
        const el = document.getElementById('wait-time');
        if (el) el.textContent = waitSeconds;
    }, 1000);

    const roomRef = db.ref(`friendRooms/${code}`);
    roomRef.set({
        hostId: state.userId,
        hostName: state.username,
        hostAvatar: state.avatar,
        hostInterests: state.interests.length > 0 ? state.interests : null,
        status: 'waiting',
        createdAt: firebase.database.ServerValue.TIMESTAMP
    }).catch(err => console.error("Database set failed:", err));

    roomRef.onDisconnect().remove().catch(() => {});

    state.listeners.friendRoom = roomRef;
    roomRef.on('value', snap => {
        const room = snap.val();
        if (room && room.status === 'connected' && room.guestId) {
            roomRef.off();
            delete state.listeners.friendRoom;

            state.chatId = code;
            state.partnerId = room.guestId;
            state.partnerName = room.guestName || 'Friend';
            state.partnerAvatar = room.guestAvatar || null;

            const commonInterests = [];
            if (room.guestInterests && state.interests.length > 0) {
                state.interests.forEach(i => {
                    if (room.guestInterests.includes(i)) commonInterests.push(i);
                });
            }

            roomRef.onDisconnect().cancel().catch(() => {});

            db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${code}`).set({
                userA: state.userId,
                userB: room.guestId,
                createdAt: firebase.database.ServerValue.TIMESTAMP,
                status: 'active'
            }).then(() => {
                roomRef.remove().catch(() => {});
                startChat(commonInterests);
            }).catch(err => console.error("Active chat set failed:", err));
        }
    });
}

async function initChat() {
    // Load or generate persistent identity
    initUserIdentity();
    // Re-select avatar based on preference gender selection if changed
    state.avatar = selectAvatar(state.gender);
    localStorage.setItem('omega_avatar', state.avatar);
    
    // Sync with registered profile if logged in
    const currentUser = firebase.auth && firebase.auth().currentUser;
    if (currentUser) {
        db.ref(`users/${currentUser.uid}/profile/avatar`).set(state.avatar).catch(() => {});
    }
    
    state.chatHistory = [];
    state.messageCount = 0;
    state.disconnectHandled = false;
    state.isSearching = true;

    // Check if we are joining a friend's room
    if (state.friendRoomId && !state.isFriendHost) {
        showPage('waiting-page');
        document.getElementById('matching-status').textContent = 'Connecting to friend...';
        document.getElementById('wait-time').textContent = '0';

        let waitSeconds = 0;
        state.timers.waitTimer = setInterval(() => {
            waitSeconds++;
            const el = document.getElementById('wait-time');
            if (el) el.textContent = waitSeconds;
        }, 1000);

        const roomRef = db.ref(`friendRooms/${state.friendRoomId}`);
        roomRef.transaction(currentValue => {
            if (currentValue === null) return currentValue; // expired/deleted
            if (currentValue.status !== 'waiting') return; // already taken/connected
            currentValue.status = 'connected';
            currentValue.guestId = state.userId;
            currentValue.guestName = state.username;
            currentValue.guestAvatar = state.avatar;
            currentValue.guestInterests = state.interests.length > 0 ? state.interests : null;
            return currentValue;
        }, (error, committed, snapshot) => {
            clearInterval(state.timers.waitTimer);
            if (committed && snapshot.exists()) {
                const room = snapshot.val();
                state.chatId = state.friendRoomId;
                state.partnerId = room.hostId;
                state.partnerName = room.hostName || 'Friend';
                state.partnerAvatar = room.hostAvatar || null;

                const commonInterests = [];
                if (room.hostInterests && state.interests.length > 0) {
                    state.interests.forEach(i => {
                        if (room.hostInterests.includes(i)) commonInterests.push(i);
                    });
                }

                db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}`).set({
                    userA: room.hostId,
                    userB: state.userId,
                    createdAt: firebase.database.ServerValue.TIMESTAMP,
                    status: 'active'
                }).then(() => {
                    roomRef.remove().catch(() => {});
                    // Remove url param so subsequent chat matches don't stick to this ID
                    state.friendRoomId = null;
                    window.history.replaceState({}, document.title, window.location.pathname);
                    startChat(commonInterests);
                }).catch(err => {
                    console.error("Active chat set failed for guest:", err);
                    goHome();
                });
            } else {
                showToast("Failed to join. The invite might be expired or already used.");
                state.friendRoomId = null;
                window.history.replaceState({}, document.title, window.location.pathname);
                goHome();
            }
        });
        return;
    }

    // Partition queue dynamically based on selected Vibe Room
    CONFIG.PATHS.QUEUE = 'queue/' + (state.selectedRoom || 'general');

    // Show waiting page
    showPage('waiting-page');
    document.getElementById('matching-status').textContent = 'Looking for someone...';
    document.getElementById('wait-time').textContent = '0';

    // Start wait timer
    let waitSeconds = 0;
    state.timers.waitTimer = setInterval(() => {
        waitSeconds++;
        const el = document.getElementById('wait-time');
        if (el) el.textContent = waitSeconds;
        
        // Update status message
        if (waitSeconds % 8 === 0) {
            const statusEl = document.getElementById('matching-status');
            if (statusEl) {
                statusEl.textContent = SEARCH_MESSAGES[Math.floor(Math.random() * SEARCH_MESSAGES.length)];
            }
        }
    }, 1000);

    // Join queue and listen for match
    await joinQueue();
    listenForMatch();

    // Active matching: periodically try to find a match
    initMatchInterval();
}

function startChat(commonInterests = []) {
    state.isSearching = false;
    state.isConnected = true;
    state.chatStartTime = Date.now();
    state.disconnectHandled = false;

    // Clear search timers
    clearInterval(state.timers.waitTimer);
    clearInterval(state.timers.matchInterval);
    leaveQueue(); // Ensure we are removed from the matchmaking queue

    // Set onDisconnect hook to mark chat as ended if we disconnect
    db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/status`).onDisconnect().set('ended').catch(() => {});

    // Enable chat input and tools
    setChatControlsEnabled(true);

    // Update chat UI
    const nameEl = document.getElementById('partner-name');
    const avatarEl = document.getElementById('partner-avatar');
    const statusEl = document.getElementById('partner-status');
    
    if (nameEl) nameEl.textContent = state.partnerName || 'Stranger';
    if (avatarEl) {
        if (state.partnerAvatar) {
            avatarEl.innerHTML = `<img src="${state.partnerAvatar}" alt="${escapeHtml(state.partnerName || 'Stranger')}" class="avatar-img">`;
            avatarEl.classList.add('has-img');
        } else {
            avatarEl.textContent = (state.partnerName || '?')[0].toUpperCase();
            avatarEl.classList.remove('has-img');
        }
    }
    if (statusEl) statusEl.innerHTML = '<span class="status-dot"></span>Online';

    // Clear messages area
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        // Keep only typing indicator
        const typing = document.getElementById('typingIndicator');
        chatMessages.innerHTML = '';
        if (typing) chatMessages.appendChild(typing);
    }

    // Add welcome system message
    addSystemMessage(`You're now chatting with ${escapeHtml(state.partnerName || 'a stranger')}. Say hi! 👋`);
    
    if (commonInterests.length > 0) {
        addSystemMessage(`✨ You both like: ${commonInterests.map(i => getInterestLabel(i)).join(', ')}`);
    }

    // Show chat page
    showPage('chat-page');
    playSound('connect');

    // Start listeners
    listenForMessages();
    savePartnerToHistory(state.partnerId, state.partnerName, state.partnerAvatar);
    listenForPartnerStatus();
    listenForIncomingCalls();
    listenForDrawing();

    // Start chat duration timer
    state.timers.chatDuration = setInterval(() => {
        // Duration counter could be shown in UI if needed
    }, 1000);
    
    // Focus input
    setTimeout(() => {
        const input = document.getElementById('message-input');
        if (input) input.focus();
    }, 300);
}

function listenForMessages() {
    if (!state.chatId) return;
    const ref = db.ref(`${CONFIG.PATHS.MESSAGES}/${state.chatId}`);
    state.listeners.messages = ref;

    ref.on('child_added', snap => {
        const msg = snap.val();
        if (!msg) return;
        
        // Skip own messages (already rendered locally via optimistic UI)
        if (msg.senderId === state.userId) return;
        
        // Prevent duplicates
        const key = snap.key;
        if (document.querySelector(`[data-key="${key}"]`)) return;
        
        displayMessage(msg, key);
        
        // Play sound for received messages
        playSound('receive');
        if (msg.type === 'text' || !msg.type) {
            showSmartReplies(msg.text);
        }
        
        // Add to history
        state.chatHistory.push(msg);
        state.messageCount++;
    });

    // Listen for reactions and edits
    ref.on('child_changed', snap => {
        const msg = snap.val();
        if (!msg) return;
        const key = snap.key;
        updateMessageReactionsInDom(key, msg.reactions);
    });
}

function listenForPartnerStatus() {
    if (!state.chatId) return;
    
    // Listen for partner leaving
    const statusRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/status`);
    state.listeners.chatStatus = statusRef;
    
    statusRef.on('value', snap => {
        const status = snap.val();
        if (status === 'ended' && !state.disconnectHandled) {
            handlePartnerDisconnect();
        }
    });

    // Listen for typing
    const typingRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/typing`);
    state.listeners.typing = typingRef;
    
    typingRef.on('value', snap => {
        const data = snap.val();
        const typingEl = document.getElementById('typingIndicator');
        const statusEl = document.getElementById('partner-status');
        if (!typingEl) return;
        
        // Show typing if partner is typing
        if (data && data[state.partnerId]) {
            typingEl.classList.remove('hidden');
            if (statusEl && state.isConnected) {
                statusEl.innerHTML = '<span class="status-dot typing-active"></span>typing...';
            }
            scrollToBottom();
        } else {
            typingEl.classList.add('hidden');
            if (statusEl && state.isConnected) {
                statusEl.innerHTML = '<span class="status-dot"></span>Online';
            }
        }
    });

    // Listen for Tic-Tac-Toe game updates
    const tttRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/game/ttt`);
    state.listeners.ttt = tttRef;
    
    tttRef.on('value', snap => {
        const data = snap.val();
        if (!data) {
            state.tttGameActive = false;
            return;
        }
        
        renderTttBoard(data);
        
        // Reset active flags if game ended so restart works
        if (data.status === 'ended') {
            state.tttGameActive = false;
            state.initiatedTtt = false;
        }
        
        // Auto-open modal on partner's invite
        if (data.status === 'playing' && !state.tttGameActive && !state.initiatedTtt) {
            state.tttGameActive = true;
            showModal('game');
            showTttPanelDirectly();
        }
    });

    // Listen for Poll updates
    const pollRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/game/poll`);
    state.listeners.poll = pollRef;
    
    pollRef.on('value', snap => {
        const data = snap.val();
        if (!data) {
            state.pollGameActive = false;
            return;
        }
        
        renderPoll(data);
        
        if (data.status === 'ended') {
            state.pollGameActive = false;
            state.initiatedPoll = false;
        }
        
        // Auto-open modal on partner's invite
        if (data.status === 'playing' && !state.pollGameActive && !state.initiatedPoll) {
            state.pollGameActive = true;
            showModal('game');
            showPollPanelDirectly();
        }
    });
}

function sendMessage(text, type = 'text') {
    if (!state.chatId || !text) return null;

    const filteredText = type === 'text' ? filterBadWords(text) : text;
    const localKey = 'local_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);

    const message = {
        senderId: state.userId,
        senderName: state.username,
        text: filteredText,
        type: type,
        timestamp: Date.now()
    };

    if (state.replyingTo) {
        message.replyTo = {
            text: state.replyingTo.text,
            sender: state.replyingTo.senderName
        };
        clearReply();
    }

    // Optimistic: render locally FIRST
    displayMessage(message, localKey);
    state.chatHistory.push(message);
    state.messageCount++;

    // Then push to Firebase
    const serverMessage = { ...message, timestamp: firebase.database.ServerValue.TIMESTAMP };
    const pushRef = db.ref(`${CONFIG.PATHS.MESSAGES}/${state.chatId}`).push();
    const realKey = pushRef.key;
    
    // Update local element attributes with the real key
    const localEl = document.querySelector(`[data-key="${localKey}"]`);
    if (localEl) {
        localEl.dataset.key = realKey;
        const bubble = localEl.querySelector('.bubble');
        if (bubble) {
            bubble.dataset.messageId = realKey;
        }
    }

    pushRef.set(serverMessage)
        .catch(err => {
            console.error('Failed to send message:', err);
            showToast('Message failed to send');
            if (localEl) localEl.remove();
        });

    playSound('send');
    setTypingStatus(false);
    return localKey;
}

function setTypingStatus(isTyping) {
    if (!state.chatId || !state.userId) return;
    const path = `${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/typing/${state.userId}`;
    db.ref(path).set(isTyping ? true : null).catch(() => {});
}

function displayMessage(msg, key) {
    const container = document.getElementById('chatMessages');
    if (!container) return;

    const isMine = msg.senderId === state.userId;
    const isSystem = msg.type === 'system' || msg.type === 'game' || msg.type === 'gift';

    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${isMine ? 'out' : 'in'}${isSystem ? ' system' : ''}`;
    msgDiv.dataset.key = key;

    let content = '';

    // Reply quote
    if (msg.replyTo) {
        content += `<div class="message-quote">
            <div class="quote-sender">${escapeHtml(msg.replyTo.sender || 'Stranger')}</div>
            <div class="quote-text">${escapeHtml(msg.replyTo.text || '').substring(0, 80)}</div>
        </div>`;
    }

    // Message content by type
    if (msg.type === 'drawing') {
        content += `<img src="${msg.text}" class="message-image" alt="Drawing">`;
    } else if (msg.type === 'gif') {
        content += `<img src="${msg.text}" class="message-image" alt="GIF">`;
    } else if (msg.type === 'audio') {
        content += `<audio src="${msg.text}" controls></audio>`;
    } else {
        content += escapeHtml(msg.text || '');
    }

    const timeStr = msg.timestamp ? formatTime(msg.timestamp) : '';
    
    msgDiv.innerHTML = `
        <div class="swipe-reply-indicator">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
        </div>
        <div class="bubble" data-message-id="${key}">
            ${content}
        </div>
        ${timeStr ? `<div class="msg-time">${timeStr}${isMine ? ' ✓✓' : ''}</div>` : ''}
    `;

    // Insert before typing indicator
    const typing = document.getElementById('typingIndicator');
    if (typing && typing.parentNode === container) {
        container.insertBefore(msgDiv, typing);
    } else {
        container.appendChild(msgDiv);
    }

    if (!isSystem) {
        initSwipeToReply(msgDiv, msg);
        initBubbleReactions(msgDiv, key, msg);
    }

    scrollToBottom();
}

function addSystemMessage(text) {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    const div = document.createElement('div');
    div.className = 'msg system';
    div.innerHTML = `<div class="bubble">${text}</div>`;
    
    const typing = document.getElementById('typingIndicator');
    if (typing && typing.parentNode === container) {
        container.insertBefore(div, typing);
    } else {
        container.appendChild(div);
    }
    scrollToBottom();
}

function handlePartnerDisconnect() {
    if (state.disconnectHandled) return;
    state.disconnectHandled = true;
    state.isConnected = false;
    endCallLocal(); // Terminate video/voice call if active

    // Disable input and tools
    setChatControlsEnabled(false);

    // Update UI
    const statusEl = document.getElementById('partner-status');
    if (statusEl) statusEl.innerHTML = '<span class="status-dot off"></span>Disconnected';

    addSystemMessage('Stranger has disconnected.');
    playSound('disconnect');

    // Show disconnected modal
    const duration = state.chatStartTime ? formatDuration(Date.now() - state.chatStartTime) : '0:00';
    const summaryDur = document.getElementById('summary-duration');
    const summaryMsg = document.getElementById('summary-messages');
    if (summaryDur) summaryDur.textContent = duration;
    if (summaryMsg) summaryMsg.textContent = state.messageCount;

    showModal('disconnected');

    // Cleanup listeners
    cleanupListeners();
}

async function disconnectChat() {
    if (!state.chatId) return;
    endCallLocal(); // Terminate call if active

    // Cancel onDisconnect hook
    try {
        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/status`).onDisconnect().cancel();
    } catch(e) {}

    // Mark chat as ended
    try {
        await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/status`).set('ended');
    } catch(e) {}

    state.isConnected = false;
    setChatControlsEnabled(false);
    cleanupListeners();
}

function cleanupListeners(all = false) {
    // Turn off all Firebase listeners
    Object.keys(state.listeners).forEach(key => {
        if (!all && (key === 'reconnectRequests' || key.startsWith('presence_'))) return;
        try { state.listeners[key].off(); } catch(e) {}
        delete state.listeners[key];
    });

    // Clear all timers
    Object.keys(state.timers).forEach(key => {
        clearInterval(state.timers[key]);
        clearTimeout(state.timers[key]);
        delete state.timers[key];
    });
}

function resetState() {
    cleanupListeners();
    CONFIG.PATHS.QUEUE = 'queue';
    state.selectedRoom = 'general';
    const firstRoomCard = document.querySelector('.room-card[data-room="general"]');
    if (firstRoomCard) {
        document.querySelectorAll('.room-card').forEach(c => c.classList.remove('active'));
        firstRoomCard.classList.add('active');
    }
    
    // Reset Vibe Room parent card UI
    const parentEmoji = document.getElementById('vibe-parent-emoji');
    const parentName = document.getElementById('vibe-parent-name');
    const parentDesc = document.getElementById('vibe-parent-desc');
    if (parentEmoji) parentEmoji.innerHTML = '<i class="ti ti-sparkles" style="font-size: 18px;"></i>';
    if (parentName) parentName.textContent = 'Vibe Rooms';
    if (parentDesc) parentDesc.textContent = 'Gaming, Midnight Lounge, Anime';
    document.querySelectorAll('.sub-room-card').forEach(c => c.classList.remove('active'));

    // Preserve local user identity (userId, username, avatar)
    state.partnerId = null;
    state.partnerName = null;
    state.partnerAvatar = null;
    state.chatId = null;
    state.isConnected = false;
    state.isSearching = false;
    state.disconnectHandled = false;
    state.chatHistory = [];
    state.messageCount = 0;
    state.chatStartTime = null;
    state.pendingAction = null;
    state.replyingTo = null;
    state.tttGameActive = false;
    state.initiatedTtt = false;
    state.pollGameActive = false;
    state.initiatedPoll = false;
    state.pendingReconnectPartnerId = null;
    state.mediaRecorder = null;
    state.audioChunks = [];
    state.isRecordingVoice = false;
    state.voiceStartTime = 0;
    state.isRemoteMuted = false;
    state.facingMode = 'user';
    state.friendRoomId = null;
    state.isFriendHost = false;

    // Reset invite UI elements if they exist
    const startBtn = document.getElementById('start-chat-btn');
    if (startBtn) {
        startBtn.innerHTML = '<span>Start Chatting</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
        const ageCheckbox = document.getElementById('age-confirm');
        if (ageCheckbox) {
            startBtn.disabled = !ageCheckbox.checked;
        }
    }
    const banner = document.getElementById('friend-invite-banner');
    if (banner) {
        banner.classList.add('hidden');
    }
    const inviteBtn = document.getElementById('friend-invite-btn');
    if (inviteBtn) {
        inviteBtn.style.display = '';
    }
}

function findNewChat() {
    closeModal('disconnected-modal');
    closeModal('leave-chat-modal');
    resetState();
    initChat();
}

function goHome() {
    closeModal('disconnected-modal');
    closeModal('leave-chat-modal');
    resetState();
    showPage('landing-page');
    document.body.classList.remove('chat-mode');
}

function cancelSearch() {
    state.isSearching = false;
    if (state.isFriendHost && state.friendRoomId) {
        db.ref(`friendRooms/${state.friendRoomId}`).remove().catch(() => {});
        try {
            db.ref(`friendRooms/${state.friendRoomId}`).onDisconnect().cancel();
        } catch(e) {}
    }
    leaveQueue();
    cleanupListeners();
    resetState();
    showPage('landing-page');
}

async function confirmLeaveChat() {
    closeModal('leave-chat-modal');
    await disconnectChat();
    if (state.pendingAction === 'next') {
        state.pendingAction = null;
        findNewChat();
    } else {
        goHome();
    }
}


// ============================================
// 7. FEATURES
// ============================================

// --- Emoji Picker ---
function initEmojiPicker() {
    const btn = document.getElementById('emojiBtn');
    const picker = document.getElementById('emojiPicker');
    const grid = document.getElementById('emojiGrid');
    const tabs = document.querySelectorAll('.emoji-tab');
    const input = document.getElementById('message-input');
    
    if (!btn || !picker || !grid || !input) return;

    function renderCategory(cat) {
        const emojis = EMOJIS[cat] || EMOJIS.smileys;
        grid.innerHTML = emojis.map(e => `<button type="button" data-emoji="${e}">${e}</button>`).join('');
    }

    renderCategory('smileys');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderCategory(tab.dataset.cat);
        });
    });

    grid.addEventListener('click', e => {
        const target = e.target.closest('button[data-emoji]');
        if (!target) return;
        const emoji = target.dataset.emoji;
        const pos = input.selectionStart || input.value.length;
        input.value = input.value.slice(0, pos) + emoji + input.value.slice(pos);
        input.dispatchEvent(new Event('input', { bubbles: true }));
        setTimeout(() => input.setSelectionRange(pos + emoji.length, pos + emoji.length), 0);
    });

    btn.addEventListener('click', e => {
        e.stopPropagation();
        picker.classList.toggle('hidden');
        btn.classList.toggle('active', !picker.classList.contains('hidden'));
    });

    document.addEventListener('click', e => {
        if (!btn.contains(e.target) && !picker.contains(e.target)) {
            picker.classList.add('hidden');
            btn.classList.remove('active');
        }
    });
}

// --- Drawing Canvas ---
function initDrawingCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    const clearBtn = document.getElementById('clear-canvas-btn');
    const sendBtn = document.getElementById('send-drawing-btn');
    if (!canvas || !clearBtn || !sendBtn) return;

    const ctx = canvas.getContext('2d');
    let drawing = false;
    let lastX = 0;
    let lastY = 0;

    function getCoords(e) {
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return { x: x * scaleX, y: y * scaleY };
    }

    function startDraw(e) {
        drawing = true;
        const c = getCoords(e);
        lastX = c.x;
        lastY = c.y;
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
    }
    function draw(e) {
        if (!drawing) return;
        const c = getCoords(e);
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#e8edf5';
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(c.x, c.y);

        // Sync drawing in real-time
        if (state.chatId && state.isConnected) {
            db.ref(`activeChats/${state.chatId}/draw`).push({
                fx: lastX,
                fy: lastY,
                tx: c.x,
                ty: c.y,
                sender: state.userId
            });
        }

        lastX = c.x;
        lastY = c.y;
    }
    function stopDraw() { drawing = false; ctx.beginPath(); }

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('touchstart', e => { e.preventDefault(); startDraw(e); }, { passive: false });
    canvas.addEventListener('touchmove', e => { e.preventDefault(); draw(e); }, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (state.chatId && state.isConnected) {
            db.ref(`activeChats/${state.chatId}/draw`).set(null);
        }
    });

    sendBtn.addEventListener('click', () => {
        const data = canvas.toDataURL('image/png');
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const hasContent = imgData.data.some((v, i) => i % 4 === 3 && v > 0);
        if (!hasContent) { showToast('Draw something first!'); return; }
        sendMessage(data, 'drawing');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Reset Firebase drawing node after sending so the next canvas starts fresh
        if (state.chatId && state.isConnected) {
            db.ref(`activeChats/${state.chatId}/draw`).set(null);
        }
        closeModal('drawing-modal');
    });
}

function listenForDrawing() {
    if (!state.chatId) return;

    const canvas = document.getElementById('drawing-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const drawRef = db.ref(`activeChats/${state.chatId}/draw`);
    state.listeners.drawing = drawRef;

    drawRef.on('value', snap => {
        if (snap.val() === null) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    });

    drawRef.on('child_added', snap => {
        const val = snap.val();
        if (val && val.sender !== state.userId) {
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#e8edf5';
            ctx.beginPath();
            ctx.moveTo(val.fx, val.fy);
            ctx.lineTo(val.tx, val.ty);
            ctx.stroke();
        }
    });
}

// --- Voice Note Recorder (10-Second Notes) ---
function initVoiceRecorder() {
    const voiceBtn = document.getElementById('voiceBtn');
    const overlay = document.getElementById('voice-recording-overlay');
    const timerEl = document.getElementById('voice-timer');
    const deleteBtn = document.getElementById('voice-delete-btn');
    const sendBtn = document.getElementById('voice-send-btn');
    const slideHint = document.getElementById('voice-slide-hint');
    const lockContainer = document.getElementById('voice-lock-container');
    const canvas = document.getElementById('voice-waveform');

    if (!voiceBtn || !overlay || !timerEl || !deleteBtn || !sendBtn || !slideHint || !lockContainer || !canvas) return;

    let recordingTimer = null;
    let localStream = null;
    let isDiscarded = false;
    let recordHoldTimer = null;
    let isHolding = false;
    let isLocked = false;
    let recordingStartX = 0;
    let recordingStartY = 0;
    let isSwipeCancelled = false;

    // Web Audio wave variables
    let audioContext = null;
    let analyserNode = null;
    let audioSource = null;
    let animationFrameId = null;

    function startWaveform(stream) {
        try {
            const AudioContextClass = window.AudioContext || window.webkitAudioContext;
            if (!AudioContextClass) return;

            audioContext = new AudioContextClass();
            audioSource = audioContext.createMediaStreamSource(stream);
            analyserNode = audioContext.createAnalyser();
            analyserNode.fftSize = 128; 
            audioSource.connect(analyserNode);

            const bufferLength = analyserNode.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            const canvasCtx = canvas.getContext('2d');

            function drawWave() {
                if (!state.isRecordingVoice) return;
                animationFrameId = requestAnimationFrame(drawWave);

                analyserNode.getByteFrequencyData(dataArray);

                canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

                const barWidth = 3;
                const barGap = 2;
                const totalBarWidth = barWidth + barGap;
                const numBars = Math.floor(canvas.width / totalBarWidth);
                const centerY = canvas.height / 2;

                const accentColor = getComputedStyle(document.documentElement)
                    .getPropertyValue('--accent').trim() || '#6c5ce7';

                canvasCtx.lineWidth = barWidth;
                canvasCtx.lineCap = 'round';
                canvasCtx.strokeStyle = accentColor;

                for (let i = 0; i < numBars; i++) {
                    const dataIndex = Math.floor((i / numBars) * bufferLength);
                    const value = dataArray[dataIndex] || 0;
                    const percent = value / 255;
                    const barHeight = Math.max(3, percent * canvas.height * 0.95);

                    const x = i * totalBarWidth + barWidth / 2;
                    const y1 = centerY - barHeight / 2;
                    const y2 = centerY + barHeight / 2;

                    canvasCtx.beginPath();
                    canvasCtx.moveTo(x, y1);
                    canvasCtx.lineTo(x, y2);
                    canvasCtx.stroke();
                }
            }

            canvas.classList.remove('hidden');
            drawWave();
        } catch (e) {
            console.error("Error setting up waveform analyser:", e);
        }
    }

    function stopWaveform() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        if (audioSource) {
            audioSource.disconnect();
            audioSource = null;
        }
        if (analyserNode) {
            analyserNode.disconnect();
            analyserNode = null;
        }
        if (audioContext && audioContext.state !== 'closed') {
            audioContext.close().catch(() => {});
            audioContext = null;
        }
        if (canvas) {
            canvas.classList.add('hidden');
            const canvasCtx = canvas.getContext('2d');
            canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    async function startRecordingProcess(startAsLocked = false) {
        if (!state.isConnected) {
            showToast("Connect to a stranger first!");
            return;
        }

        try {
            isDiscarded = false;
            isLocked = startAsLocked;
            
            localStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });

            state.audioChunks = [];
            let options = { mimeType: 'audio/webm' };
            if (!MediaRecorder.isTypeSupported('audio/webm')) {
                options = { mimeType: 'audio/mp4' }; 
                if (!MediaRecorder.isTypeSupported('audio/mp4')) {
                    options = {};
                }
            }

            options.audioBitsPerSecond = 128000;
            state.mediaRecorder = new MediaRecorder(localStream, options);
            state.mediaRecorder.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    state.audioChunks.push(event.data);
                }
            };

            state.mediaRecorder.onstop = () => {
                if (localStream) {
                    localStream.getTracks().forEach(track => track.stop());
                }

                if (isDiscarded) return;

                const duration = Date.now() - state.voiceStartTime;
                if (duration < 1000) {
                    showToast("Voice note too short.");
                    return;
                }

                const audioBlob = new Blob(state.audioChunks, { type: state.mediaRecorder.mimeType || 'audio/webm' });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    sendMessage(reader.result, 'audio');
                };
            };

            state.isRecordingVoice = true;
            state.voiceStartTime = Date.now();
            state.mediaRecorder.start();

            // Set up UI
            voiceBtn.classList.add('active');
            overlay.classList.remove('hidden');
            timerEl.textContent = '0:00';

            // Show appropriate UI elements based on lock state
            if (isLocked) {
                // Tapped to record: immediately locked
                slideHint.classList.add('hidden');
                lockContainer.classList.add('hidden');
                deleteBtn.style.display = 'inline-flex';
                sendBtn.style.display = 'inline-flex';
                voiceBtn.style.visibility = 'hidden';
            } else {
                // Holding to record
                slideHint.classList.remove('hidden');
                lockContainer.classList.remove('hidden');
                deleteBtn.style.display = 'none';
                sendBtn.style.display = 'none';
                voiceBtn.style.visibility = 'visible';
                
                // Reset styling offsets
                slideHint.style.transform = 'translateX(0)';
                slideHint.style.opacity = '1';
                const lockIcon = lockContainer.querySelector('.lock-icon-wrapper');
                if (lockIcon) {
                    lockIcon.style.transform = 'translateY(0)';
                }
            }

            startWaveform(localStream);

            let seconds = 0;
            if (recordingTimer) clearInterval(recordingTimer);
            recordingTimer = setInterval(() => {
                seconds++;
                timerEl.textContent = `0:${seconds < 10 ? '0' : ''}${seconds}`;
                if (seconds >= 10) {
                    stopRecordingAndSend();
                }
            }, 1000);

            state.timers['voiceRecord'] = recordingTimer;

        } catch (err) {
            console.error("Error starting recording:", err);
            showToast("Microphone access denied.");
            cleanupUI();
        }
    }

    function lockRecording() {
        if (!state.isRecordingVoice || isLocked) return;
        isLocked = true;
        lockContainer.classList.add('hidden');
        slideHint.classList.add('hidden');
        deleteBtn.style.display = 'inline-flex';
        sendBtn.style.display = 'inline-flex';
        voiceBtn.style.visibility = 'hidden';
        playSound('send');
    }

    function stopRecordingAndSend() {
        if (!state.isRecordingVoice) return;
        isDiscarded = false;
        if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
            state.mediaRecorder.stop();
        }
        cleanupUI();
    }

    function cancelRecording() {
        if (!state.isRecordingVoice) return;
        isDiscarded = true;
        if (state.mediaRecorder && state.mediaRecorder.state !== 'inactive') {
            state.mediaRecorder.stop();
        }
        cleanupUI();
        showToast("Recording cancelled.");
    }

    function cleanupUI() {
        state.isRecordingVoice = false;
        isHolding = false;
        isLocked = false;
        if (recordingTimer) {
            clearInterval(recordingTimer);
            recordingTimer = null;
            delete state.timers['voiceRecord'];
        }
        stopWaveform();
        voiceBtn.classList.remove('active');
        voiceBtn.style.visibility = 'visible';
        overlay.classList.add('hidden');
        lockContainer.classList.add('hidden');
        
        // Reset element animations
        slideHint.style.transform = 'translateX(0)';
        slideHint.style.opacity = '1';
        const lockIcon = lockContainer.querySelector('.lock-icon-wrapper');
        if (lockIcon) {
            lockIcon.style.transform = 'translateY(0)';
        }
    }

    // Touch/Mouse down start
    function handleDown(e) {
        if (!state.isConnected) {
            showToast("Connect to a stranger first!");
            return;
        }
        
        // Only trigger on primary click
        if (e.type === 'mousedown' && e.button !== 0) return;
        
        // Let it click overlay action buttons
        if (e.target.closest('#voice-delete-btn') || e.target.closest('#voice-send-btn')) return;
        
        // Prevent default browser touch scrolling/gestures on hold
        if (e.cancelable) e.preventDefault();
        
        isSwipeCancelled = false;
        isLocked = false;
        const touch = e.touches?.[0] || e;
        recordingStartX = touch.clientX;
        recordingStartY = touch.clientY;

        isHolding = false;
        if (recordHoldTimer) clearTimeout(recordHoldTimer);

        recordHoldTimer = setTimeout(() => {
            isHolding = true;
            if (!state.isRecordingVoice) {
                startRecordingProcess(false);
            }
        }, 200);
    }

    // Drag move to cancel/lock
    function handleMove(e) {
        if (!state.isRecordingVoice || isLocked || isSwipeCancelled) return;

        const touch = e.touches?.[0] || e;
        const curX = touch.clientX;
        const curY = touch.clientY;

        const diffX = recordingStartX - curX;
        const diffY = recordingStartY - curY;

        // Slide left to cancel
        if (diffX > 0) {
            slideHint.style.transform = `translateX(-${diffX}px)`;
            slideHint.style.opacity = Math.max(0, 1 - diffX / 80).toString();

            if (diffX > 80) {
                isSwipeCancelled = true;
                if (recordHoldTimer) clearTimeout(recordHoldTimer);
                cancelRecording();
                return;
            }
        }

        // Slide up to lock
        if (diffY > 0) {
            const lockIcon = lockContainer.querySelector('.lock-icon-wrapper');
            if (lockIcon) {
                lockIcon.style.transform = `translateY(-${Math.min(30, diffY)}px)`;
            }

            if (diffY > 50) {
                if (recordHoldTimer) clearTimeout(recordHoldTimer);
                lockRecording();
            }
        }
    }

    // Touch/Mouse up release
    function handleUp(e) {
        if (recordHoldTimer) {
            clearTimeout(recordHoldTimer);
            recordHoldTimer = null;
        }

        if (isHolding) {
            // Holding mode release
            if (state.isRecordingVoice && !isLocked && !isSwipeCancelled) {
                stopRecordingAndSend();
            }
            isHolding = false;
        } else {
            // Tap mode toggle (starts hands-free recording)
            const clickedBtn = e.target.closest('#voiceBtn');
            if (clickedBtn && !state.isRecordingVoice) {
                startRecordingProcess(true);
            }
        }
    }

    // Event listeners binding
    voiceBtn.addEventListener('mousedown', handleDown);
    voiceBtn.addEventListener('touchstart', handleDown, { passive: false });

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove, { passive: false });

    window.addEventListener('mouseup', handleUp);
    window.addEventListener('touchend', handleUp);

    deleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        cancelRecording();
    });

    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        stopRecordingAndSend();
    });
}

// --- Truth or Dare ---
let currentGameQuestion = null;
let currentGameType = null;

function openGameModal() {
    showModal('game');
    if (state.tttGameActive) {
        showTttPanelDirectly();
    } else if (state.pollGameActive) {
        showPollPanelDirectly();
    } else {
        showGameSelectionScreen();
    }
}

function showGameSelectionScreen() {
    const selectScreen = document.getElementById('game-selection-screen');
    const tdPanel = document.getElementById('truth-dare-panel');
    const tttPanel = document.getElementById('ttt-panel');
    const pollPanel = document.getElementById('poll-panel');
    if (selectScreen) selectScreen.style.display = 'block';
    if (tdPanel) tdPanel.style.display = 'none';
    if (tttPanel) tttPanel.style.display = 'none';
    if (pollPanel) pollPanel.style.display = 'none';
}

function showTttPanelDirectly() {
    const selectScreen = document.getElementById('game-selection-screen');
    const tdPanel = document.getElementById('truth-dare-panel');
    const tttPanel = document.getElementById('ttt-panel');
    const pollPanel = document.getElementById('poll-panel');
    if (selectScreen) selectScreen.style.display = 'none';
    if (tdPanel) tdPanel.style.display = 'none';
    if (tttPanel) tttPanel.style.display = 'block';
    if (pollPanel) pollPanel.style.display = 'none';
}

function showTruthDarePanel() {
    const selectScreen = document.getElementById('game-selection-screen');
    const tdPanel = document.getElementById('truth-dare-panel');
    const tttPanel = document.getElementById('ttt-panel');
    const pollPanel = document.getElementById('poll-panel');
    if (selectScreen) selectScreen.style.display = 'none';
    if (tdPanel) tdPanel.style.display = 'block';
    if (tttPanel) tttPanel.style.display = 'none';
    if (pollPanel) pollPanel.style.display = 'none';
    currentGameQuestion = null;
    currentGameType = null;
    const resultEl = document.getElementById('game-result');
    const sendBtn = document.getElementById('send-game-btn');
    if (resultEl) resultEl.textContent = '';
    if (sendBtn) sendBtn.style.display = 'none';
}

function getTruth() {
    const q = GAMES.truth[Math.floor(Math.random() * GAMES.truth.length)];
    currentGameQuestion = q;
    currentGameType = 'truth';
    const resultEl = document.getElementById('game-result');
    const sendBtn = document.getElementById('send-game-btn');
    if (resultEl) resultEl.innerHTML = `<span style="color:#00b894;font-weight:700">TRUTH:</span><br>${q}`;
    if (sendBtn) sendBtn.style.display = 'inline-block';
}

function getDare() {
    const q = GAMES.dare[Math.floor(Math.random() * GAMES.dare.length)];
    currentGameQuestion = q;
    currentGameType = 'dare';
    const resultEl = document.getElementById('game-result');
    const sendBtn = document.getElementById('send-game-btn');
    if (resultEl) resultEl.innerHTML = `<span style="color:#e74c3c;font-weight:700">DARE:</span><br>${q}`;
    if (sendBtn) sendBtn.style.display = 'inline-block';
}

function sendGameResult() {
    if (!currentGameQuestion || !state.isConnected) return;
    const label = currentGameType === 'truth' ? '💬 TRUTH' : '🔥 DARE';
    sendMessage(`${label}: ${currentGameQuestion}`, 'game');
    closeModal('game-modal');
    currentGameQuestion = null;
    currentGameType = null;
}

// --- Tic-Tac-Toe Game ---
async function startTicTacToeGame() {
    if (!state.isConnected || !state.chatId) return;
    
    state.initiatedTtt = true;
    state.tttGameActive = true;
    showTttPanelDirectly();
    
    const gameRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/game/ttt`);
    
    const gameData = {
        board: ["", "", "", "", "", "", "", "", ""],
        turn: "X",
        status: "playing",
        players: {
            X: state.userId,
            O: state.partnerId
        },
        winner: null
    };
    
    await gameRef.set(gameData);
    sendMessage("🎮 Let's play Tic-Tac-Toe! I started a game. Open your Games panel to play! ❌⭕", "system");
}

async function handleSelectTtt() {
    if (state.tttGameActive) {
        showTttPanelDirectly();
    } else {
        await startTicTacToeGame();
    }
}

function renderTttBoard(data) {
    const statusEl = document.getElementById('ttt-status');
    const cells = document.querySelectorAll('.ttt-cell');
    if (!data || !statusEl || cells.length === 0) return;
    
    const mySymbol = data.players.X === state.userId ? 'X' : 'O';
    const partnerSymbol = mySymbol === 'X' ? 'O' : 'X';
    
    data.board.forEach((val, idx) => {
        const cell = cells[idx];
        if (cell) {
            cell.textContent = val;
            cell.setAttribute('data-val', val);
            cell.disabled = val !== "" || data.status !== 'playing' || data.turn !== mySymbol;
        }
    });
    
    if (data.status === 'playing') {
        if (data.turn === mySymbol) {
            statusEl.textContent = `Your turn (${mySymbol})`;
            statusEl.style.color = 'var(--accent)';
        } else {
            statusEl.textContent = `Stranger's turn (${partnerSymbol})`;
            statusEl.style.color = 'var(--text-muted)';
        }
    } else if (data.status === 'ended') {
        if (data.winner === 'draw') {
            statusEl.textContent = "It's a draw! 🤝";
            statusEl.style.color = 'var(--text-secondary)';
        } else if (data.winner === mySymbol) {
            statusEl.textContent = "You won! 🎉";
            statusEl.style.color = 'var(--accent)';
        } else {
            statusEl.textContent = "Stranger won! 😢";
            statusEl.style.color = 'var(--danger)';
        }
    }
}

async function makeTttMove(index) {
    if (!state.chatId || !state.isConnected) return;
    
    const gameRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/game/ttt`);
    const snap = await gameRef.once('value');
    const data = snap.val();
    if (!data || data.status !== 'playing') return;
    
    const mySymbol = data.players.X === state.userId ? 'X' : 'O';
    const partnerSymbol = mySymbol === 'X' ? 'O' : 'X';
    
    if (data.turn !== mySymbol || data.board[index] !== "") return;
    
    data.board[index] = mySymbol;
    
    const winner = checkTttWinner(data.board);
    if (winner) {
        data.status = 'ended';
        data.winner = winner;
    } else if (data.board.every(cell => cell !== "")) {
        data.status = 'ended';
        data.winner = 'draw';
    } else {
        data.turn = partnerSymbol;
    }
    
    await gameRef.set(data);
}

function checkTttWinner(board) {
    const patterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const pattern of patterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

async function resetTttGame() {
    if (!state.chatId || !state.isConnected) return;
    const gameRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/game/ttt`);
    const snap = await gameRef.once('value');
    const data = snap.val();
    if (!data) return;
    
    state.initiatedTtt = true;
    state.tttGameActive = true;
    
    const resetData = {
        board: ["", "", "", "", "", "", "", "", ""],
        turn: "X",
        status: "playing",
        players: {
            X: data.players.X,
            O: data.players.O
        },
        winner: null
    };
    
    await gameRef.set(resetData);
    sendMessage("🎮 Tic-Tac-Toe game restarted. Let's play again!", "system");
}

// --- Icebreaker Polls ---
const POLL_QUESTIONS = [
    { q: "Would you rather travel 100 years into the past or 100 years into the future?", a: "100 Years Past 🕰️", b: "100 Years Future 🚀" },
    { q: "Would you rather have the ability to fly or be invisible?", a: "Fly 🦅", b: "Be Invisible 👻" },
    { q: "Would you rather always be 15 minutes late or 20 minutes early?", a: "15m Late 🏃", b: "20m Early ⏰" },
    { q: "Would you rather eat only pizza for a year or never eat pizza again?", a: "Only Pizza 🍕", b: "Never Eat Pizza 🚫" },
    { q: "Would you rather explore the deep ocean or outer space?", a: "Deep Ocean 🐙", b: "Outer Space 🌌" },
    { q: "Would you rather have unlimited money or unlimited free time?", a: "Unlimited Money 💰", b: "Unlimited Free Time ⏳" },
    { q: "Would you rather lose the ability to speak or always say exactly what's on your mind?", a: "Lose Speak 🤫", b: "Always Say Truth 📢" },
    { q: "Would you rather be able to talk to animals or speak all human languages?", a: "Talk to Animals 🦁", b: "All Languages 🗣️" }
];

async function startPollGame() {
    if (!state.isConnected || !state.chatId) return;

    state.initiatedPoll = true;
    state.pollGameActive = true;
    showPollPanelDirectly();

    const gameRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/game/poll`);
    const qIndex = Math.floor(Math.random() * POLL_QUESTIONS.length);
    const question = POLL_QUESTIONS[qIndex];

    const pollData = {
        questionId: qIndex,
        q: question.q,
        a: question.a,
        b: question.b,
        status: "playing",
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };

    await gameRef.set(pollData);
    sendMessage("📊 I started a Would You Rather poll! Open your Games panel to vote! 🗳️", "system");
}

async function submitPollVote(choice) {
    if (!state.isConnected || !state.chatId || !state.pollGameActive) return;
    const voteRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/game/poll/votes/${state.userId}`);
    await voteRef.set(choice);
}

function renderPoll(data) {
    const qText = document.getElementById('poll-question-text');
    const optA = document.getElementById('poll-opt-a');
    const optB = document.getElementById('poll-opt-b');
    const barA = document.getElementById('poll-bar-a');
    const barB = document.getElementById('poll-bar-b');
    const pctA = document.getElementById('poll-pct-a');
    const pctB = document.getElementById('poll-pct-b');
    const statusEl = document.getElementById('poll-status');
    const nextBtn = document.getElementById('next-poll-btn');

    if (!data || !qText || !optA || !optB || !barA || !barB || !pctA || !pctB || !statusEl || !nextBtn) return;

    qText.textContent = data.q;
    optA.querySelector('.option-lbl').textContent = data.a;
    optB.querySelector('.option-lbl').textContent = data.b;

    const votes = data.votes || {};
    const myVote = votes[state.userId];
    const partnerVote = votes[state.partnerId];

    // Reset styles
    optA.classList.remove('selected');
    optB.classList.remove('selected');

    if (myVote) {
        if (myVote === 'A') optA.classList.add('selected');
        if (myVote === 'B') optB.classList.add('selected');
        optA.disabled = true;
        optB.disabled = true;
    } else {
        optA.disabled = data.status !== 'playing';
        optB.disabled = data.status !== 'playing';
    }

    const bothVoted = myVote && partnerVote;

    if (bothVoted) {
        let countA = 0;
        let countB = 0;
        Object.values(votes).forEach(v => {
            if (v === 'A') countA++;
            if (v === 'B') countB++;
        });
        const total = countA + countB;
        const percentA = Math.round((countA / total) * 100);
        const percentB = Math.round((countB / total) * 100);

        barA.style.width = `${percentA}%`;
        barB.style.width = `${percentB}%`;

        pctA.textContent = `${percentA}%`;
        pctB.textContent = `${percentB}%`;
        pctA.style.display = 'inline-block';
        pctB.style.display = 'inline-block';

        statusEl.innerHTML = `Reveal! You voted <strong>${myVote === 'A' ? 'Option A' : 'Option B'}</strong>.<br>Stranger voted <strong>${partnerVote === 'A' ? 'Option A' : 'Option B'}</strong>.`;

        if (state.userId < state.partnerId) {
            nextBtn.style.display = 'inline-block';
        } else {
            nextBtn.style.display = 'none';
        }
    } else {
        barA.style.width = '0%';
        barB.style.width = '0%';
        pctA.style.display = 'none';
        pctB.style.display = 'none';
        nextBtn.style.display = 'none';

        if (myVote) {
            statusEl.textContent = "Waiting for Stranger to vote...";
        } else if (partnerVote) {
            statusEl.textContent = "Stranger has voted! Cast your vote.";
        } else {
            statusEl.textContent = "Cast your vote to see splits!";
        }
    }
}

function showPollPanelDirectly() {
    const selectScreen = document.getElementById('game-selection-screen');
    const tdPanel = document.getElementById('truth-dare-panel');
    const tttPanel = document.getElementById('ttt-panel');
    const pollPanel = document.getElementById('poll-panel');
    if (selectScreen) selectScreen.style.display = 'none';
    if (tdPanel) tdPanel.style.display = 'none';
    if (tttPanel) tttPanel.style.display = 'none';
    if (pollPanel) pollPanel.style.display = 'block';
}

// --- Question Picker ---
function showQuestionPicker() {
    const q = ICEBREAKERS[Math.floor(Math.random() * ICEBREAKERS.length)];
    const input = document.getElementById('message-input');
    if (input) {
        input.value = q;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.focus();
    }
}

// --- Smart Replies ---
const SMART_REPLY_MAP = [
    { match: /where.*from/i, replies: ["India 🇮🇳", "USA 🇺🇸", "Just asking!", "Guess? 😏"] },
    { match: /how.*are.*you|sup|wassup/i, replies: ["Doing good 😊", "Pretty chill", "Could be better", "Great! You?"] },
    { match: /what.*do.*fun|hobb/i, replies: ["Music 🎵", "Movies 🎬", "Just relaxing", "Gaming 🎮"] },
    { match: /bye|leaving/i, replies: ["Bye! 👋", "See ya", "Take care ✌️"] },
    { match: /.*/, replies: ["Tell me more", "That's interesting", "Haha 😂", "Cool 😎"] }
];

function showSmartReplies(text) {
    const container = document.getElementById('smartReplies');
    const input = document.getElementById('message-input');
    if (!container || !input || !text) return;

    container.innerHTML = '';
    const match = SMART_REPLY_MAP.find(r => r.match.test(text));
    if (!match) return;

    const replies = [...match.replies].sort(() => 0.5 - Math.random()).slice(0, 3);
    replies.forEach(r => {
        const chip = document.createElement('button');
        chip.className = 'smart-reply';
        chip.textContent = r;
        chip.addEventListener('click', () => {
            if (!state.chatId) return;
            if (state.disconnectHandled) return;
            sendMessage(r);
            input.value = '';
            const sendBtnEl = document.getElementById('send-btn');
            if (sendBtnEl) sendBtnEl.disabled = true;
            container.innerHTML = '';
        });
        container.appendChild(chip);
    });

    clearTimeout(state.timers.smartReply);
    state.timers.smartReply = setTimeout(() => { container.innerHTML = ''; }, 15000);
}

// --- Reply ---
function setReplyMode(msg) {
    state.replyingTo = msg;
    const preview = document.getElementById('reply-preview');
    if (!preview) return;
    preview.innerHTML = `
        <div class="reply-bar-content">
            <div class="reply-sender">${escapeHtml(msg.senderName || 'Stranger')}</div>
            <div class="reply-text">${escapeHtml((msg.text || '').substring(0, 60))}</div>
        </div>
        <button class="reply-close" onclick="clearReply()">&times;</button>
    `;
    preview.classList.add('active');
    document.getElementById('message-input')?.focus();
}

function clearReply() {
    state.replyingTo = null;
    const preview = document.getElementById('reply-preview');
    if (preview) {
        preview.innerHTML = '';
        preview.classList.remove('active');
    }
}

// --- Swipe-to-Reply (Touch/Mouse gestures) ---
function initSwipeToReply(msgDiv, msgData) {
    const bubble = msgDiv.querySelector('.bubble');
    const indicator = msgDiv.querySelector('.swipe-reply-indicator');
    if (!bubble || !indicator) return;

    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    let hasMoved = false;
    const threshold = 60;

    bubble.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
        hasMoved = false;
        bubble.style.transition = 'none';
        indicator.style.transition = 'none';
    }, { passive: true });

    bubble.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const diffX = e.touches[0].clientX - startX;
        
        if (Math.abs(diffX) > 5) {
            hasMoved = true;
        }

        if (diffX > 0) {
            currentX = Math.min(diffX, 100);
            bubble.style.transform = `translateX(${currentX}px)`;
            
            const pct = Math.min(currentX / threshold, 1);
            indicator.style.opacity = pct;
            indicator.style.transform = `scale(${0.6 + pct * 0.4}) translateY(-50%)`;
            if (currentX >= threshold) {
                indicator.classList.add('ready');
            } else {
                indicator.classList.remove('ready');
            }
        }
    }, { passive: true });

    bubble.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        
        bubble.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        indicator.style.transition = 'all 0.2s ease';
        
        bubble.style.transform = '';
        indicator.style.opacity = '0';
        indicator.style.transform = 'scale(0.6) translateY(-50%)';
        
        if (hasMoved) {
            bubble.classList.add('dragged');
            setTimeout(() => bubble.classList.remove('dragged'), 100);
        }

        if (currentX >= threshold) {
            setReplyMode(msgData);
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
        }
        currentX = 0;
        indicator.classList.remove('ready');
    });

    bubble.addEventListener('mousedown', e => {
        if (e.button !== 0 || e.target.closest('.reaction-badges') || e.target.closest('.message-quote')) return;
        startX = e.clientX;
        isDragging = true;
        hasMoved = false;
        bubble.style.transition = 'none';
        indicator.style.transition = 'none';

        // Prevent text selection during drag on laptop
        document.body.style.userSelect = 'none';
        document.body.style.webkitUserSelect = 'none';
        
        const onMouseMove = ev => {
            if (!isDragging) return;
            const diffX = ev.clientX - startX;
            if (Math.abs(diffX) > 5) {
                hasMoved = true;
            }

            if (diffX > 0) {
                currentX = Math.min(diffX, 100);
                bubble.style.transform = `translateX(${currentX}px)`;
                
                const pct = Math.min(currentX / threshold, 1);
                indicator.style.opacity = pct;
                indicator.style.transform = `scale(${0.6 + pct * 0.4}) translateY(-50%)`;
                if (currentX >= threshold) {
                    indicator.classList.add('ready');
                } else {
                    indicator.classList.remove('ready');
                }
            }
        };
        
        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            // Re-enable text selection
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
            
            bubble.style.transition = 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            indicator.style.transition = 'all 0.2s ease';
            
            bubble.style.transform = '';
            indicator.style.opacity = '0';
            indicator.style.transform = 'scale(0.6) translateY(-50%)';
            
            if (hasMoved) {
                bubble.classList.add('dragged');
                setTimeout(() => bubble.classList.remove('dragged'), 100);
            }

            if (currentX >= threshold) {
                setReplyMode(msgData);
            }
            currentX = 0;
            indicator.classList.remove('ready');
        };
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

// --- Message Reactions ---
function initBubbleReactions(msgDiv, msgKey, msgData) {
    const bubble = msgDiv.querySelector('.bubble');
    if (!bubble) return;

    bubble.addEventListener('click', e => {
        if (e.target.closest('.reaction-badges') || e.target.closest('.message-quote')) return;
        
        // Block reaction picker if bubble was just dragged
        if (bubble.classList.contains('dragged')) {
            bubble.classList.remove('dragged');
            return;
        }

        e.stopPropagation();
        document.querySelectorAll('.reaction-picker').forEach(p => p.remove());
        
        const currentKey = bubble.getAttribute('data-message-id');
        showReactionPicker(bubble, currentKey);
    });
    
    if (msgData.reactions) {
        updateMessageReactionsInDom(msgKey, msgData.reactions, false);
    }
}

function showReactionPicker(bubble, msgKey) {
    const picker = document.createElement('div');
    picker.className = 'reaction-picker';
    
    const emojis = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
    
    picker.innerHTML = emojis.map(emoji => `
        <button type="button" class="reaction-emoji-btn" data-emoji="${emoji}">${emoji}</button>
    `).join('');
    
    picker.addEventListener('click', e => {
        const btn = e.target.closest('.reaction-emoji-btn');
        if (!btn) return;
        e.stopPropagation();
        
        const emoji = btn.dataset.emoji;
        toggleReaction(msgKey, emoji);
        picker.remove();
    });
    
    document.body.appendChild(picker);
    const rect = bubble.getBoundingClientRect();
    
    const pickerWidth = 220;
    const pickerHeight = 44;
    
    let left = rect.left + (rect.width - pickerWidth) / 2;
    left = Math.max(10, Math.min(left, window.innerWidth - pickerWidth - 10));
    
    let top = rect.top - pickerHeight - 8;
    if (top < 10) {
        top = rect.bottom + 8;
    }
    
    picker.style.left = `${left + window.scrollX}px`;
    picker.style.top = `${top + window.scrollY}px`;
    
    setTimeout(() => picker.classList.add('active'), 10);
    
    const dismissPicker = event => {
        if (!picker.contains(event.target)) {
            picker.remove();
            document.removeEventListener('click', dismissPicker);
        }
    };
    setTimeout(() => document.addEventListener('click', dismissPicker), 10);
}

async function toggleReaction(msgKey, emoji) {
    if (!state.chatId || !state.isConnected) return;
    
    const reactionRef = db.ref(`${CONFIG.PATHS.MESSAGES}/${state.chatId}/${msgKey}/reactions/${state.userId}`);
    const snap = await reactionRef.once('value');
    const currentEmoji = snap.val();
    
    if (currentEmoji === emoji) {
        await reactionRef.remove();
    } else {
        await reactionRef.set(emoji);
    }
}

function triggerEmojiBurst(emoji, rect) {
    if (!emoji) return;
    
    const startX = rect ? (rect.left + rect.width / 2) : (window.innerWidth / 2);
    const startY = rect ? (rect.top + rect.height / 2) : (window.innerHeight / 2);
    
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'emoji-burst-particle';
        p.textContent = emoji;
        p.style.left = `${startX}px`;
        p.style.top = `${startY}px`;
        
        // Random angle and distance
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 140;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - (40 + Math.random() * 80);
        
        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        
        // Random delay and duration
        p.style.animationDelay = `${Math.random() * 0.12}s`;
        p.style.animationDuration = `${0.7 + Math.random() * 0.5}s`;
        
        document.body.appendChild(p);
        
        setTimeout(() => p.remove(), 1500);
    }
}

function updateMessageReactionsInDom(msgKey, reactions, shouldBurst = true) {
    const bubble = document.querySelector(`.bubble[data-message-id="${msgKey}"]`);
    if (!bubble) return;
    
    const previousReactions = bubble.dataset.reactions ? JSON.parse(bubble.dataset.reactions) : {};
    
    if (reactions) {
        bubble.dataset.reactions = JSON.stringify(reactions);
        if (shouldBurst) {
            Object.keys(reactions).forEach(uid => {
                const emoji = reactions[uid];
                if (previousReactions[uid] !== emoji) {
                    const rect = bubble.getBoundingClientRect();
                    triggerEmojiBurst(emoji, rect);
                }
            });
        }
    } else {
        bubble.removeAttribute('data-reactions');
    }
    
    const oldBadges = bubble.querySelector('.reaction-badges');
    if (oldBadges) oldBadges.remove();
    
    const msgDiv = bubble.closest('.msg');
    if (!reactions) {
        if (msgDiv) msgDiv.classList.remove('has-reactions');
        return;
    }
    
    const counts = {};
    const usersByEmoji = {};
    
    Object.keys(reactions).forEach(userId => {
        const emoji = reactions[userId];
        counts[emoji] = (counts[emoji] || 0) + 1;
        if (!usersByEmoji[emoji]) usersByEmoji[emoji] = [];
        usersByEmoji[emoji].push(userId);
    });
    
    const emojis = Object.keys(counts);
    if (emojis.length === 0) {
        if (msgDiv) msgDiv.classList.remove('has-reactions');
        return;
    }
    
    if (msgDiv) msgDiv.classList.add('has-reactions');
    
    const badgesContainer = document.createElement('div');
    badgesContainer.className = 'reaction-badges';
    
    emojis.forEach(emoji => {
        const badge = document.createElement('button');
        badge.type = 'button';
        const hasReacted = usersByEmoji[emoji].includes(state.userId);
        badge.className = `reaction-pill${hasReacted ? ' reacted' : ''}`;
        
        badge.innerHTML = `<span class="pill-emoji">${emoji}</span><span class="pill-count">${counts[emoji]}</span>`;
        
        badge.addEventListener('click', e => {
            e.stopPropagation();
            toggleReaction(msgKey, emoji);
        });
        
        badgesContainer.appendChild(badge);
    });
    
    bubble.appendChild(badgesContainer);
}

// --- User Reconnect & Presence System ---
function initUserIdentity() {
    let savedUserId = localStorage.getItem('omega_user_id');
    let savedUsername = localStorage.getItem('omega_username');
    let savedAvatar = localStorage.getItem('omega_avatar');
    
    if (savedUserId && savedUsername && savedAvatar) {
        state.userId = savedUserId;
        state.username = savedUsername;
        state.avatar = savedAvatar;
    } else {
        state.userId = generateId();
        state.username = generateUsername();
        state.avatar = selectAvatar('any');
        
        localStorage.setItem('omega_user_id', state.userId);
        localStorage.setItem('omega_username', state.username);
        localStorage.setItem('omega_avatar', state.avatar);
    }
}

function initUserPresence() {
    if (!state.userId) return;
    const presenceRef = db.ref(`users/${state.userId}/status`);
    presenceRef.set('online').catch(() => {});
    presenceRef.onDisconnect().remove().catch(() => {});
}

function savePartnerToHistory(id, name, avatar) {
    if (!id) return;
    let history = [];
    try {
        const stored = localStorage.getItem('omega_recent_chats');
        if (stored) history = JSON.parse(stored);
    } catch(e) {}
    
    history = history.filter(item => item.partnerId !== id);
    history.unshift({
        partnerId: id,
        partnerName: name,
        partnerAvatar: avatar,
        lastChatted: Date.now()
    });
    
    history = history.slice(0, 5);
    try {
        localStorage.setItem('omega_recent_chats', JSON.stringify(history));
    } catch(e) {}
    
    renderRecentConnections();
}

function renderRecentConnections() {
    const section = document.getElementById('recent-connections');
    const divider = document.getElementById('recent-connections-divider');
    const list = document.getElementById('recent-connections-list');
    if (!section || !list || !divider) return;
    
    let history = [];
    try {
        const stored = localStorage.getItem('omega_recent_chats');
        if (stored) history = JSON.parse(stored);
    } catch(e) {}
    
    if (history.length === 0) {
        section.style.display = 'none';
        divider.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    divider.style.display = 'block';
    
    list.innerHTML = history.map(item => {
        const avatarHtml = item.partnerAvatar 
            ? `<img src="${item.partnerAvatar}" class="recent-avatar-img" alt="${escapeHtml(item.partnerName)}">`
            : `<div class="recent-avatar-text">${(item.partnerName || '?')[0].toUpperCase()}</div>`;
            
        return `
            <button type="button" class="recent-item" onclick="requestReconnect('${item.partnerId}')" title="Chat with ${escapeHtml(item.partnerName)}">
                <div class="recent-avatar">
                    ${avatarHtml}
                    <span class="recent-online-status" data-user-id="${item.partnerId}"></span>
                </div>
                <span class="recent-name">${escapeHtml(item.partnerName)}</span>
            </button>
        `;
    }).join('');

    checkRecentUsersOnlineStatus(history);
}

function checkRecentUsersOnlineStatus(history) {
    history.forEach(item => {
        const ref = db.ref(`users/${item.partnerId}/status`);
        const listenerKey = `presence_${item.partnerId}`;
        
        if (state.listeners[listenerKey]) {
            state.listeners[listenerKey].off();
        }
        state.listeners[listenerKey] = ref;
        
        ref.on('value', snap => {
            const status = snap.val();
            const dot = document.querySelector(`.recent-online-status[data-user-id="${item.partnerId}"]`);
            if (dot) {
                if (status === 'online') {
                    dot.classList.add('online');
                } else {
                    dot.classList.remove('online');
                }
            }
        });
    });
}

async function requestReconnect(partnerId) {
    if (!state.userId) return;
    
    // Check if partner is online first
    const statusSnap = await db.ref(`users/${partnerId}/status`).once('value');
    if (statusSnap.val() !== 'online') {
        showToast('Stranger is offline right now.');
        return;
    }
    
    // Fetch partner details from history
    let history = [];
    try {
        const stored = localStorage.getItem('omega_recent_chats');
        if (stored) history = JSON.parse(stored);
    } catch(e) {}
    const partnerData = history.find(item => item.partnerId === partnerId);
    if (!partnerData) return;
    
    state.pendingReconnectPartnerId = partnerId;
    
    const reconnectChatId = 'reconnect_' + generateId();
    showModal('reconnect-waiting');
    
    try {
        const requestRef = db.ref(`reconnectRequests/${partnerId}/${state.userId}`);
        await requestRef.set({
            senderName: state.username,
            senderAvatar: state.avatar,
            chatId: reconnectChatId,
            status: 'pending',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
        
        // Auto-remove request on disconnect/tab close
        requestRef.onDisconnect().remove().catch(() => {});
    } catch (e) {
        console.error("Error sending reconnect request:", e);
        closeModal('reconnect-waiting-modal');
        showToast('Failed to send reconnect request. Please try again.');
        state.pendingReconnectPartnerId = null;
        return;
    }
    
    // Setup listener for responses
    const responseListenerKey = `reconnectResponse_${partnerId}`;
    if (state.listeners[responseListenerKey]) {
        state.listeners[responseListenerKey].off();
    }
    
    const responseRef = db.ref(`reconnectRequests/${partnerId}/${state.userId}`);
    state.listeners[responseListenerKey] = responseRef;
    
    responseRef.on('value', snap => {
        const data = snap.val();
        if (!data) return;
        
        if (data.status === 'accepted') {
            closeModal('reconnect-waiting-modal');
            responseRef.off();
            delete state.listeners[responseListenerKey];
            
            // Set state and match
            state.chatId = data.chatId;
            state.partnerId = partnerId;
            state.partnerName = partnerData.partnerName;
            state.partnerAvatar = partnerData.partnerAvatar;
            
            // Remove request node
            responseRef.remove();
            
            // Start the chat room
            startChat();
        } else if (data.status === 'declined') {
            closeModal('reconnect-waiting-modal');
            showToast('Stranger declined the reconnect request.');
            cancelReconnectRequest(partnerId);
        } else if (data.status === 'busy') {
            closeModal('reconnect-waiting-modal');
            showToast('Stranger is busy right now.');
            cancelReconnectRequest(partnerId);
        }
    });
    
    // Timeout request after 30 seconds
    clearTimeout(state.timers.reconnectTimeout);
    state.timers.reconnectTimeout = setTimeout(() => {
        closeModal('reconnect-waiting-modal');
        showToast('No response from Stranger.');
        cancelReconnectRequest(partnerId);
    }, 30000);
}

async function cancelReconnectRequest(partnerId) {
    clearTimeout(state.timers.reconnectTimeout);
    closeModal('reconnect-waiting-modal');
    
    const requestRef = db.ref(`reconnectRequests/${partnerId}/${state.userId}`);
    await requestRef.remove().catch(() => {});
    
    const listenerKey = `reconnectResponse_${partnerId}`;
    if (state.listeners[listenerKey]) {
        state.listeners[listenerKey].off();
        delete state.listeners[listenerKey];
    }
    
    state.pendingReconnectPartnerId = null;
}

function listenForReconnectRequests() {
    if (!state.userId) return;
    
    const ref = db.ref(`reconnectRequests/${state.userId}`);
    state.listeners.reconnectRequests = ref;
    
    ref.on('child_added', async snap => {
        const request = snap.val();
        if (!request || request.status !== 'pending') return;
        
        const senderId = snap.key;
        
        // Verify sender is currently online before showing invite (resilient to clock skew)
        const presenceSnap = await db.ref(`users/${senderId}/status`).once('value');
        if (presenceSnap.val() !== 'online') {
            db.ref(`reconnectRequests/${state.userId}/${senderId}`).remove().catch(() => {});
            return;
        }
        
        if (state.isConnected || state.showingInviteFromId) {
            // Auto-decline incoming requests if we are busy in another chat or already showing an invite
            db.ref(`reconnectRequests/${state.userId}/${senderId}/status`).set('busy');
            setTimeout(() => {
                db.ref(`reconnectRequests/${state.userId}/${senderId}`).remove();
            }, 1000);
            return;
        }
        
        state.showingInviteFromId = senderId;
        showReconnectInvite(senderId, request);
    });

    ref.on('child_removed', snap => {
        const senderId = snap.key;
        if (state.showingInviteFromId === senderId && !state.isConnected) {
            state.showingInviteFromId = null;
            closeModal('reconnect-invite-modal');
            showToast('Reconnect request was cancelled.');
        }
    });
}

function showReconnectInvite(senderId, request) {
    const modal = document.getElementById('reconnect-invite-modal');
    const avatarEl = document.getElementById('reconnect-invite-avatar');
    const nameEl = document.getElementById('reconnect-invite-name');
    const acceptBtn = document.getElementById('reconnect-accept-btn');
    const declineBtn = document.getElementById('reconnect-decline-btn');
    
    if (!modal || !acceptBtn || !declineBtn) return;
    
    if (nameEl) nameEl.textContent = request.senderName || 'Stranger';
    if (avatarEl) {
        if (request.senderAvatar) {
            avatarEl.innerHTML = `<img src="${request.senderAvatar}" alt="${escapeHtml(request.senderName)}" class="avatar-img">`;
            avatarEl.classList.add('has-img');
        } else {
            avatarEl.textContent = (request.senderName || '?')[0].toUpperCase();
            avatarEl.classList.remove('has-img');
        }
    }

    // Set modal title
    const titleEl = modal.querySelector('h3');
    if (titleEl) titleEl.textContent = 'Reconnect Request!';
    
    // Hide reply message bubble if it exists in DOM
    const replyBubble = document.getElementById('reconnect-invite-reply');
    if (replyBubble) replyBubble.style.display = 'none';
    
    showModal('reconnect-invite');
    playSound('receive');
    
    // Clear existing listeners
    const cleanAccept = acceptBtn.cloneNode(true);
    const cleanDecline = declineBtn.cloneNode(true);
    acceptBtn.parentNode.replaceChild(cleanAccept, acceptBtn);
    declineBtn.parentNode.replaceChild(cleanDecline, declineBtn);
    
    cleanAccept.addEventListener('click', async () => {
        state.showingInviteFromId = null;
        closeModal('reconnect-invite-modal');
        
        // Verify request still exists and is pending in the DB before proceeding
        const requestRef = db.ref(`reconnectRequests/${state.userId}/${senderId}`);
        const snap = await requestRef.once('value');
        if (!snap.exists() || snap.val().status !== 'pending') {
            showToast('This reconnect invitation is no longer active.');
            return;
        }

        // Initialize the active chat room in the database
        await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${request.chatId}`).set({
            userA: senderId,
            userB: state.userId,
            createdAt: firebase.database.ServerValue.TIMESTAMP,
            status: 'active'
        });
        
        // Setup local session first
        state.chatId = request.chatId;
        state.partnerId = senderId;
        state.partnerName = request.senderName;
        state.partnerAvatar = request.senderAvatar;

        // Write acceptance to DB
        await requestRef.child('status').set('accepted');
        
        // Start the chat room
        startChat();
    });
    
    cleanDecline.addEventListener('click', async () => {
        state.showingInviteFromId = null;
        closeModal('reconnect-invite-modal');
        await db.ref(`reconnectRequests/${state.userId}/${senderId}/status`).set('declined');
        // Remove node after brief delay
        setTimeout(() => {
            db.ref(`reconnectRequests/${state.userId}/${senderId}`).remove();
        }, 1000);
    });
}

// ============================================
// WebRTC Video & Voice Calls Signaling
// ============================================

async function startCall() {
    if (!state.chatId || !state.partnerId) return;

    const overlay = document.getElementById('call-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('calling');
    }

    const statusText = document.getElementById('call-status-text');
    if (statusText) statusText.textContent = 'Requesting camera/microphone access...';

    const statusAvatar = document.getElementById('call-status-avatar');
    if (statusAvatar) {
        if (state.partnerAvatar) {
            statusAvatar.innerHTML = `<img src="${state.partnerAvatar}" class="avatar-img">`;
            statusAvatar.classList.add('has-img');
        } else {
            statusAvatar.textContent = (state.partnerName || '?')[0].toUpperCase();
            statusAvatar.classList.remove('has-img');
        }
    }

    try {
        state.localStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 },
                frameRate: { ideal: 30 }
            },
            audio: true
        });
        
        const localVideo = document.getElementById('local-video');
        if (localVideo) localVideo.srcObject = state.localStream;
        
        if (statusText) statusText.textContent = 'Calling Stranger...';

        state.peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        state.peerConnection.onconnectionstatechange = () => {
            if (state.peerConnection && state.peerConnection.connectionState === 'connected') {
                console.log('WebRTC offerer: Connected. Re-applying video optimizations...');
                optimizeVideoBitrate(state.peerConnection);
            }
        };

        state.localStream.getTracks().forEach(track => {
            state.peerConnection.addTrack(track, state.localStream);
        });

        state.peerConnection.ontrack = event => {
            const remoteVideo = document.getElementById('remote-video');
            if (remoteVideo && event.streams[0]) {
                remoteVideo.srcObject = event.streams[0];
                state.remoteStream = event.streams[0];
                
                const overlay = document.getElementById('call-overlay');
                if (overlay) overlay.classList.remove('calling');
                
                const statusContainer = document.querySelector('.call-status-container');
                if (statusContainer) statusContainer.style.opacity = '0';
            }
        };

        state.peerConnection.onicecandidate = event => {
            if (event.candidate && state.chatId) {
                db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/offerCandidates`)
                    .push(event.candidate.toJSON());
            }
        };

        const offer = await state.peerConnection.createOffer();
        await state.peerConnection.setLocalDescription(offer);

        const callRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call`);
        await callRef.set({
            status: 'calling',
            caller: state.userId,
            offer: {
                type: offer.type,
                sdp: offer.sdp
            },
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/status`).onDisconnect().set('ended').catch(() => {});

        const answerRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/answer`);
        state.listeners.callAnswer = answerRef;
        answerRef.on('value', async snap => {
            const answer = snap.val();
            if (answer && state.peerConnection && state.peerConnection.signalingState === 'have-local-offer') {
                await state.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
                optimizeVideoBitrate(state.peerConnection);
            }
        });

        const answerCandidatesRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/answerCandidates`);
        state.listeners.callAnswerCandidates = answerCandidatesRef;
        answerCandidatesRef.on('child_added', snap => {
            const candidate = snap.val();
            if (candidate && state.peerConnection) {
                state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => console.error(e));
            }
        });

    } catch (err) {
        console.error('Failed to start call:', err);
        showToast('Could not access camera/microphone.');
        endCallLocal();
    }
}

async function acceptCall() {
    closeModal('incoming-call-modal');
    
    const overlay = document.getElementById('call-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
        overlay.classList.add('calling');
    }

    const statusText = document.getElementById('call-status-text');
    if (statusText) statusText.textContent = 'Connecting call...';

    const statusAvatar = document.getElementById('call-status-avatar');
    if (statusAvatar) {
        if (state.partnerAvatar) {
            statusAvatar.innerHTML = `<img src="${state.partnerAvatar}" class="avatar-img">`;
            statusAvatar.classList.add('has-img');
        } else {
            statusAvatar.textContent = (state.partnerName || '?')[0].toUpperCase();
            statusAvatar.classList.remove('has-img');
        }
    }

    try {
        state.localStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 },
                frameRate: { ideal: 30 }
            },
            audio: true
        });
        
        const localVideo = document.getElementById('local-video');
        if (localVideo) localVideo.srcObject = state.localStream;

        state.peerConnection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        state.peerConnection.onconnectionstatechange = () => {
            if (state.peerConnection && state.peerConnection.connectionState === 'connected') {
                console.log('WebRTC answerer: Connected. Re-applying video optimizations...');
                optimizeVideoBitrate(state.peerConnection);
            }
        };

        state.localStream.getTracks().forEach(track => {
            state.peerConnection.addTrack(track, state.localStream);
        });

        state.peerConnection.ontrack = event => {
            const remoteVideo = document.getElementById('remote-video');
            if (remoteVideo && event.streams[0]) {
                remoteVideo.srcObject = event.streams[0];
                state.remoteStream = event.streams[0];
                
                const overlay = document.getElementById('call-overlay');
                if (overlay) overlay.classList.remove('calling');
                
                const statusContainer = document.querySelector('.call-status-container');
                if (statusContainer) statusContainer.style.opacity = '0';
            }
        };

        state.peerConnection.onicecandidate = event => {
            if (event.candidate && state.chatId) {
                db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/answerCandidates`)
                    .push(event.candidate.toJSON());
            }
        };

        await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/status`).set('connected');
        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/status`).onDisconnect().set('ended').catch(() => {});

        const offerSnap = await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/offer`).once('value');
        const offer = offerSnap.val();
        if (!offer) {
            showToast('Call has ended.');
            endCallLocal();
            return;
        }

        await state.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        const answer = await state.peerConnection.createAnswer();
        await state.peerConnection.setLocalDescription(answer);

        await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/answer`).set({
            type: answer.type,
            sdp: answer.sdp
        });

        optimizeVideoBitrate(state.peerConnection);

        const offerCandidatesRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/offerCandidates`);
        state.listeners.callOfferCandidates = offerCandidatesRef;
        offerCandidatesRef.on('child_added', snap => {
            const candidate = snap.val();
            if (candidate && state.peerConnection) {
                state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => console.error(e));
            }
        });

    } catch (err) {
        console.error('Failed to accept call:', err);
        showToast('Could not access camera/microphone.');
        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/status`).set('declined');
        endCallLocal();
    }
}

function declineCall() {
    closeModal('incoming-call-modal');
    if (state.chatId) {
        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/status`).set('declined');
    }
}

function hangupCall() {
    if (state.chatId) {
        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/status`).set('ended');
    }
    endCallLocal();
}

function endCallLocal() {
    closeModal('incoming-call-modal');

    const overlay = document.getElementById('call-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
        overlay.classList.remove('calling');
    }

    const statusContainer = document.querySelector('.call-status-container');
    if (statusContainer) statusContainer.style.opacity = '1';

    if (state.localStream) {
        state.localStream.getTracks().forEach(track => track.stop());
        state.localStream = null;
    }
    if (state.remoteStream) {
        state.remoteStream.getTracks().forEach(track => track.stop());
        state.remoteStream = null;
    }

    if (state.peerConnection) {
        state.peerConnection.close();
        state.peerConnection = null;
    }

    if (state.chatId) {
        try {
            db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call/status`).onDisconnect().cancel();
        } catch(e) {}
    }

    const callListeners = ['callAnswer', 'callAnswerCandidates', 'callOfferCandidates'];
    callListeners.forEach(key => {
        if (state.listeners[key]) {
            state.listeners[key].off();
            delete state.listeners[key];
        }
    });

    const localVideo = document.getElementById('local-video');
    const remoteVideo = document.getElementById('remote-video');
    if (localVideo) {
        localVideo.srcObject = null;
        localVideo.className = 'local-video filter-none';
    }
    if (remoteVideo) {
        remoteVideo.srcObject = null;
        remoteVideo.className = 'remote-video filter-none';
    }
    const drawer = document.getElementById('filter-drawer');
    if (drawer) {
        drawer.classList.remove('active');
        drawer.querySelectorAll('.filter-chip').forEach(chip => {
            chip.classList.toggle('active', chip.dataset.filter === 'none');
        });
    }

    state.isMuted = false;
    state.isVideoOff = false;
    
    updateCallControlsUI();
}

function optimizeVideoBitrate(pc) {
    if (!pc) return;
    try {
        const senders = pc.getSenders();
        const videoSender = senders.find(sender => sender.track && sender.track.kind === 'video');
        if (videoSender) {
            const parameters = videoSender.getParameters();
            if (!parameters.encodings) {
                parameters.encodings = [{}];
            }
            if (parameters.encodings.length === 0) {
                parameters.encodings.push({});
            }
            // Increase to 2.5 Mbps for crystal-clear HD video quality
            parameters.encodings[0].maxBitrate = 2500000;
            // Disable downscaling to guarantee 720p/1080p is sent
            parameters.encodings[0].scaleResolutionDownBy = 1.0;
            // Tell the browser to prioritize resolution/clarity over framerate under bad network conditions
            parameters.degradationPreference = 'maintain-resolution';

            videoSender.setParameters(parameters)
                .then(() => console.log('✅ WebRTC: Optimized video bitrate (2.5 Mbps) and degradation preference (maintain-resolution)'))
                .catch(e => {
                    console.error('Error setting max bitrate parameters:', e);
                    // Fallback without degradationPreference
                    try {
                        const fallbackParams = videoSender.getParameters();
                        if (fallbackParams && fallbackParams.encodings && fallbackParams.encodings.length > 0) {
                            fallbackParams.encodings[0].maxBitrate = 2500000;
                            fallbackParams.encodings[0].scaleResolutionDownBy = 1.0;
                            videoSender.setParameters(fallbackParams).catch(err => console.error('Fallback setParameters failed:', err));
                        }
                    } catch(ex) {
                        console.error('Inner fallback failed:', ex);
                    }
                });
        }
    } catch(e) {
        console.error('Error optimizing video bitrate:', e);
    }
}

function toggleAudio() {
    if (!state.localStream) return;
    state.isMuted = !state.isMuted;
    
    state.localStream.getAudioTracks().forEach(track => {
        track.enabled = !state.isMuted;
    });

    updateCallControlsUI();
}

function toggleVideo() {
    if (!state.localStream) return;
    state.isVideoOff = !state.isVideoOff;

    state.localStream.getVideoTracks().forEach(track => {
        track.enabled = !state.isVideoOff;
    });

    updateCallControlsUI();
}

function toggleRemoteAudio() {
    const remoteVideo = document.getElementById('remote-video');
    if (!remoteVideo) return;
    
    state.isRemoteMuted = !state.isRemoteMuted;
    remoteVideo.muted = state.isRemoteMuted;
    
    updateCallControlsUI();
}

async function flipCamera() {
    if (!state.localStream) return;
    
    state.facingMode = state.facingMode === 'user' ? 'environment' : 'user';
    
    try {
        const videoConstraints = {
            facingMode: state.facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 }
        };
        
        const newStream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints });
        const newVideoTrack = newStream.getVideoTracks()[0];
        
        // Stop old video track
        const oldVideoTrack = state.localStream.getVideoTracks()[0];
        if (oldVideoTrack) {
            oldVideoTrack.stop();
            state.localStream.removeTrack(oldVideoTrack);
        }
        
        // Add new track
        state.localStream.addTrack(newVideoTrack);
        
        // Update local video preview
        const localVideo = document.getElementById('local-video');
        if (localVideo) {
            localVideo.srcObject = state.localStream;
        }
        
        // Replace in RTCPeerConnection
        if (state.peerConnection) {
            const senders = state.peerConnection.getSenders();
            const videoSender = senders.find(sender => sender.track && sender.track.kind === 'video');
            if (videoSender) {
                await videoSender.replaceTrack(newVideoTrack);
            }
        }
        
        showToast("Camera switched");
        
    } catch (err) {
        console.error("Failed to flip camera:", err);
        showToast("Could not access camera.");
        // Revert facingMode state
        state.facingMode = state.facingMode === 'user' ? 'environment' : 'user';
    }
}

function updateCallControlsUI() {
    const toggleAudioBtn = document.getElementById('toggle-audio-btn');
    const toggleVideoBtn = document.getElementById('toggle-video-btn');

    if (toggleAudioBtn) {
        const micOnIcon = toggleAudioBtn.querySelector('.mic-on-icon');
        const micOffIcon = toggleAudioBtn.querySelector('.mic-off-icon');
        if (state.isMuted) {
            toggleAudioBtn.classList.add('muted');
            if (micOnIcon) micOnIcon.classList.add('hidden');
            if (micOffIcon) micOffIcon.classList.remove('hidden');
        } else {
            toggleAudioBtn.classList.remove('muted');
            if (micOnIcon) micOnIcon.classList.remove('hidden');
            if (micOffIcon) micOffIcon.classList.add('hidden');
        }
    }

    if (toggleVideoBtn) {
        const videoOnIcon = toggleVideoBtn.querySelector('.video-on-icon');
        const videoOffIcon = toggleVideoBtn.querySelector('.video-off-icon');
        if (state.isVideoOff) {
            toggleVideoBtn.classList.add('muted');
            if (videoOnIcon) videoOnIcon.classList.add('hidden');
            if (videoOffIcon) videoOffIcon.classList.remove('hidden');
        } else {
            toggleVideoBtn.classList.remove('muted');
            if (videoOnIcon) videoOnIcon.classList.remove('hidden');
            if (videoOffIcon) videoOffIcon.classList.add('hidden');
        }
    }

    const toggleRemoteAudioBtn = document.getElementById('toggle-remote-audio-btn');
    if (toggleRemoteAudioBtn) {
        const speakerOnIcon = toggleRemoteAudioBtn.querySelector('.speaker-on-icon');
        const speakerOffIcon = toggleRemoteAudioBtn.querySelector('.speaker-off-icon');
        if (state.isRemoteMuted) {
            toggleRemoteAudioBtn.classList.add('muted');
            if (speakerOnIcon) speakerOnIcon.classList.add('hidden');
            if (speakerOffIcon) speakerOffIcon.classList.remove('hidden');
        } else {
            toggleRemoteAudioBtn.classList.remove('muted');
            if (speakerOnIcon) speakerOnIcon.classList.remove('hidden');
            if (speakerOffIcon) speakerOffIcon.classList.add('hidden');
        }
    }
}

function listenForIncomingCalls() {
    if (!state.chatId) return;

    const callRef = db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/call`);
    state.listeners.call = callRef;
    
    callRef.on('value', async snap => {
        const call = snap.val();
        if (!call) return;

        if (call.status === 'calling' && call.caller !== state.userId) {
            const modal = document.getElementById('incoming-call-modal');
            if (modal && !modal.classList.contains('active')) {
                const nameEl = document.getElementById('incoming-call-name');
                const avatarEl = document.getElementById('incoming-call-avatar');
                if (nameEl) nameEl.textContent = state.partnerName || 'Stranger';
                if (avatarEl) {
                    if (state.partnerAvatar) {
                        avatarEl.innerHTML = `<img src="${state.partnerAvatar}" alt="Avatar" class="avatar-img">`;
                        avatarEl.classList.add('has-img');
                    } else {
                        avatarEl.textContent = (state.partnerName || '?')[0].toUpperCase();
                        avatarEl.classList.remove('has-img');
                    }
                }
                showModal('incoming-call');
                playSound('receive');
            }
        } else if (call.status === 'declined' && call.caller === state.userId) {
            showToast('Stranger declined the call.');
            endCallLocal();
        } else if (call.status === 'ended') {
            endCallLocal();
        }
    });
}

function initCallSystem() {
    const startCallBtn = document.getElementById('start-call-btn');
    const acceptCallBtn = document.getElementById('accept-call-btn');
    const declineCallBtn = document.getElementById('decline-call-btn');
    const hangupCallBtn = document.getElementById('hangup-call-btn');
    const toggleAudioBtn = document.getElementById('toggle-audio-btn');
    const toggleVideoBtn = document.getElementById('toggle-video-btn');
    const toggleRemoteAudioBtn = document.getElementById('toggle-remote-audio-btn');
    const flipCameraBtn = document.getElementById('flip-camera-btn');

    if (startCallBtn) {
        startCallBtn.addEventListener('click', () => {
            if (state.isConnected) {
                startCall();
            } else {
                showToast('You must be matched with someone to start a call.');
            }
        });
    }

    if (acceptCallBtn) {
        acceptCallBtn.addEventListener('click', () => {
            acceptCall();
        });
    }

    if (declineCallBtn) {
        declineCallBtn.addEventListener('click', () => {
            declineCall();
        });
    }

    if (hangupCallBtn) {
        hangupCallBtn.addEventListener('click', () => {
            hangupCall();
        });
    }

    if (toggleAudioBtn) {
        toggleAudioBtn.addEventListener('click', () => {
            toggleAudio();
        });
    }

    if (toggleVideoBtn) {
        toggleVideoBtn.addEventListener('click', () => {
            toggleVideo();
        });
    }

    if (toggleRemoteAudioBtn) {
        toggleRemoteAudioBtn.addEventListener('click', () => {
            toggleRemoteAudio();
        });
    }

    if (flipCameraBtn) {
        flipCameraBtn.addEventListener('click', () => {
            flipCamera();
        });
    }
}

function initCallFilters() {
    const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
    const filterDrawer = document.getElementById('filter-drawer');
    const localVideo = document.getElementById('local-video');
    const remoteVideo = document.getElementById('remote-video');
    
    if (!toggleFiltersBtn || !filterDrawer) return;

    // Toggle filter drawer visibility
    toggleFiltersBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDrawer.classList.toggle('active');
    });

    // Handle filter chip selection
    filterDrawer.querySelectorAll('.filter-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Set active chip class
            filterDrawer.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const selectedFilter = chip.dataset.filter || 'none';
            
            // Define list of filters to remove
            const allFilters = ['filter-none', 'filter-vhs', 'filter-neon', 'filter-warm', 'filter-noir', 'filter-chrome'];
            
            // Helper to apply filter
            const applyFilterToElement = (el, baseClass) => {
                if (!el) return;
                allFilters.forEach(f => el.classList.remove(f));
                el.classList.add('filter-' + selectedFilter);
            };

            applyFilterToElement(localVideo, 'local-video');
            applyFilterToElement(remoteVideo, 'remote-video');
        });
    });

    // Close drawer when clicking anywhere outside of it
    document.addEventListener('click', (e) => {
        if (!filterDrawer.contains(e.target) && e.target !== toggleFiltersBtn) {
            filterDrawer.classList.remove('active');
        }
    });
}

// --- Report & Block ---
function submitReport(reason) {
    if (!state.chatId || !state.partnerId) return;
    db.ref(`${CONFIG.PATHS.REPORTS}/${generateId()}`).set({
        chatId: state.chatId,
        reportedBy: state.userId,
        reportedUser: state.partnerId,
        reason: reason,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    closeModal('report-modal');
    showToast('Report submitted. Thank you.');
}

async function blockUser() {
    closeModal('block-modal');
    await disconnectChat();
    showToast('User blocked.');
    findNewChat();
}

// --- Feedback ---
function handleFeedback(e) {
    e.preventDefault();
    const type = document.getElementById('feedback-type')?.value;
    const message = document.getElementById('feedback-message')?.value;
    if (!message) return;

    db.ref(`${CONFIG.PATHS.FEEDBACK}/${generateId()}`).set({
        type: type,
        message: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    });

    closeModal('feedback-modal');
    showToast('Feedback sent! Thank you.');
    if (document.getElementById('feedback-message')) document.getElementById('feedback-message').value = '';
}

// --- Save Chat ---
function saveChat() {
    const transcript = state.chatHistory.map(m => {
        const time = m.timestamp ? formatTime(m.timestamp) : '';
        const sender = m.senderId === state.userId ? 'You' : state.partnerName;
        return `[${time}] ${sender}: ${m.text}`;
    }).join('\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Chat saved!');
}


// ============================================
// 8. EVENT BINDING
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Parse friend query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const friendParam = urlParams.get('friend');
    if (friendParam) {
        state.friendRoomId = friendParam;
        state.isFriendHost = false;
        
        // Update CTA button to reflect friend chat
        const startBtn = document.getElementById('start-chat-btn');
        if (startBtn) {
            startBtn.innerHTML = '<span>Join Friend\'s Chat</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
        }
        
        // Show banner
        const banner = document.getElementById('friend-invite-banner');
        if (banner) {
            banner.classList.remove('hidden');
        }
        
        // Hide friend invite button since they are already joining a friend
        const inviteBtn = document.getElementById('friend-invite-btn');
        if (inviteBtn) {
            inviteBtn.style.display = 'none';
        }
    }

    // Friend invite button
    const friendInviteBtn = document.getElementById('friend-invite-btn');
    if (friendInviteBtn) {
        friendInviteBtn.addEventListener('click', e => {
            e.preventDefault();
            generateFriendLink();
        });
    }

    // --- Landing Page ---

    // Age gate & Verification Modal
    const ageCheckbox = document.getElementById('age-confirm');
    const startBtn = document.getElementById('start-chat-btn');
    const ageAcceptBtn = document.getElementById('age-gate-accept-btn');

    if (localStorage.getItem('omega_age_verified') === 'true') {
        if (ageCheckbox) {
            ageCheckbox.checked = true;
            if (startBtn) startBtn.disabled = false;
        }
    } else {
        setTimeout(() => {
            showModal('age-gate');
        }, 800);
    }

    if (ageCheckbox) {
        ageCheckbox.addEventListener('change', () => {
            if (ageAcceptBtn) ageAcceptBtn.disabled = !ageCheckbox.checked;
            if (startBtn) startBtn.disabled = !ageCheckbox.checked;
        });
    }

    if (ageAcceptBtn) {
        ageAcceptBtn.addEventListener('click', () => {
            if (ageCheckbox && ageCheckbox.checked) {
                localStorage.setItem('omega_age_verified', 'true');
                closeModal('age-gate');
                if (startBtn) startBtn.disabled = false;
            }
        });
    }

    if (startBtn) {
        startBtn.addEventListener('click', e => {
            e.preventDefault();
            if (ageCheckbox && ageCheckbox.checked) initChat();
        });
    }

    // Customize Vibe collapsible setup
    const toggleBtn = document.getElementById('toggle-options-btn');
    const collapsibleOptions = document.getElementById('collapsible-options');
    if (toggleBtn && collapsibleOptions) {
        toggleBtn.addEventListener('click', () => {
            const isCollapsed = collapsibleOptions.classList.toggle('collapsed');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.style.transform = isCollapsed ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    }

    // Vibe Room cards selection (main homepage selector cards)
    document.querySelectorAll('.room-card[data-room]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.room-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            state.selectedRoom = card.dataset.room || 'general';
        });
    });

    // Parent Vibe Rooms selector card click (opens selection modal)
    const vibeParentCard = document.getElementById('vibe-room-selector-card');
    if (vibeParentCard) {
        vibeParentCard.addEventListener('click', () => {
            showModal('vibe-rooms');
        });
    }

    // Modal sub-room card selection click
    document.querySelectorAll('.sub-room-card').forEach(subCard => {
        subCard.addEventListener('click', () => {
            // Remove active classes
            document.querySelectorAll('.room-card').forEach(c => c.classList.remove('active'));
            document.querySelectorAll('.sub-room-card').forEach(c => c.classList.remove('active'));
            
            // Mark subcard and parent card as active
            subCard.classList.add('active');
            if (vibeParentCard) vibeParentCard.classList.add('active');
            
            // Set selection
            const chosenRoom = subCard.dataset.subroom;
            state.selectedRoom = chosenRoom;
            
            // Update parent card UI text and emoji
            const parentEmoji = document.getElementById('vibe-parent-emoji');
            const parentName = document.getElementById('vibe-parent-name');
            const parentDesc = document.getElementById('vibe-parent-desc');
            
            if (chosenRoom === 'gaming') {
                if (parentEmoji) parentEmoji.innerHTML = '<i class="ti ti-device-gamepad-2" style="font-size: 18px;"></i>';
                if (parentName) parentName.textContent = 'Gaming Hub';
                if (parentDesc) parentDesc.textContent = 'Vibe Room (Tap to change)';
            } else if (chosenRoom === 'lounge') {
                if (parentEmoji) parentEmoji.innerHTML = '<i class="ti ti-stars" style="font-size: 18px;"></i>';
                if (parentName) parentName.textContent = 'Midnight Lounge';
                if (parentDesc) parentDesc.textContent = 'Vibe Room (Tap to change)';
            } else if (chosenRoom === 'anime') {
                if (parentEmoji) parentEmoji.innerHTML = '<i class="ti ti-flower" style="font-size: 18px;"></i>';
                if (parentName) parentName.textContent = 'Otaku Cafe';
                if (parentDesc) parentDesc.textContent = 'Vibe Room (Tap to change)';
            }
            
            // Close modal
            closeModal('vibe-rooms');
        });
    });

    // Interest chips
    document.querySelectorAll('.interest-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            const interest = chip.dataset.interest;
            if (chip.classList.contains('selected')) {
                chip.classList.remove('selected');
                state.interests = state.interests.filter(i => i !== interest);
            } else if (state.interests.length < CONFIG.MAX_INTERESTS) {
                chip.classList.add('selected');
                state.interests.push(interest);
            }
            // Disable unselected when max reached
            document.querySelectorAll('.interest-chip').forEach(c => {
                c.classList.toggle('disabled', state.interests.length >= CONFIG.MAX_INTERESTS && !c.classList.contains('selected'));
            });
        });
    });

    // Gender pills ("I am")
    document.querySelectorAll('.gender-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.gender-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.gender = pill.dataset.gender;
        });
    });

    // Preference pills ("Looking for")
    document.querySelectorAll('.pref-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.pref-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            state.genderPref = pill.dataset.pref;
        });
    });

    // --- Chat Page ---

    // Message input
    const input = document.getElementById('message-input');
    const sendBtn2 = document.getElementById('send-btn');

    if (input && sendBtn2) {
        input.addEventListener('input', () => {
            sendBtn2.disabled = input.value.trim().length === 0;
            // Typing indicator
            if (state.chatId && state.isConnected) {
                setTypingStatus(true);
                clearTimeout(state.timers.typingTimeout);
                state.timers.typingTimeout = setTimeout(() => setTypingStatus(false), CONFIG.TIMEOUTS.TYPING);
            }
        });

        input.addEventListener('keypress', e => {
            if (e.key === 'Enter' && !e.shiftKey && state.settings.enterToSend) {
                e.preventDefault();
                handleSend();
            }
        });

        sendBtn2.addEventListener('click', handleSend);
    }

    function handleSend() {
        const input = document.getElementById('message-input');
        const text = input?.value.trim();
        if (!text || !state.chatId) return;
        if (state.disconnectHandled) return;

        sendMessage(text);
        input.value = '';
        document.getElementById('send-btn').disabled = true;

        // Hide smart replies
        const sr = document.getElementById('smartReplies');
        if (sr) sr.innerHTML = '';
    }

    // Leave chat
    const leaveBtn = document.getElementById('leave-chat-btn');
    if (leaveBtn) {
        leaveBtn.addEventListener('click', () => {
            if (state.isConnected) showModal('leave-chat');
            else goHome();
        });
    }

    // Next chat
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (state.isConnected) {
                state.pendingAction = 'next';
                showModal('leave-chat');
            } else {
                findNewChat();
            }
        });
    }

    // Chat tool buttons
    const gameBtn = document.getElementById('gameBtn');
    const questionBtn = document.getElementById('questionBtn');
    const drawBtn = document.getElementById('drawBtn');
    
    if (gameBtn) gameBtn.addEventListener('click', openGameModal);
    if (questionBtn) questionBtn.addEventListener('click', showQuestionPicker);
    if (drawBtn) drawBtn.addEventListener('click', () => showModal('drawing'));

    // Play button & menu setup
    const playBtn = document.getElementById('playBtn');
    const playMenu = document.getElementById('playMenu');
    const menuDrawBtn = document.getElementById('menuDrawBtn');
    const menuTdBtn = document.getElementById('menuTdBtn');
    const menuTttBtn = document.getElementById('menuTttBtn');

    if (playBtn && playMenu) {
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            playMenu.classList.toggle('hidden');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!playMenu.classList.contains('hidden') && !playBtn.contains(e.target) && !playMenu.contains(e.target)) {
                playMenu.classList.add('hidden');
            }
        });

        if (menuDrawBtn) {
            menuDrawBtn.addEventListener('click', () => {
                playMenu.classList.add('hidden');
                showModal('drawing');
            });
        }

        if (menuTdBtn) {
            menuTdBtn.addEventListener('click', () => {
                playMenu.classList.add('hidden');
                showModal('game');
                showTruthDarePanel();
            });
        }

        if (menuTttBtn) {
            menuTttBtn.addEventListener('click', () => {
                playMenu.classList.add('hidden');
                showModal('game');
                handleSelectTtt();
            });
        }
    }

    // Truth or Dare
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const sendGameBtn = document.getElementById('send-game-btn');
    if (truthBtn) truthBtn.addEventListener('click', getTruth);
    if (dareBtn) dareBtn.addEventListener('click', getDare);
    if (sendGameBtn) sendGameBtn.addEventListener('click', sendGameResult);

    // Chat Games Hub selectors
    const selectTdBtn = document.getElementById('select-td-btn');
    const selectTttBtn = document.getElementById('select-ttt-btn');
    const backToGamesTd = document.getElementById('back-to-games-td');
    const backToGamesTtt = document.getElementById('back-to-games-ttt');
    const resetTttBtn = document.getElementById('reset-ttt-btn');

    if (selectTdBtn) selectTdBtn.addEventListener('click', showTruthDarePanel);
    if (selectTttBtn) selectTttBtn.addEventListener('click', handleSelectTtt);
    if (backToGamesTd) backToGamesTd.addEventListener('click', showGameSelectionScreen);
    if (backToGamesTtt) backToGamesTtt.addEventListener('click', showGameSelectionScreen);
    if (resetTttBtn) resetTttBtn.addEventListener('click', resetTttGame);

    // Would You Rather selection triggers
    const selectPollBtn = document.getElementById('select-poll-btn');
    const optABtn = document.getElementById('poll-opt-a');
    const optBBtn = document.getElementById('poll-opt-b');
    const nextPollBtn = document.getElementById('next-poll-btn');
    const backToGamesPoll = document.getElementById('back-to-games-poll');

    if (selectPollBtn) selectPollBtn.addEventListener('click', startPollGame);
    if (optABtn) optABtn.addEventListener('click', () => submitPollVote('A'));
    if (optBBtn) optBBtn.addEventListener('click', () => submitPollVote('B'));
    if (nextPollBtn) nextPollBtn.addEventListener('click', startPollGame);
    if (backToGamesPoll) backToGamesPoll.addEventListener('click', showGameSelectionScreen);

    // Tic-Tac-Toe board cells
    document.querySelectorAll('.ttt-cell').forEach(cell => {
        cell.addEventListener('click', () => {
            const index = parseInt(cell.dataset.index);
            makeTttMove(index);
        });
    });

    // Report options
    document.querySelectorAll('.report-option').forEach(btn => {
        btn.addEventListener('click', () => submitReport(btn.dataset.reason));
    });

    // Settings
    const soundToggle = document.getElementById('sound-toggle');
    const enterSend = document.getElementById('enter-send');
    const fontSizeSlider = document.getElementById('font-size');
    
    if (soundToggle) soundToggle.addEventListener('change', () => { state.settings.soundEnabled = soundToggle.checked; });
    if (enterSend) enterSend.addEventListener('change', () => { state.settings.enterToSend = enterSend.checked; });
    if (fontSizeSlider) fontSizeSlider.addEventListener('input', () => {
        state.settings.fontSize = parseInt(fontSizeSlider.value);
        document.documentElement.style.setProperty('--font-size-base', fontSizeSlider.value + 'px');
    });

    // Notifications
    const notifToggle = document.getElementById('notif-toggle');
    if (notifToggle) {
        notifToggle.addEventListener('change', async () => {
            if (notifToggle.checked && Notification.permission !== 'granted') {
                const perm = await Notification.requestPermission();
                if (perm !== 'granted') {
                    notifToggle.checked = false;
                    showToast('Notifications blocked by browser');
                }
            }
        });
    }

    // Close modals on backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });

    // Close pickers on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            const picker = document.getElementById('emojiPicker');
            if (picker) picker.classList.add('hidden');
            document.getElementById('emojiBtn')?.classList.remove('active');
        }
    });

    // iOS keyboard fix
    if (input) {
        input.addEventListener('focus', () => {
            setTimeout(() => scrollToBottom(), 300);
        });
    }

    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
        if (state.isConnected) disconnectChat();
        if (state.userId) leaveQueue();
        if (state.isFriendHost && state.friendRoomId) {
            db.ref(`friendRooms/${state.friendRoomId}`).remove().catch(() => {});
        }
    });

    // --- Initialize Features ---
    initEmojiPicker();
    initDrawingCanvas();
    initVoiceRecorder();
    setChatControlsEnabled(false);

    // Reconnect & Presence Initialization
    initUserIdentity();
    initUserPresence();
    initAuthSystem();
    renderRecentConnections();
    listenForReconnectRequests();

    // Cancel reconnect button handler
    const cancelReconnectBtn = document.getElementById('cancel-reconnect-btn');
    if (cancelReconnectBtn) {
        cancelReconnectBtn.addEventListener('click', () => {
            const partnerId = state.pendingReconnectPartnerId;
            if (partnerId) cancelReconnectRequest(partnerId);
        });
    }

    // Call system initialization
    initCallSystem();
    initCallFilters();

    console.log('✅ Omega Connect v2.0 initialized');
});


// ============================================
// 8.5. FIREBASE AUTH INTEGRATION
// ============================================

const authState = {
    mode: 'login',
    isLoggedIn: false
};

function initAuthSystem() {
    if (!firebase.auth) {
        console.warn("Firebase Auth compat library not loaded.");
        return;
    }
    
    firebase.auth().onAuthStateChanged(async (user) => {
        const authBtnText = document.getElementById('auth-btn-text');
        const authBtnIcon = document.getElementById('auth-btn-icon');

        if (user) {
            authState.isLoggedIn = true;
            
            try {
                const profileSnap = await db.ref(`users/${user.uid}/profile`).once('value');
                let profile = profileSnap.val();
                
                if (profile) {
                    state.userId = user.uid;
                    state.username = profile.username || state.username || generateUsername();
                    state.avatar = profile.avatar || state.avatar || selectAvatar('any');
                } else {
                    profile = {
                        username: state.username || generateUsername(),
                        avatar: state.avatar || selectAvatar('any'),
                        email: user.email,
                        createdAt: firebase.database.ServerValue.TIMESTAMP
                    };
                    await db.ref(`users/${user.uid}/profile`).set(profile);
                    state.userId = user.uid;
                    state.username = profile.username;
                    state.avatar = profile.avatar;
                }
                
                localStorage.setItem('omega_user_id', state.userId);
                localStorage.setItem('omega_username', state.username);
                localStorage.setItem('omega_avatar', state.avatar);
                
                if (authBtnText) authBtnText.textContent = state.username;
                if (authBtnIcon) authBtnIcon.innerHTML = '<i class="ti ti-circle-check" style="font-size: 18px;"></i>';
            } catch (err) {
                console.error("Error syncing profile:", err);
            }
            
            initUserPresence();
        } else {
            authState.isLoggedIn = false;
            if (authBtnText) authBtnText.textContent = 'Sign In';
            if (authBtnIcon) authBtnIcon.innerHTML = '<i class="ti ti-user" style="font-size: 18px;"></i>';
            
            let savedUserId = localStorage.getItem('omega_user_id');
            if (!savedUserId || savedUserId.length > 20) {
                localStorage.removeItem('omega_user_id');
                localStorage.removeItem('omega_username');
                localStorage.removeItem('omega_avatar');
                initUserIdentity();
                initUserPresence();
            }
        }
    });
}

function switchAuthTab(mode) {
    authState.mode = mode;
    const tabLogin = document.getElementById('tab-login');
    const tabSignup = document.getElementById('tab-signup');
    const usernameGroup = document.getElementById('auth-username-group');
    const submitBtn = document.getElementById('auth-submit-btn');
    const title = document.getElementById('auth-title');

    if (mode === 'signup') {
        tabLogin?.classList.remove('active');
        tabSignup?.classList.add('active');
        usernameGroup?.classList.remove('hidden');
        if (title) title.textContent = 'Create Account';
        if (submitBtn) submitBtn.querySelector('span').textContent = 'Sign Up';
        
        const usernameInput = document.getElementById('auth-username');
        if (usernameInput && !usernameInput.value) {
            usernameInput.value = state.username || '';
        }
    } else {
        tabLogin?.classList.add('active');
        tabSignup?.classList.remove('active');
        usernameGroup?.classList.add('hidden');
        if (title) title.textContent = 'Sign In to Omega';
        if (submitBtn) submitBtn.querySelector('span').textContent = 'Log In';
    }
}

async function handleAuthSubmit(event) {
    event.preventDefault();
    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value;
    const username = document.getElementById('auth-username')?.value.trim();
    const submitBtn = document.getElementById('auth-submit-btn');

    if (!email || !password) return;

    if (submitBtn) submitBtn.disabled = true;

    try {
        if (authState.mode === 'signup') {
            if (!username) {
                showToast("Please enter a display name");
                if (submitBtn) submitBtn.disabled = false;
                return;
            }
            
            const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = cred.user;
            
            const profile = {
                username: username,
                avatar: state.avatar || selectAvatar('any'),
                email: email,
                createdAt: firebase.database.ServerValue.TIMESTAMP
            };
            await db.ref(`users/${user.uid}/profile`).set(profile);
            
            showToast("Account created successfully!");
            closeModal('auth-modal');
        } else {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            showToast("Signed in successfully!");
            closeModal('auth-modal');
        }
    } catch (error) {
        console.error("Auth submit error:", error);
        showToast(error.message || "Authentication failed");
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
}

async function handleSignOut() {
    try {
        if (state.userId) {
            await db.ref(`users/${state.userId}/status`).remove().catch(() => {});
        }
        
        await firebase.auth().signOut();
        
        localStorage.removeItem('omega_user_id');
        localStorage.removeItem('omega_username');
        localStorage.removeItem('omega_avatar');
        
        initUserIdentity();
        initUserPresence();
        
        showToast("Signed out successfully!");
        closeModal('auth-modal');
    } catch (error) {
        console.error("Sign out error:", error);
        showToast("Failed to sign out");
    }
}

function openAuthModal() {
    const isLogged = authState.isLoggedIn;
    const form = document.getElementById('auth-form');
    const profile = document.getElementById('profile-details');
    const tabs = document.querySelector('.auth-tabs');
    const sub = document.getElementById('auth-subtitle');
    const title = document.getElementById('auth-title');

    if (isLogged) {
        if (title) title.textContent = 'My Profile';
        if (sub) sub.style.display = 'none';
        if (tabs) tabs.style.display = 'none';
        if (form) form.style.display = 'none';
        if (profile) {
            profile.classList.remove('hidden');
            const user = firebase.auth().currentUser;
            const emailDisp = document.getElementById('profile-email-display');
            const userDisp = document.getElementById('profile-username-display');
            const avatarDisp = document.getElementById('profile-avatar-display');

            if (user && emailDisp) emailDisp.textContent = user.email;
            if (userDisp) userDisp.textContent = state.username;
            if (avatarDisp) {
                if (state.avatar) {
                    avatarDisp.innerHTML = `<img src="${state.avatar}" alt="${escapeHtml(state.username)}" class="avatar-img">`;
                    avatarDisp.classList.add('has-img');
                } else {
                    avatarDisp.textContent = (state.username || '?')[0].toUpperCase();
                    avatarDisp.classList.remove('has-img');
                }
            }
        }
    } else {
        if (title) title.textContent = 'Sign In to Omega';
        if (sub) sub.style.display = '';
        if (tabs) tabs.style.display = '';
        if (form) form.style.display = '';
        if (profile) profile.classList.add('hidden');
        switchAuthTab('login');
        
        const emailInput = document.getElementById('auth-email');
        const passwordInput = document.getElementById('auth-password');
        const usernameInput = document.getElementById('auth-username');
        if (emailInput) emailInput.value = '';
        if (passwordInput) passwordInput.value = '';
        if (usernameInput) usernameInput.value = '';
    }
    showModal('auth-modal');
}

// ============================================
// 9. GLOBAL EXPORTS
// ============================================

window.openAuthModal = openAuthModal;
window.switchAuthTab = switchAuthTab;
window.handleAuthSubmit = handleAuthSubmit;
window.handleSignOut = handleSignOut;
window.showModal = showModal;
window.closeModal = closeModal;
window.findNewChat = findNewChat;
window.goHome = goHome;
window.blockUser = blockUser;
window.confirmLeaveChat = confirmLeaveChat;
window.saveChat = saveChat;
window.cancelSearch = cancelSearch;
window.handleFeedback = handleFeedback;
window.clearReply = clearReply;
window.requestReconnect = requestReconnect;
