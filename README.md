# StrangerTalk - Anonymous Chat Website

A real-time anonymous stranger chat website built with vanilla JavaScript and Firebase Realtime Database. No frameworks, no signup required.

## Features

- **Instant anonymous chatting** - No login or email required
- **Random username generation** - e.g., Stranger_4829
- **Real-time messaging** - Powered by Firebase Realtime Database
- **Typing indicators** - See when the other person is typing
- **One-click matching** - Automatic pairing of users
- **Next chat** - Skip to a new stranger instantly
- **Safety features** - Report, block, and bad-word filtering
- **Mobile-first design** - Works great on all devices
- **Dark mode** - Easy on the eyes

## Project Structure

```
Omega/
├── index.html          # Main HTML file
├── style.css           # All styles (mobile-first, dark mode)
├── script.js           # Main application logic
├── firebase-config.js  # Firebase configuration
└── README.md           # This file
```

## Firebase Setup Guide

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name (e.g., "stranger-talk")
4. Disable Google Analytics (not needed for this project)
5. Click **"Create project"**

### Step 2: Add a Web App

1. In your project dashboard, click the web icon (`</>`)
2. Enter app nickname (e.g., "StrangerTalk Web")
3. Check **"Also set up Firebase Hosting"** (optional but recommended)
4. Click **"Register app"**
5. Copy the `firebaseConfig` object

### Step 3: Update firebase-config.js

Open `firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyB...",           // Your actual API key
    authDomain: "your-project.firebaseapp.com",
    databaseURL: "https://your-project-default-rtdb.firebaseio.com",
    projectId: "your-project",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### Step 4: Enable Realtime Database

1. In Firebase Console sidebar, click **"Realtime Database"**
2. Click **"Create Database"**
3. Choose the location closest to your users
4. Select **"Start in test mode"** (we'll secure it next)
5. Click **"Enable"**

### Step 5: Set Database Security Rules

Go to **Realtime Database > Rules** and paste:

```json
{
  "rules": {
    // Queue for matching users
    "queue": {
      ".read": true,
      ".write": true,
      "$userId": {
        ".validate": "newData.hasChildren(['id', 'username', 'timestamp', 'status'])",
        "id": { ".validate": "newData.isString() && newData.val().length <= 50" },
        "username": { ".validate": "newData.isString() && newData.val().length <= 20" },
        "timestamp": { ".validate": "newData.isNumber()" },
        "status": { ".validate": "newData.isString() && newData.val().matches(/^(waiting|matched)$/)" },
        "partnerId": { ".validate": "newData.isString()" },
        "partnerName": { ".validate": "newData.isString()" },
        "chatId": { ".validate": "newData.isString()" }
      }
    },

    // Chat rooms
    "chats": {
      ".read": true,
      ".write": true,
      "$chatId": {
        "users": {
          "$userId": {
            "id": { ".validate": "newData.isString()" },
            "username": { ".validate": "newData.isString()" },
            "typing": { ".validate": "newData.isBoolean()" },
            "connected": { ".validate": "newData.isBoolean()" }
          }
        },
        "messages": {
          "$messageId": {
            ".validate": "newData.hasChildren(['senderId', 'text', 'timestamp'])",
            "senderId": { ".validate": "newData.isString()" },
            "senderName": { ".validate": "newData.isString()" },
            "text": { ".validate": "newData.isString() && newData.val().length <= 1000" },
            "timestamp": { ".validate": "newData.isNumber()" }
          }
        },
        "createdAt": { ".validate": "newData.isNumber()" },
        "status": { ".validate": "newData.isString()" }
      }
    },

    // Reports (write-only for users)
    "reports": {
      ".read": false,
      ".write": true,
      "$reportId": {
        ".validate": "newData.hasChildren(['reporterId', 'reportedId', 'reason', 'timestamp'])"
      }
    },

    // Statistics
    "stats": {
      ".read": true,
      ".write": true
    }
  }
}
```

**Note:** These rules allow read/write access for the app to function. For production, consider adding authentication and stricter validation.

## Firebase Data Structure

```
├── queue/
│   └── {userId}/
│       ├── id: "user_123..."
│       ├── username: "Stranger_4829"
│       ├── timestamp: 1699999999999
│       ├── status: "waiting" | "matched"
│       ├── partnerId: "user_456..." (when matched)
│       ├── partnerName: "Stranger_7621" (when matched)
│       └── chatId: "user_123_user_456" (when matched)
│
├── chats/
│   └── {chatId}/
│       ├── users/
│       │   ├── {userId1}/
│       │   │   ├── id, username, typing, connected
│       │   └── {userId2}/
│       │       └── id, username, typing, connected
│       ├── messages/
│       │   └── {messageId}/
│       │       ├── senderId, senderName, text, timestamp
│       ├── createdAt: 1699999999999
│       └── status: "active"
│
├── reports/
│   └── {reportId}/
│       ├── reporterId, reportedId, reportedName
│       ├── reason: "harassment" | "spam" | etc.
│       ├── chatId
│       └── timestamp
│
└── stats/
    └── dailyChats/
        └── {date}: count
