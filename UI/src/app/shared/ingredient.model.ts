export class Ingredient {

  constructor(
    public name:string,
    public amount:number,
    public unit: string,
    public id?: number,
    public isCompleted?: boolean,
    public priority?: number,
    public isSelected?: boolean){
  }
}
