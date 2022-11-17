import React, { useState, useContext } from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Booking from "../../../components/Booking";
import AuthContext from "../../../context/AuthContext";

const index = () => {
  const { date , Jwt } = useContext(AuthContext);
  const { asPath } = useRouter();
  const path = asPath.split("/");
  const router = useRouter();
  const [hall, setHall] = useState();
  if (path[2] != "[id]") {
    const Date = date.toLocaleString().split(",")[0];
    if (hall) {
      return (
        <Box display="flex" flexDirection="column" width="100%" height="1100px">
          <Box display="flex" height="600px" paddingRight="10%" paddingLeft="10%">
            <Box
              display="flex"
              width="50%"
              justifyContent="center"
            >
              <Box
                bg="#fbeecd"
                width="700px"
                height="350px"
                borderRadius="30px"
                margin={"50px"} 
                marginTop="100px"             
              >
                <Image
                  src="https://cdn.pixabay.com/photo/2014/05/18/19/15/lecture-hall-347316_960_720.jpg"
                  borderRadius="30px"
                ></Image>
              </Box>
            </Box>
            <Box display="flex"
              width="50%"
              justifyContent="center"
              >
            <Box
              display="flex"
              flexDirection="column"
              margin="50px"
              marginTop="100px"             

              padding="70px"
              paddingTop={"0px"}  
              boxShadow={"5px 5px 10px "}
              borderRadius="30px"
              bg="rgba(256,256,256,0.4)"
              width="800px"
              justifyContent="center"
            >
              <Text fontSize="60px" fontWeight="600">
                {" "}
                {hall.hall_name}
              </Text>
              <Text fontWeight="800" fontSize="26px"> 
                Location : {hall.hall_location}
              </Text>
              <Text fontWeight="800" fontSize="26px"> 
                Equipments :  
              </Text>
              <Text fontSize="22px" marginLeft="100px">
               {hall.hall_equipments}
              </Text>
              <Text fontWeight="800" fontSize="26px"> Capacity : {hall.hall_capacity} </Text>
              <Text fontWeight="800" fontSize="26px"> Rating : {hall.hall_rating} &#9733; </Text>
            </Box>
            </Box>
          </Box>
          
          <Booking date={date} hall={hall.id} jwt= {Jwt} />
          <Button
          marginLeft="10%"
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
    return (
      <Box padding="200px">
        <Text fontSize="70px" fontWeight="1000">
          Loading ...
        </Text>
      </Box>
    );
  } else {
    return (
      <Box padding="200px">
        <Text fontSize="70px" fontWeight="1000">
          Loading ...
        </Text>
      </Box>
    );  
  }
};

export default index;
