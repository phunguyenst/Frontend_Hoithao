import React, { useState} from 'react'
import FormSignup from './FormSignup'
import FormSuccess from './FormSuccess';
// import FormUnsuccess from './FormUnsuccess';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Form() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    function submitForm() {
        setIsSubmitted(true);
    }

    return (
        <FormContainer>
            <CloseBtn>
                <Link to='/'>x</Link>
            </CloseBtn>
            <FormContentLeft>
                <FormImg src="layout.png" alt="study"/>
            </FormContentLeft>
            {!isSubmitted ? (<FormSignup submitForm={submitForm}/>) : (<FormSuccess/>)}
        </FormContainer>
    )
}

const FormContainer = styled.div`
    margin: 4% auto;
    width: 1000px;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.2);
    position: relative;
    border-radius: 10px;
    height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow:hidden;
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
export default Form
