let express = require('express');
let db_var = require("./database")
let ro = require("./Route/user_route")
let cors = require("cors")
require("dotenv").config();



let port_no = process.env.PORT
let app = express();
app.use(cors())
app.use(express.json())
app.use("/gym/", ro)

db_var().then(()=>{
 app.listen(port_no,()=>{
    console.log(`Server is running on 
    http://localhost:${port_no}`
    );
 })
}).catch((e)=>{
    console.log(e)
})
