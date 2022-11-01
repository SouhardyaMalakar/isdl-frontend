import React from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import {useRouter } from "next/router";

const hall_card = ({ hall }) => {
  const router = useRouter();
  if (!hall.pending) {
    return (
      <Box
        bg="#fffef2"
        display="flex"
        flexDirection={"column"}
        minwidth="550px"
        height="375px"
        borderRadius="20px"
        boxShadow={"5px 5px 10px "}
        margin="50px"
      >
        <Box
          bg="#96d8aa"
          borderRadius="20px 20px 0px 0px "
          height="20%"
          width="100%"
        >
          <Text
            paddingLeft="20px"
            fontWeight="600"
            fontSize="22"
            paddingTop="15px"
          >
            {" "}
            Hall : LT10
          </Text>
        </Box>
        <Box
          margin="20px"
          marginTop="0px"
          display="flex"
          flexDirection="row"
          width="92.5%"
          height="80%"
        >
          <Box
            display="flex"
            width="40%"
            height="100%"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Image
              margin="30px"
              width="150px"
              height="180px"
              src="hall.jpeg"
              borderRadius="5px"
              boxShadow={"5px 5px 10px "}
            ></Image>
            <Box
              // border="1px solid black"
              width="80%"
              margin="25px"
              height="50px"
            >
              <Text fontSize="28">  &#9733; &#9733; &#9733; &#9733; &#9734;  </Text>
            </Box>
          </Box>
          <Box display="flex" width="60%" height="100%" flexDirection="column" justifyContent="center"  >
            <Box width="100%" height="70%">
              <Text padding="50px" paddingBottom="10px" fontWeight="800">
                {" "}
                Lorem Ipsum is simply dummy text{" "}
              </Text>
              <Text paddingLeft="50px" paddingRight="20px">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </Box>
            <Button
              marginLeft="60%"
              width="150px"
              colorScheme="red"
              paddingTop="5px"
              fontSize="20px"
              border=" 2px solid black"
              marginTop="20px"
              color="black"
              onClick={() =>{
                router.push(`/hall/${hall.id}`);
              }}
            >
              Book
            </Button>
          </Box>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        bg="#fffef2"
        display="flex"
        // border="2px solid black "
        flexDirection={"column"}
        minwidth="550px"
        height="375px"
        borderRadius="20px"
        boxShadow={"5px 5px 10px "}
      >
        <Box
          bg="#96d8aa"
          borderRadius="20px 20px 0px 0px "
          height="20%"
          width="100%"
        >
          <Text
            paddingLeft="20px"
            fontWeight="600"
            fontSize="22"
            paddingTop="15px"
          >
            {" "}
            Hall : LT10
          </Text>
        </Box>
        <Box
          margin="20px"
          marginTop="0px"
          display="flex"
          flexDirection="row"
          width="92.5%"
          height="80%"
        >
          <Box
            display="flex"
            width="40%"
            height="100%"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Image
              margin="30px"
              width="150px"
              height="180px"
              src="hall.jpeg"
              borderRadius="5px"
              boxShadow={"5px 5px 10px "}
            ></Image>
            <Box
              width="80%"
              margin="25px"
              height="50px"
            >
              <Text fontSize="28">  &#9733; &#9733; &#9733; &#9733; &#9734;  </Text>

            </Box>
          </Box>
          <Box display="flex" width="60%" height="100%" flexDirection="column" >
            <Box width="100%" height="70%">
              <Text padding="50px" paddingBottom="10px" fontWeight="800">
                {" "}
                Lorem Ipsum is simply dummy text{" "}
              </Text>
              <Text paddingLeft="50px" paddingRight="20px">
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </Box>
            <Button
              marginLeft="50px"
              width="100px"
              colorScheme="White"
              paddingTop="5px"
              fontSize="20px"
              border=" 2px solid black"
              marginTop="20px"
              color="Red"
            >
              Pending ... 
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
};
export default hall_card;
