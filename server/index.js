const express = require('express');
const path = require('path');

const clientPath = path.join(__dirname, '../app/dist');
const serverStatic = express.static(clientPath);

const app = express();
const router = express.Router();

const logRoutes = (req, res, next) => {
  console.log(`${req.method}: ${req.url} - ${new Date().toLocaleTimeString()}`);
  next();
};

const jokeController = (_req, res) => {
  res.json({
    joke: "Why don't skeletons fight each other? Because they don't have the guts!",
  });
};

const pictureController = (_req, res) => {
  res.json({
    picture:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Cima_da_Conegliano%2C_God_the_Father.jpg/300px-Cima_da_Conegliano%2C_God_the_Father.jpg',
  });
};

const rollDieController = (req, res) => {
  const { quantity } = req.query;

  const rolls = Array.from(
    { length: quantity || 1 },
    () => Math.floor(Math.random() * 6) + 1
  );

  res.json(rolls);
};

// Endpoints
router.get('/joke', jokeController);
router.get('/picture', pictureController);
router.get('/rollDie', rollDieController);

// Serve static
app.use(serverStatic);
// Use the logRoutes middleware for all endpoints
app.use(logRoutes);
// Use the router on the /api route
app.use('/api', router);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
