import { Button, Text, Box } from "@chakra-ui/react";
import React from "react";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import Hall_card from "../components/halls/Hall_card";
import { Router, useRouter } from "next/router";

function dashboard() {
  const { User, Jwt } = useContext(AuthContext);
  const [lechalls, setHalls] = useState(null);
  const router = useRouter();

  if (User && Jwt) {
    if (lechalls) {
      let halls;
      console.log(lechalls);
      const n = Math.min(lechalls.length,3);
      halls=lechalls.slice(-4,-1);
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
            <Text margin="20px" color={"black"} fontWeight="500">
              {" "}
              Your recent Bookings :{" "}
            </Text>

            <Box
              display="flex"
              height="55%"
              minHeight="200px"
              width="100%"
              justifyContent="space-evenly"
              bg="#70717220"
              borderRadius="20px"
              // flexWrap="wrap"
              marginBottom="50px"
            >
              {halls.map((hall) => {
                {
                  return <Hall_card key={hall.id} hall={hall}  req={1}/>;
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
        console.log("Where are my bookings");
        const response = await fetch(
          "https://isdllab.herokuapp.com/getUserBookings?" +
            new URLSearchParams({ jwt: Jwt }),
          {
            method: "GET",
          }
        );
        let data = await response.json();
        setHalls(data);
      })();
        return (
            <div>Here comes JSX !</div>
        );
    }
  } else {
    return (
      <div>who are u ???</div>
    )
  }
}

export default dashboard;
