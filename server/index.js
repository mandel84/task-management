const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
const projectRoutes = require('./routes/projectRoutes');

const PORT = process.env.PORT || 5005;

const app = express();


// const frontendURL = 'https://tasks-app-client-iota.vercel.app';

app.use(cors())
// app.use(cors({
//   origin: ['https://localhost:3005'],
  // ['https://jorge-1.onrender.com'],
// }))
// app.use(cors({
//   origin: frontendURL,
// }));
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Unable to sync database:', error.stack);
  });

module.exports = app;
