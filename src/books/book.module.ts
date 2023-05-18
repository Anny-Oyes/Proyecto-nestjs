import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './book.controller';
import { BookService } from './book.service';
import { BookImage } from './entities/book-image.entity';
import { Book } from './entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BookImage])],
  controllers: [BooksController],
  providers: [BookService],
})

export class BooksModule { }
