const { Booking } = require('../../models/booking');
const { Event } = require('../../models/event');
const { getUser, getSingleEvent } = require('./merge');
const { dateToString } = require('../../helpers/date');

const transformBooking = (booking) => {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.createdAt),
    user: getUser.bind(this, booking._doc.user),
    event: getSingleEvent.bind(this, booking._doc.event),
  };
};

module.exports = {
  bookings: async (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated');

    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => transformBooking(booking));
    } catch (err) {
      throw err;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated');

    const event = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      event: event,
      user: req.userId,
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated');

    try {
      const booking = await Booking.findById(args.bookingId).populate('event');
      const event = transformEvent(booking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  },
};
