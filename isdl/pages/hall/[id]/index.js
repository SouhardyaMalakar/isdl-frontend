import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Booking from "../../../components/Booking";
import AuthContext from "../../../context/AuthContext";

const index = () => {
  const { date, Jwt} = useContext(AuthContext);
  const router = useRouter();
  const [hall, setHall] = useState(null);
  const id = router.query.id;
  const call = async (id) => {
    // make it get hall by id;
    const response = await fetch("https://isdl-backend2.onrender.com/api/getAllHalls?", {
      method: "GET",
    });
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id){
        setHall(data[i]);
        break;
      }
    }
  }
  if (hall) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        width="100%"
        minHeight="1100px"
      >
        <Box
          display="flex"
          minHeight="600px"
          paddingRight="10%"
          paddingLeft="10%"
          flexWrap="wrap"
          marginTop="50px"
        >
          <Box
            display="flex"
            width="50%"
            minWidth="500px"
            justifyContent="center"
          >
            <Image
              src={hall.hall_image}
              borderRadius="30px"
              margin={"50px"}
            ></Image>
          </Box>
          <Box display="flex" width="50%" justifyContent="center">
            <Box
              display="flex"
              flexDirection="column"
              margin="50px"
              width="100%"
              padding="70px"
              boxShadow={"5px 5px 10px "}
              borderRadius="30px"
              bg="rgba(256,256,256,0.4)"
              justifyContent="center"
              minWidth="500px"
            >
              <Text fontSize="60px" fontWeight="600">
                {" "}
                {hall.name}
              </Text>
              <Text fontWeight="800" fontSize="26px">
                Location : {hall.hall_location}
              </Text>
              <Text fontWeight="800" fontSize="26px">
                Equipments : Projector, white Board, Internet, Ac
              </Text>
              <Text fontSize="22px" marginLeft="100px">
                {hall.hall_equipments}
              </Text>
              <Text fontWeight="800" fontSize="26px">
                {" "}
                Capacity : {hall.hall_capacity}{" "}
              </Text>
              <Text fontWeight="800" fontSize="26px">
                {" "}
                Rating : {hall.hall_rating} &#9733;{" "}
              </Text>
            </Box>
          </Box>
        </Box>

        <Booking date={date} hall={hall.id} jwt={Jwt} />
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
    call(id);
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
