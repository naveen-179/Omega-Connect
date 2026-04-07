/**
 * Omega Connect - Enhanced Anonymous Chat
 * All Features Included
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    USERNAME_PREFIX: 'Stranger_',
    MAX_MESSAGE_LENGTH: 1000,
    TYPING_TIMEOUT: 2000,
    QUEUE_CHECK_INTERVAL: 1500,
    MAX_WAIT_TIME: 300,
    PATHS: {
        QUEUE: 'queue',
        CHATS: 'chats',
        REPORTS: 'reports',
        STATS: 'stats',
        ACTIVE_CHATS: 'activeChats',
        TOPIC_ROOMS: 'topicRooms'
    }
};

// Emoji categories
const EMOJIS = {
    smileys: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍', '🥰', '😘', '😋', '😛', '😜', '🤪', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😢', '😭', '😤', '😠', '🤯', '😱', '🥶', '🤗', '🤔', '🤫', '🤭', '😐', '😑', '😶', '🙄', '😯', '😲', '🤤', '😴', '🤒', '🤕', '🤢', '🤮', '🥴', '😵', '🤠', '🥳', '🥸', '😈', '👿', '💀', '☠️', '👻', '👽', '🤖'],
    gestures: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅', '👄'],
    animals: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊'],
    food: ['🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍿', '🧈', '🧂', '🥫', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🍝', '🍠', '🍢', '🍣', '🍤', '🍥', '🥮', '🍡', '🥟', '🥠', '🥡', '🦀', '🦞', '🦐', '🦑', '🦪', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭', '🍮', '🍯'],
    activities: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️', '🤼', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🏇', '⛷️', '🏊', '🤽', '🚣', '🧗', '🚴', '🚵', '🎮', '🎲', '🧩', '♟️'],
    objects: ['💡', '🔦', '🏮', '📱', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '💽', '💾', '💿', '📀', '🎥', '📷', '📸', '📹', '📼', '🔍', '🔎', '🔬', '🔭', '📡', '💉', '🩸', '💊', '🩹', '🩺', '🚪', '🛏️', '🛋️', '🪑', '🚽', '🚿', '🛁', '🪒', '🧴', '🧷', '🧹', '🧺', '🧻', '🪣', '🧼', '🪥', '🧽', '🧯', '🛒', '🚬', '⚰️', '🪦', '⚱️', '🗿', '🪧', '🏧'],
    symbols: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕', '🛑', '⛔', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', '🏧', '🚾', '♿', '🅿️', '🛗', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '⚧️', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '🟰', '♾️', '💲', '💱', '™️', '©️', '®️', '〰️', '➰', '➿', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '🔺', '🔻', '🔸', '🔹', '🔶', '🔷', '🔳', '🔲', '▪️', '▫️', '◾', '◽', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛', '⬜', '🟫', '🔈', '🔇', '🔉', '🔊', '🔔', '🔕', '📣', '📢', '💬', '💭', '🗯️', '♠️', '♣️', '♥️', '♦️', '🃏', '🎴', '🀄']
};

// Stickers (emoji-based for simplicity)
const STICKERS = ['😎👍', '🎉🥳', '💖😍', '😂🤣', '🔥💯', '👏👏', '🤗💕', '😢💔', '🤔❓', '👀👀', '🙈🙉', '💪😤', '🥺👉👈', '✨🌟', '🎮🕹️', '📚🤓'];

// Icebreaker questions
const ICEBREAKERS = [
    "What's your favorite movie?",
    "Where are you from?",
    "What music do you like?",
    "What do you do for fun?",
    "What's your dream vacation?",
    "Dogs or cats?",
    "What's your favorite food?",
    "Any hobbies?",
    "What's your zodiac sign?",
    "Morning person or night owl?"
];

// Conversation Prompts (for helping users start conversations)
const CONVERSATION_PROMPTS = {
    general: [
        "What's your favorite weekend activity?",
        "What kind of music do you listen to?",
        "Do you prefer movies or TV shows?",
        "What's a hobby you'd like to learn?",
        "Coffee or tea?",
        "What's your go-to comfort food?",
        "Early bird or night owl?",
        "What's the last thing that made you laugh?",
        "Any pets? Tell me about them!",
        "What's your favorite season?"
    ],
    fun: [
        "If you could have any superpower, what would it be?",
        "Pizza or burgers?",
        "Beach vacation or mountain retreat?",
        "Would you rather travel to space or the deep ocean?",
        "If you could meet anyone, dead or alive, who would it be?",
        "What's your most unpopular opinion?",
        "Pineapple on pizza: yes or no?",
        "If you won the lottery, what's the first thing you'd buy?",
        "Would you rather be able to fly or be invisible?",
        "What's the weirdest food you've ever tried?"
    ],
    deep: [
        "What's a goal you're working toward?",
        "What's something you're passionate about?",
        "If you could give advice to your younger self, what would it be?",
        "What's a skill you're proud of?",
        "What's the best decision you've ever made?",
        "What motivates you to get up in the morning?",
        "What's something you've changed your mind about recently?",
        "What does a perfect day look like for you?",
        "What's something most people don't know about you?",
        "What's a book, movie, or song that changed your perspective?"
    ],
    creative: [
        "If you could live in any fictional world, where would it be?",
        "You can only eat one food for the rest of your life. What is it?",
        "If you could rename yourself, what would you choose?",
        "You're stuck on a deserted island. What 3 items do you bring?",
        "If your life had a theme song, what would it be?",
        "What would your superhero name be?",
        "If you could master any instrument instantly, which one?",
        "You can have dinner with any 3 people. Who do you choose?",
        "If you could switch lives with someone for a day, who?",
        "What would you do if you could pause time?"
    ]
};

// Safe words for emergency disconnect
const SAFE_WORDS = ['STOP', 'UNSAFE', 'REPORT', 'HELP'];

// Topic Rooms for themed matching
const TOPIC_ROOMS = {
    gaming: { name: 'Gaming', icon: '🎮', color: '#9333EA', desc: 'Video games, esports, streaming' },
    music: { name: 'Music', icon: '🎵', color: '#EC4899', desc: 'Favorite artists, concerts, genres' },
    movies: { name: 'Movies & TV', icon: '🎬', color: '#F59E0B', desc: 'Shows, films, recommendations' },
    books: { name: 'Books', icon: '📚', color: '#10B981', desc: 'Reading, literature, authors' },
    sports: { name: 'Sports', icon: '⚽', color: '#3B82F6', desc: 'Teams, matches, fitness' },
    tech: { name: 'Tech', icon: '💻', color: '#6366F1', desc: 'Gadgets, coding, AI, apps' },
    art: { name: 'Art & Design', icon: '🎨', color: '#F43F5E', desc: 'Creative work, photography' },
    travel: { name: 'Travel', icon: '✈️', color: '#14B8A6', desc: 'Places, cultures, adventures' },
    food: { name: 'Food', icon: '🍕', color: '#EF4444', desc: 'Recipes, restaurants, cooking' },
    general: { name: 'General', icon: '🌍', color: '#8B5CF6', desc: 'Random topics, casual chat' },
    philosophy: { name: 'Philosophy', icon: '💡', color: '#A855F7', desc: 'Deep talks, life questions' },
    entertainment: { name: 'Entertainment', icon: '🎭', color: '#FB923C', desc: 'Memes, trends, pop culture' }
};

// Question Queue for conversation icebreakers
const QUESTION_QUEUE = {
    icebreakers: [
        "If you could have dinner with anyone, dead or alive, who would it be?",
        "What's your hidden talent that not many people know about?",
        "If you could live anywhere in the world, where would it be?",
        "What's the best piece of advice you've ever received?",
        "If you could master any skill instantly, what would it be?",
        "What's something you've always wanted to try but haven't yet?",
        "If you could switch lives with someone for a day, who would it be?",
        "What's your favorite way to spend a weekend?",
        "If you won the lottery tomorrow, what's the first thing you'd do?",
        "What's a book/movie that changed your perspective on life?",
        "What's your go-to karaoke song?",
        "If you could relive one day of your life, which would it be?",
        "What's the most spontaneous thing you've ever done?",
        "What's your biggest fear and why?",
        "If you could have any superpower, what would it be?"
    ],
    fun: [
        "Would you rather: fly or be invisible?",
        "Would you rather: read minds or see the future?",
        "Would you rather: never age or never need sleep?",
        "What's your most embarrassing moment?",
        "What's the weirdest food combination you actually enjoy?",
        "If you were a character in a video game, what would be your special ability?",
        "What's your zombie apocalypse survival strategy?",
        "If you could be any animal for a day, what would you be?",
        "What's the strangest dream you've ever had?",
        "If you could create a new holiday, what would it celebrate?",
        "What's your spirit animal and why?",
        "If you were stranded on an island, what 3 things would you bring?",
        "What's your guilty pleasure TV show/movie?",
        "If you could invent anything, what would it be?",
        "What's the funniest thing that's happened to you recently?"
    ],
    deep: [
        "What's something you've changed your mind about recently?",
        "What does success mean to you?",
        "What's your biggest regret, and what did you learn from it?",
        "What motivates you to get out of bed every morning?",
        "If you could give your younger self one piece of advice, what would it be?",
        "What's a belief you have that most people disagree with?",
        "What's the hardest decision you've ever had to make?",
        "What do you think happens after we die?",
        "What's something you're proud of that others might not understand?",
        "What's your definition of happiness?",
        "What's the most important lesson life has taught you?",
        "If you could solve one world problem, which would it be?",
        "What's something you wish people knew about you?",
        "What are you most grateful for right now?",
        "What legacy do you want to leave behind?"
    ],
    thisOrThat: [
        "Coffee or tea?",
        "Beach or mountains?",
        "Books or movies?",
        "Cats or dogs?",
        "Summer or winter?",
        "Sweet or savory?",
        "Morning person or night owl?",
        "Text or call?",
        "Pizza or burgers?",
        "Marvel or DC?",
        "Spotify or Apple Music?",
        "Android or iPhone?",
        "Netflix or YouTube?",
        "City life or countryside?",
        "Pasta or rice?"
    ]
};


// Game data
const GAMES = {
    truth: [
        "What's your most embarrassing moment?",
        "What's your biggest fear?",
        "What's a secret you've never told anyone?",
        "What's your guilty pleasure?",
        "What's the craziest thing you've ever done?"
    ],
    wouldyou: [
        "Would you rather be invisible or fly?",
        "Would you rather be rich or famous?",
        "Would you rather live in the past or future?",
        "Would you rather have no internet or no phone?",
        "Would you rather be a genius or extremely lucky?"
    ],
    trivia: [
        { q: "What planet is known as the Red Planet?", a: "Mars" },
        { q: "What is the capital of France?", a: "Paris" },
        { q: "How many continents are there?", a: "7" },
        { q: "What year did the Titanic sink?", a: "1912" }
    ],
    emoji: [
        { emoji: "🎬🦁👑", answer: "The Lion King" },
        { emoji: "🕷️🦸‍♂️", answer: "Spider-Man" },
        { emoji: "❄️👸", answer: "Frozen" },
        { emoji: "🧙‍♂️💍", answer: "Lord of the Rings" }
    ],
    truth: [
        "What's your biggest fear?",
        "What's the most embarrassing thing you've done?",
        "Who was your first crush?",
        "What's a secret you've never told anyone?",
        "What's the worst lie you've ever told?",
        "What's your guilty pleasure?",
        "Have you ever cheated on a test?",
        "What's the craziest thing on your bucket list?",
        "What's your most toxic trait?",
        "What would you do if you won the lottery?",
        "What's your biggest regret?",
        "Who do you secretly envy?",
        "What's the strangest dream you've had?",
        "What's your most unpopular opinion?",
        "What's something you pretend to hate but actually love?"
    ],
    dare: [
        "Send a weird selfie right now!",
        "Type with your eyes closed for the next 3 messages",
        "Use only emojis for the next 2 minutes",
        "Compliment the stranger in the most dramatic way",
        "Share your most recent search history item",
        "Send a voice message singing your favorite song",
        "Change your avatar to something embarrassing",
        "Tell a joke (even if it's bad!)",
        "Describe yourself using only food items",
        "Send a message using only one letter per word",
        "Pretend to be a robot for the next 5 messages",
        "Share your lock screen wallpaper",
        "Type a message using your nose",
        "Send your most used emoji 20 times",
        "Create a haiku about the stranger"
    ]
};

// Avatars
const AVATARS = ['👤', '👨', '👩', '🧑', '👦', '👧', '👴', '👵', '🧔', '👱', '👸', '🤴', '🧙', '🧛', '🧟', '🦸', '🧜', '🧚', '🎅', '🤖', '👽', '👻', '🐱', '🐶', '🦊', '🐼', '🐨', '🦁', '🐯', '🐸'];

// Bad words filter - comprehensive list
const BAD_WORDS = [
    // Profanity
    'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'dick', 'pussy', 'cunt', 'whore', 'slut',
    'damn', 'hell', 'piss', 'cock', 'fag', 'faggot',

    // Racial slurs
    'nigger', 'nigga', 'chink', 'gook', 'wetback', 'beaner', 'spic', 'kike',

    // Homophobic/transphobic
    'tranny', 'shemale', 'dyke',

    // Ableist slurs
    'retard', 'retarded', 'spaz', 'psycho',

    // Sexual harassment
    'nudes', 'dick pic', 'send pics', 'show boobs', 'sexy pics', 'onlyfans',

    // Threats & harassment
    'kill yourself', 'kys', 'die', 'gonna hurt', 'find you', 'track you', 'rape', 'murder',

    // Drug references (optional, context-dependent)
    'meth', 'heroin', 'cocaine'
];

// ============================================
// STATE
// ============================================

const state = {
    userId: null,
    username: null,
    partnerId: null,
    partnerName: null,
    partnerAvatar: null,
    chatId: null,
    isConnected: false,
    waitTimer: null,
    waitSeconds: 0,
    blockedUsers: new Set(),
    isSearching: false,
    searchInterval: null,
    interests: [],
    gender: null,
    genderPref: null,
    country: null,
    countryPref: null,
    partnerInterests: [],
    commonInterests: [],
    messageCount: 0,
    chatStartTime: null,
    chatDurationInterval: null,
    chatHistory: [],
    inactivityTimer: null, // NEW: Auto-disconnect timer
    strikes: 0, // Content moderation strikes
    currentTopic: null, // Selected topic room (null for random chat)
    replyingTo: {
        messageId: null,
        text: null,
        senderId: null,
        senderName: null
    },
    settings: {
        soundEnabled: true,
        notificationsEnabled: false,
        enterToSend: true,
        chatBackground: 'default',
        fontSize: 16,
        soundType: 'pop'
    },
    theme: 'dark',
    achievements: [],
    favorites: [] // Favorite chat partners
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function generateUsername() {
    const adjectives = [
        'Cosmic', 'Shadow', 'Neon', 'Crystal', 'Mystic', 'Arctic', 'Solar', 'Lunar',
        'Thunder', 'Storm', 'Velvet', 'Silent', 'Golden', 'Silver', 'Iron', 'Wild',
        'Frozen', 'Blazing', 'Dark', 'Bright', 'Swift', 'Clever', 'Brave', 'Noble',
        'Crimson', 'Azure', 'Ember', 'Pixel', 'Cyber', 'Quantum', 'Astral', 'Primal',
        'Phantom', 'Rogue', 'Stealth', 'Turbo', 'Hyper', 'Ultra', 'Mega', 'Epic',
        'Savage', 'Fierce', 'Chill', 'Zen', 'Lucky', 'Rusty', 'Dusty', 'Misty',
        'Foggy', 'Cloudy', 'Starry', 'Midnight', 'Twilight', 'Dawn', 'Dusk', 'Frosty',
        'Molten', 'Electric', 'Magnetic', 'Sonic', 'Atomic', 'Rebel', 'Stray', 'Lone',
        'Rising', 'Falling', 'Drifting', 'Floating', 'Burning', 'Glowing', 'Shining',
        'Hidden', 'Secret', 'Ancient', 'Eternal', 'Infinite', 'Random', 'Chaotic',
        'Mellow', 'Vivid', 'Bold', 'Calm', 'Rapid', 'Gentle', 'Hollow', 'Deep',
        'Cozy', 'Hazy', 'Snowy', 'Rainy', 'Windy', 'Sandy', 'Rocky', 'Icy'
    ];
    const nouns = [
        'Wolf', 'Phoenix', 'Drift', 'Storm', 'Blaze', 'Frost', 'Dream', 'Echo',
        'Spark', 'Ember', 'Ghost', 'Rider', 'Sage', 'Hawk', 'Raven', 'Viper',
        'Tiger', 'Panda', 'Fox', 'Lynx', 'Falcon', 'Eagle', 'Cobra', 'Shark',
        'Knight', 'Nomad', 'Voyager', 'Pioneer', 'Ranger', 'Scout', 'Drifter',
        'Wanderer', 'Seeker', 'Cipher', 'Oracle', 'Spectre', 'Striker', 'Maverick',
        'Ninja', 'Pirate', 'Legend', 'Myth', 'Shadow', 'Spirit', 'Soul', 'Pulse',
        'Wave', 'Flame', 'Comet', 'Meteor', 'Nova', 'Nebula', 'Orbit', 'Vertex',
        'Prism', 'Aurora', 'Horizon', 'Summit', 'Canyon', 'River', 'Ocean', 'Tide',
        'Thunder', 'Lightning', 'Tornado', 'Cyclone', 'Monsoon', 'Avalanche',
        'Cascade', 'Inferno', 'Glacier', 'Volcano', 'Tempest', 'Zodiac', 'Enigma',
        'Riddle', 'Puzzle', 'Maze', 'Quest', 'Journey', 'Trail', 'Path', 'Byte',
        'Pixel', 'Glitch', 'Code', 'Signal', 'Beacon', 'Anchor', 'Shield', 'Arrow',
        'Blade', 'Crown', 'Stone', 'Cloud', 'Star', 'Moon', 'Sun', 'Sky'
    ];
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return adj + ' ' + noun;
}

function generateChatId(userId1, userId2) {
    return [userId1, userId2].sort().join('__');
}

// Bad Words Filter Function
function filterBadWords(text) {
    let filtered = text;
    BAD_WORDS.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filtered = filtered.replace(regex, match => '*'.repeat(match.length));
    });
    return filtered;
}

function getRandomAvatar() {
    return AVATARS[Math.floor(Math.random() * AVATARS.length)];
}

function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function containsBadWords(text) {
    const lower = text.toLowerCase();
    return BAD_WORDS.some(word => new RegExp(`\\b${word}\\b`, 'i').test(lower));
}

// Duplicate filterBadWords removed (defined above at line 357)

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'warning') {
    const toast = document.getElementById('warning-toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => toast.classList.remove('show'), 3000);
}

// ============================================
// CONVERSATION PROMPTS
// ============================================

function getRandomPrompts(count = 3) {
    const allCategories = Object.keys(CONVERSATION_PROMPTS);
    const prompts = [];

    // Get random prompts from different categories
    for (let i = 0; i < count; i++) {
        const category = allCategories[Math.floor(Math.random() * allCategories.length)];
        const categoryPrompts = CONVERSATION_PROMPTS[category];
        const prompt = categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];

        // Avoid duplicates
        if (!prompts.includes(prompt)) {
            prompts.push(prompt);
        } else {
            i--; // Try again
        }
    }

    return prompts;
}

function showConversationPrompts() {
    const container = document.getElementById('conversation-prompts');
    if (!container) return;

    const prompts = getRandomPrompts(3);

    container.innerHTML = `
        <div class="prompts-header">
            <span class="prompts-title">💬 Conversation Starters</span>
            <button class="refresh-prompts-btn" onclick="refreshPrompts()" title="Get new prompts">🔄</button>
        </div>
        <div class="prompts-list">
            ${prompts.map(prompt => `
                <div class="prompt-item" onclick="usePrompt('${escapeHtml(prompt).replace(/'/g, "\\'")}')">
                    ${escapeHtml(prompt)}
                </div>
            `).join('')}
        </div>
    `;

    container.style.display = 'block';
}

function refreshPrompts() {
    showConversationPrompts();
}

function usePrompt(promptText) {
    const input = document.getElementById('message-input');
    if (input) {
        input.value = promptText;
        input.focus();
    }
}

// ============================================
// SAFE WORD & MODERATION SYSTEM
// ============================================

function checkSafeWord(text) {
    const upperText = text.toUpperCase().trim();
    return SAFE_WORDS.some(word => upperText === word || upperText.includes(word));
}

async function handleSafeWord() {
    // Immediately disconnect
    showToast('Disconnecting safely...', 'info');

    // Auto-report with safe word reason
    if (state.partnerId) {
        await db.ref(CONFIG.PATHS.REPORTS).push({
            reporterId: state.userId,
            reportedId: state.partnerId,
            reason: 'Safe word used - User felt unsafe',
            chatId: state.chatId,
            timestamp: Date.now()
        });
    }

    await disconnectChat();
    showModal('safe-disconnect');
}

function showWarningBanner(strikeLevel) {
    const banner = document.getElementById('warning-banner');
    if (!banner) return;

    let message, className;

    switch (strikeLevel) {
        case 1:
            message = '⚠️ Please keep the conversation respectful';
            className = 'warning';
            break;
        case 2:
            message = '⚠️ Final warning: Inappropriate language detected';
            className = 'danger';
            break;
        case 3:
            message = '❌ Chat ended due to repeated violations';
            className = 'critical';
            break;
        default:
            return;
    }

    banner.textContent = message;
    banner.className = `warning-banner ${className}`;
    banner.style.display = 'block';

    // Auto-hide after 5 seconds (except for strike 3)
    if (strikeLevel < 3) {
        setTimeout(() => {
            banner.style.display = 'none';
        }, 5000);
    }
}

// Enhanced bad words detection with pattern matching
function enhancedContainsBadWords(text) {
    const lower = text.toLowerCase();

    // Check exact matches
    for (const word of BAD_WORDS) {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(lower)) {
            return true;
        }
    }

    // Check for common variations (l33t speak, character substitution)
    const patterns = [
        /f[\*@#$%&]ck/i,
        /sh[\*@#$%&]t/i,
        /b[\*@#$%&]tch/i,
        /n[\*@#$%&]gg[ae]r/i,
        /k[\s\.]?y[\s\.]?s/i, // kill yourself
    ];

    return patterns.some(pattern => pattern.test(text));
}

// ============================================
// READ RECEIPTS
// ============================================

let readObserver = null; // Intersection Observer for read tracking
const pendingReadMarks = new Map(); // Track messages waiting to be marked as read

async function markAsDelivered(messageId, messageKey) {
    if (!state.chatId || !messageKey) return;

    try {
        await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages/${messageKey}/status`).update({
            delivered: true,
            deliveredAt: firebase.database.ServerValue.TIMESTAMP
        });
    } catch (e) {
        console.error('Error marking as delivered:', e);
    }
}

async function markAsRead(messageId, messageKey) {
    if (!state.chatId || !messageKey) return;

    // Prevent duplicate read marks
    if (pendingReadMarks.has(messageId)) return;
    pendingReadMarks.set(messageId, true);

    try {
        const statusRef = db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages/${messageKey}/status`);
        const snapshot = await statusRef.once('value');
        const currentStatus = snapshot.val();

        // Only mark as read if not already read
        if (currentStatus && !currentStatus.read) {
            await statusRef.update({
                read: true,
                readAt: firebase.database.ServerValue.TIMESTAMP
            });
        }
    } catch (e) {
        console.error('Error marking as read:', e);
    }
}

function updateTickDisplay(messageElement, status) {
    if (!messageElement || !status) return;

    const tickContainer = messageElement.querySelector('.message-ticks');
    if (!tickContainer) return;

    const ticks = tickContainer.querySelectorAll('.tick');

    if (status.sent) {
        ticks[0].classList.remove('hidden'); // First tick visible
    }

    if (status.delivered) {
        ticks[1].classList.remove('hidden'); // Second tick visible
        ticks[2].classList.remove('hidden');
    }

    if (status.read) {
        ticks[1].classList.add('read'); // Turn blue
        ticks[2].classList.add('read');
    }
}

function setupReadObserver() {
    // Clean up existing observer
    if (readObserver) {
        readObserver.disconnect();
    }

    // Create new observer with 50% threshold
    readObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                const messageElement = entry.target;
                const messageId = messageElement.dataset.messageId;
                const messageKey = messageElement.dataset.messageKey;
                const senderId = messageElement.dataset.senderId;

                // Only mark as read if this is a received message (not sent by us)
                if (senderId && senderId !== state.userId && messageId && messageKey) {
                    // Wait 1 second before marking as read (to avoid false reads while scrolling)
                    setTimeout(() => {
                        // Check if still in viewport
                        if (entry.isIntersecting) {
                            markAsRead(messageId, messageKey);
                        }
                    }, 1000);
                }
            }
        });
    }, {
        threshold: 0.5, // 50% of message must be visible
        rootMargin: '0px'
    });
}

function observeMessageForRead(messageElement) {
    if (readObserver && messageElement) {
        readObserver.observe(messageElement);
    }
}

// ============================================
// TOPIC ROOMS
// ============================================

function showTopicRooms() {
    const grid = document.getElementById('topic-rooms-grid');
    if (!grid) return;

    grid.innerHTML = '';

    // Create cards for each topic room
    Object.entries(TOPIC_ROOMS).forEach(([roomId, room]) => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.style.setProperty('--topic-color', room.color);
        card.onclick = () => joinTopicRoom(roomId);

        card.innerHTML = `
            <div class="topic-icon">${room.icon}</div>
            <div class="topic-name">${room.name}</div>
            <div class="topic-desc">${room.desc}</div>
            <div class="topic-count">
                <span>👤 <span id="count-${roomId}">0</span> online</span>
            </div>
        `;

        grid.appendChild(card);
    });

    // Start listening for user counts
    loadRoomUserCounts();

    showPage('topic-rooms-page');
}

function loadRoomUserCounts() {
    Object.keys(TOPIC_ROOMS).forEach(roomId => {
        const queueRef = db.ref(`${CONFIG.PATHS.TOPIC_ROOMS}/${roomId}/queue`);
        queueRef.on('value', snapshot => {
            const count = snapshot.numChildren();
            const countEl = document.getElementById(`count-${roomId}`);
            if (countEl) countEl.textContent = count;
        });
    });
}

async function joinTopicRoom(roomId) {
    if (!TOPIC_ROOMS[roomId]) return;

    state.currentTopic = roomId;
    const room = TOPIC_ROOMS[roomId];

    // Show waiting screen with topic context
    showPage('waiting-page');
    document.getElementById('matching-status').textContent = `Finding someone in ${room.name} room...`;

    // Add self to topic queue
    const queueRef = db.ref(`${CONFIG.PATHS.TOPIC_ROOMS}/${roomId}/queue/${state.userId}`);
    await queueRef.set({
        userId: state.userId,
        username: state.username,
        avatar: state.avatar,
        timestamp: Date.now(),
        gender: state.gender,
        country: state.country
    });

    // Set up onDisconnect to remove from queue
    queueRef.onDisconnect().remove();

    // Start searching for match
    searchForTopicMatch(roomId);
}

async function searchForTopicMatch(roomId) {
    const queueRef = db.ref(`${CONFIG.PATHS.TOPIC_ROOMS}/${roomId}/queue`);

    state.searchInterval = setInterval(async () => {
        const snapshot = await queueRef.once('value');
        const queue = snapshot.val();

        if (!queue) return;

        const users = Object.values(queue).filter(u =>
            u.userId !== state.userId &&
            !state.blockedUsers.has(u.userId)
        );

        if (users.length > 0) {
            // Found a match!
            clearInterval(state.searchInterval);
            const partner = users[0];
            await createTopicMatch(roomId, partner);
        }
    }, CONFIG.QUEUE_CHECK_INTERVAL);
}

async function createTopicMatch(roomId, partner) {
    const chatId = [state.userId, partner.userId].sort().join('_');
    state.chatId = chatId;
    state.partnerId = partner.userId;
    state.partnerName = partner.username;
    state.partnerAvatar = partner.avatar;

    // Create chat with topic info
    await db.ref(`${CONFIG.PATHS.CHATS}/${chatId}`).set({
        topicRoom: roomId,
        user1: {
            id: state.userId,
            name: state.username,
            avatar: state.avatar,
            connected: true
        },
        user2: {
            id: partner.userId,
            name: partner.username,
            avatar: partner.avatar,
            connected: true
        },
        createdAt: firebase.database.ServerValue.TIMESTAMP
    });

    // Remove both from queue
    await db.ref(`${CONFIG.PATHS.TOPIC_ROOMS}/${roomId}/queue/${state.userId}`).remove();
    await db.ref(`${CONFIG.PATHS.TOPIC_ROOMS}/${roomId}/queue/${partner.userId}`).remove();

    // Record in active chats
    await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${chatId}`).set({
        userA: state.userId,
        userB: partner.userId,
        topicRoom: roomId,
        startedAt: firebase.database.ServerValue.TIMESTAMP,
        lastActive: firebase.database.ServerValue.TIMESTAMP
    });

    startChat();
}

async function leaveTopicQueue() {
    if (state.currentTopic && state.userId) {
        await db.ref(`${CONFIG.PATHS.TOPIC_ROOMS}/${state.currentTopic}/queue/${state.userId}`).remove();
    }
}

function startRandomChat() {
    state.currentTopic = null;
    startSearch(); // Start random search directly
}


// ============================================
// QUESTION QUEUE
// ============================================

function getRandomQuestion(category = null) {
    let allQuestions = [];

    if (category && QUESTION_QUEUE[category]) {
        allQuestions = QUESTION_QUEUE[category];
    } else {
        // Get random question from all categories
        Object.values(QUESTION_QUEUE).forEach(questions => {
            allQuestions = allQuestions.concat(questions);
        });
    }

    return allQuestions[Math.floor(Math.random() * allQuestions.length)];
}

function showQuestionPicker() {
    const input = document.getElementById('message-input');
    const question = getRandomQuestion();

    // Insert question into input
    input.value = question;
    input.focus();

    // Enable send button (programmatic .value changes don't trigger input events)
    const sendBtn = document.getElementById('send-btn');
    if (sendBtn) sendBtn.disabled = false;

    // Trigger input event so textarea auto-resizes and char count updates
    input.dispatchEvent(new Event('input', { bubbles: true }));

    // Show a subtle toast
    showToast('Question added! Edit or send as is 💭', 'info');
}

// ============================================
// CHAT RATINGS
// ============================================

let ratingState = {
    stars: 0,
    tags: [],
    feedback: ''
};

function initRatingModal() {
    const stars = document.querySelectorAll('.star');
    const tagBtns = document.querySelectorAll('.tag-btn');

    // Star rating click handlers
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.rating);
            ratingState.stars = rating;

            // Visual feedback
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.style.opacity = '1';
                    s.style.transform = 'scale(1.2)';
                } else {
                    s.style.opacity = '0.3';
                    s.style.transform = 'scale(1)';
                }
            });
        });
    });

    // Tag toggle handlers
    tagBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tag = btn.dataset.tag;
            const index = ratingState.tags.indexOf(tag);

            if (index > -1) {
                ratingState.tags.splice(index, 1);
                btn.classList.remove('active');
            } else {
                ratingState.tags.push(tag);
                btn.classList.add('active');
            }
        });
    });
}

function showRatingModal() {
    // Reset state
    ratingState = { stars: 0, tags: [], feedback: '' };

    // Reset UI
    document.querySelectorAll('.star').forEach(s => {
        s.style.opacity = '0.3';
        s.style.transform = 'scale(1)';
    });
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('rating-feedback').value = '';

    showModal('rating');
}

async function submitRating() {
    if (!state.chatId || !state.partnerId) {
        closeModal('rating-modal');
        return;
    }

    // Get feedback text
    ratingState.feedback = document.getElementById('rating-feedback').value.trim();

    // Require at least star rating
    if (ratingState.stars === 0) {
        showToast('Please select a star rating', 'warning');
        return;
    }

    try {
        // Save rating to Firebase
        await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/ratings/${state.userId}`).set({
            stars: ratingState.stars,
            tags: ratingState.tags,
            feedback: ratingState.feedback,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });

        // Auto-report if rating is very low
        if (ratingState.stars <= 2) {
            await db.ref(CONFIG.PATHS.REPORTS).push({
                reporterId: state.userId,
                reportedId: state.partnerId,
                reason: 'Low rating (auto-reported)',
                chatId: state.chatId,
                rating: ratingState.stars,
                timestamp: Date.now()
            });
        }

        showToast('Thanks for your feedback! 💫', 'success');
        closeModal('rating-modal');

        // Return to home after rating
        setTimeout(() => {
            showPage('landing-page');
        }, 1000);

    } catch (error) {
        console.error('Error submitting rating:', error);
        showToast('Failed to submit rating', 'error');
    }
}

function skipRating() {
    closeModal('rating-modal');
    showPage('landing-page');
}

// ============================================
// FOOTER HELPERS
// ============================================

function revealEmail(btn) {
    const container = document.createElement('div');
    container.className = 'contact-email-container';
    container.innerHTML = `
        <p class="contact-email">
            📧 <a href="mailto:connectxomega@gmail.com">connectxomega@gmail.com</a>
        </p>
    `;
    btn.replaceWith(container);
}

function showUpiDetails() {
    const details = document.getElementById('upi-details');
    if (details) {
        details.style.display = details.style.display === 'none' ? 'block' : 'none';
    }
}

function copyUpiId() {
    const upiId = document.getElementById('upi-id-text')?.textContent;
    if (upiId) {
        navigator.clipboard.writeText(upiId).then(() => {
            showToast('UPI ID copied! 📋', 'success');
        }).catch(() => {
            // Fallback
            const temp = document.createElement('input');
            temp.value = upiId;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            showToast('UPI ID copied! 📋', 'success');
        });
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 86400000) { // Less than 24 hours
        return 'Today';
    } else if (diff < 172800000) { // Less than 48 hours
        return 'Yesterday';
    } else {
        return date.toLocaleDateString();
    }
}



function showModal(modalId) {
    const fullId = modalId + '-modal';
    console.log('showModal called with:', modalId, '-> Looking for:', fullId);
    const modal = document.getElementById(fullId);
    console.log('Modal element found:', modal);
    if (modal) {
        modal.classList.add('active');
        console.log('Modal activated. Classes:', modal.className);
    } else {
        console.error('Modal not found:', fullId);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('active');
}

// Custom themed confirmation dialog
function customConfirm(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirm-modal');
        const titleEl = document.getElementById('confirm-title');
        const messageEl = document.getElementById('confirm-message');
        const okBtn = document.getElementById('confirm-ok');
        const cancelBtn = document.getElementById('confirm-cancel');

        titleEl.textContent = title;
        messageEl.textContent = message;

        modal.classList.add('active');

        // Event handlers
        const handleOk = () => {
            modal.classList.remove('active');
            okBtn.removeEventListener('click', handleOk);
            cancelBtn.removeEventListener('click', handleCancel);
            resolve(true);
        };

        const handleCancel = () => {
            modal.classList.remove('active');
            okBtn.removeEventListener('click', handleOk);
            cancelBtn.removeEventListener('click', handleCancel);
            resolve(false);
        };

        okBtn.addEventListener('click', handleOk);
        cancelBtn.addEventListener('click', handleCancel);
    });
}

// Handle feedback form submission
function handleFeedback(event) {
    event.preventDefault();

    const type = document.getElementById('feedback-type').value;
    const message = document.getElementById('feedback-message').value.trim();

    if (!message) {
        alert('Please enter your feedback message.');
        return;
    }

    // Here you would send feedback to your backend
    // For now, just log it and show success message
    console.log('Feedback submitted:', { type, message });

    // Save to Firebase or send to email service
    // db.ref('feedback').push({ type, message, timestamp: Date.now() });

    alert('Thank you for your feedback! We\'ll review it soon. 🙏');

    // Reset form
    document.getElementById('feedback-form').reset();
    document.getElementById('feedback-count').textContent = '0 / 500';
    closeModal('feedback-modal');
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    // Special handling for pages
    if (pageId === 'chat-page') {
        document.body.classList.add('chat-mode');
        document.body.classList.remove('home');

        // Dispose particle system when leaving landing page
        if (particleSystem) {
            try {
                if (typeof particleSystem.dispose === 'function') {
                    particleSystem.dispose();
                } else if (typeof particleSystem.destroy === 'function') {
                    particleSystem.destroy();
                }
            } catch (e) {
                console.warn('Could not dispose particle system:', e);
            }
            particleSystem = null;
        }
    } else {
        // Leaving chat mode - restore normal scrolling
        document.body.classList.remove('chat-mode');

        // Explicitly reset body styles to ensure scrolling works
        document.body.style.position = '';
        document.body.style.overflow = '';
        document.body.style.width = '';
        document.body.style.height = '';

        // Scroll to top of page
        window.scrollTo(0, 0);

        if (pageId === 'landing-page') {
            document.body.classList.add('home');

            // Reinitialize particle system when returning to landing page
            if (!particleSystem && typeof NeuralParticleSystem !== 'undefined') {
                try {
                    particleSystem = new NeuralParticleSystem('particle-canvas');
                } catch (error) {
                    console.warn('Failed to reinitialize particle system:', error);
                }
            }
        } else {
            document.body.classList.remove('home');
        }
    }
}

function playSound(type) {
    if (!state.settings.soundEnabled) return;

    // Create oscillator for simple sounds
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        if (type === 'message') {
            osc.frequency.value = 800;
            gain.gain.value = 0.1;
            osc.start();
            osc.stop(ctx.currentTime + 0.1);
        } else if (type === 'connect') {
            osc.frequency.value = 600;
            gain.gain.value = 0.1;
            osc.start();
            setTimeout(() => osc.frequency.value = 800, 100);
            osc.stop(ctx.currentTime + 0.2);
        }
    } catch (e) { }
}

function showAchievement(icon, title, desc) {
    const popup = document.getElementById('achievement-popup');
    document.getElementById('achievement-icon').textContent = icon;
    document.getElementById('achievement-title').textContent = title;
    document.getElementById('achievement-desc').textContent = desc;
    popup.classList.add('active');
    setTimeout(() => popup.classList.remove('active'), 3000);
}

function showGiftAnimation(emoji) {
    const anim = document.getElementById('gift-animation');
    document.getElementById('gift-emoji').textContent = emoji;
    anim.classList.add('active');
    setTimeout(() => anim.classList.remove('active'), 1500);
}

// ============================================
// THEME & SETTINGS
// ============================================

function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    document.body.classList.toggle('light-theme', state.theme === 'light');
    document.querySelector('.theme-icon').textContent = state.theme === 'dark' ? '🌙' : '☀️';
    localStorage.setItem('theme', state.theme);
}

function loadSettings() {
    const saved = localStorage.getItem('settings');
    if (saved) {
        Object.assign(state.settings, JSON.parse(saved));
    }

    const theme = localStorage.getItem('theme');
    if (theme) {
        state.theme = theme;
        document.body.classList.toggle('light-theme', theme === 'light');
        document.querySelector('.theme-icon').textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    // Apply settings to UI
    document.getElementById('sound-toggle').checked = state.settings.soundEnabled;
    document.getElementById('notif-toggle').checked = state.settings.notificationsEnabled;
    document.getElementById('enter-send').checked = state.settings.enterToSend;
    document.getElementById('font-size').value = state.settings.fontSize;
}

function saveSettings() {
    state.settings.soundEnabled = document.getElementById('sound-toggle').checked;
    state.settings.notificationsEnabled = document.getElementById('notif-toggle').checked;
    state.settings.enterToSend = document.getElementById('enter-send').checked;
    state.settings.fontSize = parseInt(document.getElementById('font-size').value);

    localStorage.setItem('settings', JSON.stringify(state.settings));

    // Apply font size
    document.documentElement.style.setProperty('--font-size-base', state.settings.fontSize + 'px');
}

/* ===============================================
   APP INITIALIZATION
    =============================================== */

