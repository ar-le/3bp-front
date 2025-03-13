interface ValidationMessageParams {
    max?: number,
    min?: number,
    field? : string,
    errorType: string
}

export const userValidationMessages = ({max = 0, min = 0, field = 'generic', errorType} : ValidationMessageParams)   => {
    
    const msgs = {
        email :{
            email: 'This is not a valid email address',
            required: 'You must provide an email address'
        },
        password : {
            required: 'You must provide a password'
        },
        confirmPassword: {
            confirmPassword: 'The password does not match'
        },
        generic : {
            required: 'This field is mandatory',
            max: `The character limit is ${max}`,
            min: `The character minimum is ${min}`
        }
    }

    const key = field as keyof typeof msgs;
    const section = msgs[key]
    const errorKey = errorType as keyof typeof section;

    return msgs[key][errorKey]
}


export const SUPPORTED_IMAGE_FORMATS = [
    "jpg",
    "jpeg",
    "gif",
    "png"
  ];