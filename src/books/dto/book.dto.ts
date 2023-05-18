import { IsNotEmpty, IsNumber, IsString, IsArray, IsOptional } from "class-validator";

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @IsNotEmpty()
    amountPage: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    stock: number;

    @IsString()
    @IsOptional()
    filename?: string

    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];
}
