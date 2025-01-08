const jwtAlgorithm = require('./jwtAlgorithm');
const TOKEN_COOKIE_NAME = "mp5_token";
const API_SECRET = "random";

exports.TokenMiddleware = (req, res, next) => {
  let token = null;
  if (req.cookies[TOKEN_COOKIE_NAME]) {
    token = req.cookies[TOKEN_COOKIE_NAME];
  } else if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwtAlgorithm.verify(token, API_SECRET);
      req.user = decoded;
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    return res.status(401).json({ message: 'No token provided' });
  }

  next();
};

// exports.generateToken = (req, res, user) => {
//   console.log(user);
//   const payload = {
//     user: user,
//     exp: Math.floor(Date.now() / 1000) + (60 * 60)
//   };

//   const token = jwtAlgorithm.sign(payload, API_SECRET);
//   res.cookie(TOKEN_COOKIE_NAME, token, {
//     secure: true,
//     httpOnly: true,
//     maxAge: 2 * 60 * 1000
//   });
//   return token;
// };

exports.removeToken = (req, res) => {
  console.log("removing token");
  res.cookie(TOKEN_COOKIE_NAME, "", {
    httpOnly: true,
    secure: true,
    // maxAge: -360000
    maxAge: 0

  });
};


// module.exports = {
//   TOKEN_COOKIE_NAME,
// };

// exports.TokenMiddleware = (req, res, next) => {
  
//   let token = null;
//   if (req.cookies[TOKEN_COOKIE_NAME]) {
//     token = req.cookies[TOKEN_COOKIE_NAME];
//   } else { //No cookie, so let's check Authorization header
//     const authHeader = req.get('Authorization');
//     if (authHeader && authHeader.startsWith("Bearer ")) {
//       //Format should be "Bearer token" but we only need the token
//       token = authHeader.split(" ")[1].trim();
//     }
//   }
//   if (!token) {
//     res.status(401).json({ error: 'Not Authenticated' });
//     return;
//   } else {
//     // Verify the token
//     try {
//       //verify returns the payload and decodes the token
//       //json string parse it as an obj and returns it
//       const payload = jwtAlgorithm.verify(token, API_SECRET);
//       req.user = payload.user;
//       console.log(payload);
//       next(); //call the next middleware
//     } catch (error) {
//       res.status(401).json({ error: 'Not Authenticated' });
//       return;
//     }
//   }



// }

// //generate when user logs in
// exports.generateToken = (req, res, user) => {
//   // Create the payload that claims we want to store for this token
//   // store the user on a private claim called user 
//   //expiration time of 1 hour in the exp registered claim. The expiration time should be a Unix timestamp in seconds. We can get the current time in milliseconds by calling Date.now().
//   console.log(user);
//   const payload = {
//     user: user,
    
//     //seconds rn convert to milliseconds and add 1 hour
//     exp: Math.floor(Date.now() / 1000) + (60 * 60)
//   };

//   // Generate a token and set it in the cookie
//   //has header payload and signature
//   const token = jwtAlgorithm.sign(payload, API_SECRET);
//   res.cookie(TOKEN_COOKIE_NAME, token, {
//     secure: true,
//     httpOnly: true,
//     //this session expires in 2 minutes but token is valid for an hour
//     maxAge: 2 * 60 * 1000
//   });
//   return token;
// };
