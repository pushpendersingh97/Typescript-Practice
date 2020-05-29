// Code goes here!
// ===========Intersection Type ==============
type Admin ={
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

// interface ElevatedEmployee extends Admin, Employee{};
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee ={
    name: 'Max',
    privileges: ['create Serve'],
    startDate: new Date()
}

type Combinable = string|number;
type Numberic = number| boolean;

type Universal = Combinable  & Numberic;    // this is intersection type

 // ============Type Guards=======================
 function add(a: number, b:number): number; // function Overloads: we need only result as a number not combiable
 function add(a:Combinable, b:Combinable){
     if(typeof a==='string' || typeof b === 'string')
         return a.toString() + b.toString();

     return a+b;
 } 

 let a = add(9,10);

 type UnknownEmployee = Employee | Admin;

 function printEmployeeinformation (emp: UnknownEmployee){
     console.log('Name: ' + emp.name);
     if('privileges' in emp){
         console.log('Privilages: ' + emp.privileges);
     }
     if('startDate' in emp){
        console.log('StartDate: ' + emp.startDate);
    }
 }
 printEmployeeinformation(e1);

 class Car {
     drive(){
         console.log("Driving..")
     }

}

class Truck {
    drive(){
        console.log('Driving truck...');
    }

    loadCargo(amount: number){
        console.log('Loading Cargo...' + amount);
    }
}
type Vehicle = Car|Truck;

const v1= new Car();
const v2= new Truck();

function useVehicle(vehicle: Vehicle){
    vehicle.drive();

    if(vehicle instanceof Truck){
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// ========== Discrimininated union
interface Bird {
    type:'bird';
    flyingSpeed: number;
}
interface Horse {
    type: 'horse';
    runningSpeed: number;
}
type Animal = Bird|Horse;

function moveAnimal (animal: Animal){
    let speed;
    switch(animal.type){
        case 'bird': speed = animal.flyingSpeed;
        break;
        case 'horse' : speed = animal.runningSpeed;
     }
     console.log('Moving With speed: ' + speed);
}
moveAnimal({type:'bird', flyingSpeed: 10});


// Type Casting
//let userInput = <HTMLInputElement>document.getElementById("user-input")!;     // as react have these <> brackets for something else
let userInput = document.getElementById("user-input")! as HTMLInputElement;
userInput.value = 'Hello there';

// Alternative 
let userInput1 = document.getElementById("user-input-1");
if(userInput1){
    (userInput1 as HTMLInputElement).value = 'Hello there';
}

// Index Property => 
interface ErrorContainer {
    [prop: string]: string; 
}

const errorBag: ErrorContainer = {
    email: 'not a valid Email',
    username: 'Must start with a capital letter'
}

// Nullish Coalecing
const abc= '';

const storedData = abc ?? 'nullish';
console.log(storedData);