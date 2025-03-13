import { useField } from "formik";
import { InputProps } from "../types/FormTypes";
import { Form, InputGroup } from "react-bootstrap";
import "./styles/textInputStyle.scss"

interface CheckboxInputProps extends InputProps{
    label: string
}

export const CheckboxInput = ({ label, ...props }: CheckboxInputProps) => {

    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div className="mb-2">
        <Form.Check // prettier-ignore
            type={"checkbox"}
            {...field} {...props}
            label={label}
            
          />
        {meta.touched && meta.error ? (
          <div className="error-msg">{meta.error}</div>
        ) : null}
      </div>
    );
  };