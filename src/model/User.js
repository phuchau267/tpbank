const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
//import plugin slug mongoose



const User = new Schema({
  username: { type: String },
  password:{ type: String },
  role:{ type: String, default:'user' },
  client:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"

    }]
}, {
  timestamps: true
});




  //               mongoose.model('ModelName', mySchema);
  module.exports = mongoose.model('User', User);