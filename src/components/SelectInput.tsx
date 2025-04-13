import { useField } from "formik";
import { InputProps } from "../types/FormTypes";
import { InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import "./styles/textInputStyle.scss";
import classNames from "classnames";

interface SelectInputProps extends InputProps {
  options: {text: string, value: string}[];
}

export const SelectInput = ({ label, options, ...props }: SelectInputProps) => {
  const [field, meta] = useField(props);
  
  const classes = classNames("select-input", {
    "error": meta.error && meta.touched,
    "light": props.theme == "light"
  });

  return (
    <div className="mb-3 input-container">
      <InputGroup>
        <InputGroup.Text id={props.id}>{label}</InputGroup.Text>
        <Form.Select
          aria-label={props.id}
          aria-describedby={props.id}
          className={classes}
          {...field}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </Form.Select>
      </InputGroup>

      {meta.touched && meta.error ? (
        <div className="error-msg">{meta.error}</div>
      ) : null}
    </div>
  );
};