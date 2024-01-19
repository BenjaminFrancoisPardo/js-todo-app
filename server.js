require('dotenv').config();

const express = require('express');
const sanitizeHTML = require('sanitize-html');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

let db;

// Initialize server
(async () => {
  const dbConnectionString = `mongodb://${process.env.MONGO_ADMIN}:${process.env.MONGO_ADMIN_PASSORD}@localhost:${process.env.MONGO_PORT}/${process.env.DB_NAME}?&authSource=admin`;
  const client = new MongoClient(dbConnectionString);

  await client.connect();

  db = client.db();

  app.listen(port);
  console.info(
    `${process.env.APP_USERNAME}'s To-Do App is listening on port `,
    port
  );
})();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Username = learn
// Password = javascript
function passwordProtected(req, res, next) {
  res.set('WWW-Authenticate', 'Basic realm="Simple Todo App"');
  if (req.headers.authorization == 'Basic bGVhcm46amF2YXNjcmlwdA==') {
    next();
  } else {
    res.status(401).send('Authentication required');
  }
}

// Use this function for all routes of the app
app.use(passwordProtected);

// Home route
app.get('/', async (req, res) => {
  const items = await db.collection('todo-list-items').find().toArray();

  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${process.env.APP_USERNAME}'s To-Do App</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1 class="display-4 text-center py-1">${
        process.env.APP_USERNAME
      }'s To-Do App</h1>
      
      <div class="jumbotron p-3 shadow-sm">
        <form id="create-form" action="/items" method="POST">
          <div class="d-flex align-items-center">
            <input id="create-field" name="item" autofocus autocomplete="off" class="form-control mr-3" type="text" style="flex: 1;">
            <button class="btn btn-primary">Add New Item</button>
          </div>
        </form>
      </div>
      
      <ul id="item-list" class="list-group pb-5"></ul>
    </div>
    <script>
      let items = ${JSON.stringify(items)}
    </script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/browser.js"></script>
  </body>
  </html>
  `);
});

// Create item route
app.post('/items', async function (req, res) {
  const safeText = sanitizeHTML(req.body.item, {
    allowedTags: [],
    allowedAttributes: {},
  });
  const info = await db
    .collection('todo-list-items')
    .insertOne({ text: safeText });

  res.status(201).send({ text: safeText });
});

// Update item route
app.put('/items', async function (req, res) {
  const safeText = sanitizeHTML(req.body.text, {
    allowedTags: [],
    allowedAttributes: {},
  });

  await db
    .collection('todo-list-items')
    .findOneAndUpdate(
      { _id: new ObjectId(req.body.id) },
      { $set: { text: safeText } }
    );

  res.send('Success');
});

// Delete item route
app.delete('/items', async function (req, res) {
  await db
    .collection('todo-list-items')
    .deleteOne({ _id: new ObjectId(req.body.id) });

  res.send('Success');
});
