export class AppError {
  mensage: string;

  constructor(public message: string) {
    this.mensage = message;
  }
}
