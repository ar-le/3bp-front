import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";
import { TextInput } from "../../components/TextInput";
import { SubmitButton } from "../../components/SubmitButton";
import { TeamsApi } from "../../features/teams/teamsApi";
import { CheckboxInput } from "../../components/CheckboxInput";

interface ITeamsFormValues {
  team: number;

  password: string;
}

const TeamsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<ITeamsFormValues>({
    team: 0,
    password: ''
  });


  useEffect(() => {
    if (id) {
      const fetchTeam= async () => {
        try {
          const response = await TeamsApi.getTeam(id);
          const team = response.data.data;
          setInitialValues({
            team: team.id,
            password: team.password,
          });
        } catch (error) {
          toast.error("Failed to load team");
        }
      };
      fetchTeam();
    }
  }, [id]);

  const onSubmitHandler = async (values: ITeamsFormValues) => {
    try {
      
        await TeamsApi.updateRecruiting( values);
        toast.success('Recruiting updated');
     
      navigate('/panel/teams');
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <h1 className="text-center mt-5 mb-5">
        Change recruiting status
      </h1>
      <Container
        fluid="sm"
        className="full-height justify-content-center align-items-center"
      >
        <Formik
          validateOnBlur={false}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={Yup.object({
            recruiting: Yup.bool(),
            password: Yup.string()
              .required("Password required")
              .min(8, "Required 8 characters")
              .max(8, "Required 8 characters")
              
              
          })}

          onSubmit={async (values, { setSubmitting }) => {
            await onSubmitHandler(values);
            setSubmitting(false);
          }}
        >
          {(props: FormikProps<ITeamsFormValues>) => (
            <Row className="justify-content-center">
              <Col xs={11} md={10} lg={7} xl={5}>
                <Form>
                  <TextInput 
                    label="Password" 
                    name="password" 
                    id="password"
                 
                  />
                 
                  <SubmitButton
                    label={"Update team"}
                  />
                </Form>
              </Col>
            </Row>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default TeamsForm;