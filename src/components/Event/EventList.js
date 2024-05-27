import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { BsFillPlusCircleFill } from 'react-icons/bs'


function EventList(props) {
    // const [isChose, setIsChose] = useState(0);
    return (
        <Container>
            <h4 className="EventList-logo">Sự kiện</h4>
            <Input className='form-control' placeholder="Tìm kiếm sự kiện"
                onKeyUp={(e) => props.searchByName(e)}/>
            <List>
            <ListGroup defaultActiveKey="#link1" width="20%">
                {(props.events).map((event) =>
                    <Item
                        key={event._id}
                        className={props.targetEvent._id === event._id ? 'active' : ''}
                        onClick={() => props.selectEvent(event)}>
                        <Name>{event.name}</Name>
                        <Text>Ngày {event.startDay} lúc {event.startTime}</Text>
                    </Item>)
                }
            </ListGroup>
            </List>
            <AddEventButton>
                <BsFillPlusCircleFill className='icon' onClick={props.onCreate}/>
            </AddEventButton>
        </Container>

    )
}


const Container = styled.div`
    padding-top: 2%;
    width: 26%;
    height: 100%;
    padding-left: 60px;
    display: row;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    justify-content: center;
    align-items: flex-start;
    border-radius: 5px;
    border: 1px solid #d1d1d1;
    margin: 2px 0px;
    :hover {
      cursor: pointer;
    }
    height: 70px;
    &:first-child {
        margin-top: 10px;
    }
    &.active {
        background-color: #1c2a3a;
        color: aliceblue;
        box-shadow: 0 1px 10px rgb(0 0 0 / 0.5);
    }
`
const Name = styled.div`
    font-weight: 600;
    font-size: 15px;
`
const Text = styled.div`
    font-size: 13px;
`;
const Input = styled.input`
    border-radius: 5px; 
    width: 100%;
    margin-right: 10px;
`;
const List = styled.div`
  height: 550px;
  overflow: scroll;
`;
const AddEventButton = styled.div`
    font-size: 35px;
    color: #1c2a3a;
    text-align: center;
    .icon:hover {
        cursor: pointer;
    }
`;
export default EventList;