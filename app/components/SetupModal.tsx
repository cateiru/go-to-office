"use client";

import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { officePositionAtom } from "../utils/atom";
import React from "react";
import dynamic from "next/dynamic";

import "leaflet/dist/leaflet.css";
import { LatLng } from "leaflet";

export const SetupModal = () => {
  const [officePosition, setOfficePosition] = useAtom(officePositionAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [position, setPosition] = React.useState<LatLng | null>(null);

  React.useEffect(() => {
    // オフィスポジションがない場合はモーダルを開いて設定させる
    if (officePosition === null) {
      onOpen();
    } else {
      onClose();
    }
  }, [officePosition]);

  const onSubmit = () => {
    if (position === null) return;

    setOfficePosition({
      latitude: position.lat,
      longitude: position.lng,
    });
    onClose();
  };

  const Map = React.useMemo(
    () =>
      dynamic(() => import("./Map").then((components) => components.Map), {
        loading: () => <Skeleton w="100%" h="400px" />,
        ssr: false,
      }),
    []
  );

  return (
    <Modal isOpen={isOpen} onClose={() => {}} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>オフィスの場所を設定します</ModalHeader>
        <ModalBody paddingX={{ base: "0", md: "1.5rem" }} paddingY="1.5rem">
          <Text mb=".5rem" px=".5rem">
            オフィスの場所を設定することで、本当に出社しているのかをチェックします。
            位置情報はすべてブラウザ内に保存され、
            <Text fontWeight="bold" as="span">
              外部に通信することはありません
            </Text>
            。
          </Text>
          <Map setPosition={setPosition} />
          <Text textAlign="center" mt=".5rem">
            {position?.lat ?? "-"} / {position?.lng ?? "-"}
          </Text>
          <Center>
            <Button
              mt="1rem"
              w={{ base: "96%", md: "100%" }}
              colorScheme="purple"
              onClick={onSubmit}
              isDisabled={position === null}
            >
              ここに設定する
            </Button>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
