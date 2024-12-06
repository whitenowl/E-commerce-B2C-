const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// async function registerUser(model) {
//   const hashPassword = await bcrypt.hash(model.password, 10);
//   let user = new User({
//     name: model.name,
//     email: model.email,
//     password: hashPassword,
//   });
//   await user.save();
// }

//test
// async function testUserCreation() {
//   const user = new User({
//     name: 'Test User',
//     email: 'testuser@example.com',
//     password: 'password123',
//   });

//   console.log(user); // Should log the user instance
// }

// testUserCreation();

//new 
async function registerUser(model) {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email: model.email });
    if (existingUser) {
      console.log("Email already exists: ", model.email);
      throw new Error("Email already exists");
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(model.password, 10);

    // Create new user
    const user = new User({
      name: model.name,
      email: model.email,
      password: hashPassword,
    });

    // Save the user to the database
    await user.save();
    console.log("User registered successfully!");

  } catch (error) {
    console.error("Registration error: ", error);
    throw error; // Propagate the error to the caller
  }
}


async function loginUser(model) {
  const user = await User.findOne({ email: model.email });
  if (!user) {
    return null;
  }
  const isMatched = await bcrypt.compare(model.password, user.password);
  if (isMatched) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    return { token, user };
  } else {
    return null;
  }
}
module.exports = { registerUser, loginUser };
