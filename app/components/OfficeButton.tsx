import { Box, Button, ButtonProps, Center, Spinner } from "@chakra-ui/react";
import React from "react";

type Props = React.PropsWithChildren<ButtonProps>;

export const OfficeButton = React.forwardRef<HTMLButtonElement, Props>(
  (props, ref) => {
    return (
      <Button
        variant="unstyled"
        w="15rem"
        h="15rem"
        borderRadius="50%"
        bgColor="purple.400"
        color="white"
        fontSize="5rem"
        _hover={{
          bgColor: "purple.500",
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
        {props.children}
      </Button>
    );
  }
);

OfficeButton.displayName = "OfficeButton";
