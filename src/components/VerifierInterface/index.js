import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import Table from 'react-bootstrap/Table';
import "./index.css";

const VerifierInterface = () => {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    const express_url = "https://loan-manager-backend-d3wt.onrender.com";
    const jwtToken = Cookies.get("jwtToken");
    const response = await fetch(`${express_url}/api/verifier/all-loans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();
    setLoans(data);
    setIsLoading(false);
  };

  const changeStatus = async(value, id)=>{
    const express_url = "https://loan-manager-backend-d3wt.onrender.com";
        const jwtToken = Cookies.get("jwtToken");
        const requestBody = {
          status: value
        };
    await fetch(`${express_url}/api/loans/change-status/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    
  }


  return <>{!isLoading && (
    <div className="interface-bg">
      <div className="user-interface-nav-bg">
        <FaMoneyBillTransfer color="#0A512F" fontSize={60} />
      </div>
      <div>
        <h2>Applied Loans</h2>
          <Table className="table">
            <thead>
        <tr>
          <th>Loan Officer</th>
          <th>Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((eachElement) => (
            <tr>
              <td>{eachElement.verifier}</td>
              <td>{eachElement.amountNeeded}</td>
              <tr><select value={eachElement.status} onChange={(e)=>changeStatus(e.target.value, eachElement._id)}>
                <option value={"Pending"}>Pending</option>
                <option value={"Verified"}>Verified</option>
                <option value={"Rejected"}>Rejected</option>
                </select></tr>
            </tr>
          ))}
      </tbody>
          </Table>
          
      </div>
    </div>
  )}</>
};

export default VerifierInterface;
