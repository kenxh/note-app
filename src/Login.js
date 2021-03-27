import { useState } from "react";

import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**TODO: write 2 functions
   * updateEmail -> it will pass the value of the target to setEmail
   * updatePassword -> it will pass the value of the target to setPassword
   */
  const updateEmail = (e) => {setEmail(e.target.value)};
  const updatePassword = (e) => {setPassword(e.target.value)};

  const authenticate = (e) => {
    e.preventDefault();
    //TODO: pass the state variables, email and password, to the onLogin function (which was passed down prop from App)
    onLogin(email, password);
  };
  return (
    <Form onSubmit={authenticate}>
      <Form.Group>
        <Row>
          <Col>
            {/**
             * TODO: pass updateEmail & updatePassword functions to the onChange prop for each respective
             * FormControl component
             */}
            <FormControl type="email" placeholder="Enter email" onChange={updateEmail}/>
          </Col>
          <Col>
            <FormControl type="password" placeholder="Password" onChange={updatePassword}/>
          </Col>
          <Col>
            <InputGroup.Append>
              <Button className="save-btn" type="submit">
                Login
              </Button>
            </InputGroup.Append>
          </Col>
        </Row>
      </Form.Group>
    </Form>
  );
};

export default Login;
