import React, { useState } from "react";
import { Box, Button, Text, Image, useComponentStyles__unstable } from "@chakra-ui/react";
import { Router, useRouter } from "next/router";
// import Time_slider from '../../../components/Time_slider'

const index = () => {
  const { asPath } = useRouter();
  const path = asPath.split("/");
  const router = useRouter();
  const [hall, setHall] = useState();
  if (path[2] != "[id]") {
    console.log(path[2]);
    if (hall) {
      console.log(hall);
      return (
        <Box display="flex" flexDirection="column">
          <Box display="flex" height="500px">
            <Box
              display="flex"
              width="50%"
              padding="200px"
              paddingTop="100px"
              paddingLeft="300px"
              paddingBottom="0px"
            >
              <Box bg="#fbeecd" width="500px" height="400px">
                <Image></Image>
              </Box>
            </Box>
            <Box display="flex" flexDirection="column" padding="50px">
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
          <Box display="flex" flexDirection="column" height="400px">
            <Box bg="#aae3bb" height="300px">
              {/* <Time_slider></Time_slider> */}
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              padding="100px"
              paddingTop="50px"
            >
              <Button
                onClick={() => {
                  router.push("/halls");
                }}
                colorScheme="red"
                width="300px"
                height="60px"
                fontSize="24px"
              >
                {" "}
                Back
              </Button>
              <Button
                onClick={() => {
                  router.push("/halls");
                }}
                colorScheme="red"
                width="300px"
                height="60px"
                fontSize="24px"
              >
                {" "}
                Book
              </Button>
            </Box>
          </Box>
        </Box>
      );
    } else {
      (async () => {
        console.log("Where are my halls");
        const response = await fetch("https://isdllab.herokuapp.com/allHalls?", {
          method: "GET",
        });
        let data = await response.json();
        for( let i = 0; i < data.length; i++){
          if(data[i].id==path[2]) setHall(data[i])
        }
      })();
    }
  }
};

export default index;
