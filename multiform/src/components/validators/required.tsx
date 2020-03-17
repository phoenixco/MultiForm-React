const required = config => (value) => {
    //let isValid = false;

    if (value !== undefined && value !== '' &&  value !== null  ) {

        return config.message;
    }

    return null;
}

export default required