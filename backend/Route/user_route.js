let express = require("express");
let r = express.Router();
let user_logic = require("../controller/user_logic");
let User = require("../collection/User")



// -------- Existing Routes --------
r.get('/userprofile/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select('height weight bmi_index');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      res.status(500).json({ error: err.message });
    }
  });
  r.get('/top', async (req, res) => {
  try {
    const { city = 'Karachi', limit = 10 } = req.query;
    const data = await Hospital.find({ city })
      .sort({ rating: -1 })
      .limit(Number(limit));
    res.json(data);
  } catch (err) {
    console.error('Error fetching top hospitals:', err);
    res.status(500).json({ error: err.message });
  }
});

r.post("/user", user_logic.register);
r.get("/getuser", user_logic.get_all_user);
r.delete("/getuser/:id", user_logic.delete_user);
r.put("/getuser/:id", user_logic.update_record);
r.post("/log", user_logic.login);
r.post("/fp", user_logic.forgetpassword);
r.post("/resetpswd/:token", user_logic.reset_pswd);

r.put('/userprofile/:id',user_logic.updateBMI)

// -------- NEW: Workout Routes --------
// r.get("/workout", user_logic.getWorkout);
// r.post("/workout", user_logic.addWorkout);        
// r.put("/workout/:id", user_logic.updateWorkout); 
// r.delete("/workout/:id", user_logic.deleteWorkout);  // delete workout

// -------- NEW: Food Routes --------
// r.get("/foods", user_logic.getFoods);  
// r.get("/foods/:userId", user_logic.getUserWiseFoods);       // get all food logs     // get all food logs
// r.post("/foods", user_logic.addFood);       // add food log
// r.put("/foods/:id", user_logic.updateFood); // update food log
// r.delete("/foods/:id", user_logic.deleteFood); // delete food log

// -------- NEW: Progress Routes --------
// r.get("/progress", user_logic.getProgress);       // get all progress records
// r.post("/progress", user_logic.addProgress);      // add new progress
// r.put("/progress/:id", user_logic.updateProgress); // update progress
// r.delete("/progress/:id", user_logic.deleteProgress); // delete progress
// r.post("/resetpswd/:token",user_logic.reset_pswd    )
module.exports = r;
