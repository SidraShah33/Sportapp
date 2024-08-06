// controllers/upcomingEventsController.js
import UpcomingEvent from '../../Models/events.js';

// Fetch all upcoming events
export const getUpcomingEvents = async (req, res) => {
  try {
    const events = await UpcomingEvent.find();
    res.json(events);
  } catch (error) {
    console.error('Error fetching upcoming events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
