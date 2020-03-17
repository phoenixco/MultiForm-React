import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


import ImageUploader from '../../../forms/ImageUploader/ImageUploader'
import { Field } from 'formik'

const eventTabsDirections = (props) => {
    const { form } = props;

    return (
        <React.Fragment>
            <Form.Group as={Row} controlId="directionsForCar">
                <Form.Label column md={2}>Car Directions</Form.Label>
                <Col md={10}>
                    <Form.Control as="textarea" rows="10" {...form.getFieldProps('DirectionsForCar')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="directionsForPublicTransport">
                <Form.Label column md={2}>Public Transport Directions</Form.Label>
                <Col md={10}>
                    <Form.Control as="textarea" rows="10" {...form.getFieldProps('DirectionsForPublicTransport')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="directionsImage">
                <Form.Label column md={2}>Directions Image</Form.Label>
                <Col md={10}>
                    <Field name="DirectionsImage" component={ImageUploader} />
                </Col>
            </Form.Group>
        </React.Fragment>
    )
}

export default eventTabsDirections



