import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setUsername } from "../store/actions";

const JoinComp = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  padding: 25vh 0;
  box-sizing: border-box;
  background-color: #1b1b1b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Montserrat", sans-serif;
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 15vw;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Display = styled.div`
  position: relative;
  width: 600px;
  height: 100%;
  background-color: none;
  box-sizing: border-box;
  margin-right: 20px;
  padding-right: 20px;
  border-right: 5px solid rgba(0, 0, 0, 0.3);
`;

const JoinBox = styled.div`
  position: relative;
  width: 300px;
  height: 100%;
  background-color: none;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const JoinBoxContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Header = styled.h1`
  color: white;
  text-align: center;
  border-bottom: 3px solid white;
  margin: 0;
  padding-bottom: 10px;
  box-sizing: border-box;
  margin-bottom: 20px;
  font-size: 29px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Input = styled.input.attrs((props) => ({
  type: props.type || "text",
  placeholder: props.placeholder || "Name",
}))`
  height: 45px;
  margin-bottom: 20px;
  padding-left: 15px;
  font-family: "Raleway", sans-serif;
  box-sizing: border-box;
  outline: none;
  font-size: 17px;
  letter-spacing: 1px;
`;

const Button = styled.button`
  height: 45px;
  margin-bottom: 20px;
  padding-left: 10px;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  color: white;
  background: #1a8cff;
  border: none;
  border-radius: 4px;
  outline: none;
  cursor: pointer;

  transition: background-color 0.25s;
  :hover {
    background: #0073e6;
  }

  a {
    color: white;
    all: unset;
  }
`;

const Join = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();
    props.setUsername(username);
    setRedirect(true);
  };

  const render = () => {
    if (redirect) return <Redirect to="/projects" />;

    return (
      <JoinComp>
        <Container>
          <Display />
          <JoinBox>
            <JoinBoxContainer>
              <Header>Sign In</Header>
              <Form onSubmit={onLogin}>
                <Input onChange={(e) => setUsername(e.target.value)} />
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
                <Button onClick={onLogin}>Sign In</Button>
              </Form>
            </JoinBoxContainer>
          </JoinBox>
        </Container>
      </JoinComp>
    );
  };

  return render();
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapDispatchToProps)(Join);