let particleSystem = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Omega Connect Enhanced Loading...');

    // Initialize Neural Particle System for landing page
    if (typeof NeuralParticleSystem !== 'undefined') {
        try {
            particleSystem = new NeuralParticleSystem('particle-canvas');
            console.log('✨ Neural particle system initialized');
        } catch (error) {
            console.warn('Failed to initialize particle system:', error);
        }
    }

    // Use persistent userId from localStorage (or create one)
    // This ensures favorites persist across sessions
    const savedUserId = localStorage.getItem('omega_userId');
    if (savedUserId) {
        state.userId = savedUserId;
        console.log('Loaded persistent userId:', state.userId);
    } else {
        state.userId = generateUserId();
        localStorage.setItem('omega_userId', state.userId);
        console.log('Created new persistent userId:', state.userId);
    }

    // Load settings and theme
    loadSettings();

    // Set initial theme icon
    document.querySelector('.theme-icon').textContent = state.theme === 'dark' ? '🌙' : '☀️';

    // Initialize Firebase
    firebase.initializeApp(CONFIG.FIREBASE_CONFIG);
    db = firebase.database();

    // Check for existing session
    const savedChatId = localStorage.getItem('chatId');
    const savedPartnerId = localStorage.getItem('partnerId');
    const savedPartnerName = localStorage.getItem('partnerName');
    const savedPartnerAvatar = localStorage.getItem('partnerAvatar');

    if (savedChatId && savedPartnerId && savedPartnerName) {
        state.chatId = savedChatId;
        state.partnerId = savedPartnerId;
        state.partnerName = savedPartnerName;
        state.partnerAvatar = savedPartnerAvatar;
        state.isConnected = true;
        showPage('chat-page');
        startChatListeners();
        showToast('Reconnected to previous chat!', 'success');
    } else {
        showPage('landing-page');
    }

    // Event Listeners
    // Start chat button handler moved to bottom of file with age-confirm check
    // (was duplicated here without age check - removed to fix bug)
    document.getElementById('toggle-theme-btn').addEventListener('click', toggleTheme);
    document.getElementById('feedback-btn').addEventListener('click', () => showModal('feedback'));
    document.getElementById('settings-btn').addEventListener('click', () => showModal('settings'));
    document.getElementById('feedback-form').addEventListener('submit', handleFeedback);
    document.getElementById('save-settings-btn').addEventListener('click', () => {
        saveSettings();
        closeModal('settings-modal');
        showToast('Settings saved!', 'success');
    });

    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', (e) => {
            const modalId = e.target.closest('.modal').id;
            closeModal(modalId);
        });
    });

    // Character count for feedback message
    const feedbackMessageEl = document.getElementById('feedback-message');
    const feedbackCountEl = document.getElementById('feedback-count');
    if (feedbackMessageEl && feedbackCountEl) {
        feedbackMessageEl.addEventListener('input', () => {
            const currentLength = feedbackMessageEl.value.length;
            feedbackCountEl.textContent = `${currentLength} / 500`;
        });
    }

    // Initialize preferences form
    initPreferencesForm();

    // Listen for partner match in queue
    listenForMatch();

    // Handle browser tab closing/refreshing
    window.addEventListener('beforeunload', async () => {
        if (state.isConnected) {
            await disconnectChat(false); // Disconnect without clearing chat history
        } else if (state.isSearching) {
            await leaveQueue();
        }
    });
});

