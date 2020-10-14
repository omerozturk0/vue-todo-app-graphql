export default class TodoModel {
  public id?: number;
  public description: string;
  public isDone: boolean;

  constructor() {
    this.description = '';
    this.isDone = false;
  }
}
