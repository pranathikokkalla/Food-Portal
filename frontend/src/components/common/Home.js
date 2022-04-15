import { useState, useEffect } from "react";

const Home = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   setName("Pranathi");
  // }, []);

  return <div style={{ textAlign: "center" }}>Pranathi's Canteen portal</div>;
};

export default Home;
