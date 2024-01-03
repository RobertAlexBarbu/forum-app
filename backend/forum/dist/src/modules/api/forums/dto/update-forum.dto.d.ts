import { CreateForumDto } from './create-forum.dto';
declare const UpdateForumDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateForumDto>>;
export declare class UpdateForumDto extends UpdateForumDto_base {
    name: string;
    deletedCategories: {
        id: number;
        name: string;
    }[];
    addedCategories: {
        name: string;
    }[];
}
export {};
