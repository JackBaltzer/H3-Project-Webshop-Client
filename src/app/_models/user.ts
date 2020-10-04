export class User {
	id: number;
	email: string;
	password: string;
	roleAccess: number;
	role: string;
	token?: string;
}