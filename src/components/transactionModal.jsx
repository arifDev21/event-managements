/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Image,
  Text,
  Stack,
  Box,
  useToast,
} from '@chakra-ui/react';
import { api } from '../api/axios';

export const TransactionModal = ({
  isOpen,
  onClose,
  eventDetails,
  updateUserProfile,
  handleOpenModal,
  isAuthenticated,
}) => {
  const userSelector = useSelector((state) => state.auth);
  const userDataFromLocalStorage = JSON.parse(localStorage.getItem('auth'));
  const referralCodeUsage = userDataFromLocalStorage?.referralCodeUsage || 0;
  const toast = useToast();

  const [updatedEventDetails, setUpdatedEventDetails] = useState(eventDetails);
  const [userCredit, setUserCredit] = useState(
    userDataFromLocalStorage?.credit
  );
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const handleAuth = () => {
    toast({
      title: 'Silakan login',
      description: 'Anda perlu login terlebih dahulu untuk membeli tiket ini.',
      status: 'info',
      duration: 3000,
      position: 'top',
      isClosable: true,
    });
  };
  const handleIncreaseTicket = () => {
    setTicketQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseTicket = () => {
    if (ticketQuantity > 1) {
      setTicketQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleBuyTickets = async () => {
    const isReferralCodeValid =
      userDataFromLocalStorage?.referralCodeFromFriend && referralCodeUsage < 1;

    let price = eventDetails.price;

    // Apply the referral code discount if it's valid
    if (isReferralCodeValid) {
      price = (90 / 100) * eventDetails.price; // Apply a 10% discount
    }

    const totalPrice = price * ticketQuantity;

    if (
      userDataFromLocalStorage?.credit >= totalPrice &&
      eventDetails.stock >= ticketQuantity
    ) {
      try {
        const updatedUserProfile = {
          ...userDataFromLocalStorage,
          credit: userDataFromLocalStorage.credit - totalPrice,
        };

        const updatedEventDetails = {
          ...eventDetails,
          stock: eventDetails.stock - ticketQuantity,
        };

        const newParticipant = {
          id: userSelector.id,
          name: userSelector.name,
        };
        const purchasedEvent = {
          eventId: eventDetails.id,
          eventName: eventDetails.eventName,
        };
        if (Array.isArray(updatedUserProfile.purchasedEvents)) {
          updatedUserProfile.purchasedEvents.push(purchasedEvent);
        } else {
          updatedUserProfile.purchasedEvents = [purchasedEvent];
        }
        updatedEventDetails.participants.push(newParticipant);

        updateUserProfile(updatedUserProfile);

        await api.patch(`/users/${updatedUserProfile.id}`, {
          credit: updatedUserProfile.credit,
          purchasedEvents: updatedUserProfile.purchasedEvents,
        });

        await api.put(`/events/${eventDetails.id}`, updatedEventDetails);
        console.log(purchasedEvent);
        localStorage.setItem('auth', JSON.stringify(updatedUserProfile));
        setUpdatedEventDetails(updatedEventDetails);
        setUserCredit(updatedUserProfile.credit);
        handleOpenModal();
        onClose();
        toast({
          title: 'Sukses Membeli Tiket',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        window.location.reload();
      } catch (error) {
        toast({
          title: 'Error purchasing tickets',
          description: error.message,
          status: 'error',
          duration: 5000,
          position: 'top',
        });
      }
    } else {
      toast({
        title: 'Credit anda tidak Cukup',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader className="text-center">
          {eventDetails?.eventName}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" alignItems="center">
            <Image
              boxSize="100%"
              objectFit="contain"
              src={eventDetails?.imageUrl}
              alt={eventDetails?.eventName}
            />
            <Text fontWeight={600} color="gray.500" mt={4}>
              {eventDetails?.category}
            </Text>
            <Stack mt={4} spacing={2}>
              <Box
                className={
                  userDataFromLocalStorage?.referralCodeFromFriend
                    ? 'line-through'
                    : ''
                }
              >
                <Text fontWeight="bold" display="inline">
                  Price:
                </Text>{' '}
                Rp {eventDetails?.price.toLocaleString('id-ID')}
              </Box>
              {userDataFromLocalStorage?.referralCodeFromFriend && (
                <Box>
                  <Text fontWeight="bold" display="inline">
                    Price:
                  </Text>{' '}
                  Rp{' '}
                  {(
                    eventDetails?.price -
                    (10 / 100) * eventDetails?.price
                  ).toLocaleString('id-ID')}
                </Box>
              )}
              <Box>
                <Text fontWeight="bold" display="inline">
                  Stock:
                </Text>{' '}
                {eventDetails?.stock}
              </Box>
            </Stack>
            <Flex mt={4}>
              <Button onClick={handleDecreaseTicket}>-</Button>
              <Text mx={4}>{ticketQuantity}</Text>
              <Button onClick={handleIncreaseTicket}>+</Button>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          {isAuthenticated ? (
            <>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Tutup
              </Button>
              <Button colorScheme="blue" onClick={handleBuyTickets}>
                Beli
              </Button>
            </>
          ) : (
            <Button colorScheme="blue" onClick={handleAuth}>
              Silakan Login
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
