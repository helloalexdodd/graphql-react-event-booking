import React, { useEffect, useState, useRef, useContext } from 'react';
import Context from '../context/auth-context';
import Modal from '../components/Modal';
import CreateEvent from '../components/CreateEvent';
import EventDetails from '../components/EventDetails';
import EventList from '../components/EventList/EventList';
import Loading from '../components/Loading/Loading';

function Events() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef('');
  const priceRef = useRef('');
  const dateRef = useRef('');
  const timeRef = useRef('');
  const descriptionRef = useRef('');
  const { token, userId } = useContext(Context);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleCancelEvent = async (eventId) => {
    const requestBody = {
      query: `
      mutation CancelEvent($id: ID!) {
        cancelEvent(eventId: $id) {
          _id
          title
        }
      }
      `,
      variables: { id: eventId },
    };
    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const newEvents = events.filter((event) => event._id !== eventId);
      setEvents(newEvents);
    } catch (err) {
      console.log(err);
    }
  };

  const handleShowDetails = (eventId) => {
    if (eventId) {
      const eventDetails = events.find((event) => event._id === eventId);
      return setEventDetails(eventDetails);
    }
    setEventDetails(null);
  };

  const handleBookEvent = async (eventId) => {
    const requestBody = {
      query: `
        mutation BookEvent($eventId: ID!) {
          bookEvent(eventId: $eventId) {
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: { eventId },
    };
    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setEventDetails(null);
    } catch (err) {
      console.log(err);
      setEventDetails(null);
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `,
    };

    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data } = await res.json();
      setIsLoading(false);
      setEvents(data.events);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleCreateEvent = async (e) => {
    console.log("it's a  party!");
    e.preventDefault();
    const title = titleRef.current.value;
    const price = +priceRef.current.value;
    const date = dateRef.current.value + 'T' + timeRef.current.value;
    const description = descriptionRef.current.value;

    if (
      title.trim().length === 0 ||
      price < 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }
    const requestBody = {
      query: `
        mutation CreateEvent($title: String!, $description: String!, $price: Float!, $date: String!) {
          createEvent(eventInput: { title: $title, description: $description, price: $price, date: $date }) {
            _id
            title
            description
            price
            date
          }
        }
        `,
      variables: { title, description, price, date },
    };

    console.log('is it a party here too?');
    try {
      const res = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const { data } = await res.json();
      const { createEvent } = data;
      createEvent.creator = {
        _id: userId,
      };
      setEvents([...events, createEvent]);
    } catch (err) {
      console.log(err);
    }
    titleRef.current.value = '';
    priceRef.current.value = '';
    dateRef.current.value = '';
    timeRef.current.value = '';
    descriptionRef.current.value = '';
    setShowModal(false);
  };

  useEffect(() => {
    if (document) fetchEvents();
  }, []);

  return (
    <>
      <Modal showModal={showModal} handleShowModal={handleShowModal}>
        <CreateEvent
          titleRef={titleRef}
          priceRef={priceRef}
          dateRef={dateRef}
          timeRef={timeRef}
          descriptionRef={descriptionRef}
          handleCreateEvent={handleCreateEvent}
          handleShowModal={handleShowModal}
        />
      </Modal>
      {!!eventDetails && (
        <Modal showModal={!!eventDetails} handleShowModal={handleShowDetails}>
          <EventDetails
            eventDetails={eventDetails}
            closeModal={handleShowDetails}
            handleBookEvent={handleBookEvent}
            token={token}
          ></EventDetails>
        </Modal>
      )}
      {token && (
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              {/* <p className="label" htmlFor="events">
            Share your own events
          </p> */}
              <button
                className="button is-primary"
                id="events"
                onClick={handleShowModal}
              >
                Create event
              </button>
            </div>
          </div>
        </section>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <section className="section">
          {!!events.length && (
            <EventList
              events={events}
              userId={userId}
              handleShowModal={handleShowDetails}
              handleCancelEvent={handleCancelEvent}
            />
          )}
        </section>
      )}
    </>
  );
}

export default Events;
