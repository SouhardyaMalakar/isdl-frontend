import { Button, Text, Box } from "@chakra-ui/react";
import AuthContext from "../context/AuthContext";
import { useContext, useState } from "react";
import Hall_card from "../components/halls/Hall_card";
import { Router, useRouter } from "next/router";

function halls() {
  const { User, Jwt } = useContext(AuthContext);
  const [halls, setHalls] = useState(null);
  const router = useRouter();
  if (halls) {
    return (
      <Box display="flex" height="100%">
        <Box display="flex" width ="40%" ></Box>
        <Box margin="100px" display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column">
            {halls.map((hall) => {
              {
                return <Hall_card key={hall.id} hall={hall} />;
              }
            })}
          </Box>
        </Box>
      </Box>
    );
  } else {
    (async () => {
      console.log("Where are my halls");
      const response = await fetch(
        "https://isdllab.herokuapp.com/allHalls?",
        {
          method: "GET",
        }
      );
      let data = await response.json();
      if (!halls) setHalls(data);
    })();
  }
}

export default halls;
