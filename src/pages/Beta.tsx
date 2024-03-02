import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  useEffect(() => {
    document.title = "Disaster Drones";
  }, []);
  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Box
        position="fixed"
        top="0"
        left="0"
        right="0"
        bottom="0"
        zIndex="-1"
        opacity={0.6}
        bgGradient="radial-gradient(circle, #7F00FF, #6600CC, #4C0099, #330066, #1A0033)"
        overflow="hidden"
      >
        {[...Array(50)].map((_, index) => (
          <Box
            key={index}
            position="absolute"
            top={`${Math.random() * 100}%`}
            left={`${Math.random() * 100}%`}
            transform={`translate(-${Math.random() * 50}%, -${
              Math.random() * 50
            }%)`}
            borderRadius="50%"
            width={`${Math.random() * 200}px`}
            height={`${Math.random() * 200}px`}
            bg="rgba(255, 255, 255, 0.2)"
            filter="blur(50px)"
            animation={`bubble ${
              Math.random() * 10 + 5
            }s ease-in-out infinite alternate`}
          />
        ))}
      </Box>
      <Image src="/logo.png" alt="Logo" mb={8} />
      <Heading as="h1" size="2xl" mb={4} textAlign="center">
        Welcome to Our Beta
      </Heading>
      <Text fontSize="xl" mb={8} textAlign="center">
        We're excited to have you on board! Our beta is packed with features
        that we think you'll love.
      </Text>
      <Stack direction="row" spacing={4}>
        <Link to="login">
          <Button colorScheme="purple" size="lg">
            Get Started
          </Button>
        </Link>
        <a
          href={
            "https://github.com/disaster-drones/disaster-drones.github.io/blob/main/README.md#getting-started"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button colorScheme="gray" size="lg">
            Learn More
          </Button>
        </a>
      </Stack>
      <Box mt={8}>
        <Text fontSize="sm" color="white">
          © 2024 disaster-drones. All rights reserved.
        </Text>
      </Box>
    </Flex>
  );
}

export default LandingPage;
