const asyncHandler = require('express-async-handler');

//@route /api/users
//@desc POST Register a new user
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //Validation

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please include all fields');
  }
  res.send('Register');
});

//@route /api/users/login
//@desc POST login a user
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login');
});

module.exports = {
  registerUser,
  loginUser,
};
