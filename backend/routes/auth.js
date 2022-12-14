const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "Atinisaverynice$boy";
//Create a user using: POST "/api/auth/createuser".
router.post(
  "/createuser",
  [
    body("email", "ENter a valid email").isEmail(),
    body("password", "ENter a valid password").isLength({ min: 5 }),
    body("name", "ENter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(data, JWT_SECRET);
      console.log(auth_token);
      // .then((user) => res.json(user));
      // res.send(req.body).catch((err) => console.log(err));
      res.json({ auth_token });
    } catch (error) {
      console.error(error.message);
      re.status(500).send("Internal Server Error");
    }
  }
);

//Authenticate a user using: POST "/api/auth/login".
router.post(
  "/login",
  [
    body("email", "ENter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct caedentials" });
      }
      const passwordcomp = await bcrypt.compare(password, user.password);

      if (!passwordcomp) {
        return res
          .status(400)
          .json({ error: "Please login with correct caedentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const auth_token = jwt.sign(data, JWT_SECRET);
      res.json({ auth_token });
    } catch (error) {
      console.error(error.message);
      re.status(500).send("Internal Server Error");
    }
  }
);

//Get loged in user  details using: POST "/api/auth/getuser".
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Intrenal server error");
  }
});

module.exports = router;
