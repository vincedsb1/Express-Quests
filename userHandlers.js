// SHOW LIST + Filter

const getUsers = (req, res) => {
  const { database } = require("./database");
  const initialSql = "SELECT * FROM users";
  const where = [];

  if (req.query.city != null) {
    where.push({
      column: "city",
      value: req.query.city,
      operator: "=",
    });
  }
  if (req.query.language != null) {
    where.push({
      column: "language",
      value: req.query.language,
      operator: "=",
    });
  }

  database
    .query(
      where.reduce(
        (sql, { column, operator }, index) =>
          `${sql} ${index === 0 ? "WHERE" : "AND"} ${column} ${operator} ?`,
        initialSql
      ),
      where.map(({ value }) => value)
    )
    .then(([users]) => {
      res.json(users);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// SHOW LIST

// const { database } = require("./database");

//   const getUsers = (req, res) => {
//     database
//       .query("SELECT * FROM users")
//       .then(([users]) => {
//         res.json(users);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send("Error retrieving data from database");
//       });
//   };

// SHOW BY ID

  const getUserById = (req, res) => {
    const id = parseInt(req.params.id);
    database 
      .query("SELECT * FROM users WHERE id=?", [id])
      .then(([users]) => {
        if (users[0] != null) {
          res.json(users[0]);
        } else {
          res.status(404).send("Not found");
        }
      })
      .catch((err) => {
        console.err(err);
        res.status(500).send("Error retrieving data from database");
      });
  };

// CREATE

  const postUsers = (req, res) => {
    console.log(req.body);
    // res.send("Post route is working 🎉");
    const { firstname, lastname, email, city, language } = req.body;
    database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);

    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
  };

  // UPDATE

  const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const { firstname, lastname, email, city, language } = req.body;
  
    database
      .query(
        "update users set firstname = ?, lastname = ?, email = ?, city = ?, language = ? where id = ?",
        [firstname, lastname, email, city, language, id]
      )
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error editing the user");
      });
  };

  // DELETE

  const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);
  
    database
      .query("DELETE FROM users WHERE id = ?", [id])
      .then(([result]) => {
        if (result.affectedRows === 0) {
          res.status(404).send("Not Found");
        } else {
          res.sendStatus(204);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error deleting the movie");
      });
  };

  module.exports = {
    getUsers,
    getUserById,
    postUsers,
    updateUser,
    deleteUser,
  };
