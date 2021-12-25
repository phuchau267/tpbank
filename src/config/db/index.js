const mongoose = require('mongoose');

 async function connect() {
     try {
        await mongoose.connect('mongodb://mongodb:27017/tpbankfico', {
         
        });
          console.log('connect success');
        } catch (e) {
          console.log('connect failed '+e );
        }
    }

module.exports = { connect };
