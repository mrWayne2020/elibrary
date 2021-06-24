import React, { useState, useEffect } from 'react';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { useLocation, useHistory } from 'react-router-dom';


const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Membership = () => {
    const history = useHistory();
    const membershipPlan = useQuery().get('plan');
    const membershipService = useQuery().get('service');
    const deafultFormData = {
        firstName: '',
        lastName: '',
        gender: '',
        phone: '',
        email: '',
        password: '',
        address: '',
        city: '',
        pincode: '',
    }
    const [formState, setFormState] = useState(deafultFormData);
    const [newMembershipData, setNewMembershipData] = useState({
        plan: '',
        printable: false,
        readable: false,
    })
    const [errors, setErrors] = useState({
        firstName: null,
        lastName: null,
        gender: null,
        phone: null,
        email: null,
        password: null,
        address: null,
        city: null,
        pincode: null
    });
    const handleNewMembershipSubmit = e => {
        e.preventDefault();
        let errorString = '';
        errorString = (!newMembershipData.printable && !newMembershipData.readable) ? errorString += 'Please choose any one of the service!' : errorString;
        errorString = (newMembershipData.plan === '') ? errorString += '\nPlease choose a plan!' : errorString;
        if (errorString !== '') alert(errorString);
        // Forward to membership details page
        else {
            let services = '';
            if (newMembershipData.printable && newMembershipData.readable) services = 'readable-printable';
            else {
                if (newMembershipData.printable) services = 'printable';
                else if (newMembershipData.readable) services = 'readable';
            }
            history.push(`/membership?plan=${newMembershipData.plan}&service=${services}`);
        }
    }
    const handleMembershipDetailsSubmit = (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        // Conditional logic:
        if ((Object.keys(newErrors).length > 0) || formState.gender === ''){
            // We got errors!
            setErrors(newErrors);
            if (formState.gender === '') alert('Please select your gender!')
        } else {
            console.log(formState);
            // Make the API call to backend here.
            setFormState(deafultFormData);
        }
    }
    const handleChange = event => {
        setFormState({...formState, [event.target.name]: event.target.value});
        if (!!errors[event.target.name]) setErrors({...errors, [event.target.name]: null});
    }
    const changeService = event => {
        setNewMembershipData({ ...newMembershipData, [event.target.name]: event.target.checked });
    }
    const handleSelectPlan = (event) => {
        setNewMembershipData({ ...newMembershipData, plan: event });
    }
    const findFormErrors = () => {
        const { firstName, lastName, phone, email, gender, password, address, city, pincode } = formState;
        const newErrors = {};
        // first name errors
        if (!firstName || firstName === '') newErrors.firstName = 'Cannot be blank!';
        else if (firstName.length > 30) newErrors.firstName = 'First name is too long!';
        // last name errors
        if (!lastName || lastName === '') newErrors.lastName = 'Cannot be blank!';
        else if (lastName.length > 30) newErrors.lastName = 'Last name is too long!';
        // gender errors
        if(!gender || gender === '') newErrors.gender = 'Gender cannot be blank'
        // phone number errors
        var isValidPhone = /^(1\s|1|)?((\(\d{3}\))|\d{3})(|\s)?(\d{3})(|\s)?(\d{4})$/.test(phone);
        if (!isValidPhone) newErrors.phone = 'Enter a valid phone number!';
        // Email errors
        var isValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
        if (!isValidEmail) newErrors.email = 'Enter a valid email ID!'
        // password errors
        var isValidPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
        if (!isValidPassword) newErrors.password = 'Cannot be blank or at least have 1 special character!'
        else if (password.length > 18) newErrors.password = 'Password is too long!'
        // address errors
        if (!address || address === '') newErrors.address = 'Cannot be blank!';
        else if (address.length > 150) newErrors.address = 'Address is too long!';
        // pincode errors
        var isValidPincode = /^(\d{4}|\d{6})$/.test(pincode);
        if(!isValidPincode) newErrors.pincode = 'Enter a valid pincode!';
        // city errors
        if(!city || city === '' ||city.length > 50) newErrors.city = 'Enter a valid city name!';

        return newErrors;
    }
    const { firstName, lastName, phone, email, password, address, city, pincode } = formState;
    const { readable, printable } = newMembershipData;
    const doesParamsExist = (plan, service) => plan !== null && service !== null; 

    useEffect(() => {
        if (membershipPlan !== null && membershipService !== null) {
            let services = [];
            services = membershipService.includes('-') ? membershipService.split('-') : [membershipService];
            setFormState({
                ...formState,
                plan: membershipPlan,
                services: services
            })
        }
    }, [membershipPlan, membershipService])

    const newMembership = (
        <>
            <br />
            <Container>
                <Row>
                    <Col md={{ span: 7, offset: 3 }}>
                        <Jumbotron>
                            <h2 style={{ textAlign: 'center' }}>New Membership</h2>
                            <hr />
                            <Form onSubmit={handleNewMembershipSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} className='d-flex justify-content-around align-items-center'>
                                        <h6>Select a Plan</h6>
                                        <DropdownButton
                                            title={newMembershipData.plan}
                                            id="dropdown-select-plan"
                                            onSelect={handleSelectPlan}
                                        >
                                            <Dropdown.Item eventKey="individual">Individual</Dropdown.Item>
                                            <Dropdown.Item eventKey="organisational">Organisational</Dropdown.Item>
                                            <Dropdown.Item eventKey="annual">Annual</Dropdown.Item>
                                        </DropdownButton>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}
                                        className="d-flex justify-content-around">
                                        <Form.Label><h6>Service</h6></Form.Label>
                                        <Form.Check
                                            type="checkbox"
                                            name='readable'
                                            checked={readable}
                                            label='Readable'
                                            onChange={changeService}
                                        />
                                        <Form.Check
                                            type="checkbox"
                                            name='printable'
                                            checked={printable}
                                            label='Printable'
                                            onChange={changeService}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="primary" type="submit" size='lg' block>
                                    Apply for membership
                                        </Button>
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </>
    )

    const membershipDetails = (
        <div>
            <br />
            <Container>
                <Row>
                    <Col md={{ span: 7, offset: 3 }}>
                        <Jumbotron>
                            <h2 style={{ textAlign: 'center' }}>Membership Details</h2>
                            <hr />
                            <Form onSubmit={handleMembershipDetailsSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name='firstName'
                                            value={firstName}
                                            placeholder="First Name"
                                            isInvalid={!!errors.firstName}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="input"
                                            name='lastName'
                                            value={lastName}
                                            placeholder="Last Name"
                                            isInvalid={!!errors.lastName}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Col}
                                        className="d-flex justify-content-between">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Check
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            value='male'
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            value="female"
                                            label="Female"
                                            name="gender"
                                            onChange={handleChange}
                                        />
                                        <Form.Check
                                            type="radio"
                                            label="Other"
                                            name="gender"
                                            value='other'
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.gender}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label>
                                        Email
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='email'
                                        value={email}
                                        placeholder='Enter your email ID'
                                        isInvalid={!!errors.email}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name='password'
                                        value={password}
                                        placeholder='Enter your password'
                                        isInvalid={!!errors.password}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            Pincode
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name='pincode'
                                            value={pincode}
                                            placeholder='Enter your pincode'
                                            isInvalid={!!errors.pincode}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.pincode}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col}>
                                        <Form.Label>
                                            City
                                    </Form.Label>
                                        <Form.Control
                                            type="text"
                                            name='city'
                                            value={city}
                                            placeholder='Enter your city'
                                            isInvalid={!!errors.city}
                                            onChange={handleChange}
                                        />
                                        <Form.Control.Feedback type='invalid'>
                                            {errors.city}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label>
                                        Phone Number
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name='phone'
                                        value={phone}
                                        placeholder='Enter your phone number'
                                        isInvalid={!!errors.phone}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>
                                        Address
                                    </Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        name='address'
                                        value={address}
                                        isInvalid={!!errors.address}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback type='invalid'>
                                        {errors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button variant="primary" type="submit" size='lg' block>
                                    Submit
                                </Button>
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        </div>
    )

    return (
        <>
            { !doesParamsExist(membershipPlan, membershipService) ? newMembership : membershipDetails}
        </>
    )
}

export default Membership
