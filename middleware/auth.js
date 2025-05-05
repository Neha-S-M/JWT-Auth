const jwt = require("jsonwebtoken");
const Student = require("../src/student/studentModel")
const auth = async(req,res,next)=>{
    try
    {
      const token =   req.header("Authorization").replace("Bearer ","")
      const decoded =  jwt.verify(token,"john2")
      const student = await Student.findOne(
      {
        _id:decoded._id,
        "tokens.token":token
      })
      if(!student){
        throw new Error()
      }
      req.student = student;
      next()
    }
    catch(error)
    {
        res.status(401).send({error: "Please Auth"})
    }
}
module.exports = auth