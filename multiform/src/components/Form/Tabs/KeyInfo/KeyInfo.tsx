import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


import ImageUploader from '../../../forms/ImageUploader/ImageUploader'
import { Field } from 'formik'

const eventTabsKeyInfo = (props) => {
    const { form } = props;

    return (
        <React.Fragment>
            <Form.Group as={Row} controlId="generalInformation">
                <Form.Label column md={2}>Information</Form.Label>
                <Col md={10}>
                    <Form.Control as="textarea" rows="10" {...form.getFieldProps('GeneralInformation')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="entertainmentInformation">
                <Form.Label column md={2}>Entertainment Info</Form.Label>
                <Col md={10}>
                    <Form.Control as="textarea" rows="10" {...form.getFieldProps('EntertainmentInformation')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="keyInfoImage">
                <Form.Label column md={2}>Image</Form.Label>
                <Col md={10}>
                    <Field name="KeyInfoImage" component={ImageUploader} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column md={2} htmlFor="wifiName">Wifi Name</Form.Label>
                <Col md={4}>
                    <Form.Control id="wifiName" {...form.getFieldProps('WifiName')} />
                </Col>
                <Form.Label column md={2} htmlFor="wifiPassword">Wifi Password</Form.Label>
                <Col md={4}>
                    <Form.Control id="wifiPassword" {...form.getFieldProps('WifiPassword')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column md={2} htmlFor="openingTimes">Opening Times</Form.Label>
                <Col md={4}>
                    <Form.Control id="openingTimes" placeholder="e.g. 08:00 - 17:00" {...form.getFieldProps('OpeningTimes')} />
                </Col>
                <Form.Label column md={2} htmlFor="socialTag">Social Tag</Form.Label>
                <Col md={4}>
                    <Form.Control id="socialTag" placeholder="e.g. #WILLIAMSVIP" {...form.getFieldProps('SocialTag')} />
                </Col>
            </Form.Group>
        </React.Fragment>
    )
}

export default eventTabsKeyInfo



