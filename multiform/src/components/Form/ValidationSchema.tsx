import * as yup from 'yup'

const validationSchema = yup.object({
    Description: yup.string()
        .max(50, "Description must be 50 characters or less.")
        .required("Description is required."),
    Latitude: yup.number()
        .min(-90, "Latitude must be greater than -90.")
        .max(90, "Latitude must be less than 90.")
        .required("Latitude is required."),
    Longitude: yup.number()
        .min(-180, "Longitude must be greater than -180.")
        .max(180, "Longitude must be less than 180.")
        .required("Longitude is required."),
    ScheduleItems: yup.array()
        .of(
            yup.object({
                Start: yup.date()
                    .transform(function (value, original) {
                        return this.isType(value) && value !== null ? value : undefined;
                    })
                    .required("Start Time is required."),
                End: yup.date()
                    .transform(function (value, original) {
                        return this.isType(value) && value !== null ? value : undefined;
                    })
                    .nullable()
                    .min(yup.ref("Start"), "End Time must be greater or equal to the Start Time."),
                Name: yup.string()
                    .max(50, "Description must be 50 characters or less.")
                    .required("Name is required.")
            }))
        .required("Please enter Schedule information for the event.")
        .min(1, "Please enter Schedule information for the event."),
    Competitions: yup.array()
        .of(
            yup.object({
                StartTime: yup.date()
                    .transform(function (value, original) {
                        return this.isType(value) && value !== null ? value : undefined;
                    })
                    .required("Start Time is required."),
                EndTime: yup.date()
                    .transform(function (value, original) {
                        return this.isType(value) && value !== null ? value : undefined;
                    })
                    .required("End Time is required.")
                    .min(yup.ref("StartTime"), "End Time must be greater or equal to the Start Time.")                
            }))        
})

export default validationSchema;