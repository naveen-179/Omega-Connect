const functions = require('firebase-functions');
const admin = require('firebase-admin');
const crypto = require('crypto');

admin.initializeApp();

const db = admin.database();

exports.verifyAge = functions.https.onRequest(async (req, res) => {
    // CORS configuration
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    try {
        const { day, month, year, sessionId } = req.body || {};
        
        if (!day || !month || !year || !sessionId) {
            res.status(400).json({ error: 'Missing parameters' });
            return;
        }

        // Generate SHA-256 hash of the sessionId
        const hashedSessionId = crypto.createHash('sha256').update(sessionId).digest('hex');

        // Check if session is already banned/blocked
        const banSnap = await db.ref(`bannedSessions/${hashedSessionId}`).once('value');
        if (banSnap.exists()) {
            res.status(403).json({ error: 'Under 18 Blocked' });
            return;
        }

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < 18) {
            // Log session ban to prevent retries
            await db.ref(`bannedSessions/${hashedSessionId}`).set({
                timestamp: admin.database.ServerValue.TIMESTAMP,
                reason: 'under-18'
            });
            res.status(200).json({ verified: false });
            return;
        }

        // Store verification log (no raw birthdate stored!)
        const ageBracket = age < 25 ? '18-24' : (age < 35 ? '25-34' : '35+');
        await db.ref(`verificationLogs/${hashedSessionId}`).set({
            timestamp: admin.database.ServerValue.TIMESTAMP,
            ageBracket: ageBracket
        });

        res.status(200).json({ verified: true });

    } catch (error) {
        console.error('verifyAge Cloud Function error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
