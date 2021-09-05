const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const routes = {
    "posts": "/posts/"
  }

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.set("json spaces", 2);

app.get("/", (request, response) => {
    response.json({
      info: "TCIT Post Api",
      routes: routes,
    });
  });

  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })