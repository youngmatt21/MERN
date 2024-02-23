import React, { useState } from "react";
import axios from "axios";
import { API_URL, PROD_URL } from "../../API";
export default function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  //destructure formData

  const { firstname, lastname, email, password } = formData;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      //header configuration

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // request body

      const body = JSON.stringify(formData);

      // send Post request to server

      const res = await axios.post(
        `${PROD_URL}/api/user/register`,
        body,
        config
      );

      console.log(res.data);

      setFormData({ firstname: "", lastname: "", email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "0.5rem",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="firsname">Firstname</label>
        <input
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <button type="submit">SignUP</button>
      </form>
    </div>
  );
}
