import { Form, Formik, FormikProps } from "formik";
import { Col, Container, Image, Row } from "react-bootstrap";
import * as Yup from "yup";
import { userValidationMessages } from "../utils/formValidation";
import { TextInput } from "../components/TextInput";
import { SubmitButton } from "../components/SubmitButton";
import { FileInput } from "../components/FileInput";
import { useState } from "react";
import { SUPPORTED_IMAGE_FORMATS } from "../utils/formValidation";
import { CheckboxInput } from "../components/CheckboxInput";
import { AuthApi } from "../features/auth/authApi";

import { ILoggedUser, IRegisterUser } from "../types/UserTypes";
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  registerAsync,
  selectAuthSliceStatus,
} from "../features/auth/authSlice";
import { LocalStorageManager } from "../utils/localStorageManagement";

interface Values {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  avatar: string;
  extension: string;
  base64Avatar: string;
  accepts_cookies: boolean;
  accepts_communication: boolean;
}

function Register() {
  const dispatch = useAppDispatch();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const navigator = useNavigate();
  const [serverValidationError, setServerValidationError] = useState(false);

  async function onSubmitHandler(data: IRegisterUser) {
    setServerValidationError(false);

    //const res = await dispatch(registerAsync(data));
     AuthApi.register(data)
     .then(() => navigator("/"))
     .catch(()=>setServerValidationError(true))
  }
  return (
    <>
      <h1 className="text-center mt-5 mb-5">Join the ETO</h1>
      <Container
        fluid="sm"
        className="full-height justify-content-center align-items-center"
      >
        <Formik
          validateOnBlur={false} 
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
            avatar: "",
            extension: "",
            base64Avatar: "",
            accepts_cookies: false,
            accepts_communication: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email(
                userValidationMessages({ field: "email", errorType: "email" })
              )
              .required(
                userValidationMessages({
                  field: "email",
                  errorType: "required",
                })
              )
              .test(
                "availableEmail",
                userValidationMessages({
                  field: "email",
                  errorType: "notAvailable",
                }),
                async value => await AuthApi.availableEmail(value)
              ),
            username: Yup.string()
              .required(userValidationMessages({ errorType: "required" }))
              .min(3, userValidationMessages({ errorType: "min", min: 3 }))
              .matches(/^[^\s@]+$/, 'Invalid characters')
              .test(
                "availableUsername",
                userValidationMessages({
                  field: "username",
                  errorType: "notAvailable",
                }),
                async value => await AuthApi.availableUsername(value)
              ),
            password: Yup.string()
              .required(
                userValidationMessages({
                  field: "password",
                  errorType: "required",
                })
              )
              .min(8, userValidationMessages({ errorType: "min", min: 8 })),
            confirmPassword: Yup.string()
              .required(userValidationMessages({ errorType: "required" }))
              .min(8, userValidationMessages({ errorType: "min", min: 8 }))
              .oneOf(
                [Yup.ref("password")],
                userValidationMessages({
                  field: "confirmPassword",
                  errorType: "confirmPassword",
                })
              ),
            avatar: Yup.mixed()
              .nullable()
              .notRequired()
              .test("validFormat", "This file is not a valid image", value => {
                const filename = value as string;
                return (
                  !value ||
                  (value &&
                    SUPPORTED_IMAGE_FORMATS.some(f => filename.endsWith(f)))
                );
              }),
            extension: Yup.string(),
            base64Avatar: Yup.string(),
            accepts_cookies: Yup.bool()
              .required(userValidationMessages({ errorType: "required" }))
              .oneOf([true], userValidationMessages({ errorType: "required" })),
            accepts_communication: Yup.bool()
              .required(userValidationMessages({ errorType: "required" }))
              .oneOf([true], userValidationMessages({ errorType: "required" })),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const data: IRegisterUser = {
              username: values.username,
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
              extension: values.extension,
              base64Avatar: values.base64Avatar.split(",")[1],
              accepts_cookies: values.accepts_cookies,
              accepts_communication: values.accepts_communication,
            };
            //console.log(data);
            await onSubmitHandler(data);

            //setSubmitting(false);
          }}
        >
          {(props: FormikProps<Values>) => (
            <Row className="justify-content-center">
              <Col xs={11} md={10} lg={7} xl={5}>
                <Form>
                  {serverValidationError && <p>The data is not valid</p>}
                  <TextInput label="email" name="email" id="email"></TextInput>
                  <TextInput
                    label="username"
                    name="username"
                    id="username"
                  ></TextInput>
                  <TextInput
                    label="password"
                    name="password"
                    id="password"
                    password={true}
                  ></TextInput>
                  <TextInput
                    label="confirm password"
                    name="confirmPassword"
                    id="confirmPassword"
                    password={true}
                  ></TextInput>
                  <Row>
                    <Col xs={12} sm={8}>
                      <FileInput
                        label="avatar"
                        name="avatar"
                        id="avatar"
                        onChangePreview={(base64: string, ext: string) => {
                          //actualizar los valores a los obtenidos
                          props.setFieldValue("base64Avatar", base64);
                          props.setFieldValue("extension", ext);
                          setAvatarPreview(base64.length > 2 ? base64 : null);
                        }}
                      ></FileInput>
                    </Col>

                    <Col xs={3} sm={2}>
                      {avatarPreview && (
                        <Image src={avatarPreview} roundedCircle fluid />
                      )}
                    </Col>
                  </Row>
                  <CheckboxInput
                    label="The ETO may use any means neccesary to contact me"
                    name="accepts_communication"
                    id="accepts_communication"
                  />
                  <CheckboxInput
                    label="The ETO may use “cookies” to track me and store my personal information"
                    name="accepts_cookies"
                    id="accepts_cookies"
                  />
                  <SubmitButton label="Access" />
                </Form>
              </Col>
            </Row>
          )}
        </Formik>
        <div className="mt-5  text-center">
          <Link to="/login" className="text-xs">
            I have already joined the ETO recruitment program
          </Link>
        </div>
      </Container>
    </>
  );
}

export default Register;
