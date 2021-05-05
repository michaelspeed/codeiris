export abstract class CodeirisEvents {
  public readonly createdAt: Date;

  protected constructor() {
    this.createdAt = new Date();
  }
}
