import { IsString, IsNotEmpty, Length, IsDateString, IsISBN, IsOptional, IsInt, Min } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';

export class Book {
    id: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    title: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    author: string;

    @IsDateString()
    @IsNotEmpty()
    publishedDate: string;

    @IsString()
    @IsNotEmpty()
    @IsISBN()
    isbn: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    pages?: number;

    constructor(title: string, author: string, publishedDate: string, isbn: string, pages?: number) {
        this.id = uuidv4();
        this.title = title;
        this.author = author;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
        this.pages = pages;
    }
    
}


