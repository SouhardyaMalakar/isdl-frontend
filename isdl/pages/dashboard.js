import { Button, Text, Box } from "@chakra-ui/react";
import React from "react";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import Hall_card from "../components/halls/Hall_card";
import { Router, useRouter } from "next/router";

function dashboard() {
  const { User, Jwt } = useContext(AuthContext);
  const [halls, setHalls] = useState(null);
  const router = useRouter();

  if (User && Jwt) {
    if (halls) {
      console.log(halls);
      return (
        <Box height="100%">
          <Box
            bg="linear-gradient(to right, rgba(63,81,181,0.4), rgba(3, 169, 244, .4))"
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
              width="100%"
              justifyContent="space-evenly"
              flexWrap="wrap"
            >
              {halls.map((hall) => {
                {
                  return <Hall_card key={hall.id} hall={hall} />;
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
        if (!halls) setHalls(data);
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
