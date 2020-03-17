const range = config => (value) => {
    //let isValid = false;

    if (typeof value === 'number') {

        return value >= config.min && value <= config.max ? null : config.message;  
    }   

    return "Invalid type";
}

export default range