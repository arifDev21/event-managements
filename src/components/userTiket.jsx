/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { api } from '../api/axios';
import {
  Box,
  Heading,
  Grid,
  GridItem,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

const TicketList = ({ userId }) => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEventsByParticipant = async () => {
    try {
      const userResponse = await api.get(`/users/${userId}`);
      const purchasedEvents = userResponse.data.purchasedEvents;

      const eventsPromises = purchasedEvents.map(async (purchasedEvent) => {
        const eventResponse = await api.get(
          `/events/${purchasedEvent.eventId}`
        );
        return eventResponse.data;
      });

      const eventsData = await Promise.all(eventsPromises);
      setEvents(eventsData);

      // Save purchased events to local storage
      localStorage.setItem('purchasedEvents', JSON.stringify(purchasedEvents));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  //   const handleCancelTicket = async (eventId) => {
  //     try {
  //       const userResponse = await api.get(`/users/${userId}`);
  //       const purchasedEvents = userResponse.data.purchasedEvents;

  //       // Find the purchased event by eventId
  //       const purchasedEvent = purchasedEvents.find(
  //         (event) => event.eventId === eventId
  //       );

  //       if (!purchasedEvent) {
  //         console.error('Purchased event not found for cancellation');
  //         return;
  //       }

  //       // Update the event as cancellable: false
  //       const updatedEvents = events.map((event) =>
  //         event.id === eventId ? { ...event, cancellable: false } : event
  //       );

  //       setEvents(updatedEvents);

  //       // Update the purchased event as cancelled: true
  //       const updatedPurchasedEvents = purchasedEvents.map((event) =>
  //         event.eventId === eventId ? { ...event, cancelled: true } : event
  //       );

  //       await api.put(`/users/${userId}`, {
  //         purchasedEvents: updatedPurchasedEvents,
  //       });

  //       // Remove the cancelled event from the list of events
  //       const filteredEvents = events.filter((event) => event.id !== eventId);
  //       setEvents(filteredEvents);

  //       // You may also want to update data.json based on the cancellation
  //     } catch (error) {
  //       console.error('Error cancelling ticket:', error);
  //     }
  //   };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const storedPurchasedEvents = JSON.parse(
      localStorage.getItem('purchasedEvents')
    );
    if (storedPurchasedEvents) {
      setEvents(storedPurchasedEvents);
    }

    fetchEventsByParticipant();
  }, [userId]);

  return (
    <Box p="4">
      <Heading fontSize="24px" mb="16px">
        Events You've Participated In
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
        {events.map((event) => (
          <GridItem key={event.id}>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              onClick={() => handleEventClick(event)}
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ transform: 'scale(1.05)' }}
              height={370}
            >
              <Image
                src={event.imageUrl}
                alt={event.eventName}
                width="100%"
                height="200px"
                objectFit="cover"
              />
              <Box p="4">
                <Text fontSize="16px" fontWeight="bold" mb="2">
                  {event.eventName}
                </Text>
                <Text fontSize="12px">Date: {event.date}</Text>
                <Text fontSize="12px">Time: {event.time}</Text>
                <Text fontSize="12px">Location: {event.location}</Text>
              </Box>
            </Box>
          </GridItem>
        ))}
      </Grid>

      {selectedEvent && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedEvent.eventName}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedEvent.imageUrl}
                alt={selectedEvent.eventName}
                width="100%"
                height="250px"
                objectFit="cover"
              />
              <Box p="4">
                <Text fontSize="16px" fontWeight="bold" mb="2">
                  {selectedEvent.eventName}
                </Text>
                <Text fontSize="12px">Date: {selectedEvent.date}</Text>
                <Text fontSize="12px">Time: {selectedEvent.time}</Text>
                <Text fontSize="12px">Location: {selectedEvent.location}</Text>

                {/* <Button
                  mt="2"
                  colorScheme="red"
                  onClick={() => handleCancelTicket(selectedEvent.id)}
                >
                  Cancel Ticket
                </Button> */}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default TicketList;
