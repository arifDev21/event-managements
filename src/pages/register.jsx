import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast, // Import useToast
} from '@chakra-ui/react';
import { api } from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { types } from '../redux/reducers/types';

const generateReferralCode = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let referralCode = '';
  for (let i = 0; i < 6; i++) {
    referralCode += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return referralCode;
};
const Register = () => {
  const toast = useToast();
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      password: '',
      referralCode: generateReferralCode(),
      referralCodeFromFriend: '',
      purchasedEvents: [],
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required('Email is required'),
      fullname: Yup.string().min(4).required('Fullname is required'),
      password: Yup.string().min(5).required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        await api.post('/users/', values);
        toast({
          title: 'Auth Register Success',
          description: 'New user has been added.',
          status: 'success',
          duration: 5000,
          position: 'top',
          isClosable: true,
        });
        nav('/login');
      } catch (error) {
        toast({
          title: 'Auth Register Failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    },
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign up to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="fullname">
                <FormLabel>Fullname</FormLabel>
                <Input
                  type="text"
                  placeholder="Fullname"
                  {...formik.getFieldProps('fullname')}
                />
                {formik.touched.fullname && formik.errors.fullname ? (
                  <div>{formik.errors.fullname}</div>
                ) : null}
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div>{formik.errors.email}</div>
                ) : null}
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Password"
                  {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div>{formik.errors.password}</div>
                ) : null}
              </FormControl>
              <FormControl id="referralCodeFromFriend">
                <FormLabel>Referral Code</FormLabel>
                <Input
                  type="text"
                  placeholder="Referral Code"
                  {...formik.getFieldProps('referralCodeFromFriend')}
                />
              </FormControl>

              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Register;
