let express = require('express');
let db_var = require("./database");
let ro = require("./Route/user_route");

let cors = require("cors");
require("dotenv").config();
  


// Ensure that environment variables are loaded properly
if (!process.env.PORT) {
    console.error("PORT is not defined in the .env file");
    process.exit(1);
}

let port_no = process.env.PORT;
let app = express();

// Enable CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount the routes for "/gym"
app.use("/gym/", ro);

// Database connection and server startup
db_var().then(() => {
    app.listen(port_no, () => {
        console.log(`Server is running on http://localhost:${port_no}`);
    });
}).catch((e) => {
    console.error("Error connecting to the database:", e);
    process.exit(1); // Exit the process if DB connection fails
});