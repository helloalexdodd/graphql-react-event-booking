import React, { useEffect, useState, useRef, useContext } from 'react';
import Context from '../context/auth-context';
import Modal from '../components/Modal';

function Events() {
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const titleRef = useRef('');
  const priceRef = useRef('');
  const dateRef = useRef('');
  const timeRef = useRef('');
  const descriptionRef = useRef('');
  const { token } = useContext(Context);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const fetchEvents = async () => {
    let requestBody = {
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
      console.log(data.events);
      setEvents(data.events);
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const price = +priceRef.current.value;
    const date = dateRef.current.value + 'T' + timeRef.current.value;
    const description = descriptionRef.current.value;

    if (
      title.trim().length === 0 ||
      price <= 0 ||
      date.trim().length === 0 ||
      description.trim().length === 0
    ) {
      return;
    }

    const event = { title, price, date, description };

    let requestBody = {
      query: `
        mutation {
          createEvent(eventInput: { title: "${title}", description: "${description}", price: ${price}, date: "${date}" }) {
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
          Authorization: `Bearer ${token}`,
        },
      });

      await res.json();
      fetchEvents();
    } catch (err) {
      throw new Error(err);
    }

    setShowModal(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <section className="section">
        <Modal
          showModal={showModal}
          handleShowModal={handleShowModal}
          handleCreateEvent={handleCreateEvent}
        >
          <form>
            <div className="field">
              <label className="label" htmlFor="title">
                Title
              </label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Title"
                  id="title"
                  name="title"
                  ref={titleRef}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="price">
                Price
              </label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Price"
                  id="price"
                  name="price"
                  ref={priceRef}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="date">
                Date
              </label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  placeholder="Date"
                  id="date"
                  name="date"
                  ref={dateRef}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="time">
                Time
              </label>
              <div className="control">
                <input
                  className="input"
                  type="time"
                  placeholder="Time"
                  id="time"
                  name="time"
                  ref={timeRef}
                />
              </div>
            </div>
            <div className="field">
              <label className="label" htmlFor="description">
                Description
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Description"
                  id="description"
                  name="description"
                  ref={descriptionRef}
                />
              </div>
            </div>
            <div className="field is-grouped is-grouped-centered">
              <p className="control">
                <button
                  native-type="submit"
                  className="button is-primary"
                  onClick={handleCreateEvent}
                >
                  Submit
                </button>
              </p>
              <p className="control">
                <button
                  native-type="button"
                  className="button is-light"
                  onClick={handleShowModal}
                >
                  Cancel
                </button>
              </p>
            </div>
          </form>
        </Modal>
        {token && (
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
        )}
      </section>
      <section className="section">
        {!!events.length && (
          <ul>
            {events.map((event) => (
              <li className="box">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>{event.price}</p>
                <p>{event.date}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default Events;
