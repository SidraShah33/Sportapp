import Player from "../../Models/player.js";
import bcrypt from 'bcrypt';

const registerController = async (req, res) => {
  try {
    const { name, phone, gender, email, password, dgame } = req.body;

    // Check if the email already exists in the database
    const existingUser = await Player.findOne({ email });
    if (existingUser) {
      // If email already exists, return an error
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Use 10 salt rounds for hashing
    const newUser = new Player({ name, phone, gender, email, password: hashedPassword, dgame });
    await newUser.save();

    // Return success response
    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default registerController;
