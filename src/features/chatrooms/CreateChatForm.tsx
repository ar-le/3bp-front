import { Form, Formik, FormikProps } from 'formik';
import React from 'react'
import * as Yup from "yup";
import { userValidationMessages } from '../../utils/formValidation';
import { TextInput } from '../../components/TextInput';
import { SubmitButton } from '../../components/SubmitButton';
import { ChatroomsApi } from './chatroomsApi';
import { IChatroom, IPostChatroom } from '../../types/GeneralTypes';
import { useNavigate } from 'react-router';

interface Values {
    name: string;
    description: string;
}



function CreateChatForm() {

  const navigator = useNavigate();

  return (
    <>
     <Formik
          initialValues={{
            name: "",
            description: ''
          }}
          validationSchema={Yup.object({
            name: Yup.string().required(userValidationMessages({errorType :'required'})).max(20, userValidationMessages({max: 20, errorType:'max'})),
            description: Yup.string().required(userValidationMessages({errorType :'required'})).max(50, userValidationMessages({max: 50, errorType:'max'}))
          })}
          onSubmit={values => {
            const chatroom: IPostChatroom = {
              name : values.name,
              description : values.description
            };

            //enviar petición de creación
            ChatroomsApi.createChatroom(chatroom)
            .then(response => {
              console.log(response);
              const chat = response.data.data;
              //Si ha funcionado correctamente, redirigir a la chatroom recién creada
              navigator(`/chatrooms/${chat.id}`);
            })
            .catch(error => {
              console.log(error);
              
            })
          }}
        >

             {(props: FormikProps<Values>) => (
                      <Form>
                        
                        <TextInput label="name" name="name" id="name"></TextInput>
                        <TextInput
                          label="description"
                          name="description"
                          id="description"
                        ></TextInput>
                        <SubmitButton label="Create" />
                      </Form>
                    )}
                  </Formik>

    
    </>
  )
}

export default CreateChatForm