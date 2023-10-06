import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export const UserProfile = () => {
  const userProfile = useSelector((state) => state.auth);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleTopUp = async () => {
    if (topUpAmount) {
      const amount = parseInt(topUpAmount);
      if (!isNaN(amount) && amount > 0) {
        const updatedUserProfile = {
          ...user,
          credit: user.credit + amount,
        };

        localStorage.setItem('auth', JSON.stringify(updatedUserProfile));
        setUser(updatedUserProfile);
        setTopUpAmount('');
      }
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <Text fontWeight="bold" fontSize="20px" mb={3}>
        User Profile
      </Text>
      <Text fontSize="16px" mb={2}>
        Name: {userProfile.fullname}
      </Text>
      <Text fontSize="16px" mb={2}>
        Email: {user.email}
      </Text>
      <Text fontSize="16px" mb={2}>
        Referral Code: {user.referralCode}
      </Text>
      {user.credit !== null && (
        <Text fontSize="16px" mb={4}>
          Credit:{' '}
          {user?.credit?.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
          })}
        </Text>
      )}

      <Text fontWeight="bold" fontSize="20px" mb={3}>
        Top Up Credit
      </Text>
      <Input
        placeholder="Enter top-up amount"
        value={topUpAmount}
        onChange={(e) => setTopUpAmount(e.target.value)}
        type="number"
        size="md"
        mb={2}
      />
      <Button colorScheme="blue" onClick={handleTopUp}>
        Top Up
      </Button>
    </Box>
  );
};
