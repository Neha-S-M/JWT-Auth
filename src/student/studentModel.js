const mongoose = require("mongoose")
const bcrypt = require( 'bcrypt' );
const jwt = require("jsonwebtoken");

var Schema  = mongoose.Schema;

var studentSchema = new Schema(
    {
        name: {
            type:String,
            required: true
        },
        address: {
            type:String,
            required: true
        },
        phone: {
            type:Number,
            required: true
        },
        password:{
            type: String,
            trim: true,
            required : true
        },
        tokens:[
            {
                token:{
                    type:String,
                }
            }
        ]
        
    }
);

studentSchema.pre("save", async function (next) {
    const student = this;
    if (student.isModified("password")) {
      student.password = await bcrypt.hash(student.password, 8);
    }
    next();
  });
  studentSchema.statics.findByCredentials = async (name,password)=>{
    const student = await Student.findOne({name})
   
           
        const isMatch = await bcrypt.compare(password,student.password)
            if(!isMatch)
            {
                throw new Error()
            }
            return student
  }
  studentSchema.methods.generateAuthToken = async function(){
    const student = this;
    const token = jwt.sign({_id: student._id.toString()},"mysecret")
    student.tokens = student.tokens.concat({token})
    await student.save()
    return token;
}

  const Student = mongoose.model('student',studentSchema);
  module.exports = Student
