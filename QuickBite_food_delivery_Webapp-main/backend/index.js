const express = require('express');
const cors = require("cors");
const mongoDB = require("./db");

const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Routes
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

// Test API Route
app.get('/', (req, res) => {
    res.send('Hello from Express Backend!');
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
