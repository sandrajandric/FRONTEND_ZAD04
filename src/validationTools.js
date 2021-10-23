import * as yup from 'yup';
//import { DateTime } from 'luxon';


export const passwordYupSchema = yup.object({
    password: yup.string().required("No password provided")
        .matches(/^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9])(?=.*[.,?!:;-]).{12}$/, "Must contain at least two capital letters, two lowercase letters, one number, one special character"),
    passwordConfirmation: yup.string()
    .test('passwords-match', 'Passwords must match', function(value){
        return this.parent.password === value
      })
    });

/*export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}*/