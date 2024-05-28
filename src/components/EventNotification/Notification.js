import styled from "styled-components"
import { useState, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import { NotificationContext } from './NotificationContext';
import CloseButton from 'react-bootstrap/CloseButton';
import Modal from 'react-bootstrap/Modal';
import Button from "@restart/ui/esm/Button";
import EventDataService from "../../services/event.service";

export default function Notification(props) {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const notifications = [
        { message: "Thông báo 1: Cập nhật tính năng hiển thị sự kiện trên lịch trong tương lai" },
        { message: "Thông báo 2: Về việc cập nhật tính năng cho phép người dùng tự tạo sự kiện trong năm tới" },
        { message: "Thông báo 3: Đừng quên thay đổi thông tin cá nhân sau khi đăng ký tài khoản nhé 😎" },
        // Thêm nhiều thông báo khác tại đây
    ];

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
                {notifications.map((notification) =>
                    <Item>
                        <Contain>
                        {notification.message}
                        </Contain>
                    </Item>
                )}
            </ListGroup>
        </NotificationContainer>
    );
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