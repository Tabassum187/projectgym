let user = require("../collection/User");
let b = require("bcrypt");
let nodemailer = require("nodemailer")
const Step = require('../Models/Step');
// 🆕 Import the models
const Workout = require("../Models/Workout");
const FoodLog = require("../Models/FoodLog");
const Progress = require("../Models/Progress");
let jwt = require("jsonwebtoken")

let EmailInfo = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user:process.env.EMAIL,
        pass:process.env.PASS_KEY
  }
})

let user_function = {
  // -------- USER ROUTES --------
  register: async function (req, res) {
    try {
      let {
        name,
        email,
        password,
        gender,
        age,
        contact,
        height,
        weight,
        bmi_index,
        target_weight,
        bp,
        diabities
      } = req.body;

      let email_check = await user.findOne({ email: email });
      if (email_check) {
        return res.status(409).json({ msg: "Email Already exist" });
      } else {
        let enc_pswd = b.hashSync(password, 15);

        let user_data = new user({
          name,
          email,
          password: enc_pswd,
          gender,
          age,
          contact,
          height,
          weight,
          bmi_index,
          target_weight,
          bp,
          diabities
        });

        await user_data.save();
        return res.status(200).json({ msg: "User registered successfully" });
      }
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  },

  get_all_user: async function (req, res) {
    try {
      let user_record = await user.find().select("-password").sort({ record_at: -1 });
      return res.status(200).json(user_record);
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  },

  delete_user: async function (req, res) {
    try {
      let { id } = req.params;
      let find_id = await user.findById(id);
      if (find_id) {
        await user.findByIdAndDelete(find_id);
        return res.status(200).json({ msg: "User Deleted Successfully" });
      }
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  },

  update_record: async function (req, res) {
    try {
      let { id } = req.params;
      let {
        name,
        email,
        age,
        gender,
        contact,
        height,
        weight,
        bmi_index,
        target_weight,
        bp,
        diabities
      } = req.body;

      let id_exist = await user.findById(id);
      if (id_exist) {
        let update_data = {
          name,
          email,
          age,
          gender,
          contact,
          height,
          weight,
          bmi_index,
          target_weight,
          bp,
          diabities
        };

        await user.findByIdAndUpdate(id, update_data);
        return res.status(200).json({ msg: "User updated successfully" });
      }
    } catch (error) {
      return res.status(501).json({ msg: error.message });
    }
  },
// Update user height and weight
updateBMI :  async function(req, res) {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { height: req.body.height, weight: req.body.weight },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to update profile' });
  }
},
  login: async function (req, res) {
    try {
      let { email, password } = req.body;

      let user_data = await user.findOne({ email: email });
      if (!user_data) {
        return res.status(401).json({ msg: "Invalid Email or Password" });
      }

      let isMatch = await b.compare(password, user_data.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Invalid Email or Password" });
      }

      let { password: _, ...userWithoutPassword } = user_data.toObject();
      return res.status(200).json({ msg: "Login Successful", user: userWithoutPassword });

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  // -------- WORKOUT ROUTES --------
  addWorkout: async (req, res) => {
    try {
      const { userId, name, workoutType, duration, caloriesBurned } = req.body;

      const newWorkout = new Workout({
        userId,
        name,
        workoutType,
        duration,
        caloriesBurned,
      });

      await newWorkout.save();
      res.status(201).json({ msg: "Workout log saved", data: newWorkout });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

 getWorkout: async (req, res) => {
  try {
    const { userId } = req.query;
    console.log('Received userId:', userId);
    const filter = userId ? { userId } : {};
    const workouts = await Workout.find(filter);
    console.log('Found workouts:', workouts);
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
},


  updateWorkout: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Workout log updated", data: updatedWorkout });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  deleteWorkout: async (req, res) => {
    try {
      const { id } = req.params;
      await Workout.findByIdAndDelete(id);
      res.json({ msg: "Workout log deleted" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  // -------- FOOD LOG ROUTES --------
  addFood: async (req, res) => {
    try {
      const { userId, meals } = req.body;
      const newFoodLog = new FoodLog({ userId, meals });
      await newFoodLog.save();
      res.status(201).json({ msg: "Food log saved", data: newFoodLog });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getFoods: async (req, res) => {
    try {
      const { userId } = req.query;
      const foodLogs = await FoodLog.find({ userId });
      res.json(foodLogs);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }  ,

  updateFood: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFood = await FoodLog.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Food log updated", data: updatedFood });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  deleteFood: async (req, res) => {
    try {
      const { id } = req.params;
      await FoodLog.findByIdAndDelete(id);
      res.json({ msg: "Food log deleted" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  // -------- PROGRESS ROUTES --------
   addProgress : async (req, res) => {
    try {
      const newProgress = new Progress(req.body);
      await newProgress.save(); // No callback needed
      res.status(201).json(newProgress);
    } catch (err) {
      console.error("Add progress error:", err);
      res.status(500).json({ msg: err.message });
    }
  },

  getProgress: async (req, res) => {
    try {
      const { userId } = req.query;
      const progress = await Progress.find({ userId });
      res.json(progress);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateProgress: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedProgress = await Progress.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Progress updated", data: updatedProgress });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  deleteProgress: async (req, res) => {
    try {
      const { id } = req.params;
      await Progress.findByIdAndDelete(id);
      res.json({ msg: "Progress deleted" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },forgetpassword: async function(req,res){
    try {
      let {email}= req.body;
      let email_check = await user.findOne({email})
      if(!email_check){
        return res.status(404).json({msg:"Email is invalid / User Not Found"})
      }
      let token = jwt.sign({id: email_check.id},"hunain123",
      {expiresIn:"1h"})
      let link = "http://localhost:3000/reset/" + token;

      let email_body ={
        to : email,
        from : process.env.EMAIL,
        subject :"Reset Password",
        html : `<h3>Hi ${email_check.name}</h3> <p>Hope You're Doing Well, Here Is Your Reset Password Link,
        Please Click on The given Link To Reset your Password</p> ${link}`
      }
      EmailInfo.sendMail(email_body,function(er,i){
        if (e) {
          console.log(e.message)
        } else {
          console.log("Email Sent Successfully"+i)
        }
      })
      res.status(201).json({msg: "Password Reset Link Has Been Sent"});
    } catch (error) {
      res.status(501).json({msg:error.message});
    }
  },
  
  reset_pswd : async function(req,res){
    try {
        let {token} = req.params;
        let {password} = req.body;

        let token_decode = jwt.decode(token, process.env.JWT_KEY);
        if (!token_decode) {
            res.status(404).json({msg : "Something Went Wrong"})                  
        }
        let encpswd = bcrypt.hashSync(password,13);
        await user.findByIdAndUpdate(token_decode.id,{password:encpswd})
      res.status(200).json({msg : "Password Reset Successfully"})        


    } catch (error) {
      res.status(501).json({msg : error.message})        
        
    }
},





// Assuming Express and MongoDB
// app.put("/gym/user/:id", async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const updated = await User.findByIdAndUpdate(userId, req.body, { new: true });
//     if (!updated) return res.status(404).json({ msg: "User not found" });
//     res.json({ msg: "Profile updated", data: updated });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: "Server error" });
//   }
// });








addStep : async (req, res) => {
  try {
    const newStep = new Step(req.body);
    await newStep.save();
    res.status(201).json(newStep);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
},

getSteps : async (req, res) => {
  try {
    const { userId } = req.query;
    const steps = await Step.find({ userId }).sort({ date: -1 });
    res.json(steps);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}


  
}
  


module.exports = user_function;
