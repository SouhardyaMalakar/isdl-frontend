import React, { useState, useContext } from "react";
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import Req_card from "../components/Req_card";
import { useRouter } from "next/router";

const admin = () => {
  const router = useRouter();
  const { User, Jwt } = useContext(AuthContext);
  const [pendings, setPendings] = useState(null);
  async function bookHall({pending,ac}) {
    console.log("Where are my pendings");
    let url;
    if(ac){
      url = "https://isdllab.herokuapp.com/acceptRequest?"
    } 
    else{
      url = "https://isdllab.herokuapp.com/dorime"
    }
    const response = await fetch(
      url + new URLSearchParams({
          jwt: Jwt,
          id: pending.id,
        }),
      {
        method: "POST",
      }
    );
    let data = await response.json();
    if (response.status == 200) {
      alert("Done");
    } else {
      alert("something went wrong");
    }
    console.log(response);
    setTimeout(() => {
      getPendings();
    })
  }

  async function getPendings() {
    console.log("Where are my pendings");
    const response = await fetch(
      "https://isdllab.herokuapp.com/getAllPending?" +
        new URLSearchParams({ jwt: Jwt }),
      {
        method: "GET",
      }
    );
    let data = await response.json();
    setPendings(data);
  }

  if (pendings) {

    console.log(pendings);
    return (
      <Box margin="100px">
        <Box display="flex" justifyContent="space-between">
        <Text fontSize="30px" fontWeight="1000">
          Pending Requests :)
        </Text>
        <Button width="200px" colorScheme="red" onClick={() => {router.push("/dashboard")}}> Back</Button>
        </Box>
        <Box display="flex" flexWrap="wrap" flexDirection="row" width="1900px">
          {pendings.map((pending) => {
            {
              return (
                <Box width="600px" height="250px" marginBottom="150px">
                  <Req_card key={pending.id} pending={pending} />
                  <Box
                    width="500px"
                    padding="50px"
                    display={"flex"}
                    justifyContent="space-between"
                    marginTop="-170px"
                    marginLeft="35px"
                  >
                    
                  <Button width="100px" colorScheme={"red"} onClick={() => bookHall({pending : pending, ac: false})}>
                    Reject
                  </Button>
                  <Button width="100px" colorScheme={"green"} onClick={() => bookHall({pending : pending, ac: true})}>
                    Accecpt
                  </Button>
                  </Box>
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    );
  } else if(Jwt && !pendings) {
    getPendings();
    console.log(Jwt);
    return (
      <Box padding="200px">
        <Text fontSize="70px" fontWeight="1000">
          Loading ...
        </Text>
      </Box>
    );
  }
  else{
    return (
      <Box padding="200px">
        <Text fontSize="70px" fontWeight="1000">
          Loading ...
        </Text>
      </Box>
    );
  }
};

export default admin;
