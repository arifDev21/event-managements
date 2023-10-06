import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Center,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import defaultImage from '../assets/loket.png';
import { api } from '../api/axios';
import { UserEvents } from './userevents';
export const BasicModal = ({ isOpen, onClose, fetchEvents, id }) => {
  const userSelector = useSelector((state) => state.auth);
  const [data, setData] = useState({
    id: '',
    imageUrl: '',
    eventName: '',
    date: '',
    time: '',
    location: '',
    description: '',
    category: '',
    price: 0,
    stock: 0,
    createdBy: userSelector.id,
    participants: [],
  });

  const inputHandler = (e) => {
    if (e.target.id === 'price')
      if (isNaN(e.target.value)) return setData({ ...data, [e.target.id]: 0 });
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  console.log('userSelector.id :>> ', userSelector.id);

  const clear = () => {
    setData({
      id: '',
      imageUrl: '',
      eventName: '',
      date: '',
      time: '',
      location: '',
      description: '',
      category: '',
      stock: 0,
      price: 0,
    });
  };

  useEffect(() => {
    console.log('data.createdBy :>> ', data.createdBy);
  }, [data.createdBy]);

  const submit = async (e) => {
    console.log('data submit :>> ', data);
    e.preventDefault();
    try {
      if (userSelector.id) {
        await api.post(`/events`, { ...data, createdBy: userSelector?.id });
      } else {
        await api.post('/events', { ...data, createdBy: userSelector?.id });
        clear();
      }
      fetchEvents();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/events/${data?.id}`);
      clear();
      fetchEvents();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Event</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={submit}>
            <ModalBody>
              <Center flexDir="column" gap={'15px'}>
                <img
                  src={data?.imageUrl ? data?.imageUrl : defaultImage}
                  width={'201px'}
                  height={'143px'}
                  alt="isi dengan gambar"
                ></img>
                <Input
                  id="imageUrl"
                  placeholder="Image URL"
                  maxW="300px"
                  defaultValue={data?.imageUrl}
                  onChange={inputHandler}
                  required
                  type="url"
                ></Input>
                <Input
                  id="eventName"
                  placeholder="Event Name"
                  maxW="300px"
                  defaultValue={data?.eventName}
                  onChange={inputHandler}
                  required
                ></Input>
                <Input
                  id="date"
                  placeholder="Date"
                  size="md"
                  maxW="300px"
                  defaultValue={data?.date}
                  onChange={inputHandler}
                  required
                />
                <Input
                  id="time"
                  placeholder="Time"
                  size="md"
                  maxW="300px"
                  defaultValue={data?.time}
                  onChange={inputHandler}
                  required
                />
                <Input
                  id="location"
                  placeholder="location"
                  maxW="300px"
                  defaultValue={data?.location}
                  onChange={inputHandler}
                  required
                ></Input>
                <Input
                  id="description"
                  placeholder="Event Description"
                  maxW="300px"
                  defaultValue={data?.description}
                  onChange={inputHandler}
                ></Input>
                <Input
                  id="category"
                  placeholder="Event Category"
                  maxW="300px"
                  defaultValue={data?.category}
                  onChange={inputHandler}
                  required
                ></Input>
                <Input
                  id="stock"
                  placeholder="stock"
                  maxW="300px"
                  defaultValue={data?.stock}
                  value={data?.stock}
                  onChange={inputHandler}
                  required
                ></Input>
                <Input
                  id="price"
                  placeholder="Event Price"
                  maxW="300px"
                  defaultValue={data?.price}
                  value={data?.price}
                  onChange={inputHandler}
                  required
                ></Input>
              </Center>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={submit} type="submit">
                Submit
              </Button>
              {Event ? (
                <Button colorScheme="red" mr={3} onClick={remove}>
                  Delete
                </Button>
              ) : null}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
