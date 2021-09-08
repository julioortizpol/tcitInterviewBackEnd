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

    pool.query(`DELETE FROM posts WHERE postId = ${postId} RETURNING *`, (error, result) => {
      if (error) {
        throw error;
      }
      response.header("Content-Type", "application/json");
      console.log(result)
      response.status(200).json(result.rows);
    });
  };

  const createPost = (request, response) => {
    const {name, description} = request.body
    response.header("Content-Type", "application/json");

    let nameLengthValidation = name.length > 50
    if(nameLengthValidation) {
      response.status(400).json({error:"Name cant not be greater than 50 chars"});
      return;
    }
    pool.query(`insert into posts(name, description) values ('${name}', '${description}') RETURNING *`, (error, result) => {
      if (error) {
        throw error;
      }
      response.status(200).json(result.rows);
    });
  };



  module.exports = {
    getPosts,
    deletePost,
    createPost
  };