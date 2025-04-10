import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TransmissionsApi } from "../../features/transmissions/transmissionsApi";
import { PostTransmission, PutTransmission } from "../../types/GeneralTypes";
import { TextInput } from "../../components/TextInput";
import { SubmitButton } from "../../components/SubmitButton";
import { toast } from "react-toastify";

const TransmissionForm = () => {
  const navigator = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<PutTransmission>({
    title: "",
    content: "",
    type: "text",
    id: "",
  });

  useEffect(() => {
    if (id) {
      const fetchTransmission = async () => {
        try {
          const response = await TransmissionsApi.get(id);
          const transmission = response.data.data;
          setInitialValues({
            title: transmission.title,
            content: transmission.content,
            type: "text",
            id: transmission.id,
          });
        } catch (error) {
        } finally {
        }
      };
      fetchTransmission();
    }
  }, [id]);

  const onSubmitHandler = async (transmission: PutTransmission) => {
    try {
      if (id) {
        await TransmissionsApi.update(transmission);
            toast.success('Transmission updated')
            navigator('/panel/transmissions')
      } else {
        
        await TransmissionsApi.create(transmission);
            toast.success('Transmission sent')
            navigator('/panel/transmissions')  
      }
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <h1 className="text-center mt-5 mb-5">
        {id ? "Edit Transmission" : "Create Transmission"}
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
            title: Yup.string()
              .required("Title is required")
              .min(3, "Title must be at least 3 characters"),
            content: Yup.string()
              .required("Content is required")
              .min(10, "Content must be at least 10 characters"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await onSubmitHandler(values);
            setSubmitting(false);
          }}
        >
          {(props: FormikProps<PutTransmission>) => (
            <Row className="justify-content-center">
              <Col xs={11} md={10} lg={7} xl={5}>
                <Form>
                  <TextInput label="Title" name="title" id="title"></TextInput>
                  <TextInput
                    label="Content"
                    name="content"
                    id="content"
                    as="textarea"
                  ></TextInput>
                  <SubmitButton
                    label={id ? "Update Transmission" : "Create Transmission"}
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

export default TransmissionForm;
