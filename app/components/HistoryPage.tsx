import { Box, Center, Heading } from "@chakra-ui/react";

export const HistoryPage = () => {
  return (
    <Box w="100%" h="100vh">
      <Center mt="3rem">
        <Heading
          textAlign="center"
          mb="2rem"
          background="linear-gradient(90deg, #12C2E9 0%, #c471ed 50%, #f64f59 100%)"
          backgroundClip="text"
        >
          履歴
        </Heading>
      </Center>
    </Box>
  );
};
