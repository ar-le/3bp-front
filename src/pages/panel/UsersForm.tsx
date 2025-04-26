import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";

import { SubmitButton } from "../../components/SubmitButton";
import { TeamsApi } from "../../features/teams/teamsApi";
import { UsersApi } from "../../features/users/userApi";
import { TextInput } from "../../components/TextInput";
import { NumberInput } from "../../components/NumberInput";
import { SelectInput } from "../../components/SelectInput";
import { CheckboxInput } from "../../components/CheckboxInput";
import { ITeam } from "../../types/GeneralTypes";
import { FileInput } from "../../components/FileInput";
import { SUPPORTED_IMAGE_FORMATS } from "../../utils/formValidation";
import { INewUser, PostUser } from "../../types/UserTypes";

interface UserFormValues {
  username: string;
  password: string;
  email: string;
  points: number;
  role: "user"|"mod"| "admin";
  team_id: string;
  accepts_cookies: boolean;
  accepts_communication: boolean;
  id?: string;
  extension: string;
  base64Avatar: string;
  avatar: string;
}

const UserForm = () => {
  const navigator = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [teams, setTeams] = useState<{ text: string; value: string }[]>([]);
  const [initialValues, setInitialValues] = useState<UserFormValues>({
    username: "",
    password: "",
    email: "",
    points: 0,
    role: "user",
    team_id: "",
    accepts_cookies: false,
    accepts_communication: false,
    extension: '',
    base64Avatar: '',
    avatar: ''
  });

  // Roles disponibles
  const roleOptions = [
    { text: "Admin", value: "admin" },
    { text: "Moderator", value: "mod" },
    { text: "User", value: "user" },
  ];

  // Cargar equipos y datos del usuario (si es edición)
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await TeamsApi.getAll();
        const teamsData = response.data.data.map((team: ITeam) => ({
          text: team.name,
          value: team.id,
        }));
        setTeams(teamsData);
      } catch (error) {
        toast.error("Error loading teams");
      }
    };

    const fetchUser = async () => {
      if (id) {
        try {
          const response = await UsersApi.get(id);
          const userData = response.data.data;
          setInitialValues({
            username: userData.username,
            password: "", 
            email: userData.email,
            points: userData.points,
            role: userData.role,
            team_id: userData.team?.id || "",
            accepts_cookies: Boolean(userData.accepts_cookies),
            accepts_communication: Boolean(userData.accepts_communication),
            id: userData.id,
            extension: '',
            base64Avatar: '',
            avatar: ''
          });
        } catch (error) {
          toast.error("Error loading user data");
        }
      }
    };

    fetchTeams();
    fetchUser();
  }, [id]);

  const onSubmitHandler = async (data: PostUser) => {
    try {
      // Solo enviar password si está siendo editado o es nuevo usuario
     /*  const dataToSend =
        id && !values.password ? { ...values, password: undefined } : values;
 */
      if (id) {
         await UsersApi.update({id:id, ...data});
        toast.success("User updated successfully");
      } else {
         await UsersApi.create(data);
        toast.success("User created successfully");
      }
      navigator("/panel/users");
    } catch (error) {
      toast.error("Error saving user");
    }
  };

  // Esquema de validación
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must be at least 3 characters"),
    password: Yup.string().min(8, "Password must be at least 8 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),
    points: Yup.number()
      .min(0, "Points must be positive")
      .integer("Points must be an integer"),
    role: Yup.string()
      .required("Role is required")
      .oneOf(["admin", "mod", "user"], "Invalid role"),
    team_id: Yup.string(),
    accepts_cookies: Yup.boolean().required().oneOf([true], "You must accept cookies"),
    accepts_communication: Yup.boolean().required().oneOf([true], "You must accept communications"),
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
  });

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <h1 className="text-center mt-5 mb-5">
        {id ? "Edit User" : "Create User"}
      </h1>
      <Container
        fluid="sm"
        className="full-height justify-content-center align-items-center"
      >
        <Formik
          //validateOnBlur={false}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const data: PostUser = {
                          username: values.username,
                          email: values.email,
                          team_id: values.team_id,
                          password: values.password,
                          role: values.role,
                          points: values.points,
                          extension: values.extension,
                          base64Avatar: values.base64Avatar.split(",")[1],
                          accepts_cookies: values.accepts_cookies,
                          accepts_communication: values.accepts_communication,
            }
            await onSubmitHandler(data);
            setSubmitting(false);
          }}
        >
          {(props: FormikProps<UserFormValues>) => (
            <Row className="justify-content-center">
              <Col xs={11} md={10} lg={7} xl={5}>
                <Form>
                  <TextInput label="Username" name="username" id="username" />

                  <TextInput
                    label="Password"
                    name="password"
                    id="password"
                    password
                  />

                  <TextInput
                    label="Email"
                    name="email"
                    id="email"
                    //type="email"
                  />

                  <NumberInput
                    label="Points"
                    name="points"
                    id="points"
                    min={0}
                  />

                  <SelectInput
                    label="Role"
                    name="role"
                    id="role"
                    options={roleOptions}
                  />

                  <SelectInput
                    label="Team"
                    name="team_id"
                    id="team_id"
                    options={[{text:'None', value: ''},...teams]}
                  />

                  <FileInput
                    label="avatar"
                    name="avatar"
                    id="avatar"
                    onChangePreview={(base64: string, ext: string) => {
                      //actualizar los valores a los obtenidos
                      props.setFieldValue("base64Avatar", base64);
                      props.setFieldValue("extension", ext);
         
                    }}
                  ></FileInput>

                  <CheckboxInput
                    label="Accepts Cookies"
                    name="accepts_cookies"
                    id="accepts_cookies"
                  />

                  <CheckboxInput
                    label="Accepts Communication"
                    name="accepts_communication"
                    id="accepts_communication"
                  />

                  <SubmitButton label={id ? "Update User" : "Create User"} />
                </Form>
              </Col>
            </Row>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default UserForm;
