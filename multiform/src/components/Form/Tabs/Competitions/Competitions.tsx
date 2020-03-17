import * as React from 'react'
import { Button, Form, Col, Row, Card, ListGroup, InputGroup } from 'react-bootstrap'
import moment from 'moment'
import { Field, FieldArray, ErrorMessage, getIn } from 'formik';
import MomentDateTimePicker from '../../../forms/MomentDateTimePicker/MomentDateTimePicker';



class EventTabsCompetitions extends React.Component<any, any> {

    constructor(props) {
        super(props);
        const defaultCompetitionType = this.props.competitionTypes[0];
        this.state = {
            templateName: defaultCompetitionType.name,
            templateID: defaultCompetitionType.value,
        }
    }


    handleSelectChange = (event) => {

        var select = event.target;
        var optionsText = select.options[select.selectedIndex].text;

        this.setState({
            templateID: select.value,
            templateName: optionsText
        })
    }


    render() {
        const { form, competitionTypes } = this.props;
        
        return (
            <React.Fragment>
                <FieldArray
                    name="Competitions"
                    render={arrayHelpers => (
                        <div>
                            <InputGroup className="mb-3">
                                <Form.Control as="select" onClick={() => this.handleSelectChange(event)}>

                                    {competitionTypes.sort((a, b) => a.Value.localeCompare(b.Value)).map((type) =>
                                        <option key={type.Key} value={type.Key}>{type.Value}</option>)
                                    }

                                </Form.Control>
                                <InputGroup.Append>
                                    <Button variant="primary" type="button" onClick={() => arrayHelpers.push({
                                        TemplateID: this.state.templateID,
                                        ID: '00000000-0000-0000-0000-000000000000',
                                        Name: this.state.templateName,
                                        StartTime: moment().set({ second: 0, millisecond: 0 }).add(5, 'minutes').format('YYYY-MM-DDTHH:mm:ss'),
                                        EndTime: null,
                                        Status: 0
                                    })}>Add Competition</Button>

                                </InputGroup.Append>
                            </InputGroup>

                            <ListGroup>
                                <div>
                                    {Object.keys(form.values.Competitions).map((competition, index) => {
                                        var competitionItem = form.values.Competitions[index];
                                        return (                                           
                                                <Card key={index} className="mb-4">
                                                    <Card.Header >
                                                        <Card.Title className="clearfix d-md-flex" as="h4">
                                                            <span className="d-block d-md-inline mr-md-auto mb-2 mb-md-0">{competitionItem.Name}</span>
                                                        </Card.Title>
                                                    </Card.Header>
                                                    {competitionItem.Status == 0 &&
                                                    <Card.Body>                                                       
                                                        <Form.Group as={Row} className="d-md-flex">
                                                                <label className="col-form-label col-md-2 mt-3" >Start Time:</label>

                                                                <Col md={4} className="mt-3 ">
                                                                    <Field
                                                                        name={`Competitions[${index}].StartTime`}
                                                                        value={competitionItem.StartTime}
                                                                        format="lll"
                                                                        time={true}
                                                                        date={true}
                                                                        component={MomentDateTimePicker}
                                                                        containerClassName={!!getIn(form.errors, `Competitions[${index}].StartTime`) ? 'is-invalid' : null}
                                                                    />
                                                                    <ErrorMessage name={`Competitions[${index}].StartTime`} component="span" className="validationMessage" />
                                                                </Col>

                                                                <label className="col-form-label col-md-2 mt-3" >End Time:</label>
                                                                <Col md={4} className="mt-3 ">
                                                                    <Field
                                                                        name={`Competitions[${index}].EndTime`}
                                                                        value={competitionItem.EndTime}
                                                                        format="lll"
                                                                        time={true}
                                                                        date={true}
                                                                        component={MomentDateTimePicker}
                                                                        containerClassName={!!getIn(form.errors, `Competitions[${index}].EndTime`) ? 'is-invalid' : null}
                                                                    />
                                                                    <ErrorMessage name={`Competitions[${index}].EndTime`} component="span" className="validationMessage" />
                                                                </Col>
                                                            </Form.Group>                                                        
                                                    </Card.Body>
                                                    }

                                                <Card.Footer className="clearfix d-md-flex">                                                      

                                                            {competitionItem.Status !== 0 &&
                                                                <span className="d-block d-md-inline mr-md-auto mb-2 mb-md-0"> End Time: {moment.utc(competitionItem.EndTime).format('dddd Do MMMM YYYY')} </span>
                                                            }
                                                            {competitionItem.Status == 0 &&
                                                                <Button variant="primary" className="btn-sm ml-md-auto" type="button" onClick={() => arrayHelpers.remove(index)}>Delete</Button>
                                                            }

                                                            {competitionItem.Status == 2 &&
                                                                <Button href={`/Competition/GenerateWinner/${competitionItem.ID}`} variant="primary" className="btn btn-primary btn-sm">Generate Winners</Button>
                                                            }                                                    

                                                </Card.Footer>
                                                </Card>
                                      )
                                    })}
                                </div>

                            </ListGroup>
                        </div>
                    )}
                />
            </React.Fragment>
        )
    }
}
export default EventTabsCompetitions



