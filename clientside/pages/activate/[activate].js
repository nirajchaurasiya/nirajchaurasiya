import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Activate() {
  const router = useRouter();
  const { activate } = router.query;

  const token = activate;
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // Make a request to the activation API endpoint
    axios
      .post(`/api/activate`, { token: token })
      .then((response) => {
        const { data } = response;
        if (data.status === 1) {
          setStatus("success");
        } else if (data.status === 2) {
          setStatus("alreadyActivated");
        } else {
          setStatus("error");
        }
      })
      .catch((error) => {
        console.error("Error activating account:", error);
        setStatus("error");
      });
  }, [token]);

  return (
    <div>
      {status === "loading" && (
        <p style={{ paddingTop: "40vh", textAlign: "center" }}>
          Activating your account...
        </p>
      )}
      {status === "success" && (
        <p style={{ paddingTop: "40vh", textAlign: "center" }}>
          Your account has been activated successfully!
        </p>
      )}
      {status === "alreadyActivated" && (
        <p style={{ paddingTop: "40vh", textAlign: "center" }}>
          Your account is already activated.
        </p>
      )}
      {status === "error" && (
        <p style={{ paddingTop: "40vh", textAlign: "center" }}>
          There was an error activating your account. Please contact support.
        </p>
      )}
    </div>
  );
}
