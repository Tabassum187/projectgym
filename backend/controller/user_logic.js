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
  host: "smtp.gmail.com",  // <-- change this from smtp.example.com to smtp.gmail.com
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_KEY,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
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
          bp,
          diabities
        });

        await user_data.save();
        let mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Registration Successful - FitTrackPro Hospital",
          html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; background-color:#f4f9f9; color:#004d4d;">
              <h1 style="color:#00796b; border-bottom:2px solid #004d4d; padding-bottom:10px;">FitTrackPro Hospital</h1>
              <h2>Welcome, ${name}!</h2>
              <p>Thank you for registering with <strong>FitTrackPro Hospital</strong>.</p>
              <p>Your registration was successful. You can now <a href="https://yourwebsite.com/login" style="color:#00796b; text-decoration:none;">log in</a> and access your personalized dashboard.</p>
              <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />
              <p>If you have any questions, feel free to contact our support team at <a href="mailto:support@fittrackpro.com" style="color:#00796b;">support@fittrackpro.com</a>.</p>
              <p>Best regards,<br/>The FitTrackPro Team</p>
            </div>
          `,
        };
        
        await EmailInfo.sendMail(mailOptions,function(e,i){
          if (e)    {
           console.log(e)
          }
        });
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
    const updated = await user.findByIdAndUpdate(
      req.params.id,
      { height: req.body.height, weight: req.body.weight,bmi:req.body.bmi_index },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message});
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

 forgetpassword: async function(req, res) {
    try {
      let { email } = req.body;
      let email_check = await user.findOne({ email });
      if (!email_check) {
        return res.status(404).json({ msg: "Email is invalid / User Not Found" });
      }
  
      // JWT sign with secret from env for better security
      let token = jwt.sign({ id: email_check._id }, process.env.JWT_KEY || "hunain123", {
        expiresIn: "1h"
      });
  
      let link = `http://localhost:3000/reset/${token}`;
  
      let email_body = {
        to: email,
        from: process.env.EMAIL,
        subject: "Password Reset Request - FitTrackPro Hospital",
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width:600px; margin:auto; padding:20px; border:1px solid #ddd; border-radius:8px; background-color:#f4f9f9; color:#004d4d;">
            <h2 style="color:#00796b;">Hello ${email_check.name},</h2>
            <p>We received a request to reset your password for your FitTrackPro Hospital account.</p>
            <p>Please click the link below to set a new password:</p>
            <p style="text-align:center; margin: 30px 0;">
              <a href="${link}" style="background-color:#00796b; color:white; padding:12px 25px; border-radius:5px; text-decoration:none; font-weight:bold;">
                Reset Password
              </a>
            </p>
            <p>If you did not request a password reset, please ignore this email or contact our support.</p>
            <hr style="border:none; border-top:1px solid #ddd; margin:20px 0;" />
            <p>Thank you,<br/>The FitTrackPro Team</p>
          </div>
        `,
      };
      
  
      EmailInfo.sendMail(email_body, function (err, info) {
        if (err) {
          console.log('Email send error:', err.message);
          return res.status(500).json({ msg: "Failed to send reset email" });
        } else {
          console.log("Email Sent Successfully: " + info.response);
          return res.status(201).json({ msg: "Password Reset Link Has Been Sent" });
        }
      });
  
    } catch (error) {
      return res.status(501).json({ msg: error.message });
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
        let encpswd = b.hashSync(password,13);
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
