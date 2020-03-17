import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { ErrorMessage, Field } from 'formik';

import ImageUploader from '../../../forms/ImageUploader/ImageUploader'
import FormCheck from 'react-bootstrap/FormCheck';

const eventTabsInfo = (props) => {
    const { timezones, countries, eventTypes, form } = props;
   
    let eventTypeOptions = eventTypes.sort((a, b) => a.Value.localeCompare(b.Value)).map((eventType) =>
        <option key={eventType.Key} value={eventType.Key}>{eventType.Value}</option>
    );

    let countryOptions = countries.sort((a,b)=>a.Value.localeCompare(b.Value)).map((country) =>
        <option key={country.Key} value={country.Key}>{country.Value}</option>
    );

    let timezoneOptions = timezones.sort((a, b) => a.DisplayName.localeCompare(b.DisplayName)).map((time) =>
        <option key={time.Id} value={time.Id}>{time.DisplayName}</option>
    );
    return (
    
        <React.Fragment>

            <Form.Group as={Row} controlId="isActive">
                <Col>
                    <Form.Check                        
                        type="switch"
                        label="Active"
                        checked={form.values.IsActive}
                        {...form.getFieldProps('IsActive')}
                    />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="eventType">
                <Form.Label column md={2}>Event Type</Form.Label>
                <Col md={10}>
                    <Form.Control as="select" {...form.getFieldProps('EventTypeID')}>
                        {eventTypeOptions}
                    </Form.Control>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="description">
                <Form.Label column md={2}>Description</Form.Label>
                <Col md={10}>
                    <Form.Control type="text" placeholder="e.g. Mexico Grand Prix 2016" {...form.getFieldProps('Description')}
                        isInvalid={!!form.errors.Description} />
                    <ErrorMessage name="Description" component="span" className="validationMessage" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column md={2} htmlFor="countryID">Country</Form.Label>
                <Col md={4}>
                    <Form.Control as="select" id="countryID" {...form.getFieldProps('CountryID')}>
                        {countryOptions}
                    </Form.Control>
                </Col>
                <Form.Label column md={2} htmlFor="location">Location</Form.Label>
                <Col md={4}>
                    <Form.Control type="text" placeholder="e.g. Mexico City" id="location" {...form.getFieldProps('Location')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column md={2} htmlFor="latitude">Latitude</Form.Label>
                <Col md={4}>
                    <Form.Control placeholder="e.g. 19.404795" id="latitude" {...form.getFieldProps('Latitude')}
                        isInvalid={!!form.errors.Latitude} />
                    <ErrorMessage name="Latitude" component="span" className="validationMessage" />
                </Col>
                <Form.Label column md={2} htmlFor="longitude">Longitude</Form.Label>
                <Col md={4}>
                    <Form.Control placeholder="e.g. -99.088955" id="longitude" {...form.getFieldProps('Longitude')}
                        isInvalid={!!form.errors.Longitude} />
                    <ErrorMessage name="Longitude" component="span" className="validationMessage" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="timezone">
                <Form.Label column md={2}>Timezone</Form.Label>
                <Col md={10}>
                    <Form.Control as="select" value="12:00" {...form.getFieldProps('Timezone')} >
                        {timezoneOptions}
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column md={2} htmlFor="securityCode">Security Code</Form.Label>
                <Col md={4}>
                    <Form.Control placeholder="e.g. WMRMEX2016" id="securityCode"  {...form.getFieldProps('Securitycode')} />
                </Col>
                <Form.Label column md={2} htmlFor="darkMarket">Dark Market</Form.Label>
                <Col md={4}>
                    <FormCheck.Input isInvalid type="checkbox" className="position-relative ml-0 align-middle" id="isDarkMarket"  {...form.getFieldProps('IsDarkMarket')} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="image">
                <Form.Label column md={2}>Image</Form.Label>
                <Col md={10}>
                    <Field name="Image" component={ImageUploader} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="optionalImage">
                <Form.Label column md={2}>Optional Image</Form.Label>
                <Col md={10}>
                    <Field name="OptionalImage" component={ImageUploader} />
                </Col>
            </Form.Group>

        </React.Fragment>
    )
}

export default eventTabsInfo



