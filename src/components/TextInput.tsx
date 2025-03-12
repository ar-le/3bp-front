import {  useField } from "formik";
import { InputProps } from "../types/FormTypes";
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./styles/textInputStyle.scss"
import classNames from "classnames";

interface TextInputProps extends InputProps{
    password?: boolean
}

export const TextInput = ({ label, password = false, ...props } : TextInputProps) => {

    const [field, meta] = useField(props);
    const classes = classNames("text-input",{
        "error" : meta.error && meta.touched,
        "light": props.theme == "light"
    })

    return (
      <div className="mb-3 input-container">

        <InputGroup>
                <InputGroup.Text id={props.id}>{label}</InputGroup.Text>
                <Form.Control
                aria-label={props.id}
                aria-describedby={props.id}
                className={classes}
                {...field}
                type={password ? 'password' : 'text'}
                />
        </InputGroup>

        {meta.touched && meta.error ? (
          <div className="error-msg">{meta.error}</div>
        ) : null}


      </div>
    );
  };