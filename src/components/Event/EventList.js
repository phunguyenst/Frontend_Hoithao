import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { BsFillPlusCircleFill } from 'react-icons/bs'
import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { NotificationContext } from '../EventNotification/NotificationContext';


function EventList(props) {
    // const [isChose, setIsChose] = useState(0);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const { setNotifications } = useContext(NotificationContext);

    useEffect(() => {
        axios.get('http://localhost:3307/api/sukien/findall')
            .then(response => {
                setEvents(response.data);
                setFilteredEvents(response.data); 
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    //đăng kí sự kiện
    const handleRegisterEvent = () => {
        axios.post('http://localhost:3307/api/dangkysukien/registerEvent', { MaSuKien: selectedEvent.MaSuKien })
            .then(response => {
                console.log('Registered successfully!', response);
                // alert("Đăng ký sự kiện thành công");
                // const newNotification = {
                //     id: Date.now(),
                //     message: 'Đăng ký sự kiện thành công!',
                //     responsed: false,
                // };

                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000); // hide the toast after 3 seconds
                // re-fetch events
                axios.get('http://localhost:3307/api/sukien/findall')
                    .then(response => {
                        setEvents(response.data);
                        setFilteredEvents(response.data); 
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
                    handleCloseModal();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    //search event by name
    const handleSearch = (e) => {
        const value = e.target.value;
        if (!value) {
            setFilteredEvents(events); 
        } else {
            const relativeSearchResult = events.filter(event => event.TenSuKien.toLowerCase().includes(value.toLowerCase()));
            setFilteredEvents(relativeSearchResult);
        }
    };
    const handleItemClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [day, month, year].join('/');
    }
    return (
        
        <Container>
            <h4 className="EventList-logo">Sự kiện</h4>
            <Input className='form-control' placeholder="Tìm kiếm sự kiện"
                 onKeyUp={handleSearch} />
            <ScrollContainer>
                <List>
                    {filteredEvents.map((event) =>
                        <Item
                            key={event.MaSuKien}
                            className={props.targetEvent._id === event.MaSuKien ? 'active' : ''}
                            onClick={() => handleItemClick(event)}>
                            <Name>{event.TenSuKien}</Name>
                            <Text>Ngày {new Date(event.ThoiGianBatDau).toLocaleDateString()} lúc {new Date(event.ThoiGianBatDau).toLocaleTimeString()}</Text>
                        </Item>)
                    }
                </List>
                {/* <AddEventButton>
                    <BsFillPlusCircleFill className='icon' onClick={props.onCreate} />
                </AddEventButton> */}
            </ScrollContainer>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedEvent?.TenSuKien}</Modal.Title>
                </Modal.Header>
                <StyledModalBody>
                    <p>Hình thức: {selectedEvent?.HinhThuc}</p>
                    <p>Địa điểm: {selectedEvent?.DiaDiem}</p>
                    <p>Thời gian bắt đầu: {formatDate(selectedEvent?.ThoiGianBatDau)}</p>
                    <p>Thời gian kết thúc: {formatDate(selectedEvent?.ThoiGianKetThuc)}</p>
                    <p>Số người tham dự: {selectedEvent?.SoNguoiThamDu}</p>
                    <p>Mô tả: {selectedEvent?.MoTa}</p>
                </StyledModalBody>
                <Modal.Footer>
                <Button variant="primary" onClick={handleRegisterEvent}>
                    Đăng kí sự kiện
                </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            {showToast && <Toast>Đăng kí sự kiện thành công!</Toast>}
        </Container>

    )
}


const Container = styled.div`
    padding-top: 2%;
    width: 100%;
    height: 100%;
    padding-left: 60px;
    display: row;
`;
const Toast = styled.div`
    position: fixed;
    bottom: 41%;
    right: 35%;
    background-color: #4CAF50;
    color: white;
    padding: 60px;
    margin: 10px;
    border-radius: 10px;
    z-index: 9999;
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
    font-size: 15px;
`;
const StyledModalBody = styled(Modal.Body)`
    width: 800px; 
    overflow-wrap: break-word;
`;
const Input = styled.input`
    border-radius: 5px; 
    width: 100%;
    margin-right: 20px;
`;
const List = styled.ul`
  height: 800px;
  overflow: scroll;
  margin-bottom: 20px; 
  padding-left: 0px;
`;
const ScrollContainer = styled.div`
  height: 1000px;
  overflow: scroll;
  margin-bottom: 20px; 
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