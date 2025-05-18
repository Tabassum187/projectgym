let mongoose= require('mongoose');
require("dotenv").config()

let db_var_url = process.env.URL;

let db_work = async function(){
    mongoose.connect(db_var_url).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((e)=>{
        console.log(e)
    })
}
module.exports = db_work