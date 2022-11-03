import React, { useState, useContext } from "react";
import { endOfToday, set } from "date-fns";
import TimeRange from "./slider";
import { Box, Button, Text, Image } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";

const now = new Date();
const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });
const selectedStart = getTodayAtSpecificHour();
const selectedEnd = getTodayAtSpecificHour(14);
const startTime = getTodayAtSpecificHour(7);
const endTime = endOfToday();
let disabledIntervals = [];

async function bookHall({id, jwt}) {
  // const { jwt } = useContext(AuthContext);
  console.log("Book plox !");
  const response = await fetch(
    "https://isdllab.herokuapp.com/createBooking?" +
      new URLSearchParams({
        hall_id: id,
        timeSlot: [selectedStart, selectedEnd],
        jwt: jwt,
      }),
    {
      method: "GET",
    }
  );
  if (response.status == 200) {
    alert("Hall Booking sent for approval !!");
  } else {
    alert("something went wrong");
  }
  getDisabled();
}

async function getDisabled() {
  console.log("Book plox !");
  const response = await fetch("https://isdllab.herokuapp.com/getAllBookings", {
    method: "GET",
  });
  let data = await response.json();
  let disabled = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].hall == this.props.hall) {
      const BookingDate = data[i].slotStart.toLocaleString().split(",")[0];
      if (BookingDate == Date) {
        disabled.push({
          start: getTodayAtSpecificHour(date[i].slotStart.getHours()),
          end: getTodayAtSpecificHour(date[i].slotEnd.getHours()),
        });
      }
    }
  }
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

    if (disabledIntervals) {
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
                onClick={() => bookHall({id : this.props.hall,jwt: this.props.jwt})}
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
      getDisabled();
      return <div>Here comes JSX !</div>;
    }
  }
}

export default App;
