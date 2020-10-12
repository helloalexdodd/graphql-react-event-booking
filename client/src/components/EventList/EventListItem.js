import React from 'react';

function EventListItem({ event, userId, handleShowModal }) {
  const { title, price, _id, date } = event;
  return (
    <li className="column is-4">
      <div className="card">
        <div className="card-content">
          <div className="content">
            <h3>{title}</h3>
            <h4>
              $ {price} - {new Date(date).toLocaleDateString('ca-CA')}
            </h4>
            {userId === event.creator._id ? (
              <p>You are the owner of this event.</p>
            ) : (
              <button
                className="button is-info"
                onClick={() => handleShowModal(_id)}
              >
                View Details
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default EventListItem;
