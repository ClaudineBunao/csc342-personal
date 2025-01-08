const howls = require('./howls.json');

//default export doesn't need a name, anonymous
module.exports = {
  getHowls: () => {
    return new Promise((resolve, reject) => {
      //retrieve all the howls
      resolve(howls);
    });
  },


  createHowl: (message) => {
    return new Promise((resolve, reject) => {
      const newHowl = {
        user: '@student',
        message: message
      };
      howls.push(newHowl);
      resolve(newHowl);

    });
  }
};