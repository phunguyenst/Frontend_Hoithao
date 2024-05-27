import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const FormSuccess = () => {
    return (
        <FormContentRight>
            <FormSuccessStyle>
                Đăng ký thành công !!!!
            </FormSuccessStyle>
            <Link to ='/'>
                <FormInputButton>
                    Quay lại trang đăng nhập
                </FormInputButton>
                </Link>
        </FormContentRight>
    )
}


const FormContentRight = styled.div`
border-radius: 0 10px 10px 0;
position: relative;
background: #fff;
`;

const FormSuccessStyle = styled.div`
text-align: center;
font-size: 24px;
margin-top: 80px;
color: #000000;
`

const FormInputButton = styled.button`
width: 350px;
height: 40px;
margin-left: 80px;
margin-top: 100px;
border-radius: 32px;
background-color:#1C2A3A;
outline: none;
border: none;
color: #fff;
font-size: 1rem;


&:hover{
    cursor: pointer}
`;
export default FormSuccess
