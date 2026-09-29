import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row, Form } from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import { useLocation, useParams } from 'react-router-dom'
import { createComments, fetchComments, fetchOneDevice } from "../http/deviceAPI";
import DOMPurify from 'dompurify';

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] })
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const { id } = useParams()
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const text = query.get('text')
    const deviceId = query.get('deviceId')
    console.log(text, deviceId)
    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
        fetchComments(id).then(data => setComments(data.rows))
    }, [])
    const click = async () => {
        let data
        try {
            data = await createComments(id, newComment)
            // data = await createComments(deviceId, text)
            setNewComment("")
            fetchComments(id).then(d => setComments(d.rows))
            } catch (e) {
                console.log(e)
            }
        }
        const maliciousInput = '<script>alert("XSS")</script>';
        const userLink = "javascript:alert(1)";

    const userEventHTML = DOMPurify.sanitize("<a href='javascript:alert(1)'>Click</a>", { USE_PROFILES: { html: true } });
    const userInput = '<img src=x onerror=alert("XSS")>';
    // const userEvent = "<script>alert('XSS')</script>"
    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 240, height: 240, backgroundSize: 'cover', fontSize: 64 }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{ width: 300, height: 300, fontSize: 32, border: '5px solid lightgray' }}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                )}
                <a href={userLink}>Click me</a>
                {/* {document.write(userInput)}  */}
                {/* <div style={userStyle}>1</div> */}
                {/* <button onClick={() => eval(userEvent)}>Run</button> */}
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Комментарии</h1>
                <Form className="d-flex flex-column">
                    <div className='d-flex'>
                        <Form.Control
                            className="mt-3"
                            placeholder="комментарий..."
                            value={newComment}
                            onChange={e => setNewComment(e.target.value)}
                            type="text"
                        />
                        <Button className='mx-1'
                            variant={"outline-success"}
                            onClick={click}
                        >
                            Отправить
                        </Button>
                    </div>
                </Form>
                <hr></hr>
                {comments.map((i, index) =>
                    <Row key={i.id} style={{ background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10 }}>
                        {i.text}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;