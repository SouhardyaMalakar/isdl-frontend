import React, { useEffect } from "react";
import { endOfToday, set } from "date-fns";
import TimeRange from "./slider";
import { Box, Button, Text } from "@chakra-ui/react";
const now = new Date();
const getTodayAtSpecificHour = (hour = 24) =>
  set(now, { hours: hour, minutes: 0, seconds: 0, milliseconds: 0 });
const selectedStart = getTodayAtSpecificHour(0);
const selectedEnd = getTodayAtSpecificHour(0);
const startTime = getTodayAtSpecificHour(7);
const endTime = endOfToday(23);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledIntervals: null,
      error: false,
      selectedInterval: [selectedStart, selectedEnd],
    };
  }
  errorHandler = ({ error }) => this.setState({ error });
  onChangeCallback = (selectedInterval) =>
    this.setState({ selectedInterval});

  componentDidMount() {
    this.getDisabled();
  }

  async getDisabled() {
    const response = await fetch("http://localhost:4000/api/getHallBookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: this.id,
      }),
    });
    let data = await response.json();
    let disabled = [];
    const date = this.props.date;
    let month = date.getMonth() + 1;
    const Date = date.getDate() + "/" + month + "/" + date.getFullYear();

    for (let i = 0; i < data.length; i++) {
      const Bd = data[i].slotStart.toLocaleString().split(",")[0].split("-");
      let day = Bd[2].split("T")[0];
      let month = Bd[1];
      if (month[0] == 0) {
        month = month.substring(1);
      }
      if (day[0] == 0) {
        day = day.substring(1);
      }
      console.log()
      const BookDay = day + "/" + month + "/" + Bd[0];
      if (BookDay == Date) {
        disabled.push({
          start: getTodayAtSpecificHour(data[i].slotStart.slice(11, 13)),
          end: getTodayAtSpecificHour(data[i].slotEnd.slice(11, 13)),
        });
      }
    }
    console.log(data);
    console.log(disabled);
    this.setState({ disabledIntervals: disabled });
  }

  async bookHall({ id, jwt, Date, start, end }) {
    let Bg = window.document.getElementsByClassName("react_time_range__track")[0]
      .style.backgroundColor;
    if (Bg == "rgba(98, 203, 102, 0.5)") {
      const response = await fetch("http://localhost:4000/api/createBooking?", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          hall_id: id,
          jwt: jwt,
          date: Date,
          start: start.toLocaleTimeString("it-IT"),
          end: end.toLocaleTimeString("it-IT"),
        }),
        
      });
      window.document.getElementsByClassName("react_time_range__track")[0]
      .style.backgroundColor="rgba(214, 0, 11, 0.5)"
  
      if (response.status == 200) {
        alert("Hall Booking sent for approval !!");
      } else {
        alert("something went wrong");
      }
      this.getDisabled({ id: id, Date: Date });
    } else {
      alert("Invalid slot selected !!");
    }
  }

  render() {
    const { selectedInterval, error , disabledIntervals} = this.state;
    const date = this.props.date;
    let month = date.getMonth() + 1;
    const Date = date.getDate() + "/" + month + "/" + date.getFullYear();

    if (disabledIntervals) {
      return (
        <Box>
          <Box
            display="flex"
            flexDirection="column"
            height="400px"
            marginLeft="10%"
          >
            <Text fontSize="20px" fontWeight="600">
              {" "}
              Date : {Date}
            </Text>
            <Box height="200px" marginBottom="50px">
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
              flexDirection="row-reverse"
            >
              <Button
                onClick={() =>
                  this.bookHall({
                    id: this.props.hall,
                    jwt: this.props.jwt,
                    Date: Date,
                    start: selectedInterval[0],
                    end: selectedInterval[1],
                  })
                }
                marginRight={"6%"}
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
