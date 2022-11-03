import React, { useState, useContext } from "react";
import { endOfToday, set } from "date-fns";
import TimeRange from "./slider";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { slice } from "lodash";

const now = new Date();
const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });
const selectedStart = getTodayAtSpecificHour();
const selectedEnd = getTodayAtSpecificHour(14);
const startTime = getTodayAtSpecificHour(7);
const endTime = endOfToday();
let disabledIntervals = [];
let called=0;

async function bookHall({ id, jwt ,Date}) {
  console.log("Book plox !");
  console.log(jwt);
  console.log(Date);
  console.log(selectedStart.toLocaleTimeString('it-IT'))
  console.log(selectedEnd.toLocaleTimeString('it-IT'))

  const response = await fetch(
    "https://isdllab.herokuapp.com/createBooking?" +
      new URLSearchParams({
        id: id,
        date:Date,
        start: selectedStart.toLocaleTimeString('it-IT'),
        end: selectedEnd.toLocaleTimeString('it-IT'),
        jwt: jwt,
      }),
    {
      method: "POST",
    }
  );
  console.log(response);

  if (response.status == 200) {
    alert("Hall Booking sent for approval !!");
  } else {
    alert("something went wrong");
  }
  getDisabled({id:id,Date:Date});
}

async function getDisabled({id,Date}) {
  console.log("Blocked plox !");
  const response = await fetch("https://isdllab.herokuapp.com/getAllBookings", {
    method: "GET",
  });
  let data = await response.json();
  let disabled = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].hall == id) {
      const Bd = data[i].slotStart.toLocaleString().split(",")[0].split('-');
      let month = Bd[2].split('T')[0];
      if(month[0]==0){
        month= month.substring(1);
      }
      const BookDay = Bd[1] + '/' + month+ '/' + Bd[0]
      console.log(BookDay)
      console.log(Date)
      if (BookDay == Date) {
        disabled.push({
          start: getTodayAtSpecificHour(data[i].slotStart.slice(11 ,13)),
          end: getTodayAtSpecificHour(data[i].slotEnd.slice(11 ,13))
        });
        // console.log(getTodayAtSpecificHour(data[i].slotStart.slice(11 ,13)));
        // console.log(data[i].slotEnd);
      }
    }
  }
  console.log(disabled);

  disabledIntervals = disabled;
}

class App extends React.Component {
  state = {
    error: false,
    selectedInterval: [selectedStart, selectedEnd],
  };
  errorHandler = ({ error }) => this.setState({ error });
  onChangeCallback = (selectedInterval) => this.setState({ selectedInterval });

  render() {
    const { selectedInterval, error } = this.state;
    const date = this.props.date;
    const Date = date.toLocaleString().split(",")[0];

    if (called!=0) {
      return (
        <Box>
          <Box display="flex" flexDirection="column" height="400px">
            <Text fontSize="20px" fontWeight="600" marginLeft="200px">
              {" "}
              Date : {Date}
            </Text>
            <Box height="200px" paddingLeft="200px" marginBottom="50px">
              <Text height="70px" fontSize="30px" fontWeight="1000">
                {" "}
                Select TimeSlot :
              </Text>
              <TimeRange
                error={error}
                ticksNumber={36}
                selectedInterval={selectedInterval}
                timelineInterval={[startTime, endTime]}
                onUpdateCallback={this.errorHandler}
                onChangeCallback={this.onChangeCallback}
                disabledIntervals={disabledIntervals}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              padding="100px"
              paddingTop="100px"
              paddingBottom="0px"
            >
              <Button
                onClick={() =>
                  bookHall({ id: this.props.hall, jwt: this.props.jwt, Date:Date })
                }
                marginLeft={"1300px"}
                colorScheme="red"
                width="300px"
                height="60px"
                fontSize="24px"
                boxShadow={"5px 5px 10px black"}
              >
                {" "}
                Book
              </Button>
            </Box>
          </Box>
        </Box>
      );
    } else {
      getDisabled({id:this.props.hall,Date:Date});
      called=called+1;
      return (
        <Box padding="200px">
          <Text fontSize="70px" fontWeight="1000">
            Loading ...
          </Text>
        </Box>
      );
    }
  }
}

export default App;
