import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Flex,
  Container,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  useDisclosure,
  Collapse,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { api } from '../api/axios';
import { UserEvents } from '../components/userevents';
import { BasicModal } from '../components/modal';
import { EditModal } from '../components/editModal';
import { UserProfile } from '../components/user-profile';
import TicketList from '../components/userTiket';

export const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [data, setData] = useState({});
  const userSelector = useSelector((state) => state.auth);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const {
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
    isOpen: isOpenEdit,
  } = useDisclosure();

  const fetchEvents = useCallback(async () => {
    if (userSelector && userSelector.id) {
      try {
        const res = await api.get(`/events?createdBy=${userSelector.id}`);
        setEvents(res.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  }, [userSelector]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const del = async (id) => {
    const msg = 'Are You Sure Want To Delete Event?';
    if (window.confirm(msg)) {
      try {
        await api.delete(`events/${id}`);
        fetchEvents();
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const update = async (id) => {
    try {
      const res = await api.get(`/events/${id}`);
      setData({ ...res.data });
      setTimeout(() => {
        onOpenEdit();
      }, 200);
    } catch (error) {
      console.error('Error fetching event for update:', error);
    }
  };

  return (
    <Container maxW="3xl" py={8}>
      <Flex>
        <Divider orientation="vertical" />
        <Box flex="1" p={8}>
          <Tabs variant="enclosed">
            <TabList mb="1em">
              <Tab>Profile</Tab>
              <Tab>Events</Tab>
              <Tab>Purchased Tickets</Tab>{' '}
              {/* Added Tab for purchased tickets */}
            </TabList>
            <TabPanels>
              <TabPanel>
                <UserProfile user={userSelector} />
              </TabPanel>
              <TabPanel>
                <UserEvents
                  events={events}
                  profileId={userSelector.id}
                  fetchEvents={fetchEvents}
                  onDelete={del}
                  onEdit={update}
                />
                <Button onClick={onOpen} mt={4}>
                  Create Event
                </Button>
              </TabPanel>
              <TabPanel>
                <TicketList userId={userSelector.id} />{' '}
                {/* Assuming TicketList component takes userId as a prop */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        {/* Add content for Create Event */}
      </Collapse>
      <BasicModal
        onClose={onClose}
        onOpen={onOpen}
        isOpen={isOpen}
        fetchEvents={fetchEvents}
      />
      <EditModal
        onClose={onCloseEdit}
        onOpen={onOpenEdit}
        fetchEvents={fetchEvents}
        isOpen={isOpenEdit}
        editData={data}
      />
    </Container>
  );
};
