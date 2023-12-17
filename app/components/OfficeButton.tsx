import { Button, ButtonProps } from "@chakra-ui/react";
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
        bgColor="red.400"
        color="white"
        fontSize="5rem"
        _hover={{
          bgColor: "red.500",
        }}
        ref={ref}
        _active={{
          transform: "scale(0.9)",
        }}
      >
        {props.children}
      </Button>
    );
  }
);

OfficeButton.displayName = "OfficeButton";
