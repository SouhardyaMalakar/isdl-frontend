import React, { useState, useContext } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  Button,
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

const login = () => {
  const { loginUser } = useContext(AuthContext);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  return (
    <Box display="flex" justifyContent={"center"}>
      <Box
        width="700px"
        height="500px"
        bg="#ffffe5"
        display="flex"
        marginTop={"200px"}
        boxShadow={"10px 10px 10px 10px #555555"}
        border={"2px solid black"}
        borderRadius={"20px"}
      >
        <Box
          marginRight={"50px"}
          bg="#b5e5c3"
          borderRadius={"20px 0px 0px 20px"}
          padding="30px"
        >
          <Text fontSize={"50px"} as="b">
            Login
          </Text>
        </Box>
        <Box
          padding={"10px"}
          paddingTop={"80px"}
          display="flex"
          flexDirection={"column"}
        >
          <form onSubmit={loginUser}>
            <FormControl width={"300px"}>
              <FormLabel>Name</FormLabel>
              <Input type="name" name="name" />
              <FormHelperText> </FormHelperText>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            <Button marginTop="70px" bg={"#ff9800"} type="submit">
                Submit
              </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default login;