```

## Deployment Options

### Option 1: Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize hosting in your project directory:
```bash
firebase init hosting
```
   - Select your Firebase project
   - Set public directory to `.` (current directory)
   - Configure as single-page app: **No**
   - Don't overwrite index.html

4. Deploy:
```bash
firebase deploy --only hosting
```

Your site will be live at: `https://your-project.web.app`

### Option 2: Manual Upload to Any Static Host

Since this is a static site, you can upload the files to:
- **Netlify** - Drag and drop the folder
- **Vercel** - Connect to Git or drag and drop
- **GitHub Pages** - Push to a repository
- **Any web server** - Upload via FTP/SFTP

## Adding Google AdSense

1. Sign up at [Google AdSense](https://www.google.com/adsense/)
2. Get your ad unit code
3. Replace the ad placeholder divs in `index.html`:

```html
<!-- Replace this -->
<div class="ad-placeholder" id="ad-top">
    <span>Advertisement</span>
</div>

<!-- With this -->
<div class="ad-container" id="ad-top">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
         data-ad-slot="XXXXXXXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
</div>
```

## Customization

### Changing Colors

Edit the CSS variables in `style.css`:

```css
:root {
    --accent-primary: #6c5ce7;     /* Main accent color */
    --accent-secondary: #00cec9;    /* Secondary accent */
    --bg-primary: #0a0a0f;          /* Main background */
    /* ... */
}
```

### Adding More Bad Words

Edit the `BAD_WORDS` array in `script.js`:

```javascript
const BAD_WORDS = [
    'word1', 'word2', 'word3',
    // Add more words here
];
```

### Changing Username Format

Edit in `script.js`:

```javascript
const CONFIG = {
    USERNAME_PREFIX: 'Stranger_',  // Change prefix
    // ...
};

function generateUsername() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return CONFIG.USERNAME_PREFIX + randomNum;
}
```

## Security Considerations

For production use, consider:

1. **Rate limiting** - Prevent spam by limiting messages per minute
2. **IP blocking** - Block abusive IP addresses
3. **Better profanity filter** - Use a comprehensive API or library
4. **Firebase App Check** - Protect against abuse
5. **Server-side validation** - Use Cloud Functions for sensitive operations
6. **Data retention policy** - Auto-delete old chats

## Scaling Considerations

For high traffic:

1. **Use Firebase indexes** for faster queries
2. **Implement sharding** for the queue
3. **Use Cloud Functions** for matching logic
4. **Set up monitoring** with Firebase Analytics
5. **Enable caching** at CDN level

## Troubleshooting

### "Permission denied" error
- Check your Firebase Database Rules
- Make sure the rules allow read/write access

### Messages not appearing
- Verify your `databaseURL` in firebase-config.js
- Check browser console for errors
- Ensure Firebase SDK is loaded

### Matching not working
- Check if queue entries are being created
- Look at the Firebase Console to see queue data
- Verify both users have unique IDs

## License

MIT License - Feel free to use and modify for your projects.

## Support

For issues and feature requests, please open an issue on GitHub.

---

**Built with ❤️ using vanilla JavaScript and Firebase**
