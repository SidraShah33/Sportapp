// controllers/playerController.js
import Player from '../../Models/player.js';

export const getPlayersWithSameGameValue = async (req, res) => {
  try {
    // Retrieve email from the decoded token
    const email = req.decoded.email; // Assuming 'email' is present in the token payload

    // Fetch the user by email to get their game value
    const user = await Player.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const gameValue = user.dgame; 

    const players = await Player.find({ dgame: gameValue });

    res.status(200).json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
