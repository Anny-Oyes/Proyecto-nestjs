import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
  } from '@nestjs/common';
  import { CreateBookDto } from './dto/book.dto';
  import { BookService } from './book.service';
@Controller('books')
export class BooksController {
    constructor(private readonly bookServiceRepository: BookService) {}

  @Post()
  create(@Body() bookDto: CreateBookDto) {
    return this.bookServiceRepository.create(bookDto);
  }

  @Get()
  findAll() {
    return this.bookServiceRepository.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookServiceRepository.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookServiceRepository.remove(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatebookDto: CreateBookDto,
  ) {
    return this.bookServiceRepository.update(id, updatebookDto);
  }
}
