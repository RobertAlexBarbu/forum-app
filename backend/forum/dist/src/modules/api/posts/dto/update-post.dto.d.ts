import { CreatePostDto } from './create-post.dto';
declare const UpdatePostDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePostDto>>;
export declare class UpdatePostDto extends UpdatePostDto_base {
    categoryId: number | null;
    content: string;
    title: string;
}
export {};
