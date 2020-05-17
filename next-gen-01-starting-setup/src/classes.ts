// Classes concept in ts

class Department {
    name : string;

    constructor(n:string){
        this.name = n;
    }

    describe(this: Department){
        console.log("Department: " + this.name);
    };
}

const accounting = new Department("Accounting");
accounting.describe();

// Inheritance

class Animal {
    name: string;
    constructor(n: string){
        this.name  = n;
    }

    move(distance: number = 0){
        console.log(`${this.name} moves ${distance} in a day`);
    }
}

class Snake extends Animal{
    constructor(name: string){
        super(name);
    }

    move(distance = 5){
        console.log("Snake class");
        super.move(distance);
    }
}

let snake = new Snake('Hero');
snake.move();


// Public Modifer
// Class is public by default.

class StudentPublic {
    public name!: string;
    public constructor(n: string){
        this.name = n;
    }

    public study(){
        console.log("Public example, Hello " + this.name);
    }
}

let studentClass = new StudentPublic("Pushpender Singh");
console.log(studentClass.name);

// Private Modifier
// variable is not accesible outside the class. 
// we can also use private keyword instead of #
class StudentPrivate {
    #name!: string;         
    constructor(n: string){
        this.#name = n;
    }

    public study(){
        console.log("Private example, Hello " + this.#name);
    }
}

let studentPrivateClass = new StudentPrivate("Pushpender Singh Private");
//console.log(studentPrivateClass.#name); // It will give compile error


// Protected Modifier
// protected variable can be accessible in the derived classes.

class Person {
    protected name: string;
    protected constructor(n:string){
        this.name  = n;
    }
}

class Employee extends Person {
    private department: string;
    constructor(n:string, d: string){
        super(n);
        this.department = d;
    }

    public getDepartment(){
        console.log(`${this.name} is a ${this.department}`);
    }
}

let employeeClass = new Employee('Pushpender Singh', 'Software developer');
employeeClass.getDepartment();
//employeeClass.name; // Not accessiable
// let personClass = new Person('Pushpender Protected'); //  Compile error as constructor is protected

// Read Only Modifier
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
      this.name = theName;
    }
  }
  let dad = new Octopus("Man with the 8 strong legs");
  //dad.name = "Man with the 3-piece suit"; // error! name is readonly.


// Setter and Getter in Classes
// This thing is not supported in ES3
const fullNameMaxLength = 10;

class EmployeeSetterGetter {
  private _fullName!: string;

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }

    this._fullName = newName;
  }
}

let employee = new EmployeeSetterGetter();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}

// Read Only Modifier
class ReadOnlyModifer {
    
    constructor(private readonly name: string){}

    getRead(){
       // this.name = "hello"; // As it is readonly
        console.log(`${this.name}`);
    }
}
var readOnlyModifer = new  ReadOnlyModifer("Puspa");

readOnlyModifer.getRead();
