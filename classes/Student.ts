export class Student
{
    private name:string;
    private age:number;
    constructor(name:string, age:number)
    {
        this.name = name;
        this.age = age;
    }
    public setName(name:string):void
    {
        this.name = name;
    }
    public getName():string
    {
        return this.name;
    }
    public setAge(age:number):void
    {
        this.age = age;
    }
    public getAge(): number
    {
        return this.age;
    }
    public toString(): string
    {
        var s = this.name + ":" + this.age.toString();
        return s;
    }
}