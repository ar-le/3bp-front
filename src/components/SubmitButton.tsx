import { useFormikContext } from "formik";

export function SubmitButton({label = 'Send'} : {label?:string}){
    const { isValid, dirty, isSubmitting} = useFormikContext();
    return (
        <button className="btn btn-primary mt-4" type="submit" disabled={!isValid || !dirty || isSubmitting}>{label}</button>
    )
  }