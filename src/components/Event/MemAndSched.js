import Members from "./Members";
import { useState } from "react";
import styled from "styled-components";
import Schedule from "./Schedule"

const Container = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: 100%;
`;
const Row = styled.span`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;
const Title = styled.h5`
  color: black;
  text-decoration: none;
  background: transparent;
  padding: 5px;
  border: none;
  width: 47%;
  text-align: center;
  cursor: pointer;
  border-bottom: ${props => props.target === "true" ? "4px solid black;" : "none;"};
`;
const Vl = styled.div`
  border-left: 1px solid black;
  height: 80%;
  margin-bottom: 6px;
`;


const MemAndSched = (props) => {
  const [toggle, setToggle] = useState(0)
  const viewMems = () => {
    setToggle(0)
  }
  const viewSchedule = () => {
    setToggle(1)
  }
  return (
    <>
      <Container>
        <Row>
          <Title target={(toggle === 0) ? "true" : "false"} onClick={viewMems}>Thành viên</Title>
          <Vl></Vl>
          <Title target={(toggle === 1) ? "true" : "false"} onClick={viewSchedule}>Xếp lịch</Title>
        </Row>
        {toggle ? (<Schedule/>) : 
        (<Members targetEvent={props.targetEvent}
          isEdit={props.isEdit}
          guestIDs={props.guestIDs}
          setGuestIDs={props.setGuestIDs}/>)}
    </Container>
    </>
  )
}

export default MemAndSched