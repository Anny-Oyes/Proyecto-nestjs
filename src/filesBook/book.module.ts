import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { FilesController } from './book.controller';

@Module({
  controllers: [FilesController],
  providers: [BookService]
})
export class FilterBooksModule { }
