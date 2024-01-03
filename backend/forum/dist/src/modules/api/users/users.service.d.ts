import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager } from '@mikro-orm/core';
import { User } from './entities/User';
import { UpdateToAdminDto } from './dto/update-to-admin.dto';
export declare class UsersService {
    private readonly em;
    constructor(em: EntityManager);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        role: number;
        username: string;
        email: string;
    }>;
    findAll(): string;
    findAllAdmins(): Promise<import("@mikro-orm/core").Loaded<User, "id" | "username" | "email" | "role">[]>;
    findByUsernameOrEmail(usernameOrEmail: string): Promise<import("@mikro-orm/core").Loaded<User, "role">>;
    updateToAdmin(updateToAdminDto: UpdateToAdminDto): Promise<import("@mikro-orm/core").Loaded<User, never>>;
    demoteAdmin(uid: string): Promise<User>;
}
