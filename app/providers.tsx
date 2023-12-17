"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { DBConfig } from "./utils/indexeddb";
import React from "react";
import setupIndexedDB from "use-indexeddb";

export function Providers({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    setupIndexedDB(DBConfig);
  }, []);

  return <ChakraProvider>{children}</ChakraProvider>;
}
