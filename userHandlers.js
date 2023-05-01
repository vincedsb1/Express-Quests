const { database } = require("./database");

  const getUsers = (req, res) => {
    database
      .query("SELECT * FROM users")
      .then(([users]) => {
        res.json(users);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from database");
      });
  };


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

  module.exports = {
    getUsers,
    getUserById,
  };
