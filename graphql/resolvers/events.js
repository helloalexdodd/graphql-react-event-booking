const { User } = require('../../models/user');
const { Event } = require('../../models/event');
const { Booking } = require('../../models/booking');
const { transformEvent } = require('./merge');
const { dateToString } = require('../../helpers/date');

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => transformEvent(event));
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated');

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: req.userId,
    });

    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);

      const user = await User.findById(req.userId);
      if (!user) throw new Error('User not found');
      user.createdEvents.push(event);
      await user.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
  cancelEvent: async (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated');

    try {
      const event = await Event.findById(args.eventId);
      if (req.userId !== event.creator.toString())
        throw new Error('This is not your event');

      await Booking.deleteMany({ event: args.eventId });
      await Event.deleteOne({ _id: args.eventId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
