// Function Callback

// function add(n1: number, n2:number, cb: (num: number) => void){
    
//    let result =  n1+n2;
//    cb(result);
// }

// let num1 = 1;
// let num2 = 2.4;
// add(num1, num2, (result) => {
//     console.log(result);
// });


// Unknown type
let userInput: unknown;
let user: string;
userInput= 5;
userInput = 'Max';

if(typeof userInput === 'string'){
    user = userInput;
}

// Never Type
function generateError(message: string, code: number):never {
    throw {message: message, errorCode: code}
}

const result = generateError('get error', 404);
