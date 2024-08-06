import leagues from '../../Models/league.js'; 
// Fetch all leagues

  export const getAllLeagues = async (req, res) => {
    try {
      const leagueList = await leagues.find().populate('game');
      res.status(200).json(leagueList);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leagues', error });
    }
  };
  