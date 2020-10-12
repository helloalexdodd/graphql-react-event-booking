import React from 'react';

function EventDetails({ eventDetails, closeModal, handleBookEvent, token }) {
  const { title, description, price, date, _id } = eventDetails;
  return (
    <>
      <div className="has-text-centered">
        <h3>{title}</h3>
        <h4>
          $ {price} - {new Date(date).toLocaleDateString('ca-CA')}
        </h4>
        <p>{description}</p>
      </div>
      <div className="field is-grouped is-grouped-centered">
        <p className="control">
          <button
            native-type="button"
            className="button is-light"
            onClick={closeModal}
          >
            Close
          </button>
        </p>
        {!!token && (
          <p className="control">
            <button
              native-type="button"
              className="button is-primary"
              onClick={() => handleBookEvent(_id)}
            >
              Book
            </button>
          </p>
        )}
      </div>
    </>
  );
}

export default EventDetails;
