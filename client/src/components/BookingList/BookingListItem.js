import React from 'react';

function BookingListItem({ booking, handleCancelBooking }) {
  const { _id, event, createdAt } = booking;
  return (
    <li className="column is-4">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h3>{event.title}</h3>
            <h4>{new Date(createdAt).toLocaleDateString('ca-CA')}</h4>

            <button
              onClick={() => handleCancelBooking(_id)}
              className="button is-danger"
            >
              Cancel booking
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default BookingListItem;
