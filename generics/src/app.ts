// Code goes here!

// const abc: Array<string> = [];

// const promise: Promise<string>= new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('this is done');

//     }, 2000);
// });


// ====================Generic Function =======================
function merge<T, U>(objA:T, objB: U ){
    return Object.assign(objA, objB);
}

let mergedObj = merge({name:'max'}, {age: 30});
let mergedObj1 = merge<string, number>('Pushpender', 23);   // Specific type in the generic function
console.log(mergedObj.name);


// ======================Type Constraints ============
// function mergePart1<T, U>(objA:T, objB: U ){
//     return Object.assign(objA, objB);
// }
// let mergedObj2 = mergePart1({name:'max'},  30);
// console.log(mergedObj2);    // It will not merge the 30 in the object
function mergePart1<T extends object, U extends object>(objA:T, objB: U ){      // we can use any type replaement of object 
        return Object.assign(objA, objB);
    }

  //  let mergedObj2 = mergePart1({name:'max'},  30);   // Error as 30 is not an object type

interface lengthy {
    length : number;
}

function countAndDescibe<T extends lengthy>(element: T): [T, string]{
    let describtionText = 'Got no value';
    if(element.length === 1){
        describtionText = 'Got 1 element';
    }
    else if(element.length > 1){
        describtionText = 'Got '+ element.length+' elements';
    }

    return [element, describtionText];
} 

console.log(countAndDescibe('hello there'));
console.log(countAndDescibe(['Hello', 'there']));
// console.log(countAndDescibe(20));  //  will give error


//============Keyof Constraints =================
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key:U){
    return obj[key];
}

extractAndConvert({name: 'max'}, 'name');

// ============Generic Class =============// Limitation in objects
class DataStorage <T extends string|number | boolean>{
    private data: T[] = [];

    addItem(item: T){
        this.data.push(item);
    }

    removeItem(item:T){
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems(){
        return [...this.data];
    }
}

const textStorgae = new DataStorage<string>();
textStorgae.addItem('Hello');
textStorgae.addItem('hi');

console.log(textStorgae.getItems());

const numberStorgae = new DataStorage<number>();
numberStorgae.addItem(20);


// ==== Generic Utility Type ==== 
// For reference : https://www.typescriptlang.org/docs/handbook/utility-types.html

interface CourseGoal {
    title: string;
    description: string;
    completeUtil: Date;
}


function createCourseGoal (
    title: string,
    description: string,
    date: Date
 ): CourseGoal {
     let courseGoal : Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUtil = date;

    return courseGoal as CourseGoal;
 }

 const names: Readonly<string[]> = ['max', 'Anna'];
//names.push('manu');
