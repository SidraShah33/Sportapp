import Admin from '../../Models/admin.js';
import jwt from 'jsonwebtoken';

const authController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email }); // Find admin by email

    if (!admin) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (password !== admin.password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      'your-secret-key', 
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login successful', token, admin });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default authController;
