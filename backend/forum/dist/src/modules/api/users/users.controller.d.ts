import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateToAdminDto } from './dto/update-to-admin.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        role: number;
        username: string;
        email: string;
    }>;
    findAll(): string;
    findAllAdmins(): Promise<import("@mikro-orm/core").Loaded<import("./entities/User").User, "id" | "username" | "email" | "role">[]>;
    updateToAdmin(updateToAdminDto: UpdateToAdminDto): Promise<import("@mikro-orm/core").Loaded<import("./entities/User").User, never>>;
    demoteAdmin(id: string): Promise<import("./entities/User").User>;
}
