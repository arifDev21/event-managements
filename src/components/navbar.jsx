import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  InputGroup,
  Input,
  InputLeftElement,
  Center,
} from '@chakra-ui/react';

import { Search2Icon, CalendarIcon } from '@chakra-ui/icons';
import Loket from '../assets/loket.png';
import user from '../assets/user.png';
import { BasicModal } from './modal';
import { api } from '../api/axios';

const Navbar = () => {
  const token = localStorage.getItem('auth');
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const { onOpen, onClose, isOpen } = useDisclosure();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/events', {
          params: {
            eventName_like: search, // Filter by event name
          },
        });
        setEvents(response.data);
        console.log(response);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, [search]);
  console.log(search, 'search in navbar');
  return (
    <>
      <Box>
        <Flex
          width="100%"
          bg={useColorModeValue('gray.800')}
          minH="60px"
          py={2}
          borderBottom={1}
          borderStyle="solid"
          align="center"
          px={4}
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <a
            href="/home"
            style={{
              width: '150px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src={Loket} alt="" />
          </a>
          {/* <InputGroup
            mt={{ base: 2, md: 0 }}
            maxWidth={{ base: '100%', md: '50%' }}
            paddingLeft={10}
          >
            <InputLeftElement pointerEvents="none" paddingLeft={14}>
              <Search2Icon />
            </InputLeftElement>
            <Input
              type="tel"
              placeholder="Cari event seru disini"
              value={search} // Set the value to the search state
              onChange={(e) => setSearch(e.target.value)} // Update the search state
              bg="white"
            />
          </InputGroup> */}
          <Stack
            flex={1}
            justify="flex-end"
            direction="row"
            mt={{ base: 2, md: 0 }}
            spacing={4}
          >
            {token && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                <CalendarIcon onClick={onOpen} />
                <Stack display={{ base: 'none', md: 'flex' }}>
                  <span
                    onClick={onOpen}
                    style={{ fontSize: '13px', paddingLeft: '5px' }}
                  >
                    Create event
                  </span>
                </Stack>
              </div>
            )}
            {token && (
              <>
                <Button
                  as="a"
                  fontWeight={600}
                  textDecoration="none"
                  color="white"
                  bg="#0049CC"
                  onClick={() => {
                    localStorage.removeItem('auth');
                    window.location.reload();
                  }}
                >
                  Keluar
                </Button>
                <a href="/dashboard">
                  <img
                    src={user}
                    alt="User"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#e5e5e5',
                      borderRadius: '50%',
                    }}
                  />
                </a>
              </>
            )}
            {!token && (
              <>
                <Button
                  as="a"
                  fontWeight={600}
                  href="/login"
                  textDecoration="none"
                  color="white"
                  bg="#0049CC"
                >
                  Masuk
                </Button>
                <Button
                  as="a"
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize="sm"
                  fontWeight={600}
                  color="white"
                  bg="#0049CC"
                  href="/register"
                  _hover={{
                    bg: 'white',
                  }}
                >
                  Daftar
                </Button>
              </>
            )}
          </Stack>
        </Flex>

        <Collapse in={isOpen} animateOpacity></Collapse>
        <BasicModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
      </Box>
    </>
  );
};

export default Navbar;
