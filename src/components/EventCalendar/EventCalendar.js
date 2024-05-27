import { useEffect, useState } from 'react';
import Calendar from 'react-awesome-calendar';
import styled from 'styled-components';
import CalendarService from '../../services/calendar.service';
import { Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';


// const eventstest = [{
//   id: 5,
//   color: '#fd3153',
//   from: '2021-11-11T18:00:00+00:00',
//   to: '2021-11-12T19:00:00+00:00',
//   location: 'https://meet.google.com/...',
//   title: 'This is an event',
//   description: 'noi dung'
// }];

const Label = styled(Form.Label)`
	font-weight: 600;
  margin-right: 5px;
`;
const CalendarContainer = styled.div`
  background-color: #fff;
  width: 85%;
  height: 90%;
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 20px;
  transform: translate(-47%, -50%);
  overflow-y: scroll;
`

const Circle = styled.div`
  border-radius: 50%;
  width: 7%;
  height: 26px;
  margin-right: 10px;
  background-color: ${props => props.color};
`;

const ModalTitle = styled(Modal.Title)`
  width: 100%;
`;

const ModalHeader = styled(Modal.Header)`
  background-color: #f2f2f2;
  width: 100%;
`;

const Edit = styled.div`
  margin-right: 10px;
`;

export default function EventCalendar() {
  const [targetEvent, setTargetEvent] = useState({});
  const [show, setShow] = useState(false);
  const [events, setEvents] = useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clickEvent = (eventID) => {
    handleShow()
    window.localStorage.setItem('eventID', eventID)
    setTargetEvent(events.find(event => event.id === eventID))
  }
  
  // Handle get event list in a month or a day
  const changeCalendar = (date) => {
    if (date.mode === 'monthlyMode') {
      console.log(date)
      CalendarService.getEventsOfMonth(date.month + 1, date.year)
        .then(response => {
          const temp = []
          const resEvents = []
          response.data.forEach(resEvent => {
            let event = {}
            if(resEvent.freqSetting['option'] === 4) {
              resEvent.startTime = date.year.toString() + resEvent.startTime.substring(4);
              resEvent.endTime = date.year.toString() + resEvent.endTime.substring(4);
            }
            else if(resEvent.freqSetting['option'] === 3) {
              resEvent.startTime = date.year.toString()+ '-' + ("0" + (date.month+1).toString()).slice(-2) + resEvent.startTime.substring(7);
              resEvent.endTime = date.year.toString()+ '-' + ("0" + (date.month+1).toString()).slice(-2) + resEvent.endTime.substring(7);
            }
            else if(resEvent.freqSetting['option'] === 2) {
              let start = 0;
              let cnt = 7;
              if(((date.year).toString() === resEvent.startTime.substring(0,4)) & ((date.month+1).toString() === resEvent.startTime.substring(5,7))) {
                start = parseInt(resEvent.startTime.substring(8,10))
              }
              else {
                let startDate = new Date(resEvent.startTime.substring(0,10))
                let freqStartDate = new Date(date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2)  + '-01')
                while(startDate.getDay() !== freqStartDate.getDay()) {
                  freqStartDate.setDate(freqStartDate.getDate() + 1)
                }
                resEvent.startTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2)  + '-' + ("0" + (freqStartDate.getDate()).toString()).slice(-2) + resEvent.startTime.substring(10);
                resEvent.endTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2) + '-' + ("0" + (freqStartDate.getDate()).toString()).slice(-2) + resEvent.endTime.substring(10);
              }
              for(var j = start; j < 31; j+=7) {
                let freqEvent = {}
                freqEvent['id'] = resEvent._id
                freqEvent['from'] = resEvent.startTime.substring(0,8) + ("0"+(parseInt(resEvent.startTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.startTime.substring(10);
                freqEvent['to'] = resEvent.endTime.substring(0,8) + ("0"+(parseInt(resEvent.endTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.endTime.substring(10);
                freqEvent['location'] = resEvent.location
                freqEvent['title'] = resEvent.name
                freqEvent['description'] = resEvent.description
                freqEvent['color'] = '#fd3153'
                freqEvent['freqSetting'] = resEvent.freqSetting
                temp.push(freqEvent)
                cnt = cnt+7
              }
            }
            else if(resEvent.freqSetting['option'] === 1) {
              let start = 0;
              let cnt = 1;
              if(((date.year).toString() === resEvent.startTime.substring(0,4)) & ((date.month+1).toString() === resEvent.startTime.substring(5,7))) {
                start = parseInt(resEvent.startTime.substring(8,10))
              }
              else {
                resEvent.startTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2)  + '-01' + resEvent.startTime.substring(10);
                resEvent.endTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2) + '-01' + resEvent.endTime.substring(10);
              }
              for(var i = start; i < 31; i++) {
                let freqEvent = {}
                freqEvent['id'] = resEvent._id
                freqEvent['from'] = resEvent.startTime.substring(0,8) + ("0"+(parseInt(resEvent.startTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.startTime.substring(10);
                freqEvent['to'] = resEvent.endTime.substring(0,8) + ("0"+(parseInt(resEvent.endTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.endTime.substring(10);
                freqEvent['location'] = resEvent.location
                freqEvent['title'] = resEvent.name
                freqEvent['description'] = resEvent.description
                freqEvent['color'] = '#fd3153'
                freqEvent['freqSetting'] = resEvent.freqSetting
                temp.push(freqEvent)
                cnt = cnt+1
              }
            }
            event['id'] = resEvent._id
            event['from'] = resEvent.startTime
            event['to'] = resEvent.endTime
            event['location'] = resEvent.location
            event['title'] = resEvent.name
            event['description'] = resEvent.description
            event['color'] = '#fd3153'
            event['freqSetting'] = resEvent.freqSetting
            resEvents.push(event)
          });
          console.log(resEvents)
          setEvents(resEvents.concat(temp))
        }).catch(e => console.log(e))
    } else if (date.mode === 'dailyMode') {
      CalendarService.getEventsOfDay(date.day, date.month + 1, date.year)
        .then(response => {
          console.log(response.data)
          const temp = []
          const resEvents = []
          response.data.forEach(resEvent => {
            let event = {}
            if(resEvent.freqSetting['option'] === 4) {
              resEvent.startTime = date.year.toString() + resEvent.startTime.substring(4);
              resEvent.endTime = date.year.toString() + resEvent.endTime.substring(4);
            }
            else if(resEvent.freqSetting['option'] === 3) {
              resEvent.startTime = date.year.toString()+ '-' + ("0" + (date.month+1).toString()).slice(-2) + resEvent.startTime.substring(7);
              resEvent.endTime = date.year.toString()+ '-' + ("0" + (date.month+1).toString()).slice(-2) + resEvent.endTime.substring(7);
            }
            else if(resEvent.freqSetting['option'] === 2) {
              let start = 0;
              let cnt = 7;
              if(((date.year).toString() === resEvent.startTime.substring(0,4)) & ((date.month+1).toString() === resEvent.startTime.substring(5,7))) {
                start = parseInt(resEvent.startTime.substring(8,10))
              }
              else {
                let startDate = new Date(resEvent.startTime.substring(0,10))
                let freqStartDate = new Date(date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2)  + '-01')
                while(startDate.getDay() !== freqStartDate.getDay()) {
                  freqStartDate.setDate(freqStartDate.getDate() + 1)
                }
                resEvent.startTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2)  + '-' + ("0" + (freqStartDate.getDate()).toString()).slice(-2) + resEvent.startTime.substring(10);
                resEvent.endTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2) + '-' + ("0" + (freqStartDate.getDate()).toString()).slice(-2) + resEvent.endTime.substring(10);
              }
              for(var j = start; j < 31; j+=7) {
                let freqEvent = {}
                freqEvent['id'] = resEvent._id
                freqEvent['from'] = resEvent.startTime.substring(0,8) + ("0"+(parseInt(resEvent.startTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.startTime.substring(10);
                freqEvent['to'] = resEvent.endTime.substring(0,8) + ("0"+(parseInt(resEvent.endTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.endTime.substring(10);
                freqEvent['location'] = resEvent.location
                freqEvent['title'] = resEvent.name
                freqEvent['description'] = resEvent.description
                freqEvent['color'] = '#fd3153'
                freqEvent['freqSetting'] = resEvent.freqSetting
                temp.push(freqEvent)
                cnt = cnt+7
              }
            }
            else if(resEvent.freqSetting['option'] === 1) {
              let start = 0;
              let cnt = 1;
              if(((date.year).toString() === resEvent.startTime.substring(0,4)) & ((date.month+1).toString() === resEvent.startTime.substring(5,7))) {
                start = parseInt(resEvent.startTime.substring(8,10))
              }
              else {
                resEvent.startTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2)  + '-01' + resEvent.startTime.substring(10);
                resEvent.endTime = date.year.toString() + '-' + ("0" + (date.month+1).toString()).slice(-2) + '-01' + resEvent.endTime.substring(10);
              }
              for(var i = start; i < 31; i++) {
                let freqEvent = {}
                freqEvent['id'] = resEvent._id
                freqEvent['from'] = resEvent.startTime.substring(0,8) + ("0"+(parseInt(resEvent.startTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.startTime.substring(10);
                freqEvent['to'] = resEvent.endTime.substring(0,8) + ("0"+(parseInt(resEvent.endTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.endTime.substring(10);
                freqEvent['location'] = resEvent.location
                freqEvent['title'] = resEvent.name
                freqEvent['description'] = resEvent.description
                freqEvent['color'] = '#fd3153'
                freqEvent['freqSetting'] = resEvent.freqSetting
                temp.push(freqEvent)
                cnt = cnt+1
              }
            }
            event['id'] = resEvent._id
            event['from'] = resEvent.startTime
            event['to'] = resEvent.endTime
            event['location'] = resEvent.location
            event['title'] = resEvent.name
            event['description'] = resEvent.description
            event['color'] = '#fd3153'
            event['freqSetting'] = resEvent.freqSetting
            console.log(temp)
            resEvents.push(event)
          });
          setEvents(resEvents.concat(temp))
        }).catch(e => console.log(e))
    }
  }
  useEffect(() => {
    const date = new Date()
    CalendarService.getEventsOfMonth(date.getMonth() + 1, date.getFullYear())
        .then(response => {
          const temp = []
          const resEvents = []
          response.data.forEach(resEvent => {
            let event = {}
            if(resEvent.freqSetting['option'] === 4) {
              resEvent.startTime = date.getFullYear().toString() + resEvent.startTime.substring(4);
              resEvent.endTime = date.getFullYear().toString() + resEvent.endTime.substring(4);
            }
            else if(resEvent.freqSetting['option'] === 3) {
              resEvent.startTime = date.getFullYear().toString()+ '-' + ("0" + (date.getMonth()+1).toString()).slice(-2) + resEvent.startTime.substring(7);
              resEvent.endTime = date.getFullYear().toString()+ '-' + ("0" + (date.getMonth()+1).toString()).slice(-2) + resEvent.endTime.substring(7);
            }
            else if(resEvent.freqSetting['option'] === 2) {
              let start = 0;
              let cnt = 7;
              if((date.getFullYear().toString() === resEvent.startTime.substring(0,4)) & ((date.getMonth()+1).toString() === resEvent.startTime.substring(5,7))) {
                start = parseInt(resEvent.startTime.substring(8,10))
              }
              else {
                let startDate = new Date(resEvent.startTime.substring(0,10))
                let freqStartDate = new Date(date.getFullYear().toString() + '-' + ("0" + (date.getMonth()+1).toString()).slice(-2)  + '-01')
                while(startDate.getDay() !== freqStartDate.getDay()) {
                  freqStartDate.setDate(freqStartDate.getDate() + 1)
                }
                resEvent.startTime = date.getFullYear().toString() + '-' + ("0" + (date.getMonth()+1).toString()).slice(-2)  + '-' + ("0" + (freqStartDate.getDate()).toString()).slice(-2) + resEvent.startTime.substring(10);
                resEvent.endTime = date.getFullYear().toString() + '-' + ("0" + (date.getMonth()+1).toString()).slice(-2) + '-' + ("0" + (freqStartDate.getDate()).toString()).slice(-2) + resEvent.endTime.substring(10);
              }
              for(var j = start; j < 31; j+=7) {
                let freqEvent = {}
                freqEvent['id'] = resEvent._id
                freqEvent['from'] = resEvent.startTime.substring(0,8) + ("0"+(parseInt(resEvent.startTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.startTime.substring(10);
                freqEvent['to'] = resEvent.endTime.substring(0,8) + ("0"+(parseInt(resEvent.endTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.endTime.substring(10);
                freqEvent['location'] = resEvent.location
                freqEvent['title'] = resEvent.name
                freqEvent['description'] = resEvent.description
                freqEvent['color'] = '#fd3153'
                freqEvent['freqSetting'] = resEvent.freqSetting
                temp.push(freqEvent)
                cnt = cnt+7
              }
            }
            else if(resEvent.freqSetting['option'] === 1) {
              let start = 0;
              let cnt = 1;
              if(((date.getFullYear()).toString() === resEvent.startTime.substring(0,4)) & ((date.getMonth()+1).toString() === resEvent.startTime.substring(5,7))) {
                start = parseInt(resEvent.startTime.substring(8,10))
              }
              else {
                resEvent.startTime = date.getFullYear().toString() + '-' + ("0" + (date.getMonth()+1).toString()).slice(-2)  + '-01' + resEvent.startTime.substring(10);
                resEvent.endTime = date.getFullYear().toString() + '-' + ("0" + (date.getMonth()+1).toString()).slice(-2) + '-01' + resEvent.endTime.substring(10);
              }
              for(var i = start; i < 31; i++) {
                let freqEvent = {}
                freqEvent['id'] = resEvent._id
                freqEvent['from'] = resEvent.startTime.substring(0,8) + ("0"+(parseInt(resEvent.startTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.startTime.substring(10);
                freqEvent['to'] = resEvent.endTime.substring(0,8) + ("0"+(parseInt(resEvent.endTime.substring(8,10))+cnt).toString()).slice(-2) + resEvent.endTime.substring(10);
                freqEvent['location'] = resEvent.location
                freqEvent['title'] = resEvent.name
                freqEvent['description'] = resEvent.description
                freqEvent['color'] = '#fd3153'
                freqEvent['freqSetting'] = resEvent.freqSetting
                temp.push(freqEvent)
                cnt = cnt+1
              }
            }
            event['id'] = resEvent._id
            event['from'] = resEvent.startTime
            event['to'] = resEvent.endTime
            event['location'] = resEvent.location
            event['title'] = resEvent.name
            event['description'] = resEvent.description
            event['color'] = '#fd3153'
            event['freqSetting'] = resEvent.freqSetting
            resEvents.push(event)
          })
          setEvents(resEvents.concat(temp))
        }).catch(e => console.log(e))
  }, [])
  return (
    <div>
      <CalendarContainer >
        <Calendar events={events} onClickEvent={clickEvent} onChange={changeCalendar} />
      </CalendarContainer>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <ModalHeader closeButton>
          <Circle color={targetEvent.color} />
          <ModalTitle>{targetEvent.title}</ModalTitle>
          <Edit>
            <Link to='/events' style={{ textDecoration: 'none' }}>
              <AiOutlineEdit size={22} color={'gray'} />
            </Link>
          </Edit>
        </ModalHeader>
        <Modal.Body>
          <Form.Group>
            <div>
              <Label>Ngày tổ chức:</Label>
              <Form.Text className="text-muted">
                {(targetEvent.from) ? targetEvent.from.slice(0, 10) : ''}
              </Form.Text>
            </div>
            <div>
              <Label>Thời gian:</Label>
              <Form.Text className="text-muted">
                {(targetEvent.from) ? targetEvent.from.slice(11, 16) : ''}
              </Form.Text>
            </div>
            <div>
              <Label>Địa điểm:</Label>
              <Form.Text className="text-muted">
                {targetEvent.location}
              </Form.Text>
            </div>
            <div>
              <Label>Mô tả:</Label>
            </div>
            <div style={{ border: '1px solid #c9c9c9', borderRadius: '5px', padding: '5px' }}>
              <Form.Text className="text-muted">
                {targetEvent.description}
              </Form.Text>
            </div>
          </Form.Group>
        </Modal.Body>
      </Modal>

    </div>
  )
}