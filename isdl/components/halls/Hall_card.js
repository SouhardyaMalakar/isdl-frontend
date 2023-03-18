import React from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

const hall_card = ({ hall, req }) => {
  const router = useRouter();
  let star = [];
  if (req==0) {
    for (let i = 0; i < hall.hall_rating; i++) star.push(0);
  }
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
      border="2px solid black"
    >
      <Box
        bg="#96d8aa"
        borderRadius="16px 16px 0px 0px "
        height="20%"
        width="100%"
      >
        {req == 1 && (
          <Text
            paddingLeft="20px"
            fontWeight="600"
            fontSize="22"
            paddingTop="15px"
          >
            {" "}
            Hall : LT {hall.id}
          </Text>
        )}
        {req != 1 && (
          <Text
            paddingLeft="20px"
            fontWeight="600"
            fontSize="22"
            paddingTop="15px"
          >
            {" "}
            {hall.hall_name}
          </Text>
        )}
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
          {req != 1 && (
          <Image
            margin="30px"
            width="80%"
            height="150px"
            src={hall.hall_image}
            borderRadius="5px"
            boxShadow={"5px 5px 10px "}
          ></Image>)}

          {req == 1 && (
            <Image
            margin="30px"
            width="90%"
            height="150px"
            src="https://static.vecteezy.com/system/resources/thumbnails/005/330/011/small/teaching-class-flat-color-illustration-vector.jpg"            borderRadius="5px"
          ></Image>
          )}
          <Box
            height="50px"
            display="flex"
            fontSize={"40px"}
            width="80%"
            paddingLeft={"50px"}
          >
           {star.map((st) => {
                {
                  return (
                  <div>
                    &#9733;
                  </div>
                  )
                }
              })
            }
          </Box>
        </Box>
        <Box
          display="flex"
          width="60%"
          height="100%"
          flexDirection="column"
          justifyContent="center"
        >
          {req == 0 && (
            <Box
              width="100%"
              height="70%"
              bg="rgba(200,200,200,0.2)"
              borderRadius="30px"
            >
              <Text
                padding="50px"
                paddingBottom="10px"
                fontWeight="800"
                fontSize="20"
              >
                Name: {hall.name} 
                <br/>
                Location : {hall.hall_location}
                <br />
                Capacity : {hall.hall_capacity}
                <br />
                Rating : {hall.hall_rating} &#9733;
              </Text>
            </Box>
          )}
          {req != 0 && (
            <Box width="400px" height="70%" borderRadius="30px">
              <Text
                fontSize="20px"
                padding="50px"
                paddingBottom="10px"
                fontWeight="600"
              >
                {" "}
                Session : 
              </Text>
              <Text paddingLeft="50px" paddingRight="20px" fontWeight="500">
                {" "}
                Start: {hall.slotStart.slice(0, 10)}{" "}
                {hall.slotStart.slice(11, 16)}
              </Text>
              <Text paddingLeft="50px" paddingRight="20px" fontWeight="500">
                End : {hall.slotStart.slice(0, 10)} {hall.slotEnd.slice(11, 16)}
              </Text>
            </Box>
          )}

          {!hall.pending && (
            <Button
              marginLeft="40%"
              width="150px"
              colorScheme="red"
              paddingTop="5px"
              fontSize="20px"
              border=" 2px solid black"
              marginTop="20px"
              color="black"
              onClick={() => {
                if (req == 0) {
                  router.push({
                    pathname: `/hall/${hall.id}`,
                    query: {id:hall.id},
                  })
                }
              }}
            >
              {req == 1 && "booked"}
              {req == 0 && "book"}

            </Button>
          )}
          {hall.pending && (
            <Button
              marginLeft="40%"
              width="150px"
              colorScheme="lol"
              paddingTop="5px"
              fontSize="20px"
              border=" 2px solid black"
              marginTop="20px"
              color="red"
            >
              Pending ...
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default hall_card;
