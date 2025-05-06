import {User} from "../model/userTypes.js";

export interface UserService {
    addUser(user:User):boolean;
    getUser(userId: number):User|null;
    // getUserByName(name: string): User | undefined;
    removeUser(userId:number):User|null;
    updateUser(newUserData:User):boolean;
    getAllUsers():User[];
}