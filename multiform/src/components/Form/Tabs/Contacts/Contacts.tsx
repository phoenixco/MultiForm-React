import * as React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import { FieldArray } from 'formik'
import { ListGroup } from 'react-bootstrap'



const eventTabsContacts = (props) => {
    const { eventContacts, form } = props;
   
    return (
        <React.Fragment>     
            <Form.Group as={Row}>         
                <Col>
                    <ListGroup>  
                    <FieldArray
                        name="SelectedContacts"
                        render={arrayHelpers => (
                            <div>
                                {eventContacts.map(contact => (
                                    <ListGroup.Item key={contact.ID}>
                                        <Form.Check
                                            name="SelectedContacts"
                                            type="checkbox"
                                            value={contact.ID}
                                            checked={form.values.SelectedContacts.includes(contact.ID)}
                                            onChange={e => {
                                                if (e.target.checked) arrayHelpers.push(contact.ID);
                                                else {
                                                    const idx = form.values.SelectedContacts.indexOf(contact.ID);
                                                    arrayHelpers.remove(idx);
                                                }
                                            }}
                                            label={contact.Forename + " " + contact.Surname}
                                        />
                                    </ListGroup.Item>
                                ))}
                            </div>
                        )}
                        />    
                    </ListGroup>   
                </Col>
            </Form.Group>               
        </React.Fragment>
    )
}

export default eventTabsContacts



