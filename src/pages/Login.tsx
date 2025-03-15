import { Form, Formik, FormikProps } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import * as Yup from "yup";
import { userValidationMessages } from "../utils/formValidation";
import { TextInput } from "../components/TextInput";
import { SubmitButton } from "../components/SubmitButton";
import { Link, Router, useNavigate } from "react-router";

import { ILoggedUser, ILogin } from "../types/UserTypes";

import { LocalStorageManager } from "../utils/localStorageManagement";
import { useAppDispatch } from "../app/hooks";
import { loginAsync } from "../features/auth/authSlice";
import { useState } from "react";
import { httpClient } from "../utils/httpClient";

interface Values {
  email: string;
  password: string;
}

function Login() {
  const dispatch = useAppDispatch();
  const navigator = useNavigate();
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  async function onSubmitHandler(data: ILogin) {
    setInvalidCredentials(false);
    const res = await dispatch(loginAsync(data));
    console.log(res);

    if (res.meta.requestStatus == "fulfilled") {
      const user = res.payload as ILoggedUser;
      LocalStorageManager.put<ILoggedUser>(
        "loggedUser",
        user
      );

      //httpClient.defaults.headers.common.Authorization =  `Bearer ${user.token}`;
      httpClient.interceptors.request.use(function (config) {
        //const user = useAppSelector(selectUser);
        config.headers['Authorization'] =  `Bearer ${user.token}`;
        
        return config;
      });
      navigator("/dashboard");
    } else {
      setInvalidCredentials(true);
    }
  }

  return (
    <Container
      fluid={true}
      className="d-flex flex-column justify-content-center align-items-center full-height"
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email(
              userValidationMessages({ field: "email", errorType: "email" })
            )
            .required(
              userValidationMessages({ field: "email", errorType: "required" })
            ),
          password: Yup.string().required(
            userValidationMessages({ field: "password", errorType: "required" })
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const data: ILogin = {
            email: values.email,
            password: values.password,
          };

          await onSubmitHandler(data);

          setSubmitting(false);
        }}
      >
        {(props: FormikProps<Values>) => (
          <Form>
            {invalidCredentials && <p>This user does not exist</p>}
            <TextInput label="email" name="email" id="email"></TextInput>
            <TextInput
              label="password"
              name="password"
              id="password"
              password={true}
            ></TextInput>
            <SubmitButton label="Access" />
          </Form>
        )}
      </Formik>

      <div className="mt-5">
        <Link to="/register" className="text-xs">
          Apply for the ETO recruitment program here
        </Link>
      </div>
    </Container>
  );
}

export default Login;
