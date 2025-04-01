import { CreateUserDto, UpdateUserDto, UserDto, UserListDto } from "../types/users/userDto";
import { executeQuery } from "../utils/queryHelper";

const getAll = async (): Promise<UserListDto|undefined> => {
    try {
        const users: UserListDto = await executeQuery({
            sql: `SELECT * FROM users`,
            params: [],
        })

        if (!Array.isArray(users)) {
            console.warn("Invalid response from database: ", users);
            return undefined;
        }

        if (users.length === 0) {
            console.warn("No users found", users);
            return undefined;
        }

        return users;
    } catch(e) {
        console.warn(`❌ Error fetching all users: ${(e as Error).message}`);
        return undefined;
    }
}

const getById = async (id: number): Promise<UserDto|undefined> => {
    try {
        const user: UserDto = await executeQuery({
            sql: `SELECT * FROM users WHERE id = ?`,
            params: [id],
        })

        if (!Array.isArray(user)) {
            console.warn("Invalid response from database: ", user);
            return undefined;
        }

        if (user[0] === undefined) {
            console.warn("User not found", user);
            return undefined;
        }

        return user[0];
    } catch(e) {
        console.warn(`❌ Error fetching user by id: ${(e as Error).message}`);
        return undefined;
    }
}

const create = async (user: CreateUserDto): Promise<boolean> => {
    try {
        const newUser = await executeQuery({
            sql: `INSERT INTO users (username, password, password_kids, email) VALUES (?, ?, ?, ?)`,
            params: [user.username, user.password, user.password_kids, user.email],
        })

        if (!newUser) {
            console.warn("Invalid response from database: ", newUser);
            return false;
        }

        console.log(user);
        return true;
    } catch(e) {
        console.warn(`❌ Error creating user: ${(e as Error).message}`);
        return false;
    }
}

const update = async (id: number, user: Partial<UpdateUserDto>): Promise<boolean> => {
    try {
        // Vérifier si des champs sont fournis
        if (!user) {
            console.warn("No data provided for update");
            return false;
        }

        // Construire dynamiquement les champs à mettre à jour
        const fields = Object.keys(user).map((key) => `${key} = ?`).join(", ");
        const params = [...Object.values(user), id];

        // Construire et exécuter la requête SQL
        await executeQuery({
            sql: `UPDATE users SET ${fields} WHERE id = ?`,
            params: params,
        });

        return true;
    } catch (e) {
        console.warn(`❌ Error updating user: ${(e as Error).message}`);
        return false;
    }
};

const deleteById = async (id: number): Promise<UserDto|undefined> => {
    try {
        const user: UserDto|undefined = await getById(id);

        if (!user) {
            console.warn("User not found", user);
            return undefined;
        };

        await executeQuery({
            sql: `DELETE FROM users WHERE id = ?`,
            params: [id],
        })

        return user;
    } catch(e) {
        console.warn(`❌ Error deleting user: ${(e as Error).message}`);
        return undefined;
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
}