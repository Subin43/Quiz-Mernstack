const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes/quizRoutes')

dotenv.config();
const app = express();

PORT = process.env.PORT || 5500;
MONGO_URI = process.env.MONGO_URI;

// app.use(cors({
//     origin: 'http://localhost:3000',
//     content:['GET','POST','DELETE',"PUT"],
//     allowedHeaders:['Content-Type']
// })) // middleware
app.use(cors());

// Define CORS options
const corsOptions = {
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Allow specified methods
  allowedHeaders: ['Content-Type'], // Allow specified headers
};
// Enable preflight requests for CORS
app.options('*', cors(corsOptions));
app.use(express.json()); // accept the json message
app.use('/quiz',routes)


mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Server connected to DB");
    app.listen(PORT, () => {
      console.log(`Server running on the ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error:".error.message);
  });
