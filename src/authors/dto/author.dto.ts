import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from "class-validator";

export class CreateAuthorsDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    birthdate: string;

    @IsString()
    @IsNotEmpty()
    residence: string;

    @IsString()
    @IsNotEmpty()
    biography: string;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    books?: string[];
}
