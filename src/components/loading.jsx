import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Center height="100vh">
      <Spinner size="xl" color="blue.500" />
    </Center>
  );
};

export default LoadingPage;
