import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import Table from 'react-bootstrap/Table';
import "./index.css";

const UserInterface = () => {
  const [fullName, setFullName] = useState("");
  const [need, setNeed] = useState("");
  const [tenure, setTenure] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [reason, setReason] = useState("");
  const [employmentAddress, setEmploymentAddress] = useState("");
  const [myloans, setMyloans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    const express_url = "https://loan-manager-backend-d3wt.onrender.com";
    const jwtToken = Cookies.get("jwtToken");
    const response = await fetch(`${express_url}/api/users/my-loans`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    const data = await response.json();
    setMyloans(data);
    setIsLoading(false);
  };

  const onSubmitLoan = async (e) => {
    e.preventDefault();
    const express_url = "https://loan-manager-backend-d3wt.onrender.com";
    const jwtToken = Cookies.get("jwtToken");
    const requestBody = {
      fullName: fullName,
      amountNeeded: need,
      tenure: tenure,
      employeeStatus: employmentStatus,
      reason: reason,
      employeeAddress: employmentAddress,
    };
    const response = await fetch(`${express_url}/api/new-loan`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(requestBody),
    });

    setFullName("");
    setNeed("");
    setTenure("");
    setEmploymentAddress("");
    setEmploymentStatus("");
    setReason("");
    setShow(false);
  };

  return <>{!isLoading && (
    <div className="interface-bg">
      <div className="user-interface-nav-bg">
        <FaMoneyBillTransfer color="#0A512F" fontSize={60} />
        <Button variant="secondary" onClick={handleShow}>
          Get a Loan
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>APPLY FOR A LOAN</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmitLoan}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Full name as it appears on bank account</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Full name as it appears on bank account"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>How much do you need?</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your How much do you need?"
                  value={need}
                  onChange={(e) => setNeed(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Loan tenure (in months)</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Your Loan tenure (in months)"
                  value={tenure}
                  onChange={(e) => setTenure(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>Employment status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Employment status"
                  value={employmentStatus}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput5"
              >
                <Form.Label>Reason for loan</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Reason for loan"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput6"
              >
                <Form.Label>Employment address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Employment address"
                  value={employmentAddress}
                  onChange={(e) => setEmploymentAddress(e.target.value)}
                />
              </Form.Group>
              <Button variant="success" onClick={onSubmitLoan}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
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
        {myloans.map((eachElement) => (
            <tr>
              <td>{eachElement.verifier}</td>
              <td>{eachElement.amountNeeded}</td>
              <tr>{eachElement.status}</tr>
            </tr>
          ))}
      </tbody>
          </Table>
          
      </div>
    </div>
  )}</>
};

export default UserInterface;
