import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Header from "../Header";
import UserInterface from "../UserInterface"
import VerifierInterface from "../VerifierInterface"
import AdminInterface from "../AdminInterface"
import { Navigate } from "react-router-dom";

const Home = () => {
  const [memberName, setMemberName] = useState("");
  const [memberType, setMemberType] = useState("");
  

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const express_url = "https://loan-manager-backend-d3wt.onrender.com";
    const jwtToken = Cookies.get("jwtToken");
    const response = await fetch(`${express_url}/api/users/details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();

    setMemberName(data.username);
    setMemberType(data.type);
  };

  if(Cookies.get("jwtToken") === undefined) return <Navigate to="/login"/>
  return (
    <>
      <Header memberType={memberType} memberName={memberName}/>
      {memberType === "user" && <UserInterface/>}
      {memberType === "verifier" && <VerifierInterface/>}
      {memberType === "admin" && <AdminInterface/>}
    </>
  );
};

export default Home;
