// Normal Decorator
// function Logger(constructor: Function){
//     console.log("Logging....");
//     console.log(constructor);
// }

// @Logger
// class Person{
//     name = 'max';

//     constructor(){
//         console.log("Creating new person object...");
//     }
// }

// let _person = new Person();
// console.log(_person);

// Decorator Factories
function Logger(logString: string){
   return function (constructor: Function){
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template:string, hookId: string){
    console.log("TEMPLATE FACTORY");

    return function<T extends {new(...args: any[]): {name:string}}>( originalConstructor: T){
        console.log("Rendering Template");

        // returning class as returning decorartor
        return class extends originalConstructor{
            constructor(..._: any[]){
                super();
               
                const hookEl = document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

// @Logger("Factory")
@WithTemplate('<h1>My person Object', 'app')
class Person{
    name = 'max';

    constructor(){
        console.log("Creating new person object...");
    }
}

let _person = new Person(); // The with template will not rendered name until the class person is inistiated
console.log(_person);


// ----
function Log(target: any, propertyName: string|symbol){
    console.log('Property Decorator');
    console.log(target, propertyName)
}

function Log2 (target: any, name: string, descriptor: PropertyDescriptor){
    console.log('Accessor decorter');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3 (target: any, name: string, descriptor: PropertyDescriptor){
    console.log('Method decorter');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string, position: number){
    console.log('Parameter decorter');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val : number){
        if(val > 0){
            this._price = val;
        }
        else new Error('Invalid Price - should be positive')
    }

    constructor(t:string, p: number){
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number){
        return this._price *(1+ tax);
    }
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor){
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor= {
        configurable: true,
        enumerable:false,
        get(){
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    }
    return adjDescriptor;
}


class Printer {
    message = 'This works';

    @AutoBind
    showMessage(){
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage);

// Dcorators with validation => Bug in this, It can't store more than one value
interface ValidateConfig {
    [property: string]: {
        [validateProp: string] : string[];
    }
}

const registeredValidator: ValidateConfig = {};

function Required(target: any, propName: string){
    registeredValidator[target.constructor.name] = {
        ...registeredValidator[target.constructor.name],
        [propName] : ['required']
    }
}

function PositiveNumber(target: any, propName: string){
    registeredValidator[target.constructor.price] = {
        ...registeredValidator[target.constructor.price],
        [propName] : ['positive']
    }
}

function Validate(obj: any){
    const objValidatorConfig = registeredValidator[obj.constructor.name];
    if(!objValidatorConfig)
        return true;

        let isValid = true;
    for(const prop in objValidatorConfig){
        for (const validator of objValidatorConfig[prop]){
            switch(validator){
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive': 
                isValid = isValid && obj[prop] > 0;
                break;
                
            }
        }
    }
    return isValid;
}

class Course{
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t:string, p:number){
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event=> {
    event.preventDefault();
    const titleEl = document.getElementById('title')  as HTMLInputElement;
    const priceEl = document.getElementById('price')  as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if(!Validate(createdCourse)){
        alert("Invalid input, please try again");
        return;
    }
    console.log(createdCourse);
}); 

