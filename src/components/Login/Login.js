import React, { useState } from 'react'
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import axios from 'axios';

const Login = (props) => {

    let history = useHistory();

    const [values, setValues] = useState({
        // username: '',
        email: '',
        password: '',
    });


    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     if (values.username !== "" && values.password !== "") {
    //         AuthService.login(values).then(response => {
    //             console.log(response.data);
    //             if (response.data.login === true) history.push('/home');
    //             else alert('Login fail')
    //         })
    //     }
    // }
    const handleLogin = (e) => {
        e.preventDefault();
        if (values.email !== "" && values.password !== "") {
            axios.post('http://localhost:3307/login', values)
                .then(response => {
                    console.log(response.data);
                    if (response.data.login === true) {
                        // Create a loginToken
                        // const loginToken = response.data.token;
                        // // Save the token to localStorage
                        // localStorage.setItem('loginToken', loginToken);
                        history.push('/home');
                    } else {
                        alert('Đăng nhập thất bại')
                    }
                })
                .catch(error => {   
                    console.error('Lỗi trong khi đăng nhập:', error);
                    alert('Tên tài khoản hoặc mật khẩu không đúng!');
                });
        }
    }
    return (<FormContainer>
        <CloseBtn>
            <Link to='/'>x</Link>
        </CloseBtn>
        <FormContentLeft>
            <FormImg src="layout.png" alt="study" />
        </FormContentLeft>
        <FormContentRight>
            <Form>
                <h1>Đăng nhập</h1>
                <FormInputs>
                    <FormLabel htmlFor='email'>
                        Email:
                    </FormLabel>
                    <FormInput
                        id='email'
                        type='text'
                        name='email'
                        placeholder='Nhập email'
                        onChange={handleChange}
                    />
                </FormInputs>
                <FormInputs>
                    <FormLabel htmlFor='password'>
                        Mật khẩu
                    </FormLabel>
                    <FormInput
                        id='password'
                        type='password'
                        name='password'
                        placeholder='Nhập mật khẩu'
                        onChange={handleChange}
                    />
                </FormInputs>
                <FormInputButton
                    onClick={handleLogin}
                >
                    Đăng nhập
                </FormInputButton>
                <FormInputLogin>
                    Bạn chưa có tài khoản? 
                    <Link to="/signup">Đăng ký</Link>
                </FormInputLogin>
            </Form>
        </FormContentRight>
    </FormContainer>
    )
}
const FormContentRight = styled.div`
    border-radius: 0 10px 10px 0;
    position: relative;
    background: #fff;
`;

const Form = styled.form`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & h1{
        font-size: 2rem;
        text-align: start;
        width: 80%;
        margin-bottom: 1rem;
        color: #000000;
    }
`;

const FormInputs = styled.div`
    margin-bottom: 0.5rem;
    width: 80%;

    & p {
        color: red;        
    }
`;

const FormLabel = styled.label`
display: inline-block;
font-size: 0.8rem;
margin-bottom: 6px;
color: #000000;
`;

const FormInput = styled.input`
padding-left: 10px;
outline: none;
border-radius: 2px;
height: 40px;
width: 100%;
border-top-style:none;
border-right-style:none;
border-left-style:none;
border-bottom-style: 2px solid black;
   
&:placeholder{
    color: #595959;
    font-size: 12px;
}
`;

const FormInputButton = styled.button`
width: 350px;
height: 40px;
margin-top: 10px;
border-radius: 32px;
background-color:#1C2A3A;
outline: none;
border: none;
color: #fff;
font-size: 1rem;

&:hover{
    cursor: pointer;
}`;

const FormInputLogin = styled.span`
font-size: 0.8rem;
margin-top: 10px;
color: #000000;
width: 80%;
text-align: center;

& a{
    text-decoration: none;
    color: #1C2A3A;
    font-weight: 600;
    cursor: pointer;
}
`;

const FormContainer = styled.div`
    margin: 4% auto;
    width: 1000px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 10px;
    height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
`
const CloseBtn = styled.div`
    position: absolute;
    top: 2%;
    right: 3%;
    font-size: 1.5rem;
    z-index: 1;
    color: #fff;
    cursor: pointer;
    & a {
        text-decoration: none;
    }
`

const FormContentLeft = styled.div`
    background-color: #1C2A3A;
  border-radius: 10px 0 0 10px;
  position: relative;
`

const FormImg = styled.img`
    width: 70%;
    height: 60%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Login
