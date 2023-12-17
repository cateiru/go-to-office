"use client";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { countAtom, officePositionAtom } from "../utils/atom";
import { useResetAtom } from "jotai/utils";
import React from "react";
import { useIndexedDBStore } from "use-indexeddb";

export const ToolBar = () => {
  const resetOfficePosition = useResetAtom(officePositionAtom);
  const setCount = useResetAtom(countAtom);
  const { deleteAll } = useIndexedDBStore<History>("history");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef(null);

  const deleteHistories = () => {
    deleteAll();
    setCount();
    onClose();
  };

  return (
    <>
      <Center w="100%" my="1rem">
        <Button colorScheme="purple" size="sm" onClick={resetOfficePosition}>
          オフィスを再設定する
        </Button>
        <Button
          colorScheme="purple"
          variant="outline"
          size="sm"
          ml="1rem"
          onClick={onOpen}
        >
          記録を削除
        </Button>
      </Center>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              記録を削除しますか？
            </AlertDialogHeader>

            <AlertDialogBody>
              記録は、ブラウザ内部にのみ保存されてるため一度削除すると復元することはできません。
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                キャンセル
              </Button>
              <Button colorScheme="purple" onClick={deleteHistories} ml={3}>
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
