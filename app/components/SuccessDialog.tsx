import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Confetti from "react-confetti";

interface Props {
  isSuccess: boolean;
}

export const SuccessDialog: React.FC<Props> = ({ isSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState<[number, number]>([0, 0]);
  const [showConfetti, setShowConfetti] = React.useState(false);

  React.useEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);

  React.useEffect(() => {
    if (isSuccess) {
      setShowConfetti(true);
      onOpen();
    } else {
      const t = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [isSuccess]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>この偉業をみんなにシェアしよう！</ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
      {showConfetti && (
        <Box
          zIndex="5000"
          position="absolute"
          top="0"
          left="0"
          pointerEvents="none"
        >
          <Confetti width={size[0]} height={size[1]} recycle={false} />
        </Box>
      )}
    </>
  );
};
