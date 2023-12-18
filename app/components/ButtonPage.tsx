"use client";

import { Box, Center, Heading, Text } from "@chakra-ui/react";
import { OfficeButton } from "./OfficeButton";
import { useInOffice } from "./useInOffice";
import { SuccessDialog } from "./SuccessDialog";
import React from "react";

export const ButtonPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const { inOffice, handleInOffice } = useInOffice();

  const handleClick = () => {
    setError(null);
    setLoading(true);

    handleInOffice()
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  };

  return (
    <Center w="100%" h="100vh">
      <Box>
        <Heading
          textAlign="center"
          mb="2rem"
          background="linear-gradient(90deg, #12C2E9 0%, #c471ed 50%, #f64f59 100%)"
          backgroundClip="text"
        >
          出社できて偉いボタン
        </Heading>
        <Center>
          <OfficeButton
            onClick={handleClick}
            isLoading={loading}
            isError={error !== null}
          >
            出社
          </OfficeButton>
        </Center>
        {error ? (
          <Text textAlign="center" my="1rem" fontWeight="bold" color="red.500">
            {error.message}
          </Text>
        ) : (
          <Box h="3.1rem"></Box>
        )}
        <SuccessDialog isSuccess={inOffice} />
      </Box>
    </Center>
  );
};
