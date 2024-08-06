// controllers/gamesController.js
import games from '../../Models/game.js'; // Ensure you have a Game model

// Fetch all games
export const getAllGames = async (req, res) => {
  try {
    const game = await games.find(); // Adjust the query as necessary
    res.status(200).json(game);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
