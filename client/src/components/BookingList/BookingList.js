import React from 'react';
import BookingListItem from './BookingListItem';

function BookingList({ bookings, handleCancelBooking }) {
  return (
    <ul className="row columns is-multiline">
      {bookings.map((booking) => (
        <BookingListItem
          key={booking._id}
          booking={booking}
          handleCancelBooking={handleCancelBooking}
        />
      ))}
    </ul>
  );
}

export default BookingList;
