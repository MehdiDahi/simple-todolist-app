const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const taskRoutes = require("./routes/taskRoutes");
const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json());
app.use("/tasks", taskRoutes);

mongoose
  .connect("mongodb+srv://admin:admin123@tasksdb.i8hi9oy.mongodb.net/?appName=TasksDB")
  .then(() => {
    console.log("db connected");
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("connection failed");
  });

// Middleware de gestion des erreurs
app.use((req, res) => {
  if (res.status(404)) {
    res.send('<h1>Error 404: Ressource not found</h1>');
  }
  res.send('<h1>Error 500: Erreur interne du serveur</h1>');
});
