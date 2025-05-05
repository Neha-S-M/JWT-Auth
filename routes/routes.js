const express = require("express")
const router = express.Router();


var studentModel = require('../src/student/studentModel');
const Student = require("../src/student/studentModel");
const auth = require("../middleware/auth");

router.post("/students/login", async (req,res)=>{
  try{
      const student = await Student.findByCredentials(req.body.name,req.body.password)
      
      const token = await student.generateAuthToken()

      res.send({student,token})
    
  }
  catch(error)
  {
      res.status(401).send()
  }
})

router.post('/student/create',auth, async (req, res) => {
    try {
      const student = new studentModel(req.body);
      await student.validate(); // Validate the input data
  
      await student.save();
      res.status(201).send({
        status: true,
        message: "Student Created !"
      });
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.get('/students',auth, async(req,res)=>{
   
    try{
         const students = await studentModel.find({});
         res.send(students);
    }
    catch(error)
    {
         res.status(400).send(error);
    }
 });

 router.get('/students/me',auth, async(req,res)=>{
   
  try{
       const _id = req.student._id;
       const students = await studentModel.findById({_id});
      if(!students)
      {
          return res.status(404).send();
      }  
      return res.status(200).send(students); 
  }
  catch(error)
  {
       res.status(400).send(error);

  }
});


router.patch('/students/:id',auth, async(req,res)=>{
   
  try{
      const _id = req.params.id;
      const body = req.body;
      const updatestudents = await studentModel.findByIdAndUpdate(_id,body,{new:true});
      if(!updatestudents)
      {
          return res.status(404).send();
      }  
   
      res.status(201).send(
          {
              "status" : true,
              "message" : "Student updateddd!"
          });

  }
  catch(error)
  {
       res.status(400).send(error);

  }

});

router.delete('/students/:id',auth, async(req,res)=>{
   
  try{
          const _id = req.params.id;
      
       const deletestudents = await studentModel.findByIdAndDelete(_id);
      if(!deletestudents)
      {
          return res.status(404).send();
      }  
     
      res.status(201).send(
          {
              "status" : true,
              "message" : "Student Deleted!!"
          });
  }
  catch(error)
  {
       res.status(400).send(error);

  }
});


  module.exports = router;