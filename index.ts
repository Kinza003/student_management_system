#! /usr/bin/env node

import inquirer from "inquirer";

console.log("Welcome to student management system! \n");

// creating a class of student

class Student {
    static idCounter : number = 0;
    studentID : number;
    course : string[] = [];
    balance : number = 0;

    constructor (private name : string) {
        Student.idCounter++;
        this.studentID = this.generateStudentID();
    }

    generateStudentID () {
        return 1000 + Student.idCounter;        // 1, 2, 3 and so on 
    }

    enrollCourse (course : string) {
        this.course.push(course);
        this.balance += 1000;               // each course fee is 1000
    }

    viewBalance (): number {
        return this.balance;                // pending balance of a student
    }

    payCourseFees (amount : number) {
        this.balance -= amount;             // the balance of student will - amount paid by student
    }

    showStatus () {
        console.log(`
            Name: ${this.name},
            Student ID: ${this.studentID},
            Courses Enrolled: ${this.course.join(", ")},
            Balance: ${this.balance}`);
    }

    getStudentID (): number {
        return this.studentID;
    }

    getName () {
        return this.name;
    }
}

// class end

const students : Student[] = [];       // student list will store here

// mainMenu

async function  mainMenu () {
    const userInputMenu = await inquirer.prompt({
        type: "list",
        name: "menu",
        message: "Select your menu!",
        choices: [
            "1. Add new student",
            "2. Enroll student in course",
            "3. View student balance",
            "4. Pay course fees",
            "5. Show student status",
            "6. End menu"
        ]
    })

    // destructuring
    const {menu} = userInputMenu;

    if (menu === "1. Add new student") await addNewStudent();
    if (menu === "2. Enroll student in course") await enrollStudent();
    if (menu === "3. View student balance") await viewBalance();
    if (menu === "4. Pay course fees") await payTuition();
    if (menu === "5. Show student status") await showStatus();
    if (menu === "6. End menu") {
        console.log("Thankyou for using Student Management System!'n");
        process.exit();
    }
    mainMenu();

}

// mainMenu ends

// start creating functions

// addNewStudent() start

async function addNewStudent() {
    const userInput = await inquirer.prompt({
        type: "input",
        name: "name",
        message: "Enter student name: ",
    })

    const student = new Student (userInput.name);

    students.push(student);
    console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}`)
}

// addNewStudent ends

// enrollStudent() start
async function enrollStudent () {
    const student = await selectStudent()

    if (student) {
        const userInput = await inquirer.prompt({
            type: "list",
            name: "courses",
            message: "Select courses to enroll",
            choices: ["Typescript", "Javascript", "Python", "CSS", "HTML", "Nextjs"]
        })
        student.enrollCourse(userInput.course)
        console.log(`Successfully Enrolled in Course: ${userInput.course}`);
    }
}

// enrollStudent ends

// viewBalance() start

async function viewBalance () {
    const student = await selectStudent();

    if (student) {
        console.log(`Balance: ${student.viewBalance()}`);
    }
}

// viewBalance ends

// payTuition() starts
async function payTuition () {
    const student = await selectStudent();

    if (student) {
        const userInput = await inquirer.prompt({
            type: "input",
            name: "amount",
            message: "Enter amount you want to pay: ",
        })

        student.payCourseFees(parseFloat(userInput.amount));
        console.log(`Paid ${userInput.amount}. Balance remaining ${student.viewBalance()}`);
    }
}

// payTuition ends

// showStatus() starts

async function showStatus () {
    const student = await selectStudent();
    if (student) {
        student.showStatus();
    }
}

// showStatus ends

// selectStudent() starts

async function selectStudent () {
    if (students.length === 0) {
        console.log(`No student record available`);
    } else {
        const stdSelect = await inquirer.prompt ({
            type: "list",
            name: "stdID",
            message: "Select a student!",
            choices: students.map((std) => ({
                name: std.getName(),
                value: std.getStudentID()
            }))
        }
    )
    return (
        students.find((std) => std.getStudentID() === stdSelect.stdID) || null
    )}
}

mainMenu();





















// import inquirer from "inquirer";

// console.log(`Welcome to Student Management System!\n`);

// // creating a class of student
// class Student {
//   //properties
//   static idCounter: number = 0;
//   studentID: number;
//   courses: string[] = [];
//   balance: number = 0;

//   constructor(private name: string){
//     Student.idCounter++;
//     this.studentID = this.generateStudentID();
//   }

//   generateStudentID(){
//     return 10000 + Student.idCounter // 10001, 10002 and so on
//   }

//   enrollCourse(course: string){
//     this.courses.push(course);
//     this.balance += 1000    // each course fees is 1000
//   }

//   viewBalance(): number{
//     return this.balance //  pending balance of a student
//   }

//   payCoursesFee(amount: number){
//     this.balance -= amount    // the balance of student will - amount paid by student
//   }

//   showStatus(){
//     console.log(`
//       Name: ${this.name}
//       Student ID: ${this.studentID}
//       Courses Enrolled: ${this.courses.join(", ")}
//       Balance: ${this.balance}
//       `)
//   }

