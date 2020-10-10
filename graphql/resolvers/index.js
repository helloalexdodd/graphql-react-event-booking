const bcrypt = require('bcryptjs');
const { Event } = require('../../models/event');
const { User } = require('../../models/user');

const setUser = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: setEvents.bind(this, user._doc.createdEvents),
    };
  } catch (err) {
    throw err;
  }
};

const setEvents = async (eventIds) => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map((event) => {
      return {
        ...event._doc,
        _id: event.id,
        creator: setUser.bind(this, event.creator),
      };
    });
  } catch (err) {
    throw err;
  }
};

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          _id: event.id,
          date: new Date(event._doc.date).toISOString(),
          creator: setUser.bind(this, event._doc.creator),
        };
      });
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args) => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: '5f80ddcf4d728f0ed6cff1d0',
    });

    let createdEvent;
    try {
      const res = await event.save();

      createdEvent = {
        ...res._doc,
        _id: res._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: setUser.bind(this, res._doc.creator),
      };

      const user = await User.findById('5f8128a5f034ae1601eef1b8');
      if (!user) throw new Error('User not found');
      user.createdEvents.push(event);
      await user.save();
      return createdEvent;
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args) => {
    try {
      const user = await User.findOne({
        email: args.userInput.email,
      });
      if (user)
        throw new Error('This email is already in use by an existing user');

      const password = await bcrypt.hash(args.userInput.password, 12);

      const newUser = new User({
        email: args.userInput.email,
        password,
      });

      const result = await newUser.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
