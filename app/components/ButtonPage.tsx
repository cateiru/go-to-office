"use client";

import { Box, Center, Heading } from "@chakra-ui/react";
import { OfficeButton } from "./OfficeButton";
import { useInOffice } from "./useInOffice";

export const ButtonPage = () => {
  const { inOffice, loading, handleInOffice } = useInOffice();

  console.log(inOffice);

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
          <OfficeButton onClick={handleInOffice} isLoading={loading}>
            出社
          </OfficeButton>
        </Center>
      </Box>
    </Center>
  );
};