// ============================================
// FIREBASE OPERATIONS
// ============================================

async function joinQueue() {
    const data = {
        id: state.userId,
        username: state.username,
        avatar: getRandomAvatar(),
        interests: state.interests,
        gender: state.gender,
        genderPref: state.genderPref,
        country: state.country,
        countryPref: state.countryPref,
        timestamp: Date.now(),
        status: 'waiting'
    };

    await db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).set(data);
    db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).onDisconnect().remove();
}

async function leaveQueue() {
    try {
        await db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).remove();
    } catch (e) { }
}

async function getWaitingUsers() {
    const snapshot = await db.ref(CONFIG.PATHS.QUEUE).once('value');
    const queue = snapshot.val() || {};

    return Object.values(queue).filter(user => {
        if (user.id === state.userId) return false;
        if (user.status !== 'waiting') return false;
        if (state.blockedUsers.has(user.id)) return false;

        // Gender preference matching
        if (state.genderPref && state.genderPref !== 'any' && user.gender !== state.genderPref) return false;
        if (user.genderPref && user.genderPref !== 'any' && state.gender !== user.genderPref) return false;

        // Country preference matching
        if (state.countryPref && state.countryPref !== 'any' && user.country !== state.countryPref) return false;
        if (user.countryPref && user.countryPref !== 'any' && state.country !== user.countryPref) return false;

        return true;
    }).sort((a, b) => {
        // Prioritize users with common interests
        const aCommon = state.interests.filter(i => (a.interests || []).includes(i)).length;
        const bCommon = state.interests.filter(i => (b.interests || []).includes(i)).length;
        if (bCommon !== aCommon) return bCommon - aCommon;
        return a.timestamp - b.timestamp;
    });
}

