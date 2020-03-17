import * as React from 'react'

class ImageUploader extends React.Component<any, any> {
    fileInput: any;

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            image: props.field.value,
            inputKey: Date.now() // we use an input key as the file input is uncontrolled. This means when we want to delete the image, we can change the value of the key to force a re-render, losing the value.
       
        }
    }

    checkMimeType = (event) => {
        //getting file object
        let files = event.target.files
        //define message container
        let err = ''
        // list allow mime type
        const types = ['image/png', 'image/jpeg', 'image/gif']
        // loop access array
        for (var x = 0; x < files.length; x++) {
            // compare file type find doesn't matach
            if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err += files[x].type + ' is not a supported format\n';
            }
        };

        if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            console.log(err)
            return false;
        }
        return true;

    }

    handleImageChange = (event) => {          
     
        if (this.checkMimeType(event)) {
            let updatedfile = this.state.selectedFile;
            let updatedImage = this.state.image;    
            updatedfile = event.target.files[0];

                let reader = new FileReader();

                reader.onloadend = () => {
                    updatedImage = reader.result;
                    this.setState({ selectedFile: updatedfile, image: updatedImage });
                    console.log(this.state.image, "after upload onloaded");

                    // call into Formik to set the form value
                    this.props.form.setFieldValue(this.props.field.name, this.state.image);                   
                }

                if (updatedfile) {
                    reader.readAsDataURL(updatedfile);
                }

            }               
        
    }

    deleteImage = (e) => {
           
        this.setState({ selectedFile: null, image: null, inputKey: Date.now() });
        if (this.handleImageChange) this.handleImageChange(null);
    }

    render() {
        const { field } = this.props;     
         
        return (
            <React.Fragment>               
                <input type="file" name={field.name} onChange={this.handleImageChange} key={this.state.inputKey} accept="image/*"/>
                {this.state.image && 
                    <>
                    <div className="image-container"><img src={this.state.image} alt={field.name} width="200" /></div>
                    <div className="pt-3">
                    <button onClick={this.deleteImage}>Remove File</button>
                    </div>
                    </>
                }                   
            </React.Fragment>
        )
    }
}
export default ImageUploader

