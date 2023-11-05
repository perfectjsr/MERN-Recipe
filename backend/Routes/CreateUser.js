const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwtSecret="Mynameisperfectjsrfromjaipurrajasthan";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//                                 Sign Up
router.post("/createuser", [
  // username must be an email
  body('email', 'incorrect mail').isEmail(),
  // name must be at least 5 chars long
  body('name', 'incorrect name size').isLength({ min: 3 }),
  // password must be at least 5 chars long
  body('password', 'incorrect password').isLength({ min: 5 })]
  , async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.password,salt)
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location
      })
      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  })

//                           Login

router.post("/loginuser"
  , [body('email', 'incorrect mail').isEmail(),
  body('password', 'incorrect password').isLength({ min: 5 })]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email })
      if (!userData) {
        return res.status(400).json({ errors: "Try logging with correct mail" });
      }
      const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Incorrect Password of mail" });
      }
      const data={
        user:{
          id:userData.id
        }
      }
      
      const authToken = jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken:authToken });

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  })

module.exports = router;