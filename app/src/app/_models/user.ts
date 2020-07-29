export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  last_login: string;
  // Question mark means optional
  token?: string;
}
