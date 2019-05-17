const express = require('express');

const authMocks = {};

authMocks.router = express.Router();

authMocks.router.get('/mocks/auth/login', (req, res) => {
  const { role } = req.query;
  res.send(`
    <h1 style="text-transform: capitalize;">Mock ${role} Login</h1>
    <form action="/auth/${role}/callback" method="POST">
      <label for="email">Email</label>
      <input type="email" name="email" required>
      <label for="password">Password</label>
      <input type="text" name="password" required>
      <button type="submit">Log In</button>
    </form>
  `);
});

module.exports = authMocks;
