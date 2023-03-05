// Main server code
const express = require('express');
const cors = require("cors")
const path = require("path")

const udemy_courses = require("./routes/udemy_courses.js") // For Udemy courses routes

// const __dirname = path.resolve();
const app = express() // Make express app/server

app.set('view engine', 'ejs') // View Engine for dynamic rendering
app.use(cors()) // Middleware - Things used by express
app.use(express.json()) // This is same as BodyParser. It's now included in express. Server can accept JSON in body of request

/* [For backend testing only] Allow home page rendering from frontend */
app.get('/',(req,res) => {
  res.send('Hello Backend')
});
app.get('/api',(req,res) => {
  res.send('API home')
});

app.use("*", (req,res) => {
  res.status(404).json({error: "[server] Page not found"})
}) // Or app.all('*',(req,res) => {res.status(404).send('Not Found')})


// app.use(express.static(path.join(__dirname,"../frontend/build"))) // Use static frontend

app.use("/api/v1/udemy_courses", udemy_courses) // General procedure for api routes

// app.get("*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
// }); // Commented for testing

module.exports = app