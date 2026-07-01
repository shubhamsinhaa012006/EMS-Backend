require("dotenv").config();

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
mongoose.connect(process.env.MONGO_URI)
.then(() => {

    console.log("✅ Connected to MongoDB");

    app.listen(PORT, () => {
        console.log(`🚀 Server Running on Port ${PORT}`);
    });

})
.catch((err) => {

    console.log("❌ MongoDB Connection Error");
    console.log(err);

});