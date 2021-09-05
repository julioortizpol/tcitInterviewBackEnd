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

  const deletePost = (request, response) => {
    const {postId} = request.params
    const {name, description} = request.body

    pool.query(`DELETE FROM posts WHERE postId = ${postId}`, (error, result) => {
      if (error) {
        throw error;
      }
      response.header("Content-Type", "application/json");
      console.log(result)
      response.status(200).json({postId, name,description});
    });
  };

  const createPost = (request, response) => {
    const {name, description} = request.body
    pool.query(`insert into posts(name, description) values ('${name}', '${description}')`, (error, result) => {
      if (error) {
        throw error;
      }
      response.header("Content-Type", "application/json");
      console.log(result)
      response.status(200).json({postid: result.insertId, name,description});
    });
  };



  module.exports = {
    getPosts,
    deletePost,
    createPost
  };