import React, { useState, useContext } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Button,
  Image
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

const login = () => {
  const { loginUser } = useContext(AuthContext);

  return (
    <Box display="flex" justifyContent={"center"} >
      <Box
        width="1000px"
        height="500px"
        bg="#ffffe5"
        display="flex"
        marginTop={"200px"}
        boxShadow={"15px  10px 10px #555555"}
        border={"2px solid black"}
        borderRadius={"20px"}
      >
        <Box
          marginRight={"50px"}
          bg="#b5e5c3"
          borderRadius={"20px 0px 0px 20px"}
          padding="30px"
          paddingTop="100px"
          width="40%"
        >
          <Image src="hall.png"></Image>
        </Box>
        <Box
          padding={"10px"}
          paddingTop={"80px"}
          display="flex"
          flexDirection={"column"}
          width={"45%"}
        >
          <form onSubmit={loginUser} width={"100%"}>
          <Text fontSize={"50px"} as="b">
            Login
          </Text>
            <FormControl width={"100%"}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" name="email" />
              <FormLabel>Password</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
            <Button border="2px solid black"  width="100%" marginTop="70px" bg={"#ff9800"} type="submit">
                Submit
              </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default login;
