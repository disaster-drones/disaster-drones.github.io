import { Box, Button, Image, Input, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Link, useNavigate } from "react-router-dom";
import { useToastSuccess, useToastError } from "../utils/Utilities";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toastSuccess = useToastSuccess();
  const toastError = useToastError();

  useEffect(() => {
    document.title = "Login";
  }, []);

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toastError(
        "Error logging in!",
        "check you credentials or create an account"
      );
      console.error(error);
    } else {
      console.log(data);
      toastSuccess("Logged in successfully!", "");
      navigate("/picklocation");
    }
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
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
      <Box
        w="sm"
        p={8}
        borderWidth={0}
        borderRadius={8}
        boxShadow="lg"
        bg="black"
        color="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Image src="/logo.png" alt="Logo" mb={8} />

        <Stack spacing={4} w="100%">
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            color={"black"}
            variant={"fill"}
          />
          <Input
            placeholder="Password"
            type="password"
            variant={"fill"}
            color={"black"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} colorScheme="purple" size="lg" w="100%">
            Login
          </Button>
        </Stack>
        <Box mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link to="/signup">
            <Button colorScheme="purple" variant="link">
              Sign up
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