async function matchWithPartner(partner) {
    state.chatId = generateChatId(state.userId, partner.id);
    state.partnerId = partner.id;
    state.partnerName = partner.username;
    state.partnerAvatar = partner.avatar || '👤';
    state.partnerInterests = partner.interests || [];
    state.commonInterests = state.interests.filter(i => state.partnerInterests.includes(i));

    const chatData = {
        user1: { id: state.userId, username: state.username, connected: true },
        user2: { id: partner.id, username: partner.username, connected: true },
        interests: state.commonInterests,
        createdAt: Date.now(),
        status: 'active'
    };

    await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}`).set(chatData);

    await db.ref(`${CONFIG.PATHS.QUEUE}/${partner.id}`).update({
        status: 'matched',
        partnerId: state.userId,
        partnerName: state.username,
        partnerAvatar: state.partnerAvatar,
        chatId: state.chatId
    });

    await db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).update({
        status: 'matched',
        partnerId: partner.id,
        partnerName: partner.username,
        partnerAvatar: partner.avatar,
        chatId: state.chatId
    });

    return true;
}

async function findMatch() {
    if (!state.isSearching || state.isConnected) return;

    const waitingUsers = await getWaitingUsers();

    if (waitingUsers.length > 0) {
        const partner = waitingUsers[0];

        const snapshot = await db.ref(`${CONFIG.PATHS.QUEUE}/${partner.id}`).once('value');
        const data = snapshot.val();

        if (data && data.status === 'waiting') {
            try {
                await matchWithPartner(partner);
                stopSearching();
                startChat();
            } catch (e) {
                console.error('Match failed:', e);
            }
        }
    }
}

function startSearching() {
    state.isSearching = true;
    setTimeout(findMatch, 1000);
    state.searchInterval = setInterval(() => {
        if (state.isSearching && !state.isConnected) findMatch();
    }, CONFIG.QUEUE_CHECK_INTERVAL);
}

function stopSearching() {
    state.isSearching = false;
    if (state.searchInterval) {
        clearInterval(state.searchInterval);
        state.searchInterval = null;
    }
}

function listenForMatch() {
    db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).on('value', snapshot => {
        const data = snapshot.val();
        if (!data) return;

        if (data.status === 'matched' && data.chatId && data.partnerId && !state.isConnected) {
            state.partnerId = data.partnerId;
            state.partnerName = data.partnerName;
            state.partnerAvatar = data.partnerAvatar || '👤';
            state.chatId = data.chatId;

            stopSearching();
            clearInterval(state.waitTimer);

            setTimeout(() => {
                if (!state.isConnected) startChat();
            }, 500);
        }
    });
}

async function sendMessage(text, type = 'text') {
    if (!state.chatId || !state.isConnected) return;

    // Check for safe words FIRST (before sending anything)
    if (type === 'text' && checkSafeWord(text)) {
        await handleSafeWord();
        return;
    }

    // Apply bad words filter to text messages
    const filteredText = (type === 'text') ? filterBadWords(text) : text;

    const msg = {
        senderId: state.userId,
        senderName: state.username,
        text: filteredText,
        type: type,
        timestamp: Date.now(),
        status: {
            sent: true,
            delivered: false,
            deliveredAt: null,
            read: false,
            readAt: null
        }
    };

    // Add reply reference if replying to a message
    if (state.replyingTo.messageId) {
        msg.replyTo = state.replyingTo.messageId;
        msg.replyToText = state.replyingTo.text;
        msg.replyToSender = state.replyingTo.senderName;
    }

    // Display sent message immediately (optimistic rendering)
    // Don't wait for Firebase child_added callback
    state.displayedMessages = state.displayedMessages || new Set();
    state.displayedMessages.add(msg.timestamp.toString());
    displayMessage(msg);

    // Push to Firebase in background
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages`).push(msg).catch(err => {
        console.error('Failed to send message to Firebase:', err);
    });

    // Clear reply mode after sending
    if (state.replyingTo.messageId) {
        cancelReply();
    }

    // Update lastActive timestamp
    db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}/lastActive`).set(firebase.database.ServerValue.TIMESTAMP);

    state.messageCount++;
    const msgCountEl = document.getElementById('message-count');
    if (msgCountEl) msgCountEl.textContent = state.messageCount;

    playSound('send');

    // Check for achievements
    if (state.messageCount === 10 && !state.achievements.includes('chatty')) {
        state.achievements.push('chatty');
        showAchievement('💬', 'Chatty!', 'Sent 10 messages');
    }
}

// Typing indicator: write typing status to Firebase
function setTypingStatus(isTyping) {
    if (!state.chatId || !state.isConnected) return;
    const key = state.userId < state.partnerId ? 'user1' : 'user2';
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${key}/typing`).set(isTyping).catch(() => { });
}

function listenForMessages() {
    if (!state.chatId) {
        console.error('listenForMessages: No chatId!');
        return;
    }

    console.log('listenForMessages: Setting up listener for chatId:', state.chatId);
    state.displayedMessages = state.displayedMessages || new Set();

    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages`).on('child_added', snapshot => {
        const messageKey = snapshot.key;
        const messageData = snapshot.val();

        console.log('child_added fired:', {
            messageKey,
            senderId: messageData.senderId,
            myUserId: state.userId,
            type: messageData.type,
            text: messageData.text?.substring(0, 20),
            timestamp: messageData.timestamp
        });

        // Check for disconnect signal message from partner
        if (messageData.type === 'system' && messageData.text === '_DISCONNECT_' && messageData.senderId && messageData.senderId !== state.userId) {
            console.log('🚨 DISCONNECT SIGNAL DETECTED! Partner senderId:', messageData.senderId, 'My userId:', state.userId);
            console.log('About to call handlePartnerDisconnect()');
            handlePartnerDisconnect();
            console.log('handlePartnerDisconnect() returned');
            return; // Don't display this message
        }

        // Handle favorite notification — only show to the partner, not the sender
        if (messageData.type === 'favorite') {
            return; // Favorites feature removed
        }

        // Skip messages already displayed optimistically (sent by us)
        const msgId = messageData.timestamp.toString();
        if (state.displayedMessages.has(msgId)) {
            console.log('Skipping already-displayed message:', msgId);
        } else {
            state.displayedMessages.add(msgId);
            console.log('Displaying received message:', msgId);
            displayMessage(messageData, messageKey);
        }

        // Listen for status updates on sent messages
        if (messageData.senderId === state.userId) {
            db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages/${messageKey}/status`).on('value', statusSnapshot => {
                const status = statusSnapshot.val();
                if (status) {
                    const messageElement = document.querySelector(`[data-message-id="${messageData.timestamp}"]`);
                    if (messageElement) {
                        updateTickDisplay(messageElement, status);
                    }
                }
            });
        }
    });
}

function listenForPartnerStatus() {
    if (!state.chatId || !state.partnerId) return;

    const partnerKey = state.userId < state.partnerId ? 'user2' : 'user1';
    let disconnectModalShown = false; // Local flag - cannot be modified by any other code

    function triggerDisconnectNotification(source) {
        console.log('🔴 triggerDisconnectNotification called from:', source, 'modalShown:', disconnectModalShown);
        if (disconnectModalShown) {
            console.log('Modal already shown, skipping');
            return;
        }
        disconnectModalShown = true;
        state.disconnectHandled = true;
        state.isConnected = false;

        console.log('🚨 SHOWING DISCONNECT MODAL NOW');

        // Play disconnect sound
        try { playSound('disconnect'); } catch (e) { }

        // Stop timers
        clearInterval(state.chatDurationInterval);
        clearInterval(state.heartbeatInterval);

        // Remove visibility handler
        if (state._visibilityHandler) {
            document.removeEventListener('visibilitychange', state._visibilityHandler);
            state._visibilityHandler = null;
        }

        // Update header
        const partnerStatus = document.getElementById('partner-status');
        if (partnerStatus) {
            partnerStatus.textContent = 'Disconnected';
            partnerStatus.classList.add('disconnected');
        }

        // Hide typing
        hideTypingIndicator();

        // Update summary
        const duration = Math.floor((Date.now() - state.chatStartTime) / 1000);
        const summaryDuration = document.getElementById('summary-duration');
        const summaryMessages = document.getElementById('summary-messages');
        if (summaryDuration) summaryDuration.textContent = formatDuration(duration);
        if (summaryMessages) summaryMessages.textContent = state.messageCount;

        // Add system message
        addSystemMessage('⚠️ ' + (state.partnerName || 'Stranger') + ' has disconnected.');

        // Show the disconnected modal DIRECTLY with inline styles
        const modal = document.getElementById('disconnected-modal');
        console.log('disconnected-modal element:', modal);
        if (modal) {
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.zIndex = '99999';
            modal.classList.add('active');
            console.log('✅ MODAL ACTIVATED with inline styles! Classes:', modal.className);
        } else {
            console.error('❌ disconnected-modal element NOT FOUND in DOM!');
            alert('Stranger has disconnected!');
        }

        // Also clear the poll interval
        if (state.disconnectPollInterval) clearInterval(state.disconnectPollInterval);
    }

    // PRIMARY: Listen for partner's connected status - NO DEBOUNCE
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${partnerKey}/connected`).on('value', snapshot => {
        const connected = snapshot.val();
        console.log('👁️ Partner connected status changed:', connected);

        if (connected === true) {
            const partnerStatus = document.getElementById('partner-status');
            if (partnerStatus) {
                partnerStatus.textContent = 'Online';
                partnerStatus.classList.remove('disconnected');
            }
        } else if (connected === false) {
            // IMMEDIATELY trigger disconnect - no waiting, no debounce
            triggerDisconnectNotification('connected=false');
        }
    });

    // BACKUP 1: Listen for explicit leftChat flag
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${partnerKey}/leftChat`).on('value', snapshot => {
        if (snapshot.val() === true) {
            console.log('👁️ Partner leftChat flag detected');
            triggerDisconnectNotification('leftChat=true');
        }
    });

    // Listen for partner's typing status
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${partnerKey}/typing`).on('value', snapshot => {
        const isTyping = snapshot.val();
        if (isTyping && !disconnectModalShown) {
            showTypingIndicator();
        } else {
            hideTypingIndicator();
        }
    });
}


async function submitReport(reason) {
    if (!state.partnerId) return;

    await db.ref(CONFIG.PATHS.REPORTS).push({
        reporterId: state.userId,
        reportedId: state.partnerId,
        reason: reason,
        chatId: state.chatId,
        timestamp: Date.now()
    });

    showToast('Report submitted.');
    closeModal('report-modal');
}

function listenForOnlineCount() {
    db.ref(CONFIG.PATHS.QUEUE).on('value', snapshot => {
        const el = document.getElementById('online-count');
        if (el) el.textContent = snapshot.numChildren();
    });
}

function listenForChatCount() {
    const today = new Date().toISOString().split('T')[0];
    db.ref(`${CONFIG.PATHS.STATS}/dailyChats/${today}`).on('value', snapshot => {
        const el = document.getElementById('chat-count');
        if (el) el.textContent = snapshot.val() || 0;
    });
}

// ============================================
// CHAT FLOW
// ============================================

async function initChat() {
    // userId is already set from persistent localStorage — don't regenerate!
    // state.userId is set during app init and persists across sessions
    state.username = generateUsername();
    state.isConnected = false;
    state.messageCount = 0;
    state.chatHistory = [];
    state._alreadyFavorited = false; // Reset favorite flag for new chat

    // Show matching interests on waiting page
    const interestsDiv = document.getElementById('matching-interests');
    interestsDiv.innerHTML = state.interests.map(i =>
        `<span class="interest-chip selected" style="pointer-events:none;transform:none;">${getInterestLabel(i)}</span>`
    ).join('');

    showPage('waiting-page');

    state.waitSeconds = 0;
    state.waitTimer = setInterval(() => {
        state.waitSeconds++;
        document.getElementById('wait-time').textContent = state.waitSeconds;

        // Update status messages
        if (state.waitSeconds === 10) {
            document.getElementById('matching-status').textContent = 'Looking for someone who shares your vibe…';
        } else if (state.waitSeconds === 30) {
            document.getElementById('matching-status').textContent = 'Still searching, hang tight…';
        }

        if (state.waitSeconds >= CONFIG.MAX_WAIT_TIME) {
            cancelSearch();
            showToast('No matches found.');
        }
    }, 1000);

    await joinQueue();
    listenForMatch();
    startSearching();
}

function getInterestLabel(interest) {
    const labels = {
        music: '🎵 Music', gaming: '🎮 Gaming', movies: '🎬 Movies', sports: '⚽ Sports',
        tech: '💻 Tech', art: '🎨 Art', books: '📚 Books', travel: '✈️ Travel',
        food: '🍕 Food', fitness: '💪 Fitness', anime: '🎌 Anime', memes: '😂 Memes',
        science: '🔬 Science', photography: '📷 Photo', fashion: '👗 Fashion', pets: '🐕 Pets'
    };
    return labels[interest] || interest;
}

function startChat() {
    if (state.isConnected) return;

    state.isConnected = true;
    isInChat = true; // Enable back button intercept
    history.pushState({ chat: true }, "", location.href); // Push state

    state.chatStartTime = Date.now();
    state.messageCount = 0;
    state.strikes = 0; // Reset strikes for new chat

    // Clear displayed messages set for new chat
    state.displayedMessages = new Set();
    state.disconnectHandled = false; // Reset disconnect flag for new chat

    // CRITICAL: Set up Firebase listeners FIRST before any UI code that could fail
    // This ensures message delivery and disconnect notifications ALWAYS work
    listenForMessages();
    listenForPartnerStatus();
    console.log('Firebase listeners set up for chatId:', state.chatId);

    // Mark connected in Firebase
    const key = state.userId < state.partnerId ? 'user1' : 'user2';
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${key}/connected`).set(true);
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${key}/connected`).onDisconnect().set(false);

    // BULLETPROOF FALLBACK: Poll Firebase every 2 seconds to check if partner disconnected
    // This catches ANY case where the listener-based approach fails
    const pollChatId = state.chatId;
    const pollPartnerKey = state.userId < state.partnerId ? 'user2' : 'user1';
    if (state.disconnectPollInterval) clearInterval(state.disconnectPollInterval);
    state.disconnectPollInterval = setInterval(() => {
        // Only poll if we're still in this chat and haven't handled disconnect
        if (state.chatId !== pollChatId || state.disconnectHandled) {
            clearInterval(state.disconnectPollInterval);
            return;
        }
        // Directly read partner's status from Firebase
        db.ref(`${CONFIG.PATHS.CHATS}/${pollChatId}/${pollPartnerKey}`).once('value', snap => {
            const partnerData = snap.val();
            if (!partnerData) return;

            const isDisconnected = partnerData.connected === false || partnerData.leftChat === true;

            if (isDisconnected && !state.disconnectHandled) {
                console.log('🔴 POLL DETECTED DISCONNECT! connected:', partnerData.connected, 'leftChat:', partnerData.leftChat);
                state.disconnectHandled = true;
                state.isConnected = false;
                clearInterval(state.disconnectPollInterval);

                // Update header
                const ps = document.getElementById('partner-status');
                if (ps) { ps.textContent = 'Disconnected'; ps.classList.add('disconnected'); }

                // Add system message
                addSystemMessage('⚠️ ' + (state.partnerName || 'Stranger') + ' has disconnected.');

                // Play sound
                try { playSound('disconnect'); } catch (e) { }

                // Stop timers
                clearInterval(state.chatDurationInterval);
                clearInterval(state.heartbeatInterval);

                // Show modal using INLINE STYLES to bypass any CSS issues
                const modal = document.getElementById('disconnected-modal');
                if (modal) {
                    modal.style.display = 'flex';
                    modal.style.opacity = '1';
                    modal.style.zIndex = '99999';
                    modal.classList.add('active');
                    console.log('✅ POLL: Modal shown with inline styles');
                } else {
                    alert('Stranger has disconnected!');
                }

                // Update summary
                const dur = Math.floor((Date.now() - state.chatStartTime) / 1000);
                const sd = document.getElementById('summary-duration');
                const sm = document.getElementById('summary-messages');
                if (sd) sd.textContent = formatDuration(dur);
                if (sm) sm.textContent = state.messageCount;
            }
        });
    }, 2000);

    // Everything below is UI setup - wrap in try-catch so listener setup above is never blocked
    try {
        stopSearching();
        playSound('connect');

        // Clean up queue
        leaveQueue();
        db.ref(`${CONFIG.PATHS.QUEUE}/${state.partnerId}`).remove().catch(() => { });

        showPage('chat-page');

        // Setup read observer for tracking message reads
        setupReadObserver();

        // Update header with partner info
        document.getElementById('partner-name').textContent = state.partnerName;
        document.getElementById('partner-avatar').textContent = state.partnerAvatar;
        document.getElementById('partner-status').textContent = 'Connected';
        document.getElementById('partner-status').classList.remove('disconnected');

        // Show topic badge if in a topic room
        const topicBadge = document.getElementById('topic-badge');
        if (state.currentTopic && TOPIC_ROOMS[state.currentTopic]) {
            const room = TOPIC_ROOMS[state.currentTopic];
            topicBadge.textContent = `${room.icon} ${room.name}`;
            topicBadge.style.display = 'block';
            topicBadge.style.color = room.color;
        } else if (topicBadge) {
            topicBadge.style.display = 'none';
        }

        // Show common interests
        const commonDiv = document.getElementById('common-interests');
        if (commonDiv) {
            if (state.commonInterests.length > 0) {
                commonDiv.innerHTML = state.commonInterests.map(i =>
                    `<span class="interest-chip selected" style="pointer-events:none;transform:none;">${getInterestLabel(i)}</span>`
                ).join('');
                commonDiv.style.display = 'flex';
            } else {
                commonDiv.style.display = 'none';
            }
        }

        isInChat = true; // Enable back button intercept
        history.pushState({ chat: true }, "", location.href); // Push state

        // Save locally for reconnect
        localStorage.setItem("lastSessionId", state.chatId);
        localStorage.setItem("lastStrangerId", state.partnerId);

        // Clear messages and show welcome
        document.getElementById('chatMessages').innerHTML = `
            <div class="system-msg">
                You're now chatting with <strong>${escapeHtml(state.partnerName)}</strong>. Say hi! 👋
            </div>
            ${state.commonInterests.length > 0 ? `
                <div class="system-msg">
                    You both like: ${state.commonInterests.map(i => getInterestLabel(i)).join(', ')}
                </div>
            ` : ''}
        `;

        // Show icebreakers
        showIcebreakers();

        // Start chat duration timer
        state.chatDurationInterval = setInterval(() => {
            const duration = Math.floor((Date.now() - state.chatStartTime) / 1000);
            const durationEl = document.getElementById('chat-duration');
            if (durationEl) durationEl.textContent = formatDuration(duration);
        }, 1000);

        // Heartbeat: refresh connection status every 20 seconds
        state.heartbeatInterval = setInterval(() => {
            if (state.isConnected && state.chatId) {
                db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${key}/connected`).set(true);
                db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${key}/lastSeen`).set(firebase.database.ServerValue.TIMESTAMP);
            }
        }, 20000);

        // Handle tab visibility changes
        state._visibilityHandler = () => {
            if (document.visibilityState === 'visible' && state.isConnected && state.chatId) {
                const myKey = state.userId < state.partnerId ? 'user1' : 'user2';
                db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${myKey}/connected`).set(true);
                db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${myKey}/connected`).onDisconnect().set(false);
                db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${myKey}/lastSeen`).set(firebase.database.ServerValue.TIMESTAMP);
            }
        };
        document.addEventListener('visibilitychange', state._visibilityHandler);

        // Track active session metadata
        if (key === 'user1') {
            db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}`).set({
                userA: state.userId,
                userB: state.partnerId,
                lastActive: firebase.database.ServerValue.TIMESTAMP
            });
            db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}`).onDisconnect().remove();
        }

        document.getElementById('message-input').focus();
    } catch (e) {
        console.error('startChat UI setup error (non-fatal, listeners still active):', e);
    }

    // First chat achievement
    if (!state.achievements.includes('first_chat')) {
        state.achievements.push('first_chat');
        setTimeout(() => showAchievement('🎉', 'First Chat!', 'Started your first conversation'), 1000);
    }
}

