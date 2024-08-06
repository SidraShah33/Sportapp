import Developer from '../../Models/admin.js';

export const getAdmin = async (req, res) => {
  try {
    const email = req.decoded.email; 
    const admin = await Developer.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    res.json(admin); // Send admin data including name and image
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
