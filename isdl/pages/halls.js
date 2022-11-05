import { Button, Text, Box } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import Hall_card from "../components/halls/Hall_card"; 
import { Router, useRouter } from "next/router";
import Calendar from 'react-calendar'
import moment from 'moment'

const halls = () => {
  const { User, Jwt , updateDate } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());

  const [halls, setHalls] = useState(null);
  const router = useRouter();
  if (halls) {
    const changeDate = (e) => {
      setDate(e);
      updateDate(e);
    };
    return (
      <Box display="flex" height="100%" flexDir="column">
        <Box height="70px">
          <Text height="100%" align="center" fontSize="60px" margin="20px" fontWeight="1000">
            Lecture Halls : 
          </Text>
        </Box>
        <Box display="flex">
          <Box display="flex" width="40%" >
            <Box
              bg="#fffce5"
              borderRadius="20px"
              boxShadow="5px 10px 10px"
              height="700px"
              width="550px"
              position="fixed"
              top="200px"
              left="100px"
              border="2px solid black"
              marginLeft="100px"
            >
              <Box
                bg="#96d8aa"
                height="70px"
                width="100.6%"
                borderRadius="16px 16px 0px 0px"
                padding="20px"
                border="2px solid black"
                marginLeft="-2px"
                marginTop="-2px"
              >
                <Text fontSize="30px" fontWeight="700">
                  Calender
                </Text>
              </Box>
              <Box>
              <Calendar height= "500px" value={date} onChange={changeDate} />
              </Box>
             <Box padding="50px" paddingTop="0px" display="flex" justifyContent="space-between"  >
              <Text color="black" padding="20px" fontSize="23" paddingTop="0px" fontWeight="800">
                Selected date :   {moment(date).format('Do MMMM YYYY')}
            </Text>
            </Box>
            </Box>
            
          </Box>
          <Box margin="50px" width="900px" display="flex" flexDirection="column">
            <Box display="flex" flexDirection="column">
              {halls.map((hall) => {
                {
                  return <Hall_card key={hall.id} hall={hall} req={0} />;
                }
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  } else {
    (async () => {
      const response = await fetch("https://isdllab.herokuapp.com/allHalls?", {
        method: "GET",
      });
      let data = await response.json();
      setHalls(data);
    })();
    return (
      <div>Here comes JSX !</div>
  );
  }
}

export default halls;
