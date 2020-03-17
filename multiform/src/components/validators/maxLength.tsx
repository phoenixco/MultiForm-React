const maxLength = config => (value) => {
    //let isValid = false;
    
    if (typeof value === 'string') {

        return value.length > config.length ? config.message : null;
    }

    return "Invalid Value type";
   
}

export default maxLength