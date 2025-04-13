import { Formik, FormikProps, Form } from "formik";
import * as Yup from "yup";
import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import { toast } from "react-toastify";
import { TextInput } from "../../components/TextInput";
import { SubmitButton } from "../../components/SubmitButton";
import { ChatroomsApi } from "../../features/chatrooms/chatroomsApi";

interface IChatroomFormValues {
  id?: number;
  name: string;
  description: string;
}

const ChatroomForm = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [initialValues, setInitialValues] = useState<IChatroomFormValues>({
    name: "",
    description: "",
  });


  useEffect(() => {
    if (id) {
      const fetchChatroom = async () => {
        try {
          const response = await ChatroomsApi.getChatroom(id);
          const chatroom = response.data.data;
          setInitialValues({
            id: Number(chatroom.id),
            name: chatroom.name,
            description: chatroom.description,
          });
        } catch (error) {
          toast.error("Failed to load chatroom");
        }
      };
      fetchChatroom();
    }
  }, [id]);

  const onSubmitHandler = async (values: IChatroomFormValues) => {
    try {
      if (id) {
        await ChatroomsApi.updateChatroom(values);
        toast.success('Chatroom updated');
      } else {
        await ChatroomsApi.createChatroom(values);
        toast.success('Chatroom created');
      }
      navigate('/panel/chatrooms');
    } catch (error) {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100">
      <h1 className="text-center mt-5 mb-5">
        {id ? "Edit Chatroom" : "Create Chatroom"}
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
            name: Yup.string()
              .required("Name is required")
              .min(3, "Name must be at least 3 characters")
              .max(50, "Name cannot exceed 50 characters"),
            description: Yup.string()
              .required("Description is required")
              .min(10, "Description must be at least 10 characters")
              .max(500, "Description cannot exceed 500 characters"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await onSubmitHandler(values);
            setSubmitting(false);
          }}
        >
          {(props: FormikProps<IChatroomFormValues>) => (
            <Row className="justify-content-center">
              <Col xs={11} md={10} lg={7} xl={5}>
                <Form>
                  <TextInput 
                    label="Chatroom Name" 
                    name="name" 
                    id="name"
                 
                  />
                  <TextInput
                    label="Description"
                    name="description"
                    id="description"
                    as="textarea"
                  />
                  <SubmitButton
                    label={id ? "Update Chatroom" : "Create Chatroom"}
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

export default ChatroomForm;