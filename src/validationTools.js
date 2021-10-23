import * as yup from 'yup';
//import { DateTime } from 'luxon';


export const passwordYupSchema = yup.object({
    password: yup.string().required("No password provided")
        .matches(/^(?=.*[A-Z].*[A-Z])(?=.*[a-z].*[a-z])(?=.*[0-9])(?=.*[.,?!:;-]).{12,}$/, "Must contain at least two capital letters, two lowercase letters, one number, one special character")
    });

export function countChrOccurence (password) {
    let charMap = new Map();
    const count = 0;
     for (const key of password) {
      charMap.set(key,count); // initialize every character with 0. this would make charMap to be 'h'=> 0, 'e' => 0, 'l' => 0, 
     }
   
     for (const key of password) {
       let count = charMap.get(key);
       charMap.set(key, count + 1);
     }
   // 'h' => 1, 'e' => 1, 'l' => 2, 'o' => 1
   
     for (const [key,value] of charMap) {
       if (value >= 2) {
           alert("Ponovili ste karakter " + key + " previse puta.")
       }
     }
   // ['h',1],['e',1],['l',2],['o',1]
   }  
   
/*export const toStandardTime = (time) => {
    return time.toFormat("y-MM-dd");
}*/

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
     return rank.TOO_SHORT; // End early
    }

    // Increment the score for each of these conditions
    if (upper.test(password)) score++;
    if (lower.test(password)) score++;
    if (number.test(password)) score++;
    if (special.test(password)) score++;
    if ((upper.test(password)) && (lower.test(password)) && (number.test(password)) && (special.test(password))
    && (password.length >= minLength)) {
        score += Math.floor((password.length - minLength) / 2);
        return rank.VERY_STRONG;
    }


    // Return a ranking based on the calculated score
    if (score < 3) return rank.WEAK; // score is 2 or lower
    if (score < 4) return rank.MEDIUM; // score is 3
    if (score < 6) return rank.STRONG; // score is 4 or 5
 
    
    return rank.VERY_STRONG; // score is 6 or higher
}


