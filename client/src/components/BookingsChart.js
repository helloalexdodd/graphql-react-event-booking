import React from 'react';
import { Bar } from 'react-chartjs-2';

function BookingsChart({ bookings }) {
  const BOOKINGS_BUCKETS = {
    Cheap: {
      min: 0,
      max: 100,
    },
    Normal: {
      min: 100,
      max: 200,
    },
    Expensive: {
      min: 200,
      max: 9999999,
    },
  };

  const data = { labels: [], datasets: [] };
  let values = [];

  for (const bucket in BOOKINGS_BUCKETS) {
    const filterBookingsCount = bookings.reduce((acc, cur) => {
      if (
        cur.event.price > BOOKINGS_BUCKETS[bucket].min &&
        cur.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    values.push(filterBookingsCount);
    data.labels.push(bucket);
    data.datasets.push({
      fillColor: 'rgba(220, 220, 220, 0.5)',
      stokeColor: 'rgba(220, 220, 220, 0.8)',
      highlightFill: 'rgba(220, 220, 220, 0.75)',
      highlightStroke: 'rgba(220, 220, 220, 1)',
      data: values,
    });
    values = [...values];
    values[values.length - 1] = 0;
    values = [0, 0];
  }

  return <Bar data={data} />;
}

export default BookingsChart;
