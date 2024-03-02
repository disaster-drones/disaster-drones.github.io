import { Box, Button, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
// import MapPicker from "react-google-map-picker";
import { SetStateAction, useState } from "react";
import CheckAndTitle from "../utils/CheckAndTitle";
import { Link } from "react-router-dom";
const DefaultLocation = { lat: 42.363315965212664, lng: -71.12642785826836 };
const DefaultZoom = 15;

// 42.363315965212664, -71.12642785826836

export default function DashboardPage() {
  // const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((loc) => {
  //     const { latitude, longitude } = loc.coords;
  //     setDefaultLocation({ lat: latitude, lng: longitude });
  //   });
  // }, []);

  // const [location, setLocation] = useState(defaultLocation);
  // const [zoom, setZoom] = useState(DefaultZoom);

  // function handleChangeLocation(lat: string | number, lng: string | number) {
  //   console.log({ lat: +lat, lng: +lng });

  //   setLocation({ lat: +lat, lng: +lng });

  //   //TODO: set this on click
  //   localStorage.location = JSON.stringify({ lat: +lat, lng: +lng });
  // }

  // function handleChangeZoom(newZoom: SetStateAction<number>) {
  //   setZoom(newZoom);
  // }

  // function handleResetLocation() {
  //   setDefaultLocation({ ...DefaultLocation });
  //   setZoom(DefaultZoom);
  // }
  return (
    <CheckAndTitle title="Location Pick">
      <HStack p={3}>
        <Heading>Select your location</Heading>

        <Spacer></Spacer>

        {/* <Text>Lat: {location.lat}</Text>
        <Text>Lng: {location.lng}</Text> */}
        <Link to="/dashboard">
          <Button>Submit</Button>
        </Link>
      </HStack>
      {/* <MapPicker
        defaultLocation={defaultLocation}
        zoom={zoom}
        // roadmap, satellite, hybrid, terrain
        // mapTypeId="hybrid"
        style={{ height: "700px" }}
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        //TODO: change it
        apiKey="AIzaSyD07E1VvpsN_0FvsmKAj4nK9GnLq-9jtj8"
      /> */}
    </CheckAndTitle>
  );
}
