const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require("./queries");
const app = express()
const port = 3001

const routes = {
    "posts": "/posts/",
    "deletePosts": "/posts/:postId",
  }

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.set("json spaces", 2);
app.use(cors());

app.get("/", (request, response) => {
    response.json({
      info: "TCIT Post Api",
      routes: routes,
    });
  });



  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })

  app.get(routes["posts"], db.getPosts);
  app.delete(routes["deletePosts"], db.deletePost);
  app.post(routes["posts"], db.createPost);