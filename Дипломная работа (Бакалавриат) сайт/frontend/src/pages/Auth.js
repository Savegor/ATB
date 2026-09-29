import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Некорректный email')
        .required('Обязательное поле'),
    password: Yup.string()
        .min(5, 'Минимум 5 символов')
        .required('Обязательное поле')
});

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const history = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: values => {
            try {
                let data;
                if (isLogin) {
                    data = login(values.email, values.password);
                } else {
                    data = registration(values.email, values.password);
                }
                user.setUser(user)
                user.setIsAuth(true)
                history(SHOP_ROUTE)
            } catch (e) {
                console.log(e)
            }
        },
    });
    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
                    <Form.Control
                        className="mt-3"
                        name="email"
                        placeholder="Введите ваш email..."
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        err
                    />
                    {formik.errors.email && (
                        <div className="error">{formik.errors.email}</div>
                    )}
                    <Form.Control
                        className="mt-3"
                        name="password"
                        placeholder="Введите ваш пароль..."
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        type="password"
                    />
                    {formik.errors.password && (
                        <div className="error">{formik.errors.password}</div>
                    )}
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            type='submit'
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});

export default Auth;