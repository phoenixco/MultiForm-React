import * as React from 'react'
import { Button, TabContainer, TabContent, TabPane, Nav, NavItem} from 'react-bootstrap'
import axios from 'axios';
import { Formik, Form, Field} from 'formik';
import shortid from 'shortid';
import moment from 'moment'

import validationSchema from '../ValidationSchema'

import EventTabsInfo from '../../Form/Tabs/Info/Info'
import EventTabsKeyInfo from '../../Form/Tabs/KeyInfo/KeyInfo'
import EventTabsDirections from '../../Form/Tabs/Directions/Directions'
import EventTabsContacts from '../../Form/Tabs/Contacts/Contacts'
import EventTabsSchedule from '../../Form/Tabs/Schedule/Schedule'
import EventTabsCompetitions from '../../Form/Tabs/Competitions/Competitions'


// might need to split this out as we need to edit and create an Event... one gets an existing object from DB, both post to different URLs.
class EventTabs extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,            
            eventTypes: [],
            countries: [],
            timeZones: [],
            eventContacts: [],
            scheduleItemTypes: [],
            competitionTypes: [],
            errors: []
        }
    }

    async componentDidMount() {     
        this.setState({ isLoading: true });       

        const [resultEvent, resultCountries,
            resultTimeZones, resultEventTypes,
            scheduleItemTypes, eventContacts, competitionTypes] = await this.loadData();

        this.setState({
            event: this.formatData(resultEvent),
            countries: resultCountries,
            timeZones: resultTimeZones,
            eventTypes: resultEventTypes,
            scheduleItemTypes: scheduleItemTypes,
            eventContacts: eventContacts,
            competitionTypes: competitionTypes,
            isLoading: false
        });
        
    }

    formatData(event) {

        let scheduleItems = event.ScheduleItems.map((item) => {
            return {
                ...item,
                uniqueId: shortid.generate(),
                scheduleDate: moment.utc(item.Start).startOf('day').format('YYYY-MM-DDTHH:mm:ss')
            }
        })

        event.ScheduleItems = scheduleItems;

        return event;
    }

    loadData = async () => {

        const id = this.getURLIdParam();
        const promiseArray = [`/Events/GetCountries`, `/Events/GetTimeZones`, `/Events/GetEventTypes`, `/Events/GetScheduleItemTypes`, `/Events/GeteventContacts`, `/Events/GetCompetitionTypes`]
            .map(this.fetchLookupData);

        promiseArray.unshift(
            axios.get(
                `/Events/GetEvent`, {
                params: {
                    id: id
                }
            })
            .then(res => {return res.data})
            .catch(error => this.handleError(error))
        );

        return Promise.all(promiseArray);               
    }    

    getURLIdParam= () => {
        //find the last part of the URL
        var res = window.location.href.split("/").pop();
       
        return res;
    }

    fetchLookupData = async url => {
        const result = await axios.get(url,
            {
                responseType: 'json',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(res => { return res.data })
            .catch(error => this.handleError(error))

        return result;
    }

    handleError(error) {
        let errorMessages = [];

        switch (error.response.status) {
            case 400:
                const errors = JSON.parse(error.response.data);
                errorMessages = Object.values(errors);
                break
            default:
                errorMessages.push(error.message);
        }

        this.setState({ errors: errorMessages });
    }

    postDataHandler = (values) => {
        const event = values;

        axios.post('/Events/Edit', event, { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .then(response => {
                console.log(response);
                //todo: redirect url                
            })
            .catch(error => this.handleError(error))
    }
  
    render() {  
        
        return (
            <React.Fragment>               
                 {this.state.event &&
                    <Formik
                        enableReinitialize={true}
                        initialValues={this.state.event}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {                                
                                this.postDataHandler(values);                                                            
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {formik => (
                            <Form>
                                <TabContainer defaultActiveKey="eventInfo">
                                    <Nav fill variant="pills" className="flex-column flex-md-row mb-3">
                                        <NavItem>
                                            <Nav.Link eventKey="eventInfo" className="flex-md-fill">Event</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="keyInfo" className="flex-md-fill">Key Information</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="directions" className="flex-md-fill">Directions</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="contacts" className="flex-md-fill">Contacts</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="schedule" className="flex-md-fill">Schedule</Nav.Link>
                                        </NavItem>
                                        <NavItem>
                                            <Nav.Link eventKey="competitions" className="flex-md-fill">Competitions</Nav.Link>
                                        </NavItem>
                                    </Nav>

                                    <TabContent className="mb-3">
                                        <TabPane eventKey="eventInfo">
                                            <Field component={EventTabsInfo} eventTypes={this.state.eventTypes} countries={this.state.countries} timezones={this.state.timeZones}/>
                                        </TabPane>
                                        <TabPane eventKey="keyInfo">
                                            <Field component={EventTabsKeyInfo} />
                                        </TabPane>
                                        <TabPane eventKey="directions">
                                            <Field component={EventTabsDirections} />
                                        </TabPane>
                                        <TabPane eventKey="contacts">
                                            <Field component={EventTabsContacts} eventContacts={this.state.eventContacts} />
                                        </TabPane>
                                        <TabPane eventKey="schedule">
                                            <Field component={EventTabsSchedule} scheduleItemTypes={this.state.scheduleItemTypes} />
                                        </TabPane>
                                    <TabPane eventKey="competitions">
                                        <Field component={EventTabsCompetitions} competitionTypes={this.state.competitionTypes}/>
                                        </TabPane>
                                    </TabContent>

                                </TabContainer>

                            <Button variant="primary" type="submit" >Submit</Button>                            
                            </Form>
                        )}
                    </Formik>
                }

                    {(this.state.errors || []).map(error => {
                        return (
                            <div className="validationMessage">{error }</div>
                             )
                    })}
                    
            </React.Fragment>
        )
    }
}

export default EventTabs;