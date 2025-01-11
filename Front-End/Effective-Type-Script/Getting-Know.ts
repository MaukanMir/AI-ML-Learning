const x = 2 + '3';  // OK
//    ^? const x: string
const y = '2' + 3;  // OK
//    ^? const y: string

const a = null + 7;  // Evaluates to 7 in JS
//        ~~~~ The value 'null' cannot be used here.
const b = [] + 12;  // Evaluates to '12' in JS
//        ~~~~~~~ Operator '+' cannot be applied to types ...
alert('Hello', 'TypeScript');  // alerts "Hello"
//             ~~~~~~~~~~~~ Expected 0-1 arguments, but got 2

// The guiding principle of TypeScript’s type system is that it should model JavaScript’s runtime behavior. 
// But in all of these cases, TypeScript considers it more likely that the odd usage is the result of an error than the developer’s intent, 
// so it goes beyond simply modeling the runtime behavior. We saw another example of this in the capital/capitol example, where the program didn’t 
// throw (it logged undefined) but the type checker still flagged an error.

const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());

// The root cause of these exceptions is that TypeScript’s understanding of a value’s type (its static type) and its actual type at runtime have diverged.
//  A type system that can guarantee the accuracy of its static types is said to be sound. TypeScript’s 
// type system is very much not sound, nor was it ever intended to be. Item 48 explores more ways that unsoundness can arise.