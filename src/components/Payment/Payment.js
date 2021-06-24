import React, { useState } from 'react';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';

const Payment = () => {
    const defaultPaymentData = {
        nameOnCard: '',
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    }
    const [paymentData, setPaymentData] = useState(defaultPaymentData);
    const [errors, setErrors] = useState({
        nameOnCard: null,
        cardNumber: null,
        expiryDate: null,
        cvv: null
    })
    const handlePaymentSubmit = event => {
        event.preventDefault();
        const newErrors = findFormErrors();
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors);
        } else {
            console.log(paymentData);
            // Make the API call to backend here.
            setPaymentData(defaultPaymentData);
        }
    }
    const handleChange = event => {
        setPaymentData({ ...paymentData, [event.target.name]: event.target.value });
        if (!!errors[event.target.name]) setErrors({ ...errors, [event.target.name]: null });
    }
    const findFormErrors = () => {
        const { nameOnCard, cardNumber, expiryDate, cvv } = paymentData;
        const newErrors = {};
        // name errors
        if (!nameOnCard || nameOnCard === '') newErrors.nameOnCard = 'Cannot be blank!';
        // Card number errors
        if (!cardNumber || cardNumber === '') newErrors.cardNumber = 'Cannot be blank!';
        // Expiry date errors
        if (!expiryDate || expiryDate === '') newErrors.expiryDate = 'Cannot be blank!';
        // CVV errors
        if (!cvv || cvv === '') newErrors.cvv = 'Cannot be blank!';

        return newErrors;
    }
    const { nameOnCard, cardNumber, expiryDate, cvv } = paymentData;
    return (
        <>
            <br />
            <Container>
                <Row>
                    <Col md={{ span: 7, offset: 3 }}>
                        <Jumbotron>
                            <h2 style={{ textAlign: 'center' }}>Payment Information</h2>
                            <hr />
                            <Form onSubmit={handlePaymentSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Name on Card</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name='nameOnCard'
                                            value={nameOnCard}
                                            placeholder="Enter your name"
                                            isInvalid={!!errors.nameOnCard}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.nameOnCard}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Card Number</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name='cardNumber'
                                            value={cardNumber}
                                            placeholder="Enter Card Number"
                                            isInvalid={!!errors.cardNumber}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.cardNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>Expiry Date</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name='expiryDate'
                                            value={expiryDate}
                                            placeholder="MM/YY"
                                            isInvalid={!!errors.expiryDate}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.expiryDate}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>CVV</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name='cvv'
                                            value={cvv}
                                            placeholder="CVV"
                                            isInvalid={!!errors.cvv}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.cvv}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="primary" type="submit" size='lg' block>
                                    Proceed for payment
                                        </Button>
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Payment
