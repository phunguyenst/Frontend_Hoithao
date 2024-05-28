import React, { useState } from 'react'
import styled from 'styled-components';
import { Row, Col, Button, Form } from 'react-bootstrap';
import AccountService from '../../services/account.service';
import axios from 'axios';

const SubHeading = styled.h2`
    padding:20px auto;
    margin-left:225px; 
    margin-top:100px;
    font-size: 30px;
    font-weight: 500;
`

const Password = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            console.log("Passwords do not match");
            alert("Mật khẩu không khớp");
            return;
        }

        const email = localStorage.getItem('authEmail');

        axios.post('http://localhost:3307/api/taikhoan/changePasswordWithEmail', {
            email: email,
            newPassword: newPassword
        })
        .then(response => {
            console.log(response.data)
            alert("Đổi mật khẩu thành công");
        })
        .catch(error => console.log(error));
    }

    return (
        <>
            <SubHeading>Thay đổi mật khẩu</SubHeading>
            <hr style={{ marginLeft: '220px', marginRight: '170px' }}></hr>
            <div style={{ marginLeft: "225px" }}>
                <Row style={{
                    display: 'flex',
                }}>
                    <Col md={6}>
                        <Form>
                            <Form.Group>

                            </Form.Group><Form.Group controlId="newPassword">
                                <Form.Label style={{ fontWeight: '500' }}>Mật khẩu mới</Form.Label>

                                <Form.Control style={{ marginBottom: '10px' }}
                                    type="password"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                ></Form.Control>

                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label style={{ fontWeight: '500' }}>Xác nhận mật khẩu</Form.Label>

                                <Form.Control
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Form.Control>

                            </Form.Group>
                            <Button type="submit" varient="primary" style={{ marginTop: '20px', backgroundColor: '#2da44e' }}
                                onClick={handleSubmit}
                            >
                                Cập nhật
                            </Button>
                        </Form>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Password;