import React, { useState, useContext } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import Req_card from "../components/Req_card";
import { useRouter } from "next/router";

const admin = () => {
  const router = useRouter();
  const { User, Jwt } = useContext(AuthContext);
  const [pendings, setPendings] = useState(null);
  async function bookHall({ pending, ac }) {
    const response = await fetch(
      "https://isdllab.herokuapp.com/acceptRequest?" +
        new URLSearchParams({
          jwt: Jwt,
          id: pending.id,
          ac: ac,
        }),
      {
        method: "POST",
      }
    );
    if (response.status == 200) {
      if (ac) alert("Accepted");
      else alert("Rejected");
    } else {
      alert("Something went wrong !!");
    }
    setTimeout(() => {
      getPendings();
    });
  }

  async function getPendings() {
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
    return (
      <Box margin="100px">
        <Box display="flex" justifyContent="space-between">
          <Text fontSize="30px" fontWeight="1000">
            Pending Requests :)
          </Text>
          <Button
            width="200px"
            colorScheme="red"
            border="2px solid black"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            {" "}
            Back
          </Button>
        </Box>
        <Box display="flex" flexWrap="wrap" flexDirection="row" width="1800px">
          {pendings.map((pending) => {
            {
              return (
                <Box width="600px" height="250px" marginBottom="100px">
                  <Req_card key={pending.id} pending={pending} />
                  <Box
                    width="500px"
                    padding="50px"
                    display={"flex"}
                    justifyContent="space-between"
                    marginTop="-170px"
                    marginLeft="50px"
                  >
                    <Button
                      width="100px"
                      colorScheme={"red"}
                      onClick={() => bookHall({ pending: pending, ac: 0 })}
                    >
                      Reject
                    </Button>
                    <Button
                      width="100px"
                      colorScheme={"green"}
                      onClick={() => bookHall({ pending: pending, ac: 1 })}
                    >
                      Accept
                    </Button>
                  </Box>
                </Box>
              );
            }
          })}
        </Box>
      </Box>
    );
  } else if (Jwt && !pendings) {
    getPendings();
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

export default admin;
