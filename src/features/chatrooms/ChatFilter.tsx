import { Formik, FormikProps, Form } from "formik";

import * as Yup from "yup";
import { TextInput } from "../../components/TextInput";
import { DateInput } from "../../components/DateInput";
import "./styles/chatfilter.scss"

interface Values {
  textFilter: string;
  from: string;
  to: string;
}

interface ChatFilterProps {
  onSubmitFn: (textFilter: string, to: string, from: string) => void;
  textFilterInput : React.Ref<HTMLInputElement | null>,
  afterDateFilterInput: React.Ref<HTMLInputElement | null>
}

function ChatFilter({ onSubmitFn, textFilterInput, afterDateFilterInput }: ChatFilterProps) {

    /* function handleSubmit() {
        console.log(values.textFilter, values.to, values.from);
        //onSubmitFn(values.textFilter, values.to, values.from);
    } */
  return (
    <Formik
      initialValues={{
        textFilter: "",
        from: "",
        to: "",
      }}
      validationSchema={Yup.object({
        textFilter: Yup.string().nullable().max(20, "Max 20"),
        from: Yup.date().notRequired().nullable()
        //.max(Yup.ref("to"), "From must be before To"),
       // to: Yup.date().notRequired().nullable().min(Yup.ref("from"), "To must be after From"),
      })}
      onSubmit={values => {
        onSubmitFn(values.textFilter, values.to, values.from);
      }}
    >
      {(props: FormikProps<Values>) => (
        <Form className="d-flex flex-column flex-lg-row div-bg-medium px-3 py-2 rounded">
          <TextInput label="Search" name="textFilter" id="textFilter" ref={textFilterInput} />
          <DateInput label="From" name="from" id="from" ref={afterDateFilterInput} />
          
          <input type="submit" value="Filter" className="btn btn-sm btn-primary submit-button"  />
          {/* <div>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Search..."
          />
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="date-from">From</label>
          <input type="date" id="date-from" className="form-control" />
        </div>
        <div className="d-flex align-items-center">
          <label htmlFor="date-to">To</label>
          <input type="date" id="date-to" className="form-control" />
        </div> */}
        </Form>
      )}
    </Formik>
  );
}

export default ChatFilter;
