const crypto = require('crypto');

const sessions = {};
const SESSION_COOKIE_NAME = "NCParks";

module.exports.initializeSession = (req, res, user) => {
  //Create a constant called sessionId and set it to a random 64-byte hex string.
  const sessionId = crypto.randomBytes(64).toString('hex');
  //Create a new SessionData object with the data we want to 
  //store in this session: the user, an array of visited parks, 
  // and the timestamp of when the session was created.
  const sessionData = {
    user: user,
    visitedParks: [],
    createdAt: new Date(),
  };

  // Store this session data in the sessions object using the sessionId as the key
  sessions[sessionId] = sessionData;
  
  res.cookie(SESSION_COOKIE_NAME, sessionId, { 
    httpOnly: true, 
    secure: true,
    maxAge: 60 * 2 * 1000

  });
};


module.exports.removeSession = (req, res) => {
  const sessionId = req.cookies[SESSION_COOKIE_NAME]
  if(sessionId){
    delete session[sessionId];
  }
  res.cookie(SESSION_COOKIE_NAME, "",{
    httpOnly: true,
    secure: true,
    maxAge: -360000
  });
};


module.exports.CookieAuthMiddleware = (req, res, next) => {
  if(!req.cookies[SESSION_COOKIE_NAME]){
    res.status(401).json({error:'Not Authenticated'});
    return;
  }

  let sessionId = req.cookies[SESSION_COOKIE_NAME];
  if(!sessions[sessionId]){
    this.removeSession(req, res);
    res.status(401).json({error:'Not Authenticated'});
    return;
  } else {
    req.session = session[sessionId];
    next();
  }
};
