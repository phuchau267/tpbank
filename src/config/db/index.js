const mongoose = require('mongoose');
const {MONGO_HOST,MONGO_PORT} = require('../dbs-config');
 async function connect() {
     try {
        await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/tpbankfico`, {
         
        });
          console.log('connect success');
        } catch (e) {
          console.log('connect failed '+e );
        }
    }

module.exports = { connect };
