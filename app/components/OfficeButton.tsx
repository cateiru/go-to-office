import { Box, Button, ButtonProps, Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { TbMoodSadSquint } from "react-icons/tb";

type Props = React.PropsWithChildren<ButtonProps> & {
  isError?: boolean;
};

export const OfficeButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ isError, ...props }, ref) => {
    return (
      <Button
        variant="unstyled"
        w="15rem"
        h="15rem"
        borderRadius="50%"
        bgColor={isError ? "red.400" : "purple.400"}
        color="white"
        fontSize="5rem"
        _hover={{
          bgColor: isError ? "red.500" : "purple.500",
        }}
        ref={ref}
        _active={{
          transform: "scale(0.9)",
        }}
        spinner={
          <Box w="15rem" h="15rem">
            <Spinner size="xl" thickness="5px" />
          </Box>
        }
        {...props}
      >
        {isError ? (
          <Center>
            <TbMoodSadSquint size="10rem" />
          </Center>
        ) : (
          props.children
        )}
      </Button>
    );
  }
);

OfficeButton.displayName = "OfficeButton";
