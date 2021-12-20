const mongoose        = require('mongoose');
const Schema          = mongoose.Schema;
//import plugin slug mongoose



const Job = new Schema({
  name: { type: String },
  yearborn:{ type: Number },
  cmnd:{ type: String },
  phone:{ type: String },
  email:{ type: String ,default:'khong co'},
  address:{ type: String },
  level:{ type: String },
  exp:{ type: String },
  
}, {
  timestamps: true
});




  //               mongoose.model('ModelName', mySchema);
  module.exports = mongoose.model('Job', Job);