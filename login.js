import Player from "../../Models/player.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const player = await Player.findOne({ email }); // Find player by email

    if (!player) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, player.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Password is correct, generate JWT token
    const token = jwt.sign(
      { id: player._id, email: player.email },
      'your-secret-key', // Use a secure key in a real application
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login successful', token, player });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default loginController;
