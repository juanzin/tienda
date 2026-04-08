require('dotenv').config();
const express = require('express');
const { sql, getConnection } = require('./db');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API running');
});

// Example: get all products
app.get('/productos', async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query('SELECT * FROM Productos');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({
      message: 'Error getting productos',
      error: error.message
    });
  }
});

// get productos


// Example: get one user by id
// app.get('/users/:id', async (req, res) => {
//   try {
//     const pool = await getConnection();
//     const result = await pool
//       .request()
//       .input('id', sql.Int, req.params.id)
//       .query('SELECT * FROM Users WHERE Id = @id');

//     res.json(result.recordset);
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error getting user',
//       error: error.message
//     });
//   }
// });

// // Example: insert user
// app.post('/users', async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     const pool = await getConnection();
//     await pool
//       .request()
//       .input('name', sql.VarChar, name)
//       .input('email', sql.VarChar, email)
//       .query(`
//         INSERT INTO Users (Name, Email)
//         VALUES (@name, @email)
//       `);

//     res.status(201).json({ message: 'User created' });
//   } catch (error) {
//     res.status(500).json({
//       message: 'Error creating user',
//       error: error.message
//     });
//   }
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});