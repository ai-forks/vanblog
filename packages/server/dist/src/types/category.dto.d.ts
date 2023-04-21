export declare class CreateCategoryDto {
    name: string;
}
export declare class UpdateCategoryDto {
    name?: string;
    password?: string;
    private?: boolean;
}
export type CategoryType = 'category' | 'column';
