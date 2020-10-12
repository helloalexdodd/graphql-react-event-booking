import React from 'react';
import EventListItem from './EventListItem';

function EventList({ events, userId, handleShowModal }) {
  return (
    <ul className="row columns is-multiline">
      {events.map((event) => (
        <EventListItem
          key={event._id}
          event={event}
          userId={userId}
          handleShowModal={handleShowModal}
        />
      ))}
    </ul>
  );
}

export default EventList;
