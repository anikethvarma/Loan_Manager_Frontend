import { IoIosNotifications } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Cookies from "js-cookie";
import "./index.css";

const Header = (props) => {
  const { memberType,memberName } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  const onClickLogout = ()=>{
    const {history} = props
    Cookies.remove("jwtToken");
    history.replace('/login')
  }

  return (
    <div className="navbar-bg">
      <div className="logobuttondiv">
        <h1 className="logo">CREDIT APP</h1>
        {memberType !== 'user' && <FaBars onClick={handleShow} color="#0A512F"/>}

      <Offcanvas show={show} onHide={handleClose} variant="success">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{memberName}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Dashboard
        </Offcanvas.Body>
      </Offcanvas>
      </div>
      
      <div className="navbar-items-bg">
        <div className="navbar-items">
          <IoIosNotifications color="#0A512F" fontSize={24} />
        </div>
        <div className="navbar-items">
          <AiFillMessage color="#0A512F" fontSize={24} />
        </div>
        <div className="navbar-items">
          <FaUserCircle color="#0A512F" fontSize={24} />
          <a color="#0A512F" className="nav-link">{memberType}</a>
        </div>
        <div className="navbar-items">
          <Button variant="success" onClick={onClickLogout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
