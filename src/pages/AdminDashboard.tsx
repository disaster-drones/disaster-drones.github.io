import { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Code,
  Th,
  Td,
  Text,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Badge,
} from "@chakra-ui/react";
import { supabase } from "../supabase";
import CheckAndTitle from "../utils/CheckAndTitle";

interface DroneData {
  id: number;
  model_number: string;
  mission_status: string;
  alert_type: string;
  alert_severity: string;
  latitude: number;
  longitude: number;
}

export default function AdminDashboard() {
  const [droneData, setDroneData] = useState<DroneData[]>([]);

  useEffect(() => {
    async function fetchDroneData() {
      const { data, error } = await supabase.from("drones").select("*");

      if (error) {
        console.error(error);
      } else {
        setDroneData(data || []);
      }
    }

    fetchDroneData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  interface Log {
    id: number;
    created_at: string;
    text: string;
  }

  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    async function fetchLogs() {
      const { data, error } = await supabase.from("logs").select("*");

      if (error) {
        console.error(error);
      } else {
        setLogs(data);
      }
    }

    fetchLogs();
  }, []);

  return (
    <CheckAndTitle title="Admin Dashboard">
      <Box height={"100vh"}>
        <Button position="fixed" bottom="10px" right="10px" onClick={onOpen}>
          Open Log Drawer
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Model Number</Th>
              <Th>Mission Status</Th>
              <Th>Alert Type</Th>
              <Th>Alert Severity</Th>
              <Th>Latitude</Th>
              <Th>Longitude</Th>
            </Tr>
          </Thead>
          <Tbody>
            {droneData.map((drone) => (
              <Tr key={drone.id}>
                <Td>{drone.id}</Td>
                <Td>
                  <Code>{drone.model_number}</Code>
                </Td>
                <Td>
                  <Badge
                    colorScheme={
                      drone.mission_status.toLowerCase() === "active" ? "green" : "red"
                    }
                  >
                    {drone.mission_status}
                  </Badge>
                </Td>
                <Td>{drone.alert_type}</Td>
                <Td>{drone.alert_severity}</Td>
                <Td>{drone.latitude}</Td>
                <Td>{drone.longitude}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Log Drawer</DrawerHeader>
            <DrawerBody>
              <Box m={1} bg="gray.100" p={2} overflowY={'scroll'}>
                {logs.map((log, index) => (
                  <Box key={index} mb={4}>
                    <Text fontSize="sm" color="gray.500">
                      {log.created_at}
                    </Text>
                    <Code mb={1}>{log.text}</Code>
                  </Box>
                ))}
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    </CheckAndTitle>
  );
}
