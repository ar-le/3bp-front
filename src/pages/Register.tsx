import { Form, Formik, FormikProps } from "formik";
import { Col, Container, Image, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { userValidationMessages } from "../utils/formValidation";
import { TextInput } from "../components/TextInput";
import { SubmitButton } from "../components/SubmitButton";
import { FileInput } from "../components/FileInput";
import { useRef, useState } from "react";
import { SUPPORTED_IMAGE_FORMATS } from "../utils/formValidation";
import { CheckboxInput } from "../components/CheckboxInput";

interface Values {
    email: string, 
    username: string, 
    password: string, 
    confirmPassword: string,
    avatar: string,
    extension:string,
    base64Avatar: string,
    accepts_cookies: boolean,
    accepts_communication : boolean,
    
}

function Register() {


      const fileInputRef = useRef<HTMLInputElement>(null)
      const previewAvatar = useRef<HTMLImageElement>(null)
      const[displayPreview, setDisplayPreview] = useState(false);
      const[avatarPreview, setAvatarPreview] = useState<string | null>(null);
    return ( 
        <Container fluid={true} className="full-height">
            <Formik
                initialValues={{
                    email: '', 
                    username:'', 
                    password: '', 
                    confirmPassword: '',
                    avatar: '',
                    extension: '',
                    base64Avatar: '',
                    accepts_cookies: false,
                    accepts_communication : false
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email(userValidationMessages({field: 'email', errorType:'email'}))
                        .required(userValidationMessages({field: 'email', errorType:'required'})),
                    username: Yup.string()
                        .required(userValidationMessages({errorType:'required'}))
                        .min(3, userValidationMessages({ errorType:'min', min:3}))
                        ,
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
                        .test('FORMAT', 'This file is not a valid image', value => {
                            const filename = value as string;
                            return !value || (value && SUPPORTED_IMAGE_FORMATS.some(f => filename.endsWith(f)))
                        }),
                    extension : Yup.string(),
                    base64Avatar: Yup.string(),
                    accepts_cookies: Yup.bool()
                        .required(userValidationMessages({errorType:'required'}))
                        .oneOf([true], userValidationMessages({errorType:'required'}))
                    ,
                    accepts_communication: Yup.bool()
                        .required(userValidationMessages({errorType:'required'}))
                        .oneOf([true], userValidationMessages({errorType:'required'}))
                    
                        
                    //https://stackoverflow.com/questions/62515683/yup-w-formik-file-upload-validation

                })}
                onSubmit={(values, { setSubmitting }) => {
                    const data ={
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        confirmPassword : values.confirmPassword,
                        extension : values.extension,
                        base64Avatar: values.base64Avatar,
                        accepts_cookies: values.accepts_cookies,
                        accepts_communication: values.accepts_communication
                    }
                    console.log(data);
                    
                    //hacer peticion con esto y redirigir si ok
                    /* setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    }, 200); */
                }}
            >

                {(props: FormikProps<Values>) => (
                    <Form>
                        <TextInput label="email" name="email" id="email" theme="light"></TextInput>
                        <TextInput label="username" name="username" id="username" theme="light"></TextInput>
                        <TextInput label="password" name="password" id="password" password={true}></TextInput>
                        <TextInput label="confirm password" name="confirmPassword" id="confirmPassword" password={true}></TextInput>
                        <Row >
                            <Col xs={12} sm={8}>
                                <FileInput label="avatar" name="avatar" id="avatar" 
                                    onChangePreview={(base64 :string, ext: string)=>{
                                        //actualizar los valores a los obtenidos
                                        props.setFieldValue('base64Avatar', base64);
                                        props.setFieldValue('extension', ext);
                                        base64.length > 2 ? setAvatarPreview(base64) : setAvatarPreview(null);

                                    }}
                                ></FileInput>
                            </Col>
                            
                            <Col xs={3} sm={2}>
                                {avatarPreview && <Image src={avatarPreview} roundedCircle fluid/>}
                            </Col>
                        </Row>
                        <CheckboxInput label="The ETO may use any means neccesary to contact me" name="accepts_communication" id="accepts_communication" />
                        <CheckboxInput label="The ETO may use “cookies” to track me and store my personal information" name="accepts_cookies" id="accepts_cookies" />
                        <SubmitButton label="Access"/>
                    </Form>
                )}
            </Formik>

            
        </Container>
     );
}

export default Register;