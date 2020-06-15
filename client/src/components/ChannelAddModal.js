import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { connect } from "react-redux";

import { createChannel } from "../store/actions";
import { channelModalClose } from "../store/actions";

const modalFadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(100%)
  }
  1%{
    opacity:0;
    transform:translateX(0%);
  }
  100%{
    opacity:1;
    transform: translateX(0%)
  }
`;

const modalFadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translateX(0%)
  }
  99%{
    opacity:0;
    transform: translateX(0%)
  }
  100%{
    opacity:0;
    transform: translateX(100%)
  }
`;

const ButtonContainerHeight = "80px";
const horizontalPadding = "25px";

const ChannelAddModalComp = styled.div`
  position: relative;
  color: #ddd;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  transform: translateX(-100%);
  opacity: 0;

  animation: ${(props) =>
      props.modalOpen ? modalFadeIn : props.firstRender ? "none" : modalFadeOut}
    0.5s forwards;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 150;
`;

const ChannelAddBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 400px;
  background-color: #2b2b2b;
  font-family: "Montserrat", "san-serif";
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-bottom: ${ButtonContainerHeight};
  box-sizing: border-box;
  z-index: 200;
  border-radius: 10px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: ${horizontalPadding};
  padding-bottom: 0;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-transform: uppercase;
  font-size: 22px;
  margin-bottom: 25px;
`;

const Header = styled.h3`
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: 500;
`;

const Input = styled.input.attrs((props) => ({}))`
  position: relative;
  width: 100%;
  height: 45px;
  padding: 10px 20px;
  border-radius: 10px;
  color: white;
  background-color: #333;
  outline: none;
  border: none;
  box-sizing: border-box;
  font-size: 14px;
  font-family: "Montserrat", "san-serif";
  margin: 0;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${ButtonContainerHeight};
  background-color: #222;
  border-radius: 0 0 10px 10px;
  padding: ${horizontalPadding};
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  button {
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    font-family: "Montserrat", "san-serif";
    box-sizing: border-box;
    font-weight: 500;
  }
`;

const CreateButton = styled.button`
  border: none;
  outline: none;
  background-color: #1a8cff;
  color: #ddd;
  margin-right: 20px;

  transition: 0.2s;
  :hover {
    background-color: #0073e6;
  }
`;

const CancelButton = styled.button`
  border: none;
  outline: none;
  background: none;
  color: #ddd;

  :hover {
    text-decoration: underline;
  }
`;

let firstRender = true;
const ChannelAddModal = (props) => {
  const [channelName, setChannelName] = useState("");
  const { modalOpen, createChannel, channelModalClose } = props;

  if (modalOpen) firstRender = false;

  const onCreateChannel = () => {
    createChannel(channelName);
    channelModalClose();
  };

  return (
    <ChannelAddModalComp modalOpen={modalOpen} firstRender={firstRender}>
      <Backdrop onClick={() => channelModalClose()} />
      <ChannelAddBox>
        <Container>
          <Title>create a channel</Title>
          <Header>channel name</Header>
          <Input onChange={(e) => setChannelName(e.target.value)} />
        </Container>
        <ButtonContainer>
          <CreateButton onClick={() => onCreateChannel()}>
            Create Channel
          </CreateButton>
          <CancelButton onClick={() => channelModalClose()}>
            Cancel
          </CancelButton>
        </ButtonContainer>
      </ChannelAddBox>
    </ChannelAddModalComp>
  );
};

const mapStateToProps = (state) => {
  return {
    modalOpen: state.modal.channelModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createChannel: (channel) => dispatch(createChannel(channel)),
    channelModalClose: () => dispatch(channelModalClose()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelAddModal);