function showIcebreakers() {
    // Icebreakers UI removed in new layout - function is now a no-op
    return;
}

async function cancelSearch() {
    stopSearching();
    clearInterval(state.waitTimer);
    await leaveQueue();
    await leaveTopicQueue(); // Clean up topic room queue
    showPage('landing-page');
    resetState();
}

function handlePartnerDisconnect() {
    console.log('🔴 handlePartnerDisconnect() CALLED! disconnectHandled:', state.disconnectHandled);
    if (state.disconnectHandled) {
        console.log('Disconnect already handled, skipping');
        return;
    }
    state.disconnectHandled = true;
    state.isConnected = false;
    console.log('Set disconnectHandled = true, isConnected = false');

    playSound('disconnect');
    clearInterval(state.chatDurationInterval);
    clearInterval(state.heartbeatInterval); // Clear heartbeat

    // Remove visibility handler
    if (state._visibilityHandler) {
        document.removeEventListener('visibilitychange', state._visibilityHandler);
        state._visibilityHandler = null;
    }

    const duration = Math.floor((Date.now() - state.chatStartTime) / 1000);

    // Update summary modal (with null checks)
    const summaryDuration = document.getElementById('summary-duration');
    const summaryMessages = document.getElementById('summary-messages');
    if (summaryDuration) summaryDuration.textContent = formatDuration(duration);
    if (summaryMessages) summaryMessages.textContent = state.messageCount;

    // Update partner status display clearly
    const partnerStatus = document.getElementById('partner-status');
    if (partnerStatus) {
        partnerStatus.textContent = 'Disconnected';
        partnerStatus.classList.add('disconnected');
    }

    // Hide typing bubble
    hideTypingIndicator();

    // Show system message immediately so user sees in chat
    console.log('Adding system message about disconnect');
    addSystemMessage('⚠️ ' + (state.partnerName || 'Stranger') + ' has disconnected.');

    // Show disconnected modal
    console.log('About to call showModal("disconnected")');
    showModal('disconnected');
    console.log('showModal("disconnected") returned');
}

async function disconnectChat() {
    if (!state.chatId) return;

    clearInterval(state.chatDurationInterval);
    clearInterval(state.heartbeatInterval); // Clear heartbeat

    // Remove visibility handler
    if (state._visibilityHandler) {
        document.removeEventListener('visibilitychange', state._visibilityHandler);
        state._visibilityHandler = null;
    }

    // Clear typing status before disconnecting
    setTypingStatus(false);

    const key = state.userId < state.partnerId ? 'user1' : 'user2';
    try {
        // Push a disconnect signal message so partner's message listener detects it
        console.log('📤 Sending _DISCONNECT_ signal message to chatId:', state.chatId);
        const disconnectMsg = {
            senderId: state.userId,
            senderName: state.username,
            text: '_DISCONNECT_',
            type: 'system',
            timestamp: Date.now()
        };
        console.log('Disconnect message payload:', disconnectMsg);
        await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages`).push(disconnectMsg);
        console.log('✅ Disconnect signal message successfully sent');

        // Also set connected flags as backup
        await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${key}/leftChat`).set(true);
        await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${key}/connected`).set(false);
        // Clean up active session tracking
        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${state.chatId}`).remove();
    } catch (e) {
        console.error('Error in disconnectChat:', e);
    }

    // Remove listeners
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages`).off();
    const partnerKey = state.userId < state.partnerId ? 'user2' : 'user1';
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${partnerKey}/connected`).off();
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${partnerKey}/leftChat`).off();
    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/${partnerKey}/typing`).off();
    db.ref(`${CONFIG.PATHS.QUEUE}/${state.userId}`).off();

    state.isConnected = false;

    // Rating modal disabled per user request
    // if (state.partnerId && state.chatId) {
    //     setTimeout(() => {
    //         showRatingModal();
    //     }, 1000);
    // }
}

async function findNewChat() {
    closeModal('disconnected-modal');
    await disconnectChat();

    const blocked = state.blockedUsers;
    const interests = state.interests;
    const gender = state.gender;
    const genderPref = state.genderPref;

    resetState();

    state.blockedUsers = blocked;
    state.interests = interests;
    state.gender = gender;
    state.genderPref = genderPref;

    initChat();
}

async function blockUser() {
    if (state.partnerId) {
        state.blockedUsers.add(state.partnerId);
        showToast('User blocked.');
    }
    closeModal('block-modal');
    await findNewChat();
}

async function goHome() {
    closeModal('disconnected-modal');
    await disconnectChat();
    await leaveQueue();
    showPage('landing-page');
    resetState();
}

function displayMessage(message, messageKey = null) {
    console.log('displayMessage called! Message:', message, 'MessageKey:', messageKey);
    const container = document.getElementById('chatMessages');
    const isSent = message.senderId === state.userId;

    // Hide icebreakers after first message (if element exists)
    const icebreakers = document.getElementById('icebreakers');
    if (icebreakers) icebreakers.classList.remove('active');

    // Store in history
    state.chatHistory.push(message);

    // Trigger Smart Replies for incoming text messages
    if (!isSent && message.type === 'text') {
        showSmartReplies(message.text);
    }

    const el = document.createElement('div');
    el.dataset.messageId = message.timestamp; // Store message ID for reactions

    // System/Game messages are rendered as centered system messages (no sender/receiver alignment)
    if (message.type === 'game' || message.type === 'system') {
        el.className = 'msg system-msg game-msg';
    } else {
        // Normal messages use sender/receiver alignment
        let className = `msg ${isSent ? 'out' : 'in'}`;

        if (message.type === 'gift') className += ' gift';
        if (message.type === 'confession') className += ' confession';
        if (message.type === 'gif') className += ' gif-message';
        if (message.type === 'drawing') className += ' drawing-message';

        el.className = className;
    }

    let content = '';

    if (message.type === 'gif') {
        content = `<img src="${escapeHtml(message.text)}" alt="GIF" class="message-image" loading="lazy" onload="scrollToBottom()">`;
    } else if (message.type === 'drawing') {
        content = `<img src="${message.text}" alt="Drawing" class="message-image" onload="scrollToBottom()">`;
    } else if (message.type === 'gift') {
        content = `🎁 ${isSent ? 'You sent' : 'Received'} a ${escapeHtml(message.text)}!`;
    } else {
        content = escapeHtml(filterBadWords(message.text));
    }

    // Build quote HTML if this is a reply
    let quoteHTML = '';
    if (message.replyTo && message.replyToText) {
        const quotedSender = message.replyToSender === state.username ? 'You' : message.replyToSender;
        const quotedText = message.replyToText.length > 50
            ? message.replyToText.substring(0, 50) + '...'
            : message.replyToText;

        quoteHTML = `
            <div class="message-quote" onclick="scrollToMessage(${message.replyTo})" title="Click to view original">
                <div class="quote-sender">${escapeHtml(quotedSender)}</div>
                <div class="quote-text">${escapeHtml(quotedText)}</div>
            </div>
        `;
    }

    // Build reactions HTML (removed + button, tap on bubble shows reactions)
    const reactionsHTML = message.type !== 'system' && message.type !== 'game' ? `
        <div class="message-reactions" data-message-id="${message.timestamp}"></div>
        <button class="reply-btn" data-message-id="${message.timestamp}" title="Reply">↩</button>
    ` : '';

    // Build read receipts ticks (only for sent messages)
    const ticksHTML = isSent && message.type !== 'system' && message.type !== 'game' ? `
        <div class="message-ticks">
            <span class="tick ${message.status?.sent ? '' : 'hidden'}">✓</span>
            <span class="tick ${message.status?.delivered ? '' : 'hidden'} ${message.status?.read ? 'read' : ''}">✓</span>
            <span class="tick ${message.status?.delivered ? '' : 'hidden'} ${message.status?.read ? 'read' : ''}">✓</span>
        </div>
    ` : '';

    el.innerHTML = `
        <div class="bubble" data-message-id="${message.timestamp}">
            ${quoteHTML}
            ${content}
            ${ticksHTML}
        </div>
        ${reactionsHTML}
    `;

    // Add data attributes for read tracking
    if (messageKey) {
        el.dataset.messageKey = messageKey;
        el.dataset.senderId = message.senderId;
    }

    console.log('displayMessage: Appending message to container. Container:', container, 'Element:', el);
    if (container) {
        container.appendChild(el);
        console.log('Message appended! Container children count:', container.children.length);
    } else {
        console.error('displayMessage: Container (#chatMessages) not found!');
    }
    scrollToBottom();

    // Mark as delivered if this is a received message
    if (!isSent && messageKey && message.status && !message.status.delivered) {
        markAsDelivered(message.timestamp, messageKey);
    }

    // Observe for read tracking (if received message)
    if (!isSent && messageKey) {
        observeMessageForRead(el);
    }

    // Listen for reactions on this message
    if (message.type !== 'system' && message.type !== 'game') {
        listenForReactions(message.timestamp);
    }

    // Play sound for received messages
    if (!isSent) {
        playSound('message');

        // Show gift animation
        if (message.type === 'gift') {
            const giftEmoji = message.text.split(' ')[0];
            showGiftAnimation(giftEmoji);
        }
    }

    // THREE-STRIKE SYSTEM for received messages
    if (!isSent && message.type === 'text' && enhancedContainsBadWords(message.text)) {
        state.strikes++;

        if (state.strikes === 1) {
            showWarningBanner(1);
            showToast('Partner used inappropriate language', 'warning');
        } else if (state.strikes === 2) {
            showWarningBanner(2);
            showToast('Second violation detected', 'danger');
        } else if (state.strikes >= 3) {
            showWarningBanner(3);
            showToast('Disconnecting due to repeated violations...', 'danger');

            // Auto-report and disconnect
            setTimeout(async () => {
                if (state.partnerId) {
                    await db.ref(CONFIG.PATHS.REPORTS).push({
                        reporterId: state.userId,
                        reportedId: state.partnerId,
                        reason: 'Auto-reported: 3 strikes for inappropriate language',
                        chatId: state.chatId,
                        timestamp: Date.now()
                    });
                }
                handlePartnerDisconnect();
            }, 2000);
        }
    }
}

