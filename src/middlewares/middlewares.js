const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

// Request validation middleware
const validateTask = {
  create: [
    body("title")
      .notEmpty()
      .isString()
      .isLength({ max: 255 })
      .withMessage(
        "title must be a string with a maximum length of 255 characters"
      )
      .trim()
      .escape(),
    body("description")
      .notEmpty()
      .isString()
      .isLength({ max: 255 })
      .withMessage(
        "description must be a string with a maximum length of 255 characters"
      )
      .trim()
      .escape(),
    body("startDate").notEmpty().isISO8601(),
    body("deadline").notEmpty().isISO8601(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],

  edit: [
    body("title")
      .notEmpty()
      .isString()
      .isLength({ max: 255 })
      .withMessage(
        "title must be a string with a maximum length of 255 characters"
      )
      .optional()
      .trim()
      .escape(),
    body("description")
      .notEmpty()
      .isString()
      .isLength({ max: 255 })
      .withMessage(
        "description must be a string with a maximum length of 255 characters"
      )
      .optional()
      .trim()
      .escape(),
    body("startDate").notEmpty().isISO8601().optional(),
    body("deadline").notEmpty().isISO8601().optional(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ],
};

// Authorization middleware - this requires further implementation of users registration service
// for now it's just creating a valid jwt token that is then required in all other requests to this API
// we are authorizing without authenticating
const authorize = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying JWT:", error);
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = { validateTask, authorize };
