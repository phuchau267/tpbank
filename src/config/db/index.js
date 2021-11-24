const mongoose = require('mongoose');

 async function connect() {
     try {
        await mongoose.connect('mongodb://localhost:27017/vay', {
           
          });
          console.log('connect success');
        } catch (e) {
         console.log('connect failed '+e );
        }
    }

module.exports = { connect };
