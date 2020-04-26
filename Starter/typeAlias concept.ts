// // const person: {
// //     name : string,
// //     age : number
// // } = {
//     // const person ={
//  const person: {
//     name : string,
//     age : number,
//     hobbies: string[],
//     role: [number, string],
//      } = {
//     name : 'Pushpender',
//     age: 30,
//     hobbies: ['Sports', 'Cooking'],  // Array having string
//     role: [2, 'author'],  // Tuple for fixed length array
// };

// // person.role.push('admin');
// // person.role[1] = 10;

// console.log(person);

// for(const hobby of person.hobbies){
//     console.log(hobby.toUpperCase());
// }


    // const ADMIN = 0;
    // const PERSON = 1;


    // For Enum 
    enum Role {ADMIN, OWNER, PERSON}; 
// For different behaviour enum Role {ADMIN: 100, OWNER: 'OWNER', PERSON}; 

        const person = {
            name : 'Pushpender',
            age: 30,
            hobbies: ['Sports', 'Cooking'],  // Array having string
            role : Role.ADMIN,
        };
        
        console.log(person);
        
        for(const hobby of person.hobbies){
            console.log(hobby.toUpperCase());
        }

        // Type Alias
        type User = { name: string } | string;
        let u1: User = {name: 'Max'};
            u1 = 'Michael';
            console.log(u1);