import React, { useState, useContext } from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
import Booking from "../../../components/Booking";
import AuthContext from "../../../context/AuthContext";

const index = () => {
  const { date , jwt } = useContext(AuthContext);
  const { asPath } = useRouter();
  const path = asPath.split("/");
  const router = useRouter();
  const [hall, setHall] = useState();
  if (path[2] != "[id]") {
    const Date = date.toLocaleString().split(",")[0];
    console.log(date);
    if (hall) {
      console.log(hall.id);
      return (
        <Box display="flex" flexDirection="column" width="100%" height="1100px">
          <Box display="flex" height="600px">
            <Box
              display="flex"
              width="50%"
              padding="200px"
              paddingTop="100px"
              paddingLeft="200px"
              paddingBottom="0px"
            >
              <Box
                bg="#fbeecd"
                width="500px"
                height="400px"
                borderRadius="30px"
              >
                <Image></Image>
              </Box>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              margin="50px"
              padding="50px"
              boxShadow={"5px 5px 10px "}
              borderRadius="30px"
              bg="rgba(256,256,256,0.2)"
              width="800px"
            >
              <Text fontSize="50px" fontWeight="600">
                {" "}
                LT {hall.hall_name}
              </Text>
              <Text>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print , graphic or web designs. The passage
                is attributed to an unknown .
              </Text>
              <Text>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print , graphic or web designs. The passage
                is attributed to an unknown .
              </Text>
              <Text>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print , graphic or web designs. The passage
                is attributed to an unknown .
              </Text>
            </Box>
          </Box>
          
          <Booking date={date} hall={hall.id} jwt= {jwt} />
          <Button
          marginLeft="250px"
            onClick={() => {
              router.push("/halls");
            }}
            colorScheme="red"
            width="300px"
            height="60px"
            fontSize="24px"
            boxShadow={"5px 5px 10px black"}
            marginTop="-20px"
          >
            {" "}
            Back
          </Button>
        </Box>
      );
    } else {
      (async () => {
        console.log("Where are my halls");
        const response = await fetch(
          "https://isdllab.herokuapp.com/allHalls?",
          {
            method: "GET",
          }
        );
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
          if (data[i].id == path[2]) setHall(data[i]);
        }
      })();
    }
    return <div>Here comes JSX !</div>;
  } else {
    return <div>Here comes JSX !</div>;
  }
};

export default index;
