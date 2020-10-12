import React from 'react';

function EventDetails({ eventDetails, closeModal, handleBookEvent, token }) {
  const { title, description, price, date, _id } = eventDetails;
  return (
    <>
      <div className="m-4 has-text-centered">
        <h3 className="is-size-4">{title}</h3>
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
