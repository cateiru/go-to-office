import { Box, Center, Heading } from "@chakra-ui/react";
import { OfficeButton } from "./OfficeButton";

export const ButtonPage = () => {
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
          <OfficeButton>出社</OfficeButton>
        </Center>
      </Box>
    </Center>
  );
};
