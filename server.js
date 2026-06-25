const express = require("express");

//we are setting middle ware here that cors for fetch api for specific point
const cors = require("cors");

const app = express();

const employeeRoutes = require("./routes/employeeRoutes");

const loggerMiddleware = require("./middleware/loggerMiddleware");


// Middleware
app.use(cors());
app.use(express.json());        // we have implemented it to to convert string or others into object

app.use(loggerMiddleware);


// Routes

app.use("/employees", employeeRoutes);


app.get("/", (req, res) => {

  res.send("Employee Management API Running");

});


const PORT = process.env.PORT || 5100;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});