import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { Row, Col, Button, Form } from 'react-bootstrap';
import AccountService from '../../services/account.service';
import Password from './Password';
import ContactList from './ContactList';


const Profile = () => {
    const [userInformation, setUserInformation] = useState({
        MaTaiKhoan: "",
        TenTaiKhoan: "",
        DiaChi: "",
        email: "",
        SoDienThoai: ""
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setUserInformation({
            ...userInformation,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      AccountService.updateInfo({
          fName: userInformation.fName,
          lName: userInformation.lName,
          email: userInformation.email,
          phone: userInformation.phone,
      }).then(response => {
          console.log(response.data)
      }).catch(e => console.log(e));
    };

    useEffect(() => {
        AccountService.getInformation().then(response => {
            setUserInformation({
                DiaChi: response.data.DiaChi,
                email: response.data.email,
                SoDienThoai: response.data.SoDienThoai,
                MaTaiKhoan: response.data.MaTaiKhoan,
                TenTaiKhoan: response.data.TenTaiKhoan
            })
        }).catch(e => console.log(e))
    }, []);

    
    return (
        <>
            <SubHeading>Thông tin cá nhân</SubHeading>
            <hr style={{marginLeft:'220px', marginRight:'170px'}}></hr>
            <div style={{ marginLeft: "225px" }}>
                <Row style={{
                    display: 'flex',
                }}>
                    <Col md={6}>
                        <Form>
                            <Form.Group controlId="userID">
                                <Form.Label style={{ fontWeight: '500' }}>UserID</Form.Label>
                                <Form.Control style={{ marginBottom: '10px', backgroundColor: 'white'}}
                                    type="text"
                                    value={userInformation.MaTaiKhoan}
                                    name="userId"
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="username">
                                <Form.Label style={{ fontWeight: '500' }}>Tên tài khoản</Form.Label>
                                <Form.Control style={{ marginBottom: '10px', backgroundColor: 'white' }}
                                    type="text"
                                    value={userInformation.TenTaiKhoan}
                                    name="username"
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="fName">
                                <Form.Label style={{ fontWeight: '500' }}>Địa chỉ</Form.Label>
                                <Form.Control style={{ marginBottom: '10px' }}
                                    type="text"
                                    name="fName"
                                    value={userInformation.DiaChi}
                                    onChange={handleChange}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label style={{ fontWeight: '500' }}>Email</Form.Label>
                                <Form.Control style={{ marginBottom: '10px' }}
                                    type="email"
                                    name="email"
                                    value={userInformation.email}
                                    onChange={handleChange}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label style={{ fontWeight: '500' }}>Số điện thoại</Form.Label>
                                <Form.Control style={{ marginBottom: '10px' }}
                                    type="text"
                                    name="phone"
                                    value={userInformation.SoDienThoai}
                                    onChange={handleChange}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="picture">
                                <Form.Label style={{ fontWeight: '500' }}>Ảnh đại diện</Form.Label>
                                <Form.Control
                                    type="file"
                                ></Form.Control>
                            </Form.Group>
                            <Button type="submit" varient="primary" style={{ marginTop: '20px',backgroundColor:'#2da44e' }}
                                onClick={handleSubmit}
                            >
                                Cập nhật
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Img src="layout.png" alt={userInformation.fName} />
                    </Col>
                </Row>
            </div>
            <Password />
            <SubHeading style={{marginTop:'100px'}}>Danh sách liên lạc</SubHeading>
            <hr style={{marginLeft:'220px', marginRight:'170px'}}></hr>
            <div style={{ marginLeft: "205px" }}>
            <ContactList />
            </div>
        </>
    )
}

const Img = styled.img`
    margin-left: -65px;
    margin-top: -150px;
    width: 350px;
    height: 350px;
    border-radius: 200px;
`

const SubHeading = styled.h2`
    padding:20px auto;
    margin-left:220px; 
    margin-top:50px;
    font-size: 30px;
    font-weight: 500;
`
export default Profile