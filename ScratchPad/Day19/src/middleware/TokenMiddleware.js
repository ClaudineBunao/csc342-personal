const jwt = require('jsonwebtoken');
const TOKEN_COOKIE_NAME = "NCParksToken";
const API_SECRET = "random";
// Create your own secret key for the token here.
// In a real application, you will never hard-code this secret and you will
// definitely never commit it to version control, ever

exports.TokenMiddleware = (req, res, next) => {
  // We will look for the token in two places:
  // 1. A cookie in case of a browser
  // 2. The Authorization header in case of a different client
  let token = null;
  if (req.cookies[TOKEN_COOKIE_NAME]) {
    token = req.cookies[TOKEN_COOKIE_NAME];
  } else { //No cookie, so let's check Authorization header
    const authHeader = req.get('Authorization');
    if (authHeader && authHeader.startsWith("Bearer ")) {
      //Format should be "Bearer token" but we only need the token
      token = authHeader.split(" ")[1].trim();
    }
  }
  if (!token) {
    res.status(401).json({ error: 'Not Authenticated' });
    return;
  } else {
    // Verify the token
    try {
      //verify returns the payload and decodes the token
      //json string parse it as an obj and returns it
      const payload = jwt.verify(token, API_SECRET);
      req.user = payload.user;
      console.log(payload);
      next(); //call the next middleware
    } catch (error) {
      res.status(401).json({ error: 'Not Authenticated' });
      return;
    }
  }



}

//generate when user logs in
exports.generateToken = (req, res, user) => {
  // Create the payload that claims we want to store for this token
  // store the user on a private claim called user 
  //expiration time of 1 hour in the exp registered claim. The expiration time should be a Unix timestamp in seconds. We can get the current time in milliseconds by calling Date.now().
  console.log(user);
  const payload = {
    user: user,
    
    //seconds rn convert to milliseconds and add 1 hour
    exp: Math.floor(Date.now() / 1000) + (60 * 60)
  };

  // Generate a token and set it in the cookie
  //has header payload and signature
  const token = jwt.sign(payload, API_SECRET);
  res.cookie(TOKEN_COOKIE_NAME, token, {
    secure: true,
    httpOnly: true,
    //this session expires in 2 minutes but token is valid for an hour
    maxAge: 2 * 60 * 1000
  });
  return token;
};

//remove when user logs out
exports.removeToken = (req, res) => {
  //send session if in cookie to client 
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    maxAge: -360000 //a date in the past

  });
};
