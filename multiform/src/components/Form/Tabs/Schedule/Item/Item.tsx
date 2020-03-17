import * as React from 'react'
import { Button, Form, Col, ListGroup } from 'react-bootstrap'
import { ErrorMessage, Field, getIn } from 'formik'
import moment from 'moment'
import MomentDateTimePicker from '../../../../forms/MomentDateTimePicker/MomentDateTimePicker'

const scheduleItem = (props) => {
    const { field, form, scheduleItemTypes, deleteItem } = props;

    let scheduleItemTypeOptions = scheduleItemTypes
        .sort((a, b) => a.Value.localeCompare(b.Value))
        .map((type) =>
            <option key={type.Key} value={type.Key}>{type.Value}</option>
    );

    return (
        <React.Fragment>          
            <ListGroup.Item className="row-striped">
                <Form.Row>
                    <Form.Group controlId={`${field.name}.Name`} as={Col} md={4}>
                        <Form.Label>Name</Form.Label>
                        <Form.Control {...form.getFieldProps(`${field.name}.Name`)} value={field.value.Name || ''}
                            isInvalid={!!getIn(form.errors, `${field.name}.Name`)}
                            />
                        <ErrorMessage name={`${field.name}.Name`} component="span" className="validationMessage" />
                    </Form.Group>

                    <Form.Group controlId={`${field.name}.Description`} as={Col} md={8}>
                        <Form.Label>Description</Form.Label>
                        <Form.Control {...form.getFieldProps(`${field.name}.Description`)} value={field.value.Description || ''} />
                    </Form.Group>

                    <Form.Group controlId={`${field.name}.Start`} as={Col} md={2}>
                        <Form.Label>Start Time</Form.Label>
                        <Field
                            name={`${field.name}.Start`}
                            value={field.value.Start}
                            format="hh:mm A"
                            time={true}
                            date={false}
                            defaultCurrentDate={moment(field.value.date).toDate()}
                            component={MomentDateTimePicker}
                            containerClassName={!!getIn(form.errors, `${field.name}.Start`) ? 'is-invalid' : null}
                        />
                        <ErrorMessage name={`${field.name}.Start`} component="span" className="validationMessage" />
                    </Form.Group>

                    <Form.Group controlId={`${field.name}.End`} as={Col} md={2}>
                        <Form.Label>End Time</Form.Label>
                        <Field
                            name={`${field.name}.End`}
                            value={field.value.End}
                            format="hh:mm A"
                            time={true}
                            date={false}
                            defaultCurrentDate={moment(field.value.date).toDate()}
                            component={MomentDateTimePicker}
                            containerClassName={!!getIn(form.errors, `${field.name}.End`) ? 'is-invalid' : null}
                        />
                        <ErrorMessage name={`${field.name}.End`} component="span" className="validationMessage" />
                    </Form.Group>

                    <Form.Group controlId={`${field.name}.ScheduleItemTypeID`} as={Col} md={2}>
                        <Form.Label>Type</Form.Label>
                        <Form.Control as="select" {...form.getFieldProps(`${field.name}.ScheduleItemTypeID`)}>
                            {scheduleItemTypeOptions}
                        </Form.Control>
                    </Form.Group>
                                                    
                    <Form.Group controlId={`${field.name}.Location`} as={Col} md={5}>
                        <Form.Label>Location</Form.Label>
                        <Form.Control {...form.getFieldProps(`${field.name}.Location`)} value={field.value.Location || ''} />
                    </Form.Group>

                    <Form.Group as={Col} md={1} className="align-items-end d-flex flex-row-reverse">
                        <Button variant="primary" className="btn-sm" type="button" onClick={deleteItem}>Delete</Button>
                    </Form.Group>
                </Form.Row>
            </ListGroup.Item>                   
        </React.Fragment>     
    )
}

export default scheduleItem



