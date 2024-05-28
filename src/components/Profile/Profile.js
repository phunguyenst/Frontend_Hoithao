import React, { useState, useEffect,useContext } from 'react'
import styled from 'styled-components';
import { Row, Col, Button, Form } from 'react-bootstrap';
import AccountService from '../../services/account.service';
import Password from './Password';
import ContactList from './ContactList';
import AuthContext from '../../context/AuthContext';
import validateInfor from './validateInfo'; 

const Profile = () => {
    const { authEmail } = useContext(AuthContext);
    const [touched, setTouched] = useState({});

    const [userInformation, setUserInformation] = useState({
        MaTaiKhoan: "",
        TenTaiKhoan: "",
        DiaChi: "",
        email: "",
        SoDienThoai: "",
        password: "",
        role: ""
    })
    console.log("authEmail: ", authEmail);
    console.log("userInformation: ", userInformation);

    const fetchUserInformation = (e) => {
        fetch(`http://localhost:3307/api/taikhoan/getone/${authEmail}`)
        .then(response => response.json())
        .then(data => {
            const userData = data[0];
            setUserInformation({
                MaTaiKhoan: userData.MaTaiKhoan,
                TenTaiKhoan: userData.TenTaiKhoan,
                DiaChi: userData.DiaChi,
                email: userData.email,
                SoDienThoai: userData.SoDienThoai,
                password: userData.password,
                role: userData.role
            })
        })
        .catch(e => console.log(e))
    };
    

    useEffect(() => {
        fetchUserInformation();
    }, [authEmail]);

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        setUserInformation(prevInfo => ({
            ...prevInfo,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateInfor(userInformation);

        if (Object.keys(errors).length > 0) {
            alert("Có lỗi xảy ra. Vui lòng kiểm tra lại định dạng thông tin nhập vào.");
            return;
        }
        fetch(`http://localhost:3307/api/taikhoan/update/${userInformation.MaTaiKhoan}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              
                TenTaiKhoan: userInformation.TenTaiKhoan,
                DiaChi: userInformation.DiaChi,
                // email: userInformation.email,
                SoDienThoai: userInformation.SoDienThoai,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Update successful:', data);
            fetchUserInformation();
            alert("Cập nhật thông tin thành công!");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };


    
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
                                    name="TenTaiKhoan"
                                    value={userInformation.TenTaiKhoan}
                                    onChange={handleChange}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="fName">
                                <Form.Label style={{ fontWeight: '500' }}>Địa chỉ</Form.Label>
                                <Form.Control style={{ marginBottom: '10px' }}
                                    type="text"
                                    name="DiaChi"
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
                                    readOnly
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="phone">
                                <Form.Label style={{ fontWeight: '500' }}>Số điện thoại</Form.Label>
                                <Form.Control style={{ marginBottom: '10px' }}
                                    type="text"
                                    name="SoDienThoai"
                                    value={userInformation.SoDienThoai}
                                    onChange={handleChange}
                                ></Form.Control>
                            </Form.Group>
                            {/* <Form.Group controlId="picture">
                                <Form.Label style={{ fontWeight: '500' }}>Ảnh đại diện</Form.Label>
                                <Form.Control
                                    type="file"
                                ></Form.Control>
                            </Form.Group> */}
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
                        {/* <Img src="layout.png" alt={userInformation.fName} /> */}
                    </Col>
                </Row>
            </div>
            <Password />
            <hr style={{marginLeft:'220px', marginRight:'170px'}}></hr>
            <div style={{ marginLeft: "205px" }}>
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