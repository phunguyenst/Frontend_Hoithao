import styled from "styled-components"
import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Button from "@restart/ui/esm/Button";
import EventDataService from "../../services/event.service";


export default function Notification(props) {
    const deleteNotification = (NotificationID) => {
        handleClose();
        return props.notifications.filter(({ id }) => id !== NotificationID)
    }
    const acceptInvitation = (notification) => {
      notification.responsed = !notification.responsed
      EventDataService.responseInvitation(notification._id, { res: 'Đồng ý'}).then(response => {
        console.log(response.data);
      }).catch(e => console.log(e));
      props.setNotifications(props.notifications.map((noti) => {
        if(noti._id === notification._id) {
          return notification
        }
        return noti
      }))
    }

    const declineInvitation = (notification) => {
      EventDataService.responseInvitation(notification._id, { res: 'Từ chối'}).then(response => {
        console.log(response.data);
      }).catch(e => console.log(e));
      props.setNotifications(props.notifications.filter(noti => noti._id !== notification._id))
    }
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <NotificationContainer>
            <h4 className="Notification-logo" style={{
                padding: '20px auto',
                marginTop: '50px',
                fontSize: '30px',
                fontWeight: '500'
            }}>
                Thông báo
            </h4>
            <hr style={{ marginRight: '170px' }}></hr>
            <ListGroup defaultActiveKey="#link1">
                {(props.notifications).map((notification) =>
                    <Item>
                        <Contain>
                            <Name>{`${notification.fName} ${notification.lName}`} đã mời bạn vào sự kiện "{notification.eventName}"</Name>
                            <Text>Ngày diễn ra sự kiện {notification.startDay} lúc {notification.startTime}</Text>
                        </Contain>
                        {(!notification.responsed) ? (
                            <ButtonContainer>
                                <button type="button" class="btn btn-primary" onClick={() => acceptInvitation(notification)}>Đồng ý</button>
                                <button type="button" class="btn btn-danger" onClick={() => declineInvitation(notification)}>Từ chối</button>
                            </ButtonContainer>
                        ) : (
                            <>
                            </>
                        )
                        }
                        {/* <RemoveButton>
                            <CloseButton onClick={handleShow} />
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Xác nhận</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Bạn có chắc chắn muốn xóa thông báo này ? Hành động này không thể hoàn tác.</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Trở lại
                                    </Button>
                                    <Button variant="primary" onClick={() => deleteNotification(notification.id)}>
                                        Xóa
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </RemoveButton> */}
                    </Item>)
                }
            </ListGroup>
        </NotificationContainer>
    )
}


const NotificationContainer = styled.div`
  margin-left: 220px;
`

const Item = styled.div`
    display: flex;
    width: 86.5%;
    flex-direction: row;
    padding: 0px 20px;
    padding-top: 1.1%;
    padding-bottom: 1%;
    border-radius: 5px;
    justify-content: space-between;
    box-shadow: 0 1px 10px rgb(0 0 0 / 0.25);
    :hover {
      cursor: pointer;
    }
    &:first-child {
        margin-top: 12px;
    }
    &:not(:first-child) {
        margin-top: 12px;
    }
`

const Name = styled.div`
    font-weight: 600;
    font-size: 20px;
    width: 100%;
`
const Text = styled.div`
    font-size: 13px;
`;

const RemoveButton = styled.div`
    padding-top: 10px;
    justify-content: flex-end;
    padding-right: 5%;
    width: 2%;
`

const Contain = styled.div`
    display: row;
    width: 100%;
    margin-left: 1%;
`
const ButtonContainer = styled.div`
    display: flex;
    width: 20%;
    & .btn{
      margin: 5px;
    }
`