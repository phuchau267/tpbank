const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
//import plugin slug mongoose



const Client = new Schema({
  name: { type: String },
  birthDay:{ type: Number },
  birthMonth:{ type: Number },
  birthYear:{ type: Number },
  cmnd:{ type: String },
  phone:{ type: String },
  email:{ type: String ,default:'khong co'},
  address:{ type: String },
  status:{type:Boolean,default:false},
  product:{ type: String,default:'0' },
  money:{ type: String,default:'0' },
  user:{type: String,default:'khong co'},
  deleteRequest:{type:Boolean,default:false},

}, {
  timestamps: true
});




  //               mongoose.model('ModelName', mySchema);
  module.exports = mongoose.model('Client', Client);