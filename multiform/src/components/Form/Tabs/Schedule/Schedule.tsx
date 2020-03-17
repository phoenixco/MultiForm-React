import * as React from 'react'
import { Button, Alert, Form, Col, Row, Card, ListGroup } from 'react-bootstrap'
import shortid from 'shortid'
import { Field } from 'formik'
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import ScheduleItem from './Item/Item';
import './Schedule.scss';
import 'react-widgets/dist/css/react-widgets.css';

momentLocalizer();

const eventTabsSchedule = (props) => {
    const { form, scheduleItemTypes } = props;

    // group the schedule items into schedules by schedule date
    const schedules = form.values.ScheduleItems && form.values.ScheduleItems.length > 0 ?
        form.values.ScheduleItems.reduce((accumulator, scheduleItem) => {
            accumulator[scheduleItem.scheduleDate] = [...accumulator[scheduleItem.scheduleDate] || [], scheduleItem];
            return accumulator;
        }, {}) : [];

    // add a new schedule item for the specified date
    const addScheduleItem = (date) => {

        const newScheduleItem = {
            ID: 0,
            ScheduleItemTypeID: 1,
            Start: date,
            End: null,
            Name: "",
            Description: "",
            Location: "",
            uniqueId: shortid.generate(),
            scheduleDate: date,
        };

        form.values.ScheduleItems.push(newScheduleItem);
        form.setValues(form.values);
    };

    // delete the schedule item with matching uniqueId
    const deleteScheduleItem = (uniqueId) => {

        // find the schedule item with matching uniqueId
        const itemIndex = getFormikIndex(uniqueId);

        form.values.ScheduleItems.splice(itemIndex, 1);
        form.setValues(form.values);
    };

    // add a new schedule
    const addSchedule = () => {

        // get the max age from the persons array, or current date if none exist
        const newDate = form.values.ScheduleItems && form.values.ScheduleItems.length > 0 ?
            moment(Math.max(...form.values.ScheduleItems.map(item => new Date(item.Start))))
            : moment();

        // create a new item for the following day after newDate
        const formattedDate = newDate.startOf('day').add(1, 'd').format('YYYY-MM-DDTHH:mm:ss')
        
        addScheduleItem(formattedDate);
    };

    // delete all the schedule items on a specific date
    const deleteSchedule = (scheduleDate) => {

        // filter out items with matching date
        const scheduleItems = form.values.ScheduleItems.filter(scheduleItem => !moment(scheduleItem.scheduleDate).isSame(scheduleDate, 'day'));

        form.values.ScheduleItems = scheduleItems;
        form.setValues(form.values);
    };

    // find the array index for the Schedule Item with matching uniqueId
    const getFormikIndex = (uniqueId) => {
        const itemIndex = form.values.ScheduleItems.findIndex(i => {
            return i.uniqueId === uniqueId;
        });

        return itemIndex;
    }

    // change the schedule date and update all of its items 
    const changeScheduleDate = (originalScheduleDate, newDate) => {

        if (newDate && moment(newDate).isValid()) {

            // get all the schedule items matching the original date
            const scheduleItems = form.values.ScheduleItems.filter(scheduleItem => moment(scheduleItem.scheduleDate).isSame(moment(originalScheduleDate), 'day'));

            const newMoment = moment(newDate);
            scheduleItems.forEach(item => {
                const itemIndex = getFormikIndex(item.uniqueId);
                const updateItem = form.values.ScheduleItems[itemIndex];
                updateItem.Start = updateDate(item.Start, newMoment);
                updateItem.End = updateDate(item.End, newMoment);
                updateItem.scheduleDate = newMoment.format('YYYY-MM-DDTHH:mm:ss');
            });

            form.setValues(form.values);
        }
    }

    const updateDate = (originalDate, newDate) => {
        return originalDate
            ? moment(originalDate)
                .set({
                    'year': newDate.year(),
                    'month': newDate.month(),
                    'day': newDate.day()
                }).format('YYYY-MM-DDTHH:mm:ss')
            : null;
    }


    const ScheduleItemsErrors = errors =>
        typeof errors.ScheduleItems === 'string'
            ? <Col><Alert variant="danger"><Alert.Heading>No event schedule!</Alert.Heading><p>{errors.ScheduleItems}</p></Alert></Col>
            : null;

    return (
        <React.Fragment>

            <Form.Group as={Row}>
                <Col md={2}>
                    <Button variant="primary" type="button" onClick={() => addSchedule()}>Add Schedule</Button>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>   
                {ScheduleItemsErrors(form.errors)}
                {
                    Object.keys(schedules).sort().map(scheduleDate => {
                    return (
                        <Col key={scheduleDate} md={12} className="mb-4">

                            <Card>
                                <Card.Header>
                                    <Card.Title className="clearfix d-md-flex" as="h4">
                                        <span className="d-block d-md-inline mr-md-auto mb-2 mb-md-0">{moment.utc(scheduleDate).format('dddd Do MMMM YYYY')}</span>                                  
                                        <Button variant="primary" className="btn-sm mr-2" type="button" onClick={() => addScheduleItem(scheduleDate)}>Add Item</Button>
                                        <Button variant="primary" className="btn-sm" type="button" onClick={() => deleteSchedule(scheduleDate)}>Delete Schedule</Button>
                                    </Card.Title>
                                </Card.Header>
                                <DateTimePicker
                                    value={moment(scheduleDate).toDate()}
                                    format="dddd Do MMMM YYYY"
                                    time={false}
                                    date={true}
                                    defaultCurrentDate={moment(scheduleDate).toDate()}
                                    onChange={(date, str) => changeScheduleDate(scheduleDate, date)} />
                                <ListGroup variant="flush">
                                    {
                                        schedules[scheduleDate]
                                            .sort((a, b) => { return new Date(a.Start).getTime() - new Date(b.Start).getTime() })
                                            .map((scheduleItem) => {
                                                return (
                                                    <Field
                                                        key={scheduleItem.uniqueId}
                                                        name={`ScheduleItems[${getFormikIndex(scheduleItem.uniqueId)}]`}
                                                        scheduleItem={scheduleItem}
                                                        component={ScheduleItem}
                                                        scheduleItemTypes={scheduleItemTypes}
                                                        deleteItem={() => deleteScheduleItem(scheduleItem.uniqueId)}
                                                    />
                                            )
                                        })
                                    }
                                    
                                </ListGroup>
                            </Card>
                        </Col>
                    )
                })
            }
            </Form.Group>
        </React.Fragment>     
    )
}

export default eventTabsSchedule