// ============================================
// MESSAGE REACTIONS
// ============================================

const REACTION_EMOJIS = ['👍', '❤️', '😂', '🤔', '🔥', '👏'];

async function addReaction(messageId, emoji) {
    if (!state.chatId || !messageId) return;

    try {
        await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages/${messageId}/reactions/${state.userId}`).set(emoji);
    } catch (e) {
        console.error('Failed to add reaction:', e);
    }
}

async function removeReaction(messageId) {
    if (!state.chatId || !messageId) return;

    try {
        await db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages/${messageId}/reactions/${state.userId}`).remove();
    } catch (e) {
        console.error('Failed to remove reaction:', e);
    }
}

function listenForReactions(messageId) {
    if (!state.chatId || !messageId) return;

    db.ref(`${CONFIG.PATHS.CHATS}/${state.chatId}/messages/${messageId}/reactions`).on('value', snapshot => {
        displayReactions(messageId, snapshot.val() || {});
    });
}

function displayReactions(messageId, reactions) {
    const container = document.querySelector(`.message-reactions[data-message-id="${messageId}"]`);
    if (!container) return;

    // Count reactions by emoji
    const counts = {};
    Object.entries(reactions).forEach(([userId, emoji]) => {
        counts[emoji] = (counts[emoji] || 0) + 1;
    });

    // Build HTML
    const html = Object.entries(counts).map(([emoji, count]) => {
        const hasReacted = reactions[state.userId] === emoji;
        return `<span class="reaction ${hasReacted ? 'reacted' : ''}" data-emoji="${emoji}">${emoji} ${count}</span>`;
    }).join('');

    container.innerHTML = html;

    // Add click handlers
    container.querySelectorAll('.reaction').forEach(el => {
        el.addEventListener('click', () => {
            const emoji = el.dataset.emoji;
            if (reactions[state.userId] === emoji) {
                removeReaction(messageId);
            } else {
                addReaction(messageId, emoji);
            }
        });
    });
}

function showReactionPicker(messageId, bubble) {
    // Remove any existing picker
    const existing = document.querySelector('.reaction-picker');
    if (existing) existing.remove();

    const picker = document.createElement('div');
    picker.className = 'reaction-picker';
    picker.innerHTML = REACTION_EMOJIS.map(emoji =>
        `<button class="reaction-emoji" data-emoji="${emoji}">${emoji}</button>`
    ).join('');

    // Position picker above the bubble, centered
    const rect = bubble.getBoundingClientRect();
    picker.style.position = 'fixed';
    picker.style.bottom = `${window.innerHeight - rect.top + 8}px`;
    picker.style.left = `${rect.left + (rect.width / 2) - 100}px`; // Center above bubble

    document.body.appendChild(picker);

    // Add click handlers
    picker.querySelectorAll('.reaction-emoji').forEach(btn => {
        btn.addEventListener('click', () => {
            addReaction(messageId, btn.dataset.emoji);
            picker.remove();
        });
    });

    // Close on outside click
    setTimeout(() => {
        document.addEventListener('click', function closePickerHandler(e) {
            if (!picker.contains(e.target) && e.target !== button) {
                picker.remove();
                document.removeEventListener('click', closePickerHandler);
            }
        });
    }, 0);
}

// ============================================
// MESSAGE THREADING
// ============================================

function setReplyMode(message) {
    state.replyingTo = {
        messageId: message.timestamp,
        text: message.text,
        senderId: message.senderId,
        senderName: message.senderName
    };
    showReplyPreview();

    // Focus input
    const input = document.getElementById('message-input');
    if (input) input.focus();
}

function cancelReply() {
    state.replyingTo = {
        messageId: null,
        text: null,
        senderId: null,
        senderName: null
    };
    hideReplyPreview();
}

function showReplyPreview() {
    const preview = document.getElementById('reply-preview');
    if (!preview) return;

    const senderName = state.replyingTo.senderName === state.username ? 'You' : state.replyingTo.senderName;
    const truncatedText = state.replyingTo.text.length > 50
        ? state.replyingTo.text.substring(0, 50) + '...'
        : state.replyingTo.text;

    preview.innerHTML = `
        <div class="reply-preview-content">
            <span class="reply-label">Replying to ${senderName}:</span>
            <span class="reply-text">${escapeHtml(truncatedText)}</span>
        </div>
        <button class="reply-cancel" onclick="cancelReply()" title="Cancel">&times;</button>
    `;

    preview.classList.add('active');
}

function hideReplyPreview() {
    const preview = document.getElementById('reply-preview');
    if (preview) {
        preview.classList.remove('active');
    }
}

function getMessageById(messageId) {
    return state.chatHistory.find(msg => msg.timestamp === messageId);
}

function scrollToMessage(messageId) {
    const messageEl = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageEl) {
        messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Flash highlight
        messageEl.classList.add('highlight');
        setTimeout(() => messageEl.classList.remove('highlight'), 2000);
    }
}

// ============================================
// ORIGINAL FUNCTIONS CONTINUE
// ============================================

function addSystemMessage(text) {
    const el = document.createElement('div');
    el.className = 'message system';
    el.innerHTML = `<p>${escapeHtml(text)}</p>`;
    document.getElementById('messages').appendChild(el);
    scrollToBottom();
}

// New Typing Indicator Functions
function showTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    const chatMessages = document.getElementById("chatMessages");
    if (indicator) {
        indicator.classList.remove('hidden');
        // Add pulsing glow to chat area
        if (chatMessages) chatMessages.classList.add('partner-typing');
    }
}

function hideTypingIndicator() {
    const indicator = document.getElementById("typingIndicator");
    const chatMessages = document.getElementById("chatMessages");
    if (indicator) {
        indicator.classList.add('hidden');
        // Remove pulsing glow from chat area
        if (chatMessages) chatMessages.classList.remove('partner-typing');
    }
}

function scrollToBottom() {
    const container = document.getElementById('chatMessages');
    if (container) {
        container.scrollTop = container.scrollHeight;
    }
}

function resetState() {
    // Keep userId persistent — reload from localStorage for favorites
    state.userId = localStorage.getItem('omega_userId') || state.userId;
    state.username = null;
    state.partnerId = null;
    state.partnerName = null;
    state.partnerAvatar = null;
    state.chatId = null;
    state.isConnected = false;
    state.isSearching = false;
    state.warningCount = 0;
    clearInterval(state.waitTimer);
    clearInterval(state.chatDurationInterval);
}

// ============================================
// FEATURES
// ============================================

// Emoji Picker
function initEmojiPicker() {
    const grid = document.getElementById('emoji-grid');
    const tabs = document.querySelectorAll('.emoji-tab');

    function renderEmojis(category) {
        grid.innerHTML = EMOJIS[category].map(e =>
            `<button>${e}</button>`
        ).join('');

        grid.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', () => {
                const input = document.getElementById('message-input');
                input.value += btn.textContent;
                input.focus();
                document.getElementById('send-btn').disabled = false;
                updateCharCount();
            });
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderEmojis(tab.dataset.category);
        });
    });

    renderEmojis('smileys');
}

function toggleEmojiPicker() {
    console.log('Emoji button clicked'); // Debug
    const emojiPicker = document.getElementById('emoji-picker');
    const gifPicker = document.getElementById('gif-picker');
    console.log('Emoji picker element:', emojiPicker); // Debug
    emojiPicker.classList.toggle('active');
    gifPicker.classList.remove('active');
}

// GIF Picker with Giphy API
const GIPHY_API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65'; // Public beta key

let gifSearchTimeout = null;

function initGifPicker() {
    const searchInput = document.getElementById('gif-search-input');
    const gifGrid = document.getElementById('gif-grid');

    // Don't load GIFs on init - wait for user to open picker (lazy load)

    // Search with debounce
    searchInput.addEventListener('input', (e) => {
        clearTimeout(gifSearchTimeout);
        const query = e.target.value.trim();

        gifSearchTimeout = setTimeout(() => {
            if (query.length > 0) {
                searchGifs(query);
            } else {
                loadTrendingGifs();
            }
        }, 400);
    });
}

async function loadTrendingGifs() {
    const gifGrid = document.getElementById('gif-grid');
    gifGrid.innerHTML = '<div class="gif-loading">Loading trending GIFs...</div>';

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${GIPHY_API_KEY}&limit=12&rating=pg-13`);
        const data = await response.json();
        renderGifs(data.data);
    } catch (error) {
        console.error('Giphy trending load error:', error); // Debug
        gifGrid.innerHTML = '<div class="gif-loading">Failed to load GIFs</div>';
    }
}

async function searchGifs(query) {
    const gifGrid = document.getElementById('gif-grid');
    gifGrid.innerHTML = '<div class="gif-loading">Searching...</div>';

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=12&rating=pg-13`);
        const data = await response.json();
        if (data.data.length === 0) {
            gifGrid.innerHTML = '<div class="gif-loading">No GIFs found</div>';
        } else {
            renderGifs(data.data);
        }
    } catch (error) {
        console.error('Giphy search error:', error); // Debug
        gifGrid.innerHTML = '<div class="gif-loading">Search failed</div>';
    }
}

function renderGifs(gifs) {
    const gifGrid = document.getElementById('gif-grid');
    gifGrid.innerHTML = gifs.map(gif =>
        `<img src="${gif.images.fixed_height_small.url}" data-full="${gif.images.fixed_height.url}" alt="GIF" loading="lazy">`
    ).join('');

    gifGrid.querySelectorAll('img').forEach(img => {
        img.addEventListener('click', () => {
            sendMessage(img.dataset.full, 'gif');
            closeAllPickers();
        });
    });
}

let gifPickerInitialized = false;

function toggleGifPicker() {
    console.log('GIF button clicked'); // Debug
    const gifPicker = document.getElementById('gif-picker');
    const emojiPicker = document.getElementById('emoji-picker');
    const isOpening = !gifPicker.classList.contains('active');

    console.log('GIF picker element:', gifPicker); // Debug
    console.log('Is opening:', isOpening); // Debug

    emojiPicker.classList.remove('active');
    gifPicker.classList.toggle('active');

    if (isOpening) {
        // Lazy load trending GIFs on first open
        if (!gifPickerInitialized) {
            loadTrendingGifs();
            gifPickerInitialized = true;
        }
        document.getElementById('gif-search-input').focus();
    }
}

// Drawing Canvas
let isDrawing = false;
let drawingCtx = null;

function initDrawingCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    drawingCtx = canvas.getContext('2d');

    // Set canvas size properly for high DPI
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    drawingCtx.scale(2, 2);

    // Drawing settings
    drawingCtx.strokeStyle = '#ffffff';
    drawingCtx.lineWidth = 3;
    drawingCtx.lineCap = 'round';
    drawingCtx.lineJoin = 'round';

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', stopDrawing);

    // Clear button
    document.getElementById('clear-canvas-btn').addEventListener('click', clearCanvas);

    // Send button
    document.getElementById('send-drawing-btn').addEventListener('click', sendDrawing);
}

function getCanvasCoords(e, canvas) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches) {
        return {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };
    }
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function startDrawing(e) {
    isDrawing = true;
    const canvas = document.getElementById('drawing-canvas');
    const coords = getCanvasCoords(e, canvas);
    drawingCtx.beginPath();
    drawingCtx.moveTo(coords.x, coords.y);
}

function draw(e) {
    if (!isDrawing) return;
    const canvas = document.getElementById('drawing-canvas');
    const coords = getCanvasCoords(e, canvas);
    drawingCtx.lineTo(coords.x, coords.y);
    drawingCtx.stroke();
}

function stopDrawing() {
    isDrawing = false;
}

function handleTouchStart(e) {
    e.preventDefault();
    startDrawing(e);
}

function handleTouchMove(e) {
    e.preventDefault();
    draw(e);
}

