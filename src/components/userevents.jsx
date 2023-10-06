import React from 'react';
import { Button, Box, Flex } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserEvents = ({
  events,
  fetchEvents,
  onDelete,
  onEdit,
  profileId,
}) => {
  const userSelector = useSelector((state) => state.auth);
  const handleDelete = async (id) => {
    await onDelete(id);
    fetchEvents();
  };

  const handleEdit = async (id) => {
    await onEdit(id);
    fetchEvents();
  };

  // Fetch events and participants whenever events change
  React.useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Your Events</h2>

      {events
        .filter((i) => i.createdBy === profileId)
        .map((event, index) => (
          <Box
            key={event.id}
            border="1px solid #ccc"
            borderRadius="lg"
            p={4}
            my={4}
          >
            <Flex justifyContent="space-between">
              <Box>
                <p>{event?.eventName}</p>
                <p>{event?.date}</p>
                <p>{event?.location}</p>
                <p>{`Participant: ${event?.participants?.length}/${event?.stock}`}</p>
              </Box>
              <Box width="200px">
                <b className="ml-6">Participant</b>
                <Pie
                  data={{
                    datasets: [
                      {
                        label: '# pax',
                        data: [event?.participants?.length, event?.stock],
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.2)',
                          'rgba(54, 162, 235, 0.2)',
                        ],
                        borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 1,
                      },
                    ],
                  }}
                />
              </Box>
            </Flex>
            {/* Edit and Delete buttons */}
            <Button colorScheme="blue" onClick={() => handleEdit(event.id)}>
              Edit
            </Button>
            <Button colorScheme="red" onClick={() => handleDelete(event.id)}>
              Delete
            </Button>
          </Box>
        ))}
    </div>
  );
};
