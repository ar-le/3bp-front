import { Formik } from "formik";
import { Container, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { userValidationMessages } from "../utils/formValidation";

function Register() {
    const SUPPORTED_FORMATS = ['jpg', 'jpeg', 'gif', 'png'];

    return ( 
        <Container fluid={true} className="full-height">
            <Formik
                initialValues={{
                    email: '', 
                    username:'', 
                    password: '', 
                    confirmPassword: '',
                    avatar: ''
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email(userValidationMessages({field: 'email', errorType:'email'}))
                        .required(userValidationMessages({field: 'email', errorType:'required'})),
                    password: Yup.string()
                        .required(userValidationMessages({field: 'password', errorType:'required'}))
                        .min(8, userValidationMessages({ errorType:'min', min:8}))
                        ,
                    confirmPassword : Yup.string()
                        .required(userValidationMessages({errorType:'required'}))
                        .min(8, userValidationMessages({ errorType:'min', min:8}))
                        .oneOf([Yup.ref('password')], userValidationMessages({field: 'confirmPassword', errorType:'confirmPassword'}))
                        ,
                    avatar: Yup.mixed()
                        .nullable()
                        .notRequired()
                        .test('FORMAT', 'This file is not an image', value => {
                            const input = value as HTMLInputElement;
                            return !value || (
                            input.files && SUPPORTED_FORMATS.some(f => {
                                if(input.files && input.files?.length > 1)
                                 return input.files[0].type.includes(f)
                            
                            }))
                        })

                        //https://stackoverflow.com/questions/62515683/yup-w-formik-file-upload-validation

                })}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 200);
                }}
            ></Formik>

            
        </Container>
     );
}

export default Register;