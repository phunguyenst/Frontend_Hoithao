import styled from "styled-components";
import { ListGroup } from "react-bootstrap";
import { BsFillPlusCircleFill } from 'react-icons/bs'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
function EventList(props) {
    // const [isChose, setIsChose] = useState(0);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showToast, setShowToast] = useState(false);

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
                <AddEventButton>
                    <BsFillPlusCircleFill className='icon' onClick={props.onCreate} />
                </AddEventButton>
            </ScrollContainer>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedEvent?.TenSuKien}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Hình thức: {selectedEvent?.HinhThuc}</p>
                    <p>Địa điểm: {selectedEvent?.DiaDiem}</p>
                    <p>Thời gian bắt đầu: {new Date(selectedEvent?.ThoiGianBatDau).toLocaleString()}</p>
                    <p>Thời gian kết thúc: {new Date(selectedEvent?.ThoiGianKetThuc).toLocaleString()}</p>
                    <p>Số người tham dự: {selectedEvent?.SoNguoiThamDu}</p>
                    <p>Mô tả: {selectedEvent?.MoTa}</p>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleRegisterEvent}>
                    đăng kí sự kiện
                </Button>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        đóng
                    </Button>
                </Modal.Footer>
            </Modal>
            {showToast && <div className="toast">Đăng kí sự kiện thành công!</div>}
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
const List = styled.ul`
  height: 550px;
  overflow: scroll;
  margin-bottom: 20px; 
  background-color: #f5f5f5;
`;
const ScrollContainer = styled.div`
  height: 550px;
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