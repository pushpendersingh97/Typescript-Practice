// Basic Types: Number, String, Boolean, void, null, undefined
//Number type
let num : number = 10;
console.log(num);


// String Type
let str: string = 'Hello there';
console.log(str);

// Boolean Type
let t: boolean = true;
console.log(t);

// Array
let list : number[] = [1,2,3];
let list1 : Array<number> = [1,2,3];

console.log(list);
console.log(list1);

//Tupple
let x: [number, string];
x = [10, 'Pushpender'];
console.log(x[0]);

//enum
enum color {
    red, blue, white
}
let m: color = color.blue;
console.log(m);

// Function type : void will not return anything
function type(n: number, s: string, b: boolean): void {
    b ? console.log(n) : console.log(s);
}

type(10,'function type', false);

// Need to read more ....
//Objects : 
// declare function create(o: object | null): void;
// create({ prop: 0 }); // OK
// create(null); // OK

// create(42); // Error
// Argument of type '42' is not assignable to parameter of type 'object | null'.
// create("string"); // Error
// Argument of type '"string"' is not assignable to parameter of type 'object | null'.
// create(false); // Error
// Argument of type 'false' is not assignable to parameter of type 'object | null'.
// create(undefined); // Error
// Argument of type 'undefined' is not assignable to parameter of type 'object | null'.


// Type assertion
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
console.log(strLength);
