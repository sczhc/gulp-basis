class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    toString() {
        console.log('toString')
    }
}

class Student extends Person {
    constructor(name, age, studeId) {
        super(name, age)
        this.studeId = studeId
    }

    sayHi() {
        console.log(`My name is ${this.name}, I am ${this.age} years old and my student ID is ${this.studeId}`)
    }
}

let person = new Person('jason', 20)
// console.log(person.name)
// console.log(person.age)

let student = new Student('jack', 18, '123123123')
student.sayHi()
student.toString()
console.log(student)