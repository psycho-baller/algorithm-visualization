import { LinkedList } from "./LinkedList";
import { Student } from "./Student";
export class HashTable {
  public static LEN: number = 8;
  public static arr: LinkedList<Student>[];

  public constructor() {
    HashTable.arr = new Array(HashTable.LEN);
    for (let i: number = 0; i < HashTable.LEN; i++) {
      HashTable.arr[i] = new LinkedList<Student>();
    }
  }

  public hashValue(s: string): number {
    //  Your implementation of the hash function goes here.
    //  For help with getting ASCII values of characters, see asciiIntDemo.java
    let sum: number = 0;
    for (let i: number = 0; i < s.length; i++) {
      sum = sum + s.charCodeAt(i);
    }

    return sum % HashTable.LEN;
  }

  public search(name: string): boolean {
    let index: number = this.hashValue(name);
    const list: LinkedList<Student> = HashTable.arr[
      index
    ] as LinkedList<Student>;
    var head = list.getHead();
    while (head !== null) {
      const s = head.data as Student;

      if (s.getName().toLowerCase() === name.toLowerCase()) {
        return true;
      }
      head = head.next;
    }
    return false;
  }

  public insert(name: string, age: number) {
    //  Remember that if a student of this name already exists in the table,
    //  you should modify that student's age. Otherwise, add a Student with
    //  appropriate name and age to the end of the appropriate linked list
    let index: number = this.hashValue(name);
    let list: LinkedList<Student> = HashTable.arr[index];
    var head = list.getHead();

    while (head !== null) {
      const s = head.data as Student;

      if (s.getName().toLowerCase() === name.toLowerCase()) {
        s.setAge(age);
        console.log("Student " + (name + (" is being modified to age " + age)));
        return;
      }
      head = head.next;
    }

    list.insertInBegin(new Student(name, age));
    console.log("Student " + (name + (" is being inserted with age " + age)));
    return;
  }

  public delete(name: string) {
    //  Remember that if the hash table has no students of this name,
    //  then you should print a message indicating this.
    let index: number = this.hashValue(name);
    let list: LinkedList<Student> = HashTable.arr[index];
    var head = list.getHead();
    while (head !== null) {
      const s = head.data as Student;

      if (s.getName().toLowerCase() === name.toLowerCase()) {
        list.remove(s);
        console.log("Student " + (name + " is being deleted"));
        return;
      }
      head = head.next;
    }
    console.log("Student " + (name + " is not in the hash table"));
  }

  public getAge(name: string): number {
    //  Remember that if the hash table has no students of this name,
    //  then you should print a message indicating this and return -1.
    let index: number = this.hashValue(name);
    let list: LinkedList<Student> = HashTable.arr[index];
    var head = list.getHead();
    while (head !== null) {
      const s = head.data as Student;

      if (s.getName().toLowerCase() === name.toLowerCase()) {
        return s.getAge();
      }
      head = head.next;
    }
    console.log("Student " + (name + " is not in the hash table"));
    return -1;
  }

  public increment(name: string) {
    //  Remember that if the hash table has no students of this name,
    //  then a message should be printed indicating this
    let index: number = this.hashValue(name);
    let list: LinkedList<Student> = HashTable.arr[index];
    var head = list.getHead();
    while (head !== null) {
      const s = head.data as Student;

      if (s.getName().toLowerCase() === name.toLowerCase()) {
        s.setAge(s.getAge() + 1);
        console.log("Student " + (name + " is being incremented by 1"));
        return;
      }
      head = head.next;
    }
    console.log("Student " + (name + " is not in the hash table"));
  }
  public reset(){
    for (let i: number = 0; i < HashTable.arr.length; i++) {
      HashTable.arr[i].reset();
    }
  }

  public toString(): string {
    //  Hint: Its intended that you use the built-in tostring()
    //  for LinkedList, which will implicitly call the tostring()
    //  for Student, which has already been implemented.
    let sb: string[] = [];
    for (let i: number = 0; i < HashTable.arr.length; i++) {
      sb.push(i + (": [" + (HashTable.arr[i].toString() + "]\n")));
    }
    return sb.join("").toString();
  }
}
