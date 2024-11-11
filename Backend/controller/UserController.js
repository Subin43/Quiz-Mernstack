const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const validator = require("validator");
const createSecretToken = require("../util/secretToken");
const { default: mongoose } = require("mongoose");
require("dotenv").config();

module.exports.getUser = async (req, res) => {
    try {
        const users = await User.find({});
        if (!users || users.length === 0) {
            return res.status(404).json({ error: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.createUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        if (!email || !password || !username) {
            return res.status(400).json({ error: "Email, password, and username are required" });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: "Email already exists" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                error: "Password must be stronger (include uppercase, lowercase, number, and symbol)"
            });
        }
        
        // validate username
        if(!validator.isAlphanumeric(username)){
            return res.status(400).json({error:"Invalid username"})
        }
  

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        // Generate a token for the new user
        const token = await createSecretToken(newUser._id);
        if (!token) {
            console.error("Token creation failed");
            return res.status(500).json({ error: "Error generating authentication token" });
        }

        return res.status(201).json({ message: "User created successfully", token });
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports.getLoginUser = async (req, res) => {
    const { email,password } = req.body;
  try {
    const user = await User.findOne({ email }); // Replace 'User' with your user model
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare the plain password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    return res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};