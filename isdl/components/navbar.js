import { useContext } from "react";
import React from "react";
import AuthContext from "../context/AuthContext";
import { Text, Button, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
function navbar() {
  const { User, logout } = useContext(AuthContext);
  const router = useRouter();

  if (User) {
    return (
      <Box
        bg="#003851"
        height="80px"
        padding={"10px"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
        paddingRight="50px"
        paddingLeft="50px"
      >
        <Box display="flex">
          <Image
            borderRadius="50px"
            marginRight="50px"
            width="50px"
            height="50px"
            src="https://thumbs.dreamstime.com/b/icon-online-conference-meeting-room-online-conference-161499024.jpg"
          ></Image>
          <Text fontSize={"40"} color="white" fontWeight="800">
            Lecture Hall Booking{" "}
          </Text>
        </Box>
        <Box>
          {User.isAdmin == true && (
            <Button
              border="2px solid black"
              margin="10px"
              paddingTop="5px"
              colorScheme={"green"}
              onClick={() => router.push("/admin")}
            >
              Admin
            </Button>
          )}
          <Button
            border="2px solid black"
            margin="10px"
            paddingTop="5px"
            colorScheme={"yellow"}
            onClick={() => router.push("/dashboard")}
          >
            DashBoard
          </Button>
          <Button
            border="2px solid black"
            margin="10px"
            paddingTop="5px"
            colorScheme={"orange"}
            onClick={logout}
          >
            LOGOUT
          </Button>
          <Button
            border="2px solid black"
            margin="10px"
            paddingTop="5px"
            colorScheme={"white"}
            onClick={() => router.push("/feedback  ")}
          >
            Feedback
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        bg="#003851"
        height="80px"
        padding={"10px"}
        display="flex"
        flexDirection={"row"}
        justifyContent={"space-between"}
        paddingRight="50px"
        paddingLeft="50px"
      >
        <Box display="flex">
          <Image
            borderRadius="50px"
            marginRight="50px"
            width="50px"
            height="50px"
            src="https://thumbs.dreamstime.com/b/icon-online-conference-meeting-room-online-conference-161499024.jpg"
          ></Image>
          <Text fontSize={"40"} color="white" fontWeight="1000">
            Lecture Hall Booking{" "}
          </Text>
        </Box>
        <Button
          border="2px solid black"
          marginTop="10px"
          paddingTop="5px"
          colorScheme={"green"}
          onClick={() => {
            router.push("/");
          }}
        >
          LOGIN
        </Button>
      </Box>
    );
  }
}

export default navbar;
