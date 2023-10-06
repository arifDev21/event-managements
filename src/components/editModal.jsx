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

import { useNavigate } from 'react-router-dom';

export const EditModal = ({ isOpen, onClose, fetchEvents, id, editData }) => {
  const userSelector = useSelector((state) => state.auth);

  const initialData = {
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
  };
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (editData) {
      setData({ ...editData });
    }
  }, [editData]);

  const fetchEventById = async () => {
    try {
      const res = await api.get(`/events/${id}`);
      setData({ ...res.data });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (id) fetchEventById();
  }, [isOpen]);

  const inputHandler = (e) => {
    if (e.target.id == 'price')
      if (isNaN(e.target.value)) return setData({ ...data, [e.target.id]: 0 });
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

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
      price: 0,
      stock: '',
    });
  };

  const submit = async (e) => {
    console.log('id submit data :>> ', data.id);
    e.preventDefault();
    try {
      if (data.id) {
        await api.patch(`/events/${data.id}`, data);
      } else {
        await api.post('/events', data);
        clear();
      }
      fetchEvents();
      // navigate("/dashboard", { replace: true });
      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/events/${id}`);
      clear();
      fetchEvents();
      onClose();
    } catch (err) {
      console.log(err);
    }
  };
  const addProducts = async () => {
    await api.get('/events');
  };
  console.log(addProducts);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
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
                  type="date"
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
                Update
              </Button>
              {Event ? (
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  Cancel
                </Button>
              ) : null}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
