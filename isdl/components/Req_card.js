import React, { useState, useContext } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";

function Req_card({pending}) {
  console.log(pending)
  return (
    <Box
      bg="#fffef2"
      display="flex"
      flexDirection={"column"}
      borderRadius="20px"
      boxShadow={"5px 5px 10px "}
      margin="50px"
      height="300px"
      border="2px solid black"
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
          Hall:  {pending.hall}
        </Text>
      </Box>
      <Box
        margin="10px"
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
          marginTop="10px"
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
          </Box>
        </Box>
        <Box
          display="flex"
          width="60%"
          height="70%"
          flexDirection="column"
          justifyContent="center"
        >
          <Box width="100%" height="70%" >
            <Text padding="50px" paddingTop= "20px" paddingLeft="70px" fontWeight="800">
              {" "}
              Request By: {pending.user}<br/>
              Date: {pending.slotStart.slice(0,10)} <br/>
              Start:  {pending.slotStart.slice(11,19)}<br/>
              End: {pending.slotEnd.slice(11,19)}

            </Text>
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Req_card;
