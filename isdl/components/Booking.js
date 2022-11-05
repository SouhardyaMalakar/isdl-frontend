import React from "react";
import { endOfToday, set } from "date-fns";
import TimeRange from "./slider";
import { Box, Button, Text } from "@chakra-ui/react";

const now = new Date();
const getTodayAtSpecificHour = (hour = 12) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });
const selectedStart = getTodayAtSpecificHour();
const selectedEnd = getTodayAtSpecificHour(14);
const startTime = getTodayAtSpecificHour(7);
const endTime = endOfToday();
let disabledIntervals = [];
let localDate=0;

async function bookHall({ id, jwt ,Date,start,end}) { 
  let Bg = window.document.getElementsByClassName("react_time_range__track")[0].style.backgroundColor   
  if(Bg=='rgba(98, 203, 102, 0.5)'){
  const response = await fetch(
    "https://isdllab.herokuapp.com/createBooking?" +
      new URLSearchParams({
        id: id,
        date:Date,
        start: start.toLocaleTimeString('it-IT'),
        end:  end.toLocaleTimeString('it-IT'),
        jwt: jwt,
      }),
    {
      method: "POST",
    }
  );

  if (response.status == 200) {
    alert("Hall Booking sent for approval !!");
  } else {
    alert("something went wrong");
  }
  getDisabled({id:id,Date:Date});
}
else{
  alert("Invalid slot selected !!");
}
}

async function getDisabled({id,Date}) {
  localDate=Date;
  const response = await fetch("https://isdllab.herokuapp.com/getAllBookings", {
    method: "GET",
  });
  let data = await response.json();
  let disabled = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].hall == id) {
      const Bd = data[i].slotStart.toLocaleString().split(",")[0].split('-');
      let day = Bd[2].split('T')[0];
      let month = Bd[1];
      if(month[0]==0){
        month= month.substring(1);
      }
      if(day[0]==0){
        day= day.substring(1);
      }
      const BookDay = day + '/' + month + '/' + Bd[0]
      if (BookDay == Date) {
        disabled.push({
          start: getTodayAtSpecificHour(data[i].slotStart.slice(11 ,13)),
          end: getTodayAtSpecificHour(data[i].slotEnd.slice(11 ,13))
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
    let month = date.getMonth()+1;
    const Date =date.getDate()+'/'+month + '/' + date.getFullYear();
    getDisabled({id:this.props.hall,Date:Date});

    if (localDate==Date) {
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
                  bookHall({ id: this.props.hall, jwt: this.props.jwt, Date:Date, start:selectedInterval[0], end:selectedInterval[1]})
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
