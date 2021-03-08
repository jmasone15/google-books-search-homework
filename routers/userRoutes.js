const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User Sign Up
router.post("/", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        // Validation
        if (!email || !password || !passwordVerify)
            return res.status(400).json({ errorMessage: "Please enter all required fields." });
        if (password.length < 6)
            return res.status(400).json({ errorMessage: "Please enter a password of at least six characters." });
        if (password !== passwordVerify)
            return res.status(400).json({ errorMessage: "Passwords do not match." });
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(400).json({ errorMessage: "An account with this email already exists" });

        // Password Hash
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // Save New User
        const newUser = new User({ email, passwordHash });
        const savedUser = await newUser.save();
        res.json(savedUser);

        // After registering the new user, log them in.
        const token = jwt.sign({ user: savedUser._id }, process.env.JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: false,
        }).send();


    } catch (err) {
        console.error(err);
        res.status(500).send();
    }

});

// Login an Existing User
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password)
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields" });

        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Wrong email or password." });

        // BCrypt comapres the entered password with the hashed password in the DB
        // If the hashed password originated from the entered password, the function returns true. Else false.
        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Wrong email or password." });

        // Sign the token
        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET
        );

        // Send the token in a HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: false,
        }).send();


    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

// User LogOut
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: false,
        expires: new Date(0)
    }).send();
});

// Check if the user is logged in.
router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);

    } catch (err) {
        res.json(false);
    }
});

router.get("/profile/:id", async (req, res) => {
    try {
        const userProfile = await User.findById(req.params.id);
        res.json(userProfile);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

module.exports = router;