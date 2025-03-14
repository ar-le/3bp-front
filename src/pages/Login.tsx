import { Form, Formik , FormikProps} from "formik";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from 'yup';
import { userValidationMessages } from "../utils/formValidation";
import { TextInput } from "../components/TextInput";
import { SubmitButton } from "../components/SubmitButton";
import { Link, Router, useNavigate } from "react-router";

import { ILoggedUser, ILogin } from "../types/UserTypes";
import { AuthApi } from "../features/auth/authApi";
import { httpResponseOk } from "../utils/httpClient";

import { LocalStorageManager } from "../utils/localStorageManagement";
import { useAppDispatch } from "../app/hooks";
import { login, loginAsync } from "../features/auth/authSlice";

interface Values {
    email : string,
    password: string
}

function Login() {
    const dispatch = useAppDispatch();
    let navigator = useNavigate();

    async function onSubmitHandler (data : ILogin) {
        const res = await dispatch(loginAsync(data))
        console.log(res.meta.requestStatus);
        
        /* AuthApi.login(data)
        .then(response =>{
            dispatch(login(response.data));
            LocalStorageManager.put<ILoggedUser>('loggedUser', response.data);
        })
        .catch(error => console.log(error)
        ); */

        /* if(httpResponseOk(response)){
            dispatch(login(response.data));
            LocalStorageManager.put<ILoggedUser>('loggedUser', response.data);
            navigator("/dashboard");
        }
        else{
            //setSubmitting(false);
            console.log(response.status);
            
        } */
    }

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
                        onSubmit={async (values, { setSubmitting }) => {
                            const data : ILogin = {
                                email: values.email,
                                password: values.password
                            }
                            console.log(data);
                            onSubmitHandler(data);
                            
                           // console.log(response);
                            
                            //enviar petición login
                            //const response = await AuthApi.login(data);

                            //almacenar credenciales
                            /* if(httpResponseOk(response)){
                                dispatch(login(response.data));
                                LocalStorageManager.put<ILoggedUser>('loggedUser', response.data);
                                navigator("/dashboard");
                            }
                            else{
                                setSubmitting(false);
                                console.log(response.status);
                                
                            } */

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