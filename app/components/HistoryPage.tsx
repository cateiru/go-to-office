"use client";

import {
  Box,
  Center,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useHistory } from "./useHistory";

export const HistoryPage = () => {
  const { histories } = useHistory();

  return (
    <Box w="100%" minH="100vh">
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
      <TableContainer maxW="400px" m="auto" mb="2rem">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>日時</Th>
              <Th isNumeric>オフィスとの誤差（m）</Th>
            </Tr>
          </Thead>
          <Tbody>
            {histories.map((history) => {
              const d = new Date(history.timestamp);

              return (
                <Tr key={`history-item-${history.id}`}>
                  <Td>{d.toLocaleString()}</Td>
                  <Td isNumeric>{history.distance}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};
