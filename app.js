require("dotenv").config();
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const express = require("express");
const { body } = require('express-validator');
// const { validateMovie } = require("./validators.js");
// const { validateUser } = require("./validators.js");
const validateUser = require('./validateUser'); 
const validateMovie = require('./validateMovie');


const app = express();

app.use(express.json());

const port = process.env.APP_PORT ?? 5007;

// const welcome = (req, res) => {
  // res.send("Welcome to my favourite movie list");
// };

//app.get("/", welcome);



app.get("/", (req, res) => {
    res.send('Welcome');
  });

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

// app.post("/api/movies", movieHandlers.postMovies);
// app.post("/api/movies", validateMovie, movieHandlers.postMovies);
// app.post("/api/users", userHandlers.postUsers);
// app.post("/api/users", validateUser, userHandlers.postUsers);

app.post("/api/movies", validateMovie, movieHandlers.postMovies);
app.post("/api/users", validateUser, userHandlers.postUsers);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
