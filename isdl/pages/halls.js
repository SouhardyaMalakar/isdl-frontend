import { Button, Text, Box } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import Hall_card from "../components/halls/Hall_card";
import { Router, useRouter } from "next/router";
import Calendar from 'react-calendar'
// import '../components/Calender.css'
import moment from 'moment'

function halls() {
  const { User, Jwt } = useContext(AuthContext);
  const [dateState, setDateState] = useState(new Date());

  const [halls, setHalls] = useState(null);
  const router = useRouter();
  if (halls) {
    const changeDate = (e) => {
      setDateState(e);
    };
    return (
      <Box display="flex" height="100%" flexDir="column">
        <Box height="70px">
          <Text height="100%" align="center" fontSize="70px" margin="20px">
            Lecture Halls
          </Text>
        </Box>
        <Box display="flex">
          <Box display="flex" width="40%">
            <Box
              bg="#fffce5"
              borderRadius="20px"
              boxShadow="5px 10px 10px"
              height="700px"
              width="550px"
              position="fixed"
              top="200px"
              left="100px"
            >
              <Box
                bg="#96d8aa"
                height="70px"
                width="100%"
                borderRadius="20px 20px 0px 0px"
                padding="20px"
              >
                <Text fontSize="30px" fontWeight="700">
                  Calender
                </Text>
              </Box>
              <Box>
              <Calendar height= "500px" value={dateState} onChange={changeDate} />
              </Box>
             <Box padding="50px" paddingTop="0px" display="flex" justifyContent="space-between">
              <Text color="black" padding="20px" fontSize="20" paddingTop="0px">
                Selected date :   {moment(dateState).format('MMMM Do YYYY')}
            </Text>
            <Button colorScheme="red" width="100px"> Filter</Button>
            </Box>
            </Box>
            
          </Box>
          <Box margin="50px" display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column">
              {halls.map((hall) => {
                {
                  return <Hall_card key={hall.id} hall={hall} />;
                }
              })}
            </Box>
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
      setHalls(data);
    })();
  }
}

export default halls;
