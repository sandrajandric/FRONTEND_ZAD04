import * as yup from 'yup';
import { DateTime } from 'luxon';

export const usernamePasswordYupSchema = yup.object({
    password: yup.string().required("No password provided")
        .matches(/^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9])(?=.*[.,?!:;-]).{12,}$/, "Must contain at least two capital letters, two lowercase letters, one number, one special character"),
    /* username: yup.string().required("Username polje je obavezno")
        .test(
            function(value) {fetch(`http://localhost:3081/app/checkUsername/${value}`, {
                method: "GET",
                headers: {
                  'Content-Type': 'application/json'
                },
            }).then(resp => resp.json())
            .then(data => {
                if(data.body === true) {
                  alert("Korisnicko ime je zauzeto!");
                  window.location.reload();
                }
            })
        }) */
    });


 export const bookYupSchema = yup.object({
    id: yup.number().required().positive().integer("ID mora biti ceo broj"),
    authors: yup.string().required("Mora postojati bar jedan autor"),
    publishDate: yup.date().max(DateTime.now(), "Ne može datum skoriji od danas"),
    rating: yup.number().min(1).max(5),
    genre: yup.string(),
    title: yup.string().required(),
    isbn: yup.number().max(9999999999999, "ISBN mora sadrzati 13 cifara").min(1000000000000, "ISBN mora sadrzati 13 cifara"),
    available: yup.boolean(),
    pages: yup.number().required().positive().integer("Broj stranica mora biti ceo broj"),
 });

 export const toStandardTime = (time) => {
    return time.toFormat("y-M-dd");
}

export function countChrOccurence (password) {
    let charMap = new Map();
    const count = 0;
     for (const key of password) {
      charMap.set(key,count); 
     }
   
     for (const key of password) {
       let count = charMap.get(key);
       charMap.set(key, count + 1);
     }
   
     for (const [key,value] of charMap) {
       if (value >= (password.length / 4)) {
           alert("Ponovili ste karakter " + key + " previse puta.")
       }
     }
   }  
   

const rank = {
    TOO_SHORT: 0,
    WEAK: 1,
    MEDIUM: 2,
    STRONG: 3,
    VERY_STRONG: 4
}

export function passwordStrength (password) {
    let upper = /[A-Z]/,
    lower = /[a-z]/,
    number = /[0-9]/,
    special = /[.,?!:;-]/,
    minLength = 12,
    score = 0;

    if (password.length < minLength) {
     return rank.TOO_SHORT;
    }

    if (upper.test(password)) score++;
    if (lower.test(password)) score++;
    if (number.test(password)) score++;
    if (special.test(password)) score++;
    if ((upper.test(password)) && (lower.test(password)) && (number.test(password)) && (special.test(password))
    && (password.length >= minLength)) {
        score += Math.floor((password.length - minLength) / 2);
        return rank.VERY_STRONG;
    }


    if (score < 3) return rank.WEAK;
    if (score < 4) return rank.MEDIUM;
    if (score < 6) return rank.STRONG;
 
    
    return rank.VERY_STRONG;
}

