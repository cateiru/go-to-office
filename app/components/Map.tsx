"use client";

import { Box } from "@chakra-ui/react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { TbPlus } from "react-icons/tb";
import { LatLng } from "leaflet";

interface Props {
  setPosition: (position: LatLng) => void;
}

const GetMapEvents = (props: Props) => {
  const map = useMapEvents({
    moveend: () => {
      props.setPosition(map.getCenter());
    },
  });
  return null;
};

export const Map = (props: Props) => {
  return (
    <Box w="100%" h="400px" position="relative">
      <Box
        position="absolute"
        zIndex="1500"
        top="calc(50% - 30px)"
        left="calc(50% - 30px)"
        opacity=".7"
        pointerEvents="none"
      >
        <TbPlus size="60px" />
      </Box>
      <MapContainer
        center={[35.41, 139.41]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright";>OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GetMapEvents setPosition={props.setPosition} />
      </MapContainer>
    </Box>
  );
};
