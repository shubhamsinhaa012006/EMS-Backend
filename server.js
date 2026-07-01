const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const employeeRoutes = require("./routes/employeeRoutes");
const loggerMiddleware = require("./middleware/loggerMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// Routes
app.use("/employees", employeeRoutes);

app.get("/", (req, res) => {
    res.send("Employee Management API Running");
});

const PORT = process.env.PORT || 5100;

// MongoDB Connection
mongoose.connect(
    "mongodb+srv://Shubhamsinha:hJjEqd5LwiTPkfm7@cluster0.hl6bb20.mongodb.net/EMS?retryWrites=true&w=majority"
)
.then(() => {

    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`🚀 Server Running on Port ${PORT}`);
    });

})
.catch((err) => {

    console.log(err);

});