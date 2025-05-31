let express = require("express");
let r = express.Router();
let user_logic = require("../controller/user_logic");




// -------- Existing Routes --------
r.post("/user", user_logic.register);
r.get("/getuser", user_logic.get_all_user);
r.delete("/getuser/:id", user_logic.delete_user);
r.put("/getuser/:id", user_logic.update_record);
r.post("/log", user_logic.login);
r.post("/fp", user_logic.forgetpassword);


// -------- NEW: Workout Routes --------
r.get("/workouts", user_logic.getWorkouts);      // get all workouts
r.post("/workouts", user_logic.addWorkout);      // add a new workout
r.put("/workouts/:id", user_logic.updateWorkout); // update workout
r.delete("/workouts/:id", user_logic.deleteWorkout); // delete workout

// -------- NEW: Food Routes --------
r.get("/foods", user_logic.getFoods);       // get all food logs
r.post("/foods", user_logic.addFood);       // add food log
r.put("/foods/:id", user_logic.updateFood); // update food log
r.delete("/foods/:id", user_logic.deleteFood); // delete food log

// -------- NEW: Progress Routes --------
r.get("/progress", user_logic.getProgress);       // get all progress records
r.post("/progress", user_logic.addProgress);      // add new progress
r.put("/progress/:id", user_logic.updateProgress); // update progress
r.delete("/progress/:id", user_logic.deleteProgress); // delete progress
r.post("/resetpswd/:token",user_logic.reset_pswd    )
module.exports = r;
