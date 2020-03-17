import * as React from 'react'
import moment from 'moment'
import DateTimePicker from 'react-widgets/lib/DateTimePicker';

const MomentDateTimePicker = ({
    field,
    form,
    value,
    outputFormat = 'YYYY-MM-DDTHH:mm:ss', 
    ...props }) => {

    return (
        <DateTimePicker
            {...props}
            /* convert the value to a normal date */
            id={field.name}
            value={value ? moment(value).toDate() : null}
            // update touched value for validation
            onBlur={
                e => {
                    form.setFieldTouched(field.name, true)
                }
            }
            /* convert back to a string and update the form value */
            onChange={(date, str) => {             
                const newDate = date ? moment(date).format(outputFormat) : null;               
                form.setFieldValue(field.name, newDate)
            }}
         />
    );
};

export default MomentDateTimePicker