function clearCanvas() {
    const canvas = document.getElementById('drawing-canvas');
    drawingCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function sendDrawing() {
    const canvas = document.getElementById('drawing-canvas');
    const dataUrl = canvas.toDataURL('image/png');

    // Check if canvas is empty
    const imageData = drawingCtx.getImageData(0, 0, canvas.width, canvas.height);
    const hasContent = imageData.data.some((val, i) => i % 4 === 3 && val > 0);

    if (!hasContent) {
        showToast('Draw something first!');
        return;
    }

    sendMessage(dataUrl, 'drawing');
    clearCanvas();
    closeModal('drawing-modal');
}

function openDrawingModal() {
    showModal('drawing');
    // Reset canvas when opening
    setTimeout(() => {
        const canvas = document.getElementById('drawing-canvas');
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * 2;
        canvas.height = rect.height * 2;
        if (drawingCtx) {
            drawingCtx.scale(2, 2);
            drawingCtx.strokeStyle = '#ffffff';
            drawingCtx.lineWidth = 3;
            drawingCtx.lineCap = 'round';
            drawingCtx.lineJoin = 'round';
        }
    }, 50);
}

// ============================================
// TRUTH OR DARE GAME
// ============================================

let currentGameQuestion = null;
let currentGameType = null;

function openGameModal() {
    showModal('game');
    // Reset state
    currentGameQuestion = null;
    currentGameType = null;
    const resultEl = document.getElementById('game-result');
    const sendBtn = document.getElementById('send-game-btn');
    if (resultEl) resultEl.textContent = '';
    if (sendBtn) sendBtn.style.display = 'none';
}

function getTruth() {
    const truths = GAMES.truth;
    const question = truths[Math.floor(Math.random() * truths.length)];
    currentGameQuestion = question;
    currentGameType = 'truth';

    const resultEl = document.getElementById('game-result');
    const sendBtn = document.getElementById('send-game-btn');

    if (resultEl) {
        resultEl.innerHTML = `<span style="color: #818cf8;">🤔 TRUTH:</span><br>${question}`;
    }
    if (sendBtn) sendBtn.style.display = 'inline-block';
}

function getDare() {
    const dares = GAMES.dare;
    const question = dares[Math.floor(Math.random() * dares.length)];
    currentGameQuestion = question;
    currentGameType = 'dare';

    const resultEl = document.getElementById('game-result');
    const sendBtn = document.getElementById('send-game-btn');

    if (resultEl) {
        resultEl.innerHTML = `<span style="color: #f97316;">🔥 DARE:</span><br>${question}`;
    }
    if (sendBtn) sendBtn.style.display = 'inline-block';
}

function sendGameResult() {
    if (!currentGameQuestion || !state.isConnected) return;

    const emoji = currentGameType === 'truth' ? '🤔' : '🔥';
    const label = currentGameType === 'truth' ? 'TRUTH' : 'DARE';
    const message = `${emoji} ${label}: ${currentGameQuestion}`;

    sendMessage(message, 'game');
    closeModal('game-modal');

    // Reset
    currentGameQuestion = null;
    currentGameType = null;
}

// Close all pickers
function closeAllPickers() {
    // Close NEW emoji picker
    const emojiPicker = document.getElementById('emojiPicker');
    if (emojiPicker) emojiPicker.classList.add('hidden');

    // Close old pickers (if they exist)
    const oldEmojiPicker = document.getElementById('emoji-picker');
    const gifPicker = document.getElementById('gif-picker');
    if (oldEmojiPicker) oldEmojiPicker.classList.remove('active');
    if (gifPicker) gifPicker.classList.remove('active');
}

// Gifts
function initGifts() {
    document.querySelectorAll('.gift-item').forEach(btn => {
        btn.addEventListener('click', () => {
            const gift = btn.dataset.gift;
            const name = btn.querySelector('span').textContent;
            sendMessage(`${gift} ${name}`, 'gift');
            closeModal('gift-modal');
        });
    });
}

// Games
function startGame(type) {
    closeModal('game-modal');

    let gameMessage = '';

    switch (type) {
        case 'truth':
            const truth = GAMES.truth[Math.floor(Math.random() * GAMES.truth.length)];
            gameMessage = `🎯 Truth or Dare!\n\nTruth: ${truth}`;
            break;
        case 'wouldyou':
            const wyr = GAMES.wouldyou[Math.floor(Math.random() * GAMES.wouldyou.length)];
            gameMessage = `🤔 Would You Rather?\n\n${wyr}`;
            break;
        case 'trivia':
            const trivia = GAMES.trivia[Math.floor(Math.random() * GAMES.trivia.length)];
            gameMessage = `🧠 Trivia Time!\n\n${trivia.q}`;
            break;
        case 'emoji':
            const emoji = GAMES.emoji[Math.floor(Math.random() * GAMES.emoji.length)];
            gameMessage = `😄 Emoji Guess!\n\nGuess the movie: ${emoji.emoji}`;
            break;
        case 'story':
            gameMessage = `📖 Story Builder!\n\nLet's build a story together. I'll start:\n\n"Once upon a time..."`;
            break;
        case 'rps':
            const choices = ['✊ Rock', '✋ Paper', '✌️ Scissors'];
            const choice = choices[Math.floor(Math.random() * choices.length)];
            gameMessage = `✊✋✌️ Rock Paper Scissors!\n\nI chose: ${choice}\n\nYour turn!`;
            break;
    }

    sendMessage(gameMessage, 'game');
}

// Confession Mode
function sendConfession() {
    const input = document.getElementById('confession-input');
    const text = input.value.trim();

    if (text) {
        sendMessage(`🎭 Anonymous Confession:\n\n"${text}"`, 'confession');
        input.value = '';
        closeModal('confession-modal');
    }
}

// Save Chat
function saveChat() {
    const transcript = state.chatHistory.map(m => {
        const time = formatTime(m.timestamp);
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

// Character count
function updateCharCount() {
    const input = document.getElementById('message-input');
    const count = document.getElementById('char-count');
    if (!input || !count) return; // Elements may not exist
    count.textContent = `${input.value.length}/1000`;
}

// ============================================
// EVENT HANDLERS
// ============================================

function handleSendMessage() {
    const input = document.getElementById('message-input');
    const text = input.value.trim();

    console.log('handleSendMessage called, text:', text, 'isConnected:', state.isConnected, 'disconnectHandled:', state.disconnectHandled, 'chatId:', state.chatId);

    if (!text || !state.chatId) return;
    // Allow sending if disconnect hasn't been handled (more reliable than isConnected)
    if (state.disconnectHandled) {
        console.log('Cannot send: chat disconnected');
        return;
    }

    sendMessage(text);

    input.value = '';
    input.style.height = 'auto';
    document.getElementById('send-btn').disabled = true;
    updateCharCount();

    closeAllPickers();
}

function handleInputChange(e) {
    const text = e.target.value.trim();
    const sendBtn = document.getElementById('send-btn');
    sendBtn.disabled = (text.length === 0);

    // Update character count
    updateCharCount();

    // Adjust textarea height
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
}

function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey && state.settings.enterToSend) {
        e.preventDefault();
        handleSendMessage();
    }
}

// ============================================
// INITIALIZATION
// ============================================

// Helper function for safe event binding
function bind(id, handler) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Missing element: ${id}`);
        return;
    }
    el.addEventListener("click", handler);
    console.log(`✅ Bound event to: ${id}`);
}

// ===============================
// NEW CLEAN IMPLEMENTATIONS
// ===============================

// Tenor API Key (You can get one free at https://tenor.com/gifapi)
const TENOR_KEY = "AIzaSyB-BRf47gAGkxUMkpb_hWtE9SjTgu8URR4";

// EMOJI PICKER
function initNewEmojiPicker() {
    const emojiBtn = document.getElementById("emojiBtn");
    const emojiPicker = document.getElementById("emojiPicker");
    const inputBox = document.querySelector(".dock-input input");

    if (!emojiBtn || !emojiPicker || !inputBox) return;

    const emojis = "😀 😁 😂 🤣 😊 😍 😎 🤔 😢 😡 👍 👎 🙌 🎉 ❤️ 🔥 💯 ✨ 🌟 ⭐ 💪 🙏 👏 🤝 💀 😭 😤 😱 🥺 🥰".split(" ");

    emojiPicker.innerHTML = emojis.map(e => `<span>${e}</span>`).join("");

    emojiBtn.onclick = () => {
        emojiPicker.classList.toggle("hidden");
        // Close GIF panel
        const gifPanel = document.getElementById("gifPanel");
        if (gifPanel) gifPanel.classList.add("hidden");
    };

    emojiPicker.onclick = e => {
        if (e.target.tagName === "SPAN") {
            inputBox.value += e.target.textContent;
            // Trigger input event to enable send button
            inputBox.dispatchEvent(new Event('input', { bubbles: true }));
            // Don't close - allow multiple emoji selection
            // Just keep focus on input so user can continue typing
            inputBox.focus();
        }
    };


    // Note: Removed input focus handler - picker stays open for multiple selections
    // Only closes when clicking outside or toggling the emoji button


    // Close emoji picker when clicking anywhere outside it
    document.addEventListener('click', (e) => {
        // Don't close if clicking the emoji button itself (toggle handles that)
        if (emojiBtn.contains(e.target)) return;
        // Don't close if clicking inside the picker
        if (emojiPicker.contains(e.target)) return;
        // Close the picker
        emojiPicker.classList.add("hidden");
    });
}

// GIF PANEL - API Key has restrictions (403 errors)
function initNewGifPanel() {
    const gifBtn = document.getElementById("gifBtn");
    const gifPanel = document.getElementById("gifPanel");
    const gifResults = document.getElementById("gifResults");

    if (!gifBtn || !gifPanel || !gifResults) return;

    // Show helpful message
    gifResults.innerHTML = `
        <div style="color:#888;text-align:center;padding:20px;line-height:1.6;">
            <p style="font-size:32px;margin-bottom:10px;">🔒</p>
            <p style="margin-bottom:10px;"><strong>API Key Blocked (403 Error)</strong></p>
            <p style="font-size:13px;">Your Tenor API key has restrictions.</p>
            <p style="font-size:13px;margin-top:15px;"><strong>To fix:</strong></p>
            <ol style="font-size:12px;text-align:left;display:inline-block;margin-top:10px;">
                <li>Go to <a href="https://console.cloud.google.com" target="_blank" style="color:#6366f1;">Google Cloud Console</a></li>
                <li>Select your project</li>
                <li>Go to APIs & Services → Credentials</li>
                <li>Edit your API key</li>
                <li>Under "Application restrictions" → Select "None"</li>
                <li>Under "API restrictions" → Check "Tenor GIF API"</li>
                <li>Save and try again</li>
            </ol>
        </div>
    `;

    gifBtn.onclick = () => {
        gifPanel.classList.toggle("hidden");
        const emojiPicker = document.getElementById("emojiPicker");
        if (emojiPicker) emojiPicker.classList.add("hidden");
    };
}

// DRAWING CANVAS
function initNewDrawingCanvas() {
    const canvas = document.getElementById("drawing-canvas");
    const clearBtn = document.getElementById("clear-canvas-btn");
    const sendBtn = document.getElementById("send-drawing-btn");
    const draggable = document.getElementById("drawing-modal-draggable");

    if (!canvas || !clearBtn || !sendBtn || !draggable) return;

    const ctx = canvas.getContext("2d");
    let drawing = false;

    // Drawing functions
    function startDrawing(e) {
        drawing = true;
        draw(e);
    }

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    }

    function draw(e) {
        if (!drawing) return;

        const rect = canvas.getBoundingClientRect();

        // Get actual pointer position
        const clientX = e.clientX || e.touches?.[0]?.clientX;
        const clientY = e.clientY || e.touches?.[0]?.clientY;

        // Scale coordinates from display size to canvas size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (clientX - rect.left) * scaleX;
        const y = (clientY - rect.top) * scaleY;

        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#fff";

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Canvas events
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchend", stopDrawing);
    canvas.addEventListener("touchmove", draw);

    // Buttons
    clearBtn.onclick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    sendBtn.onclick = () => {
        const dataURL = canvas.toDataURL();
        sendMessage(dataURL, "drawing");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        closeModal("drawing-modal");
    };

    // DRAG functionality
    const header = draggable.querySelector("h3");
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("mouseup", stopDrag);

    function startDrag(e) {
        isDragging = true;
        const rect = draggable.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        draggable.style.position = "fixed";
        draggable.style.margin = "0";
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();

        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

        const maxX = window.innerWidth - draggable.offsetWidth;
        const maxY = window.innerHeight - draggable.offsetHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        draggable.style.left = newX + "px";
        draggable.style.top = newY + "px";
    }

    function stopDrag() {
        isDragging = false;
    }
}

// TYPING RACE MINI GAME
function startTypingRace() {
    const words = ["stranger", "connect", "friends", "message", "hello"];
    const word = words[Math.floor(Math.random() * words.length)];

    sendMessage(`🎮 Typing race! Type: "${word}"`, 'game');

    const inputBox = document.querySelector(".dock-input input");
    if (!inputBox) return;

    let pos = 0;
    const originalHandler = inputBox.oninput;

    inputBox.oninput = () => {
        if (inputBox.value[pos] === word[pos]) {
            pos++;
        }
        if (pos === word.length) {
            sendMessage("🏆 I won the typing race!", 'text');
            inputBox.oninput = originalHandler;
            inputBox.value = '';
        }
    };
}

document.addEventListener('DOMContentLoaded', () => {
    loadSettings();

    // Initialize NEW clean implementations
    initNewEmojiPicker();
    // initNewGifPanel(); // DISABLED - GIF feature removed
    initNewDrawingCanvas();

    // Old implementations REMOVED - they were trying to access deleted HTML elements
    // initEmojiPicker(); // ERROR: emoji-picker element removed
    // initGifPicker(); // ERROR: gif-picker element removed
    // initDrawingCanvas(); // Still exists but not needed
    initGifts();

    // Advanced Filters Toggle (removed from HTML, but kept code safe)
    const advancedFiltersToggle = document.getElementById('advanced-filters-toggle');
    const advancedFilters = document.getElementById('advanced-filters');

    if (advancedFiltersToggle && advancedFilters) {
        advancedFiltersToggle.addEventListener('click', () => {
            const isExpanded = advancedFilters.classList.toggle('expanded');
            advancedFiltersToggle.classList.toggle('expanded', isExpanded);
            advancedFiltersToggle.querySelector('.toggle-text').textContent =
                isExpanded ? 'Hide these' : 'More options (totally optional)';
        });
    }

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // NEW: Gender identity pills (I am section)
    document.querySelectorAll('.gender-identity-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active from all pills
            document.querySelectorAll('.gender-identity-pill').forEach(p => p.classList.remove('active'));
            // Add active to clicked pill
            pill.classList.add('active');
            // Update state
            state.gender = pill.dataset.gender;
        });
    });

    // NEW: Gender preference pills (Looking for section)
    document.querySelectorAll('.gender-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active from all pills
            document.querySelectorAll('.gender-pill').forEach(p => p.classList.remove('active'));
            // Add active to clicked pill
            pill.classList.add('active');
            // Update state
            state.genderPref = pill.dataset.pref;
        });
    });

    // Interest selection with max 5 limit
    const MAX_INTERESTS = 5;
    const interestCounter = document.getElementById('interest-counter');

    function updateInterestUI() {
        const count = state.interests.length;
        interestCounter.textContent = `${count} / ${MAX_INTERESTS} selected`;

        // Update counter color based on count
        if (count === MAX_INTERESTS) {
            interestCounter.style.color = '#00cec9';
        } else if (count > 0) {
            interestCounter.style.color = '#6c5ce7';
        } else {
            interestCounter.style.color = '#888';
        }

        // Disable unselected chips when max reached
        document.querySelectorAll('.interest-chip').forEach(chip => {
            if (count >= MAX_INTERESTS && !chip.classList.contains('selected')) {
                chip.classList.add('disabled');
            } else {
                chip.classList.remove('disabled');
            }
        });
    }

    document.querySelectorAll('.interest-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const interest = btn.dataset.interest;
            const isSelected = btn.classList.contains('selected');

            if (isSelected) {
                // Deselect
                btn.classList.remove('selected');
                state.interests = state.interests.filter(i => i !== interest);
            } else {
                // Select only if under limit
                if (state.interests.length < MAX_INTERESTS) {
                    btn.classList.add('selected');
                    state.interests.push(interest);
                }
            }

            updateInterestUI();
        });
    });

    // Gender selection
    document.querySelectorAll('.gender-btn:not(.pref-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.gender-btn:not(.pref-btn)').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.gender = btn.dataset.gender;
        });
    });

    document.querySelectorAll('.pref-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.pref-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.genderPref = btn.dataset.pref;
        });
    });

    // Country selection
    document.querySelectorAll('.country-btn:not(.country-pref-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.country-btn:not(.country-pref-btn)').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.country = btn.dataset.country;
        });
    });

    document.querySelectorAll('.country-pref-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.country-pref-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.countryPref = btn.dataset.countrypref;
        });
    });

    // Start Button (Main CTA) -> Opens Onboarding Modal
    const startBtn = document.getElementById('start-chat-btn');
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const onboardingModal = document.getElementById('onboarding-modal');
            if (onboardingModal) {
                onboardingModal.style.display = 'flex';
                onboardingModal.classList.add('active'); // Wait for CSS transition
            }
        });
    }

    // Onboarding Modal -> Age Confirm & Continue
    const ageConfirm = document.getElementById('age-confirm');
    const continueBtn = document.getElementById('onboarding-continue-btn');

    if (ageConfirm && continueBtn) {
        // Toggle the Connect Now button based on age gate
        ageConfirm.addEventListener('change', () => {
            continueBtn.disabled = !ageConfirm.checked;
        });

        // Mobile touch logic to help with checkbox bugs
        const checkboxLabel = ageConfirm.closest('label');
        if (checkboxLabel) {
            checkboxLabel.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    continueBtn.disabled = !ageConfirm.checked;
                }, 50);
            });
        }

        // Finalize setup and connect
        continueBtn.addEventListener('click', () => {
            if (ageConfirm.checked) {
                const onboardingModal = document.getElementById('onboarding-modal');
                if (onboardingModal) {
                    onboardingModal.style.display = 'none';
                    onboardingModal.classList.remove('active');
                }
                initChat();
            }
        });
    }
    const settingsBtn = document.getElementById('settings-btn');
    console.log('Settings button found:', settingsBtn);
    if (settingsBtn) {
        settingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Settings button clicked!');
            showModal('settings');
        });
    } else {
        console.error('Settings button not found!');
    }

    // Settings changes
    ['sound-toggle', 'notif-toggle', 'enter-send', 'font-size'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', saveSettings);
        }
    });

    // Background options
    document.querySelectorAll('.bg-option').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.bg-option').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const bg = btn.dataset.bg;
            const container = document.querySelector('.chat-container');
            container.className = 'chat-container';
            if (bg !== 'default') container.classList.add('bg-' + bg);
            state.settings.chatBackground = bg;
            saveSettings();
        });
    });

    // Cancel search
    document.getElementById('cancel-search-btn').addEventListener('click', cancelSearch);

    // Message input
    const input = document.getElementById('message-input');
    input.addEventListener('input', handleInputChange);

    // Event delegation for reactions and replies
    document.addEventListener('click', (e) => {
        // Tap on message bubble shows reaction picker (WhatsApp style)
        if (e.target.classList.contains('bubble') || e.target.closest('.bubble')) {
            const bubble = e.target.classList.contains('bubble') ? e.target : e.target.closest('.bubble');
            const messageId = bubble.dataset.messageId;

            // Don't show reactions if clicking on quote (which has its own handler)
            if (e.target.classList.contains('message-quote') || e.target.closest('.message-quote')) {
                return;
            }

            if (messageId) {
                showReactionPicker(messageId, bubble);
            }
        }

        // Reply button handler
        if (e.target.classList.contains('reply-btn')) {
            const messageId = parseInt(e.target.dataset.messageId);
            const message = getMessageById(messageId);
            if (message) {
                setReplyMode(message);
            }
        }
    });

    // Typing indicator: Set typing status when user types
    let typingTimeout;
    input.addEventListener('input', () => {
        if (state.chatId && state.isConnected) {
            setTypingStatus(true);

            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                setTypingStatus(false);
            }, 1500);
        }
    });
    input.addEventListener('keypress', handleKeyPress);

    // Send button
    document.getElementById('send-btn').addEventListener('click', handleSendMessage);
    // Mobile touch support for send button
    document.getElementById('send-btn').addEventListener('touchend', (e) => {
        e.preventDefault();
        handleSendMessage();
    });

    // Mobile input focus fix
    const msgInput = document.getElementById('message-input');
    msgInput.addEventListener('touchend', (e) => {
        e.stopPropagation();
        msgInput.focus();
    });

    // Navigation
    // Back button (leave chat) - show leave chat modal with options
    const leaveBtn = document.getElementById('leave-chat-btn');
    if (leaveBtn) {
        leaveBtn.addEventListener('click', () => {
            if (state.isConnected) {
                showModal('leave-chat');  // showModal adds '-modal' suffix
            } else {
                goHome();
            }
        });
    }

    // Next button - show leave chat modal with options
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

    // Modals
    const reportBtn = document.getElementById('report-btn');
    const blockBtn = document.getElementById('block-btn');
    const giftBtn = document.getElementById('gift-btn');
    const gameBtn = document.getElementById('gameBtn');
    const questionBtn = document.getElementById('questionBtn');
    const drawBtn = document.getElementById('drawBtn');

    // Click events for desktop
    if (reportBtn) reportBtn.addEventListener('click', () => showModal('report'));
    if (blockBtn) blockBtn.addEventListener('click', () => showModal('block'));
    if (giftBtn) giftBtn.addEventListener('click', () => showModal('gift'));
    if (gameBtn) gameBtn.addEventListener('click', openGameModal);
    if (questionBtn) questionBtn.addEventListener('click', showQuestionPicker);
    if (drawBtn) drawBtn.addEventListener('click', () => showModal('drawing'));

    // Touch events for mobile (prevents issues on some mobile browsers)
    if (reportBtn) reportBtn.addEventListener('touchend', (e) => { e.preventDefault(); showModal('report'); });
    if (blockBtn) blockBtn.addEventListener('touchend', (e) => { e.preventDefault(); showModal('block'); });
    if (giftBtn) giftBtn.addEventListener('touchend', (e) => { e.preventDefault(); showModal('gift'); });
    if (gameBtn) gameBtn.addEventListener('touchend', (e) => { e.preventDefault(); openGameModal(); });
    if (questionBtn) questionBtn.addEventListener('touchend', (e) => { e.preventDefault(); showQuestionPicker(); });
    if (drawBtn) drawBtn.addEventListener('touchend', (e) => { e.preventDefault(); showModal('drawing'); });

    // More Options Menu Toggle
    const moreOptionsBtn = document.getElementById('more-options-btn');
    const moreOptionsMenu = document.getElementById('more-options-menu');

    if (moreOptionsBtn && moreOptionsMenu) {
        // Toggle function
        function toggleMenu(e) {
            e.preventDefault();
            e.stopPropagation();
            moreOptionsMenu.classList.toggle('hidden');
        }

        // Desktop click
        moreOptionsBtn.addEventListener('click', toggleMenu);

        // Mobile touch - use touchstart for faster response
        moreOptionsBtn.addEventListener('touchstart', toggleMenu, { passive: false });

        // Close menu when tapping outside
        document.addEventListener('touchstart', (e) => {
            if (!moreOptionsMenu.contains(e.target) && !moreOptionsBtn.contains(e.target)) {
                moreOptionsMenu.classList.add('hidden');
            }
        }, { passive: true });

        // Close menu when clicking outside (desktop)
        document.addEventListener('click', (e) => {
            if (!moreOptionsMenu.contains(e.target) && !moreOptionsBtn.contains(e.target)) {
                moreOptionsMenu.classList.add('hidden');
            }
        });

        // Close menu after selecting an option
        moreOptionsMenu.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('touchstart', () => {
                setTimeout(() => moreOptionsMenu.classList.add('hidden'), 100);
            }, { passive: true });
            item.addEventListener('click', () => {
                moreOptionsMenu.classList.add('hidden');
            });
        });
    }

    // Truth or Dare buttons
    const truthBtn = document.getElementById('truth-btn');
    const dareBtn = document.getElementById('dare-btn');
    const sendGameBtn = document.getElementById('send-game-btn');

    if (truthBtn) truthBtn.addEventListener('click', getTruth);
    if (dareBtn) dareBtn.addEventListener('click', getDare);
    if (sendGameBtn) sendGameBtn.addEventListener('click', sendGameResult);

    // Toolbar buttons are now handled by initNewEmojiPicker, initNewGifPanel, initNewDrawingCanvas
    // Game button now opens Truth or Dare modal (handled above at line 1953)

    // Close pickers on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllPickers();
        }
    });

    // Feedback form handling
    const feedbackTextarea = document.getElementById('feedback-message');
    const feedbackCount = document.getElementById('feedback-count');

    if (feedbackTextarea && feedbackCount) {
        feedbackTextarea.addEventListener('input', function () {
            const length = this.value.length;
            feedbackCount.textContent = `${length} / 500`;
        });
    }

    // Report options
    document.querySelectorAll('.report-option').forEach(btn => {
        btn.addEventListener('click', () => submitReport(btn.dataset.reason));
    });

    // Initialize rating modal interactions
    initRatingModal();

    // Close modals on backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    });

    // Notifications permission
    document.getElementById('notif-toggle').addEventListener('change', async (e) => {
        if (e.target.checked && Notification.permission !== 'granted') {
            const perm = await Notification.requestPermission();
            if (perm !== 'granted') {
                e.target.checked = false;
                showToast('Notifications blocked by browser');
            }
        }
    });

    // Stats
    listenForOnlineCount();
    listenForChatCount();

    // Cleanup on unload
    window.addEventListener('beforeunload', () => {
        if (state.isConnected) disconnectChat();
        if (state.userId) leaveQueue();
    });

    console.log('✅ Omega Connect Enhanced initialized');
});

// Global functions
// Confirm leave chat function
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

// Expose functions globally
window.showModal = showModal;
window.closeModal = closeModal;
window.findNewChat = findNewChat;
window.goHome = goHome;
window.blockUser = blockUser;
window.startGame = startGame;
window.sendConfession = sendConfession;
window.confirmLeaveChat = confirmLeaveChat;
window.saveChat = saveChat;

/* ===============================
   iOS INPUT & KEYBOARD FIXES
   =============================== */

// Re-select elements as DOM might have changed
const chatInputFixed = document.getElementById("message-input");
const msgsContainerFixed = document.getElementById("chatMessages");

if (chatInputFixed && msgsContainerFixed) {
    chatInputFixed.addEventListener("focus", () => {
        setTimeout(() => {
            msgsContainerFixed.scrollTop = msgsContainerFixed.scrollHeight;
            // Scroll to bottom when keyboard opens
            window.scrollTo(0, document.body.scrollHeight);
        }, 300);
    });
}

/* iOS viewport resize fix */
let lastHeight = window.innerHeight;

window.addEventListener("resize", () => {
    const vh = window.innerHeight;
    if (vh < lastHeight) {
        document.body.classList.add("keyboard-open");
        if (msgsContainerFixed) {
            msgsContainerFixed.scrollTop = msgsContainerFixed.scrollHeight;
        }
    } else {
        document.body.classList.remove("keyboard-open");
    }
    lastHeight = vh;
});

function haptic() {
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", haptic);
});

// iOS Touch Fix
document.addEventListener("touchstart", () => { }, { passive: true });

/* ===============================
   SMART REPLIES LOGIC
   =============================== */

const SMART_REPLY_MAP = [
    { match: /where.*from/i, replies: ["India 🇮🇳", "USA 🇺🇸", "Just asking!", "Guess?"] },
    { match: /how.*are.*you|sup|wassup/i, replies: ["Doing good 😊", "Pretty chill", "Could be better", "Great! You?"] },
    { match: /what.*do.*fun|hobb/i, replies: ["Music 🎧", "Movies 🎬", "Just relaxing", "Gaming 🎮"] },
    { match: /favorite.*food/i, replies: ["Pizza 🍕", "Biryani 😋", "Pasta 🍝", "Sushi 🍣"] },
    { match: /name/i, replies: ["I prefer to stay anon", "Just a stranger", "Call me user1"] },
    { match: /asl/i, replies: ["Not sharing that", "Just here to chat", "Ask something else"] },
    { match: /bye|leaving/i, replies: ["Bye! 👋", "See ya", "Take care"] },
    { match: /.*/, replies: ["Tell me more", "That’s interesting", "Haha 😄", "Cool"] }
];

function showSmartReplies(text) {
    const smartRepliesEl = document.getElementById("smartReplies");
    const chatInput = document.getElementById("message-input");

    if (!smartRepliesEl || !chatInput || !text) return;

    smartRepliesEl.innerHTML = "";

    // Find matching replies
    const match = SMART_REPLY_MAP.find(r => r.match.test(text));
    if (!match) return;

    // Shuffle and pick up to 4 replies
    const replies = [...match.replies].sort(() => 0.5 - Math.random()).slice(0, 4);

    replies.forEach(replyText => {
        const chip = document.createElement("div");
        chip.className = "smart-reply";
        chip.textContent = replyText;

        chip.addEventListener("click", () => {
            chatInput.value = replyText;
            chatInput.focus();
            hideSmartReplies();
            // Optional: Auto-send or let user send? User asked to populate input
        });

        smartRepliesEl.appendChild(chip);
    });

    smartRepliesEl.classList.remove("hidden");

    // Auto-hide after 15 seconds if ignored
    setTimeout(hideSmartReplies, 15000);
}

function hideSmartReplies() {
    const smartRepliesEl = document.getElementById("smartReplies");
    if (smartRepliesEl) smartRepliesEl.classList.add("hidden");
}

// Hide replies when user types
const chatInputEl = document.getElementById("message-input");
if (chatInputEl) {
    chatInputEl.addEventListener("input", hideSmartReplies);
}

/* ===============================
   SESSION RECONNECT LOGIC
   =============================== */

const reconnectBtn = document.getElementById("reconnectBtn");
const lastSessionId = localStorage.getItem("lastSessionId");

async function checkPreviousSession() {
    if (!lastSessionId || !reconnectBtn) return;

    try {
        const snap = await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${lastSessionId}`).get();
        if (!snap.exists()) return;

        const session = snap.val();
        // Check if alive (< 2 minutes)
        if (Date.now() - session.lastActive < 120000) {
            reconnectBtn.classList.remove("hidden");
        }
    } catch (e) { }
}

