const howls = require('./howls.json');

//default export doesn't need a name, anonymous
module.exports = {
    getHowls: () => {
      return new Promise((resolve, reject) => {
        //retrieve all the howls
        resolve(howls);
      });
    },
  };

