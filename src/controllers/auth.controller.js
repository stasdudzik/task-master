const jwt = require("jsonwebtoken");

// Imitate login/register functionality by generating JWT token

const generateToken = async (req, res) => {
  // Generate a JWT
  const token = jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: "1h", // Set the token expiration time
  });

  // Return the token in the response
  res.json({ token });
};

module.exports = {
  generateToken,
};
