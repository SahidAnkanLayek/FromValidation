const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const { log } = require('console');

const bcrypt = require('bcrypt');

// Middleware setup
app.use(bodyParser.json());
app.use(cors());

// Default route
app.get('/', function (req, res) {
  res.send('Hello World')
})

// User creation route
app.post('/user', async (req, res) => {
  const { username, email, phone, password} = req.body;

  let hashed_password= await bcrypt.hash(password, 10);
   console.log(hashed_password);



  // Assuming data is valid, you can write it to a JSON file
  const userData = {
    username,
    email,
    phone,
    password : hashed_password,
  };

  console.log(userData);

  // Write JSON data to a file
  fs.writeFile('userData.json', JSON.stringify(userData), (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
      res.status(500).json({ message: 'Error saving user data' });
    } else {
      console.log('User data saved successfully');
      res.json({ message: 'User data saved successfully' });
    }
  });


});

// Start the server
app.listen(3000, () => {
  console.log("Server started at port 3000");
});
