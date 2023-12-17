import { Box, Center, Divider, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box as="footer" w="100%">
      <Divider w="95%" m="auto" />
      <Center my="1.5rem" color="gray.500">
        <Text>
          Copyright 2023{" "}
          <Link href="https://cateiru.com" isExternal>
            cateiru
          </Link>{" "}
          -{" "}
          <Link href="https://github.com/cateiru/go-to-office" isExternal>
            GitHub
          </Link>
        </Text>
      </Center>
    </Box>
  );
};
