import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import CheckAndTitle from "../utils/CheckAndTitle";
import { supabase } from "../supabase";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
    } else {
      navigate("/login");
    }
  };

  return (
    <CheckAndTitle title="Dashboard">
      <Flex justify="space-between" align="center" p={4}>
        <Heading size="lg">Dashboard</Heading>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Flex>
      <Box p={4}>
        <Box>
          <Heading size="lg" mb={4}>
            Winter Storm Preparedness
          </Heading>
          <Text mb={4}>
            Each winter, hundreds are injured or killed by exposure to cold,
            vehicle accidents, and fires. Learn what to do stay safe during
            blizzards and other winter storms!
          </Text>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              National Weather Service (NWS)
            </Heading>
            <Link to="https://www.weather.gov/safety/winter">
              https://www.weather.gov/safety/winter
            </Link>
            <br />
            <Link to="https://www.weather.gov/safety/winter-watches-warnings">
              https://www.weather.gov/safety/winter-watches-warnings
            </Link>
            <br />
            <Link to="https://www.weather.gov/wrn/winter-storm">
              https://www.weather.gov/wrn/winter-storm
            </Link>
          </Box>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              American Red Cross - Winter Safety
            </Heading>
            <Link to="https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/winter-storm.html">
              https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/winter-storm.html
            </Link>
          </Box>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              Ready.gov - Winter Weather Preparedness
            </Heading>
            <Link to="https://www.ready.gov/winter-weather">
              https://www.ready.gov/winter-weather
            </Link>
          </Box>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              CDC - Extreme Cold Guide
            </Heading>
            <Link to="https://www.cdc.gov/disasters/winter/staysafe/coldweather.html">
              https://www.cdc.gov/disasters/winter/staysafe/coldweather.html
            </Link>
          </Box>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              NOAA's National Severe Storms Laboratory - Winter Weather Safety
            </Heading>
            <Link to="https://www.nssl.noaa.gov/education/svrwx101/winter/">
              https://www.nssl.noaa.gov/education/svrwx101/winter/
            </Link>
          </Box>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              Local Emergency Management Websites
            </Heading>
            <Link to="https://www.ready.gov/find-your-local-emergency-management-agency">
              https://www.ready.gov/find-your-local-emergency-management-agency
            </Link>
          </Box>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              Traffic and Road Condition Updates
            </Heading>
            <Text>
              Check with your local state's Department of Transportation or
              similar agency for real-time updates. These links can vary by
              location.
            </Text>
          </Box>
          <Box mb={4}>
            <Heading size="md" mb={2}>
              Emergency Services Contact Numbers
            </Heading>
            <Text>
              Include local emergency services contact numbers specific to your
              area.
            </Text>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Snow Storm in you area</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading>
              The state of Massachusetts has advised you to stay inside
            </Heading>
            <Text>Find some place warm. Call 911 if you need help</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </CheckAndTitle>
  );
};

export default Dashboard;
