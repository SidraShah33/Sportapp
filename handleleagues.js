import leagues from '../../Models/league.js';
import games from '../../Models/game.js'; // Ensure you have a Game model

export const addLeague = async (req, res) => {
  const { game, startTime, status, winner } = req.body;

  try {
    const newLeague = new leagues({
      game,
      startTime,
      status,
      winner: status === 'completed' ? winner : undefined,
    });

    const savedLeague = await newLeague.save();
    res.status(201).json({ message: 'League added successfully', league: savedLeague });
  } catch (error) {
    res.status(500).json({ message: 'Error adding league', error });
  }
};

export const updateLeague = async (req, res) => {
  const { id } = req.params;
  const { game, startTime, status, winner } = req.body;

  try {
    const updatedLeague = await leagues.findByIdAndUpdate(
      id,
      {
        game,
        startTime,
        status,
        winner: status === 'completed' ? winner : undefined,
      },
      { new: true }
    );

    if (!updatedLeague) {
      return res.status(404).json({ message: 'League not found' });
    }

    res.status(200).json({ message: 'League updated successfully', league: updatedLeague });
  } catch (error) {
    res.status(500).json({ message: 'Error updating league', error });
  }
};

export const deleteLeague = async (req, res) => {
  console.log(req.body);

  const { game, status } = req.body;

  try {
    // Find the game by name
   

    // Find and delete the league that matches the game ID and status
    const league = await leagues.findOneAndDelete({ game , status });
    if (!league) {
      return res.status(404).json({ message: 'No league found to delete' });
    }

    res.status(200).json({ message: 'League deleted successfully' });
  } catch (error) {
    console.error('Error deleting league:', error);
    res.status(500).json({ message: 'Error deleting league', error });
  }
};


export const getLeagues = async (req, res) => {
  try {
    const leagueList = await leagues.find().populate('game');
    res.status(200).json(leagueList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leagues', error });
  }
};

export const searchLeagues = async (req, res) => {
  const { query } = req.query;
  try {
    const regex = new RegExp(query, 'i'); 
    const leaguesList = await leagues.find({}).populate('game');
    const filteredLeagues = leaguesList.filter(league => 
      regex.test(league.game.name) || 
      regex.test(league.status) || 
      (league.winner && regex.test(league.winner))
    );
    res.status(200).json(filteredLeagues);
  } catch (error) {
    res.status(500).json({ message: 'Error searching leagues', error });
  }
};
