const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Event',
    },
  },
  { timestamps: true }
);

const Booking = model('Booking', bookingSchema);

module.exports = {
  bookingSchema,
  Booking,
};
