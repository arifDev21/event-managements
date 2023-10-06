'use client';
import React, { useState, useEffect } from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Center,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/axios';
import { useSelector } from 'react-redux';

export const SimpleCard = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({});
  const toast = useToast();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const InputHandler = (key, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
  };

  const userSelector = useSelector((state) => state.auth);

  useEffect(() => {
    if (userSelector.id) nav('/home');
  }, [userSelector.id, nav]);

  const login = async () => {
    if (!user.email || !user.password) {
      toast({
        title: 'Login Failed',
        description: 'Email and password are required.',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
      return;
    }

    try {
      const auth = await api.get(`/users`, {
        params: { ...user },
      });

      if (!auth.data) {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      delete auth.data[0].password;
      localStorage.setItem('auth', JSON.stringify(auth.data[0]));

      toast({
        title: 'Hello',
        description: 'Login successful!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      nav('/home');
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: 'Login Failed',
        description: 'An error occurred during login.',
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Masuk ke akunmu</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" key="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                required
                placeholder="Enter email"
                onChange={(e) => InputHandler('email', e.target.value)}
              />
            </FormControl>
            <FormControl id="password" key="password">
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  onChange={(e) => InputHandler('password', e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                onClick={login}
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Masuk
              </Button>
              <Center>
                <Text fontSize="15px">
                  Belum punya Akun?{' '}
                  <a href="/register" color="blue">
                    <b>Daftar</b>
                  </a>
                </Text>
              </Center>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
