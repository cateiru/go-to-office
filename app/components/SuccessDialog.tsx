import {
  Box,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Confetti from "react-confetti";
import {
  HatenaIcon,
  HatenaShareButton,
  TwitterShareButton,
  XIcon,
} from "react-share";

interface Props {
  isSuccess: boolean;
  distance: number;
}

export const SuccessDialog: React.FC<Props> = ({ isSuccess, distance }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = React.useState<[number, number]>([0, 0]);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [location, setLocation] = React.useState("");

  React.useEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
    setLocation(window.location.href);
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

  const shareText = React.useMemo(() => {
    return `出社できて偉い！\nオフィスとの距離は${Math.floor(distance)}mです！`;
  }, [distance]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>この偉業をみんなにシェアしよう！</ModalHeader>
          <ModalCloseButton size="lg" />
          <ModalBody>
            <Textarea
              colorScheme="purple"
              resize="none"
              onFocus={(e) => e.target.select()}
              focusBorderColor="purple.500"
              defaultValue={shareText}
            />
            <Center mt="1rem" mb=".5rem">
              <Box mx=".5rem">
                <TwitterShareButton
                  url={location}
                  title={shareText}
                  hashtags={["出社できて偉い"]}
                >
                  <XIcon size={50} round />
                </TwitterShareButton>
              </Box>
              <Box mx=".5rem">
                <HatenaShareButton url={location} title={shareText}>
                  <HatenaIcon size={50} round />
                </HatenaShareButton>
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      {showConfetti && (
        <Box
          zIndex="5000"
          position="fixed"
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
