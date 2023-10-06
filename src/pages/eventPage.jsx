import React, { useState, useEffect } from 'react';
import { api } from '../api/axios';
import { EventList } from '../components/event';
import { Center, Box } from '@chakra-ui/react';
import LoadingPage from '../components/loading';

export const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/events');
      setEvents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching events:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <h1
        style={{
          fontWeight: '700',
          fontSize: '20px',
          marginLeft: '70px',
          marginTop: '80px',
          marginBottom: '20px',
        }}
      >
        Event Pilihan
      </h1>

      {loading ? (
        <LoadingPage />
      ) : (
        <Center alignItems="flex-start">
          <EventList events={events} fetchEvents={fetchEvents} />
        </Center>
      )}
    </>
  );
};
