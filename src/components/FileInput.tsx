import {  useField } from "formik";
import { InputProps } from "../types/FormTypes";
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./styles/textInputStyle.scss"
import classNames from "classnames";

import { SUPPORTED_IMAGE_FORMATS } from "../utils/formValidation";


interface FileInputProps extends InputProps{
    onChangePreview: (base64:string, ext: string)=>void
}

export const FileInput = ({ label, onChangePreview, ...props } : FileInputProps) => {

    const [field, meta] = useField(props);
    const classes = classNames("text-input",{
        "error" : meta.error && meta.touched,
        "light": props.theme == "light"
    })

    const handleImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        console.log(files);
        if(files && files?.length >0){
            //obtener extension
            const ext = files[0].type.split('/')[1];
            if(!SUPPORTED_IMAGE_FORMATS.includes(ext)) {
                onChangePreview('', '');
                return;
            }
            //leer en base 64
            const fileReader = new FileReader();
            let base64  = '';
            new Promise((resolve, reject) =>{
                fileReader.readAsDataURL(files[0]);
                fileReader.onload = ()=> resolve(fileReader.result)
              }).then(url => {
                let imageUrl = url as string;
                base64 = imageUrl;
                onChangePreview(base64, ext);
              })

        }
         
      };

    return (
      <div className="mb-3 input-container">

        <InputGroup>
                <InputGroup.Text id={props.id}>{label}</InputGroup.Text>
                <Form.Control
                aria-label={props.id}
                aria-describedby={props.id}
                className={classes}
                {...field}
                type='file'
               
                onChange={(e) => {
                    field.onChange(e);
                    handleImageChange(e)
                    
                }}
                />
               
        </InputGroup>

        {meta.touched && meta.error ? (
          <div className="error-msg">{meta.error}</div>
        ) : null}


      </div>
    );
  };