import { useEffect, useState } from "react";
import styled from "styled-components";
import EventDetail from "./EventDetail";
import MemAndSched from "./MemAndSched";
import EventList from "./EventList";
import Button from "./Button";
import EventDataService from "../../services/event.service";
import SearchDataService from "../../services/search.service"
import { Alert } from "react-bootstrap";

function Event() {
  // 0: Thêm sự kiện; 1: Thông tin sự kiện, 2: Chỉnh sửa sự kiện
  const actionType = ['Thêm sự kiện', 'Thông tin sự kiện', 'Chỉnh sửa sự kiện'];
  // const [action, setAction] = useState(actionType[1]);
  const [targetEvent, setTargetEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [roleCurEvent, setRoleCurEvent] = useState(false)
  const [eventName, setEventName] = useState('');
  const [startDay, setStartDay] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [guestIDs, setGuestIDs] = useState([])
  const [freqSetting, setFreqSetting] = useState({})
  const [show, setShow] = useState(false)
  const [isEdit, setIsEdit] = useState(0);
  const [isCreate, setIsCreate] = useState(0);
  const [update, setUpdate] = useState(false);
  const clearForm = () => {
    setTargetEvent({});
    setEventName('');
    setStartDay('');
    setStartTime('');
    setEndTime('');
    setLocation('');
    setDescription('');
    setGuestIDs([]);
    setFreqSetting({})
  }
  const onDiscard = () => {
    setIsEdit(0);
    setIsCreate(0);
    setShow(false)
    if(targetEvent._id === undefined) {
      setRoleCurEvent(false)
    }
  }
  const onSave = () => {
    if(eventName === '' || startDay === '' || startTime === '' || endTime === '' || location === '' || freqSetting === {}) {
      setShow(true)
      return;
    }
    setIsEdit(0);
    const event = {
      name: eventName,
      startDay: startDay,
      startTime: startTime,
      endTime: endTime,
      location: location,
      description: description,
      freqSetting: freqSetting,
      guestIDs: guestIDs
    }
    console.log(event)
    if(isCreate) {
      setIsCreate(0);
      EventDataService.createEvent(event).then(response => {
        const resEvent = response.data.event;
        setTargetEvent(resEvent);
        setEvents([...events, {_id: resEvent._id, name: eventName, startDay: startDay, startTime: startTime}])
      }).catch(e => console.log(e));
    }
    else {
      EventDataService.updateEvent(targetEvent._id, event).then(response => {
        setTargetEvent(response.data.event);
        setUpdate(!update)
      }).catch(e => console.log(e));
    }
    setShow(false)
  }
  const onDelete = () => {
    setIsEdit(0);
    setEvents(events.filter(event => event._id !== targetEvent._id));
    EventDataService.deleteEvent(targetEvent._id).then(response => {
      console.log(response.data);
    }).catch(e => console.log(e));
    clearForm()
  }
  const onEdit = () => {
    setIsEdit(1);
  }
  const onCreate = () => {
    setIsCreate(1);
    setRoleCurEvent(true)
    clearForm()
    setIsEdit(1);
  }
  const selectEvent = (event) => {
    setTargetEvent(event);
    EventDataService.getEvent(event._id).then(response => {
      let resEvent = response.data;
      setEventName(resEvent.name);
      setStartDay(resEvent.startDay);
      setStartTime(resEvent.startTime);
      setEndTime(resEvent.endTime);
      setLocation(resEvent.location);
      setDescription(resEvent.description);
      setFreqSetting(resEvent.freqSetting);
      setGuestIDs(resEvent.guestIDs);
    }).catch(e => console.log(e));
    EventDataService.getRole(event._id).then(response => {
      setRoleCurEvent(response.data.status)
    }).catch(e => console.log(e));
  }
  const setFreq = (option) => {
    setFreqSetting({
      option: option
    })
  }
  const searchByName = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value)
      SearchDataService.searchEvent({name: e.target.value}).then(response => {
        console.log(response.data)
        setEvents(response.data)
      }).catch(e => console.log(e));
    }
  }
  useEffect(() => {
    const process = async () => {
      const response = await EventDataService.getAllEventBasic()
      console.log(response.data)
      setEvents(response.data)
      const eventId = window.localStorage.getItem('eventID');
      console.log(eventId)
      if(eventId !== null) selectEvent(response.data.find(event => event._id === eventId))
      window.localStorage.clear();
    }
    process();
  }, [update])
  return (
    <div style={{ width: '100%' }}>
      <EventList 
        onCreate={onCreate} 
        events={events}
        targetEvent={targetEvent}
        selectEvent={selectEvent}
        searchByName={searchByName}/>
      <EventBox>
        <EventType>{
          (isCreate & isEdit) ? actionType[0] : isEdit ? actionType[2] : actionType[1]
        }</EventType>
        {show ? (<Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Lưu ý!</Alert.Heading>
          <p>
            Bạn chưa nhập đủ thông tin của sự kiện
          </p>
        </Alert>) : <></>}
        <EventName onChange={e => setEventName(e.target.value)} readOnly={!isEdit}
          value={eventName} style={marginTop} />
        <EventContent style={marginTop}>
          <EventDetail 
            isEdit={isEdit}
            setStartDay={setStartDay}
            startDay={startDay}
            setStartTime={setStartTime}
            startTime={startTime}
            setEndTime={setEndTime}
            endTime={endTime}
            setLocation={setLocation}
            location={location}
            setDescription={setDescription}
            description={description}
            setFreq={setFreq}
            freqSetting={freqSetting}
            />
          <MemAndSched 
            setGuestIDs={setGuestIDs}
            guestIDs={guestIDs}
            targetEvent={targetEvent}
            isEdit={isEdit}/>
        </EventContent>
        {roleCurEvent ? 
        (<Row>
          <Button buttonSize="btn-sm"
            text={isEdit ? "Quay lại" : "Xóa"}
            buttonStyle={isEdit ? "btn-secondary" : "btn-danger"}
            onClick={isEdit ? onDiscard : onDelete} />
          <Button buttonSize="btn-sm"
            text={isEdit ? "Lưu" : "Chỉnh sửa"}
            buttonStyle="btn-primary" onClick={isEdit ? onSave : onEdit} />
        </Row>) : <></>}
      </EventBox>
    </div>

  )
}

const marginTop = {
  marginTop: '10px'
}
const EventBox = styled.div`
  width: 70%;
  height: 90%;
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(69%, -50%);
  border-radius: 15px;
  border: none;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  background-color: #fff;
  padding: 20px;
  display: flex;
  flex-flow: column;
`;
const EventName = styled.input`
    width: 100%;
    padding: 10px 20px;
    border-radius: 10px;
    background-color: #1c2a3a;
    color: #f5f5f5;
    font-size: 25px;
    font-weight: 700;
    box-sizing: border-box;
    border: none;
`;

const EventContent = styled.div`
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    flex-grow: 1;
    overflow: hidden;
`;
const EventType = styled.span`
    font-size: 20px;
    font-weight: 700;
    color: #304254;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
`
export default Event;