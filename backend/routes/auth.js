const express = require('express');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const router = express.Router();
const fetchuser = require('../middleware/getuser')
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');

const JWT_TOKEN = 'Yash';


// Endpoint to create a user
router.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Enter a valid password').isLength({ min: 5 }),
], async (req, res) => {
    let checkuser = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Unique Email
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            checkuser = true
            return res.status(400).json({ checkuser, error: "User already exist!" })
        }

        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        // Create a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
        });

        const data = {
            user: {
                id: user.id
            }
        }
        const jwtData = jwt.sign(data, JWT_TOKEN);
        success = true;
        res.json({ success, jwtData })

        // Catch Error
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Unexpected Error Occured")
    }
});


//EndPoint to Login a user
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    //Check if User Exist
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success, error: "Wrong Credentials" });
        }

        // Check if Password matches hashed Password
        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).json({ success, error: "Wrong Credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const jwtData = jwt.sign(data, JWT_TOKEN);
        success = true
        res.json({ success, jwtData })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Unexpected Error Occured");
    }
});


// Get User
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("An Unexpected Error Occured");
    }
});
module.exports = router