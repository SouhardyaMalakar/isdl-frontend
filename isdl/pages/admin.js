import React, { useState, useContext } from "react";
import { Box, Text, Button } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import Req_card from "../components/Req_card";
import { useRouter } from "next/router";

const admin = () => {
  const router = useRouter();
  const { Jwt } = useContext(AuthContext);
  const [pendings, setPendings] = useState(null);
  async function bookHall({ pending, ac }) {
    const response = await fetch("https://isdl-backendts.onrender.com/api/acceptRequest?", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        jwt: Jwt,
        id: pending.id,
        ac: ac,
      }),
    });
    if (response) {
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
    const response = await fetch("https://isdl-backendts.onrender.com/api/getAllPending", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        jwt: Jwt,
      }),
    });
    let data = await response.json();
    // neet to fix
    setPendings(data);
  }
  if (pendings) {
    const pendingKeys = Object.keys(pendings)
    return (
      <Box margin="50px">
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
        <Box display="flex" flexWrap="wrap" flexDirection="row" width="100%">
          {
            pendingKeys.map((key) => {
            {
              return (
                <Box width="600px" height="250px" marginBottom="150px">
                  <Req_card key={key} pending={pendings[key]} />
                  <Box
                    width="80%"
                    padding="50px"
                    display={"flex"}
                    justifyContent="space-between"
                    marginTop="-170px"
                    marginLeft="10%"
                  >
                    <Button
                      width="100px"
                      colorScheme={"red"}
                      onClick={() => bookHall({ pending: pendings[key], ac: false })}
                    >
                      Reject
                    </Button>
                    <Button
                      width="100px"
                      colorScheme={"green"}
                      onClick={() => bookHall({ pending: pendings[key], ac: true })}
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
