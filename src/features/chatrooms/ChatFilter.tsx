import { Formik, FormikProps, Form } from "formik";

import * as Yup from "yup";
import { TextInput } from "../../components/TextInput";
import { DateInput } from "../../components/DateInput";
import { SubmitButton } from "../../components/SubmitButton";

interface Values {
  textFilter: string;
  from: string;
  to: string;
}

interface ChatFilterProps {
  onSubmitFn: (textFilter: string, to: string, from: string) => void;
}

function ChatFilter() {
  return (
    <Formik
      initialValues={{
        textFilter: "",
        from: "",
        to: "",
      }}
      validationSchema={Yup.object({
        textFilter: Yup.string().max(20, "Max 20"),
        from: Yup.date().max(Yup.ref("to"), "From must be before To"),
        to: Yup.date().min(Yup.ref("from"), "To must be after From"),
      })}
      onSubmit={values => {
        // onSubmitFn(values.textFilter, values.to, values.from);
      }}
    >
      {(props: FormikProps<Values>) => (
        <Form className="d-flex">
          <TextInput label="Search" name="textFilter" id="textFilter" />
          <DateInput label="From" name="from" id="from" />
          <DateInput label="To" name="to" id="to" />
          <SubmitButton label="Access" />
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
