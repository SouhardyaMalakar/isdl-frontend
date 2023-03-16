import { Text, Box } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import Hall_card from "../components/halls/Hall_card";
import Calendar from "react-calendar";
import moment from "moment";


const halls = () => {
  const { updateDate } = useContext(AuthContext);
  const [date, setDate] = useState(new Date());

  const [halls, setHalls] = useState(null);

  const tileDisabled = ({ activeStartDate, date, view }) => {
    var day = new Date();
    var n = day.getTime();
    n -= 86400000;
    day = new Date(n);
    return date < day;
  };

  if (halls) {
    const changeDate = (e) => {
      setDate(e);
      updateDate(e);
    };
    return (
      <Box display="flex" height="100%" flexDir="column">
        <Box height="70px">
          <Text
            height="100%"
            align="center"
            fontSize="60px"
            margin="20px"
            fontWeight="1000"
          >
            Lecture Halls :
          </Text>
        </Box>
        <Box display="flex" flexWrap={"wrap"} justifyContent="center">
          <Box display="flex" width="550px">
            <Box
              bg="#fffce5"
              borderRadius="20px"
              boxShadow="5px 10px 10px"
              height="700px"
              width="550px"
              marginTop="100px"
              border="2px solid black"
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
                <Calendar
                  height="500px"
                  value={date}
                  onChange={changeDate}
                  tileDisabled={tileDisabled}
                />
              </Box>
              <Box
                padding="50px"
                paddingTop="0px"
                display="flex"
                justifyContent="space-between"
              >
                <Text
                  color="black"
                  padding="20px"
                  fontSize="23"
                  paddingTop="0px"
                  fontWeight="800"
                >
                  Selected date : {moment(date).format("Do MMMM YYYY")}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box
            margin="50px"
            width="50%"
            minWidth="600px"
            display="flex"
            flexDirection="column"
          >
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
      const response = await fetch("http://localhost:4000/api/getAllHalls?", {
        method: "GET",
      });
      let data = await response.json();
      setHalls(data);
    })();
    return (
      <Box padding="200px">
        <Text fontSize="70px" fontWeight="1000">
          Loading ...
        </Text>
      </Box>
    );
  }
};

export default halls;
