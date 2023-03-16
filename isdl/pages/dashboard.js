import { Button, Text, Box } from "@chakra-ui/react";
import React from "react";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import Hall_card from "../components/halls/Hall_card";
import { useRouter } from "next/router";

function dashboard() {
  const { User, Jwt } = useContext(AuthContext);
  const [lechalls, setHalls] = useState(null);
  const router = useRouter();

  if (User && Jwt) {
    if (lechalls) {
      let halls;
      halls = lechalls.reverse().slice(0, 3);
      return (
        <Box height="100%">
          <Box
            display="flex"
            flexDirection="column"
            flexWrap="wrap"
            width="100%"
            height="100%"
            padding="50px"
          >
            <Text fontSize={50} fontWeight="900">
              {" "}
              Welcome {User.name} :)
            </Text>
            <Text fontSize={30} margin="20px" color={"black"} fontWeight="700">
              {" "}
              Your recent Bookings :{" "}
            </Text>

            <Box
              display="flex"
              height="45%"
              minHeight="200px"
              width="100%"
              justifyContent="center"
              bg="#70717220"
              borderRadius="20px"
              marginBottom="50px"
              flexWrap="wrap"
            >
              {halls.map((hall) => {
                {
                  return (
                    <Box width={"600px"}>
                      <Hall_card key={hall.id} hall={hall} req={1} />
                    </Box>
                  );
                }
              })}
            </Box>
            <Box
              diaply="flex"
              justifyContent="space-evenly"
              padding="100px"
              paddingTop="0px"
            >
              <Box>
                <Button
                  colorScheme="facebook"
                  width="300px"
                  height="70px"
                  border="2px solid black"
                  fontSize="25px"
                  onClick={() => {
                    router.push("/halls");
                  }}
                >
                  {" "}
                  Book Halls{" "}
                </Button>
              </Box>
              <Box></Box>
            </Box>
          </Box>
        </Box>
      );
    } else {
      (async () => {
        const response = await fetch(
          "http://localhost:4000/api/getUserBookings",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              jwt: Jwt
            }),
          }
        );
        let data = await response.json();
        setHalls(data);
      })();
      return (
        <Box padding="200px">
          <Text fontSize="70px" fontWeight="1000">
            Loading ...
          </Text>
        </Box>
      );
    }
  } else {
    return (
      <Box padding="200px">
        <Text fontSize="70px" fontWeight="1000">
          Loading ...
        </Text>
      </Box>
    );
  }
}

export default dashboard;
