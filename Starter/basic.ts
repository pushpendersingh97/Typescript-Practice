function add(num1: number, num2: number, showResult: boolean, phrase: string){
    //console.log(typeof num1);
    const result = num1 + num2;
    if(showResult){
        console.log(phrase + result);
    }
    else
        return console.log(result);
}
// for Number
add(2.8, 5, true, 'Result is : ');