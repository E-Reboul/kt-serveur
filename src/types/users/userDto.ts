export type IUser = {
    id: number;
    username: string;
    password: string;
    password_kids: string;
    email: string;
    role: string;
    createdAt: Date;
  };

export type UserDto = Omit<IUser, "password" | "password_kids">;

// Champs utilisés dans différents contextes
export type RequiredFields = "username" | "email";

export type OptionalFields = Exclude<keyof UserDto, RequiredFields>;

export type UserListDto = UserDto[];

// Tous les champs modifiables (sauf id et createdAt), tous optionnels
export type CreateUserDto = Partial<Omit<IUser, "id" | "role" | "createdAt" >>;

// Champs modifiables (sauf id et createdAt), tous optionnels
export type UpdateUserDto = Partial<Omit<IUser, "id" | "role" | "createdAt">>;



// AUTHENTIFICATION ⬇️

// // Tous les autres champs (non requis à la création)
// export type RequiredSignUpFields = "username" | "email" | "password" | "password_kids";

// // Tous les champs requis pour la connexion
// export type SignInUserDto = { email: UserDto["email"] } & Partial<Pick<UserDto, "password" | "password_kids">>;

// // Tous les champs requis pour la création
// export type SignUpUserDto = Pick<UserDto, RequiredSignUpFields>;