//   getStudentID(): number{
//     return this.studentID
//   }

//   getName(){
//     return this.name;
//   }
// }

// // class ends here

// const students: Student[] = [] // students list will be stored here

// // mainMenu start
// async function mainMenu(){
//   const userInputMenu = await inquirer.prompt({
//     type: 'list',
//     name: 'menu',
//     message: 'Select your Menu!',
//     choices: [
//       "1. Add New Student",
//       "2. Enroll Student in Course",
//       "3. View Student Balance",
//       "4. Pay course fees",
//       "5. Show Student Status",
//       "6. End Menu"
//     ]
//   });

//   // destructuring
//   const {menu} = userInputMenu;

//   if(menu === "1. Add New Student") await addNewStudent();
//   if(menu === "2. Enroll Student in Course") await enrollStudent();
//   if(menu === "3. View Student Balance") await viewBalance();
//   if(menu === "4. Pay course fees") await payTuition();
//   if(menu === "5. Show Student Status") await showStatus();
//   if(menu === "6. End Menu"){
//     console.log(`Thank you for using Student Management System\n`);
//     process.exit();
//   }
//   mainMenu();
// }
// // mainMenu ends

// // start creating functions

// // addNewStudent start here
// async function addNewStudent(){
//   const userInput = await inquirer.prompt({
//     type: 'input',
//     name: 'name',
//     message: 'Enter Student Name here!'
//   });

//   const student = new Student(userInput.name);

//   students.push(student);
//   console.log(`Student ${student.getName()} added with ID ${student.getStudentID()}\n`);
// }
  // // addNewStudent ends here


// // enrollStudent start here
// async function enrollStudent(){
//     const student = await selectStudent() // we will create this function after

//     if(student){
//       const userInput = await inquirer.prompt({
//         type: 'list',
//         name: 'course',
//         message: 'Select courses to enroll',
//         choices: ['TypeScript', "JavaScript", "Python", "Next.js"]
//       });

//       student.enrollCourse(userInput.course);
//       console.log(`Successfully Enrolled in Course: ${userInput.course}`)
//     }
// }
// // enrollStudent ends here


// // viewBalance start here
// async function viewBalance(){
//   const student = await selectStudent();

//   if(student){
//     console.log(`Balance: ${student.viewBalance()}`)
//   }
// }
// // viewBalance ends here


// //payTuition() starts here
// async function payTuition(){
//   const student = await selectStudent();

//   if(student){
//     const userInput = await inquirer.prompt({
//       type: 'input',
//       name: 'amount',
//       message: 'Enter amount you want to pay?'
//     });

//     student.payCoursesFee(parseFloat(userInput.amount));
//     console.log(`Paid ${userInput.amount}. Balance remaining ${student.viewBalance()}`)
//   }
// }
// //payTuition() ends here


// // showStatus() starts here
// async function showStatus(){
//   const student = await selectStudent();
//   if(student){
//     student.showStatus();
//   }
// }
// // showStatus() ends here


// // selectStudent() start here
// async function selectStudent(){
//   if(students.length === 0){
//     console.log('No Students record available.\n')
//   }else{
//     const stdSelect = await inquirer.prompt({
//       type: 'list',
//       name: 'stdID',
//       message: 'Select a student!',
//       choices: students.map((std) => ({
//         name: std.getName(),
//         value: std.getStudentID()
//       }))
//     });

//     return (
//       students.find((std)=> std.getStudentID() === stdSelect.stdID) || null
//     )
//   }
// }
// // selectStudent() start here

// mainMenu();

