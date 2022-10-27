import { Button, Text,Box } from "@chakra-ui/react";
import React from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useRouter } from "next/router"



function dashboard() {
  const { User } = useContext(AuthContext);
  const router = useRouter()
  if (User) {
    return (
        <Box>
          <Text fontSize={30} > Hello {User.name}</Text>
        </Box>

    );
  } else {
    <div>who are u ???</div>
  }
}

export default dashboard;
