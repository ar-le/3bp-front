import { Form, Formik , FormikProps} from "formik";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { userValidationMessages } from "../utils/formValidation";
import { TextInput } from "../components/TextInput";
import { SubmitButton } from "../components/SubmitButton";
import { Link } from "react-router";

interface Values {
    email : string,
    password: string
}

function Login() {
    return ( 
        <Container fluid={true} className="d-flex flex-column justify-content-center align-items-center full-height">
            
                    <Formik
                        initialValues={{email: '', password: ''}}
                        validationSchema={Yup.object({
                            email: Yup.string()
                            .email(userValidationMessages({field: 'email', errorType:'email'}))
                            .required(userValidationMessages({field: 'email', errorType:'required'})),
                            password: Yup.string()
                            .required(userValidationMessages({field: 'password', errorType:'required'}))
                        })}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                            setSubmitting(false);
                            }, 200);
                        }}
                    >
                    
                    {(props: FormikProps<Values>) => (
                            <Form>
                                <TextInput label="email" name="email" id="email" ></TextInput>
                                <TextInput label="password" name="password" id="password" password={true}></TextInput>
                                <SubmitButton label="Access"/>
                            </Form>
                        )}
                    
                    </Formik>

                    <div className="mt-5">
                        <Link to='/register' className="text-xs">Apply for the ETO recruitment program here</Link>
                    </div>
               
        </Container>
     );
}

export default Login;