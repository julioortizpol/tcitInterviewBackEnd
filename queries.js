const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'posts',
  password: 'password',
  port: 5432,
})

const getPosts = (request, response) => {
    pool.query("SELECT * FROM posts", (error, results) => {
      if (error) {
        throw error;
      }
      response.header("Content-Type", "application/json");
      response.status(200).json(results.rows);
    });
  };

  module.exports = {
    getPosts,
  };