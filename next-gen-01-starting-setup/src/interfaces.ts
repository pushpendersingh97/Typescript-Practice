// Interfaces=> Also known as  “duck typing” or “structural subtyping”
// It can only be used to describe the structure.
interface PersonInterface {
    name: string;
    age: number;

    greet(phrase: string): void;
}

//======================================== Class with interface
class PersonClass implements PersonInterface {
  constructor(n:string, a: number){
    this.name = n;
    this.age = a;
  }
  name: string;
  age: number;
  greet(phrase: string): void {
    console.log(this.name + this.age + phrase);
  }
  
}
let user2 = new PersonClass('hello', 30);
console.log(user2);

let user1: PersonInterface;
user1 = {
    name: 'max',
    age: 23,

    greet(phrase: string){
        console.log(`${phrase} is ${this.name}`)
    }
}

user1.greet('Hi there');

//====================================== Optional Properties
interface SquareConfig {
    color?: string;
    width?: number;
  }
  
  function createSquare(config: SquareConfig): { color: string; area: number } {
    let newSquare = { color: "white", area: 100 };
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;
  }
  
  let mySquare = createSquare({ color: "black" });
  console.log(mySquare);
  let mySquare1 = createSquare({ width: 100, opacity: 0.5 } as SquareConfig); // typer assertion 
  console.log(mySquare1);   // Prints {area: 10000, color: white}

  /////////////////////////////// ReadOnly Properties ::: Variables use const whereas properties use readonly.
  interface Point {
      readonly x: number;
      readonly y : number;
  }
  let x1:Point = {x:5, y:5};

 // x1.x = 10; // error: cannot assign as x is readonly.

 let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
//ro[0] = 1; // error as ro is readonly



/////////////////////////////// Extends Interfaces////////////////////////////////

interface Physics {
  name : string;
}

interface Maths extends Physics {
  greet(phrase:string):void;
}

class Subject implements Maths {
  name: string;
  
  constructor(n:string){
    this.name = n;
  }
  greet(phrase:string){
    console.log(phrase + this.name);
  }

}
let _subject = new Subject('Pushpender Singh');
_subject.greet('HI, ');


// =====================Interface as Function Type ============================================//
// type Addfn = (a:number, b:number)=> number;
interface Addfn {
  (a:number, b:number): number;
}

let add:Addfn;
add = (n1:number, n2:number) => {
  return n1+n2;
}