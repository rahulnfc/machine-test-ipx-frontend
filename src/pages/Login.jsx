import InputField from '../components/InputField';
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import Cookies from 'universal-cookie';
const cookies = new Cookies()
const server = "http://localhost:3001"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 30rem;
    padding: 1rem;
    border-radius: 10px;
    background-color: teal;
`;

const CardHeader = styled.div`
    font-size: 1.5rem;
    font-weight: bolder;
    margin-bottom: 1rem;
`;

const Submit = styled.button`
    width: 8rem;
    height: 2rem;
    border-radius: 10px;
    margin-left: 11rem;
    background-color: white;
    border: none;
    color: black;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
    &:hover {
        background-color: #008065;
        color: white;
        border: 1px solid #008065;
        box-shadow: 0px 0px 10px #000000;
    }
`;

const LogoText = styled.p`
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const Error = styled.p`
    color: red;
    font-size: 0.8rem;
    margin-top: 0.5rem;
`;

const LinkText = styled(Link)`
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: bold;
    color: teal;
    margin-top: 1rem;
    color: #008065;
`;

const Login = () => {
    const history = useHistory()
    useEffect(() => {
        const token = cookies.get('userjwt')
        console.log(token)
        if (token) {
            history.push('/')
        }
    })

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setpasswordError] = useState(false)

    const validate = Yup.object({
        email: Yup.string()
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: ''
            }}
            validationSchema={validate}
            onSubmit={(values => {
                setEmailError(false)
                setpasswordError(false)
                const data = {
                    email: values.email,
                    password: values.password
                }
                axios.post(`${server}/api/auth/login`, data)
                    .then(res => {
                        // success and store the token to cookies
                        cookies.set('userjwt', res.data.token)
                        localStorage.setItem('userId', res.data.userId)
                        localStorage.setItem('isAuthenticated', true)
                        history.push('/')
                    }).catch((error) => {
                        const response = error.response.data
                        console.log(response);
                        if (response.invalidEmail) {
                            // email error
                            setEmailError(true)
                        } else if (response.invalidPassword) {
                            // password error
                            setpasswordError(true)
                        }
                    })
            })}
        >
            {formik => (
                <Container>
                    <LogoText> TrendZStation. </LogoText>
                    <Form>
                        <Card>
                            <CardHeader> Login And Enjoy Shopping </CardHeader>
                            <InputField
                                label="Email"
                                id="email"
                                type="text"
                                name="email"
                                placeholder="Enter your email"
                            />
                            {emailError && <Error>Invalid Email Address</Error>}
                            <InputField
                                label="Password"
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                            />
                            {passwordError && <Error>Invalid Password</Error>}
                            <Submit type="submit">Login</Submit>
                        </Card>
                    </Form>
                    <LinkText to="/register"> Don't have an account? Register here </LinkText>
                </Container>
            )}
        </Formik>
    )
}

export default Login
