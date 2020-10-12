import React, { useEffect, useState, useContext, useRef } from 'react';
import Context from '../context/auth-context';
import Loading from '../components/Loading/Loading';
import BookingList from '../components/BookingList/BookingList';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useContext(Context);
  const isActive = useRef(true);

  const fetchBookings = async () => {
    setIsLoading(true);
    const requestBody = {
      query: `
      query {
        bookings {
          _id
          createdAt
          event {
            _id
            title
            date
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
      const { data } = await res.json();
      setIsLoading(false);
      if (!!isActive.current) setBookings(data.bookings);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    setIsLoading(false);
    const requestBody = {
      query: `
      mutation {
        cancelBooking(bookingId: "${bookingId}") {
          _id
          title
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
      const data = await res.json();
      const newBookings = bookings.filter(
        (booking) => booking._id !== bookingId
      );
      setBookings(newBookings);
      console.log(data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    return () => (isActive.current = false);
  }, []);

  return (
    <section className="section">
      {isLoading ? (
        <Loading />
      ) : (
        <BookingList
          bookings={bookings}
          handleCancelBooking={handleCancelBooking}
        />
      )}
    </section>
  );
}

export default Bookings;