if (reconnectBtn) {
    reconnectBtn.addEventListener("click", async () => {
        if (!lastSessionId) return;

        const snap = await db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${lastSessionId}`).get();

        if (!snap.exists()) {
            showToast("Chat no longer available.");
            reconnectBtn.classList.add("hidden");
            localStorage.removeItem("lastSessionId");
            localStorage.removeItem("lastStrangerId");
            return;
        }

        const session = snap.val();
        if (Date.now() - session.lastActive > 120000) {
            showToast("Session expired.");
            reconnectBtn.classList.add("hidden");
            localStorage.removeItem("lastSessionId");
            return;
        }

        // Reconnect logic
        state.partnerId = state.userId === session.userA ? session.userB : session.userA;
        state.chatId = lastSessionId;

        // Restore connection
        await startChat();

        // Update timestamp
        db.ref(`${CONFIG.PATHS.ACTIVE_CHATS}/${lastSessionId}/lastActive`).set(firebase.database.ServerValue.TIMESTAMP);
    });
}

// Check on load
checkPreviousSession();

// Cleanup old sessions (run once on load for maintenance, ideally server-side but per request)
db.ref(CONFIG.PATHS.ACTIVE_CHATS).once("value", snap => {
    snap.forEach(child => {
        // 5 min timeout
        if (Date.now() - child.val().lastActive > 300000) {
            child.ref.remove();
        }

    });
});

/* ===============================
           EXIT CHAT CONFIRMATION
           =============================== */

// Browser back button handling
let isInChat = false;

// Intercept browser back button
window.addEventListener("popstate", (e) => {
    if (isInChat && state.isConnected) {
        // Prevent back navigation by pushing state again
        history.pushState({ chat: true }, "", location.href);
        showModal('leave-chat');  // Show leave chat modal
    }
});
