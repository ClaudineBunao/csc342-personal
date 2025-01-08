const crypto = require('crypto');
const { maxHeaderSize } = require('http');

function generateSessionId() {
    return crypto.randomBytes(6).toString('hex');
}

const sessions = {};

const SESSION_COOKIE_NAME = 'NCParks';


function generateEmptySession() {
    return {
        visitedParks: [],
        createdAt: new Date(),
    };
}

//export it as the default export. This function will be responsible for recovering a session from a cookie if it exists, or for establishing a new session if one doesn't exist.
function SessionCookieMiddleware(req, res, next) {
    let newSessionId;
    // let sessionId;
    //if the request has a cookie with the name SESSION_COOKIE_NAME, then we will use that cookie to recover the session. If not, we will create a new session.
    if (req.cookies[SESSION_COOKIE_NAME]) {
        //if the session exists, we will use the session id to recover the session from the sessions object.
        let sessionId = req.cookies[SESSION_COOKIE_NAME];

        if (!sessions[sessionId]) {
            sessions[sessionId] = generateEmptySession();
        }
        req.session = sessions[sessionId];

        console.log('Oh look,', sessionId, 'is back!', req.session);
    } else {
        //if the session does not exist, we will create a new session and assign it to the req.session object.
        // Get the session ID from the cookie
        let newSessionId = generateSessionId();
        console.log('New session ID:', newSessionId);
        // Check that we have a session for this session ID in the sessions object. 
        // If not, create a new session and assign it to the req.session object.
        sessions[newSessionId] = generateEmptySession();
        req.session = sessions[newSessionId];
        //Configure this to be a secure, HTTP-only cookie that expires in 2 minutes
        res.cookie(SESSION_COOKIE_NAME, newSessionId, {
            secure: true,
            httpOnly: true,
            maxAge: 1000 * 60 * 2    //2 minutes
        }); //send session ID in cookie back to the client
        console.log('We have a new visitor!', newSessionId, req.session);
    }
    next();
    //Store the session object in the sessions object using the session ID as the key
    // sessions[sessionId] = req.session;

    //Set a cookie in the response with the session ID.
    // res.cookie(SESSION_COOKIE_NAME, newSessionId);
}

module.exports = SessionCookieMiddleware;