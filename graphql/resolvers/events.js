const { Event } = require('../../models/event');
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
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: '5f80ddcf4d728f0ed6cff1d0',
    });

    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);

      const user = await User.findById('5f8128a5f034ae1601eef1b8');
      if (!user) throw new Error('User not found');
      user.createdEvents.push(event);
      await user.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
};
