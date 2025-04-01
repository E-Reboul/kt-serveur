// import { IUser, UserDto } from "@/types/users/userDto.js";

// class User {
//     private user: IUser;

//     constructor(user: IUser) {
//         this.user = {
//             id: user.id,
//             username: user.username,
//             password: user.password,
//             password_kids: user.password_kids,
//             email: user.email,
//             role: user.role,
//             createdAt: user.createdAt
//         };
//     }

//     public static getAllUsers(users: User[]): UserDto[] {
//         return users.map((user: User): UserDto => user.getUser());
//     }

//     public getUser(): UserDto {
//         const { password, password_kids, ...safeUser } = this.user;
//         return safeUser;
//       }

//     public setUser(user: IUser): void {
//         this.user = user;
//     }

//     public setId(id: number): void {
//         this.user.id = id;
//     }

//     public getId(): number {
//         return this.user.id;
//     }

//     public setUsername(username: string): void {
//         this.user.username = username;
//     }

//     public getUsername(): string {
//         return this.user.username;
//     }

//     public setPassword(password: string): void {
//         this.user.password = password;
//     }

//     public getPassword(): string {
//         return this.user.password;
//     }

//     public setPasswordKids(password_kids: string): void {
//         this.user.password_kids = password_kids;
//     }

//     public getPasswordKids(): string {
//         return this.user.password_kids;
//     }

//     public setEmail(email: string): void {
//         this.user.email = email;
//     }

//     public getEmail(): string {
//         return this.user.email;
//     }

//     public setRole(role: string): void {
//         this.user.role = role;
//     }

//     public getRole(): string {
//         return this.user.role;
//     }

//     public setCreatedAt(createdAt: Date): void {
//         this.user.createdAt = createdAt;
//     }

//     public getCreatedAt(): Date {
//         return this.user.createdAt;
//     }

//     public isUser(): boolean {
//         return this.user.role === "user";
//     }

//     public isAdmin(): boolean {
//         return this.user.role === "admin";
//     }
// }

// export default User;
