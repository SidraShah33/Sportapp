import bcrypt from 'bcrypt';
import Player from '../../Models/player.js';

export const getUser = async (req, res) => {
  try {
    const email = req.decoded.email; 
    const user = await Player.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const email = req.decoded.email;
    const { name, phone, gender, email: newEmail, dgame } = req.body;

    const user = await Player.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if new email is different and already exists in the database
    if (newEmail && newEmail !== email) {
      const emailExists = await Player.findOne({ email: newEmail });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already exists' });
      }
      user.email = newEmail;
    }

    // Updating the user details
    user.name = name;
    user.phone = phone;
    user.gender = gender;
    user.dgame = dgame;

   
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const email = req.decoded.email;
    const user = await Player.findOneAndDelete({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};