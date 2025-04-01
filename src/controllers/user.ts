import { Request, Response } from "express";
import userModel from "../models/user";
import { CreateUserDto, UpdateUserDto, UserDto, UserListDto } from "../types/users/userDto";
import fieldsValidator from "../utils/fieldsValidator";

const getAll = async (req: Request, res: Response): Promise<void> => {
    try {
        const users: UserListDto | undefined = await userModel.getAll();

        if (!Array.isArray(users)) {
            res.status(500).json({ message: "Invalid response from database" });
            return;
        }

        if (users.length === 0) {
            res.status(404).json({ message: "No users found" });
            return;
        }

        res.status(200).json(users);
    } catch (e) {
        console.error(`Error fetching all users: ${(e as Error).message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const user: UserDto | undefined = await userModel.getById(id);

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json(user);
    } catch (e) {
        console.error(`Error fetching user by ID: ${(e as Error).message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser: CreateUserDto = req.body;

        const { valid, missingKeys } = fieldsValidator(newUser);

        if (!valid) {
            res.status(400).json({
                message: "Invalid user data",
                missingFields: missingKeys,
            });
            return;
        }

        const createdUser = await userModel.create(newUser);

        if (!createdUser) {
            res.status(500).json({ message: "Creation failed" });
            return;
        }

        res.status(201).json({ message: "User created successfully!", user: createdUser });
    } catch (e) {
        console.error(`Error creating user: ${(e as Error).message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const newUserData: UpdateUserDto = req.body;

        const { valid, missingKeys } = fieldsValidator(newUserData);

        if (!valid) {
            res.status(400).json({
                message: "Invalid user data",
                missingFields: missingKeys,
            });
            return;
        }

        const updatedUser = await userModel.update(id, newUserData);

        if (!updatedUser) {
            res.status(404).json({ message: "User not found or update failed" });
            return;
        }

        res.status(200).json({ message: "User updated successfully!", user: updatedUser });
    } catch (e) {
        console.error(`Error updating user: ${(e as Error).message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = parseInt(req.params.id, 10);

        if (isNaN(id)) {
            res.status(400).json({ message: "Invalid ID" });
            return;
        }

        const deletedUser: UserDto|undefined = await userModel.deleteById(id);

        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        res.status(200).json({ message: "User deleted successfully!", user: deletedUser });
    } catch (e) {
        console.error(`Error deleting user: ${(e as Error).message}`);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default {
    getAll,
    getById,
    create,
    update,
    deleteById,
};