// controllers/eventController.js
import UpcomingEvent from '../../Models/events.js';

// Get all upcoming events
export const getAllEvents = async (req, res) => {
  try {
    const events = await UpcomingEvent.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await UpcomingEvent.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching event', error });
  }
};

// Add a new event
export const addEvent = async (req, res) => {
  const eventData = req.body;
  console.log(eventData);
  try {
    const newEvent = await UpcomingEvent.create(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error adding event', error });
  }
};

// Update an existing event
export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const eventData = req.body;
  try {
    const updatedEvent = await UpcomingEvent.findByIdAndUpdate(id, eventData, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating event', error });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await UpcomingEvent.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
};
