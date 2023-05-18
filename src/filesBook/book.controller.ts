import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Param, Get, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { filterBook } from './helpers/filterBook.helper';
import { diskStorage } from 'multer';
import { BookNamer } from './helpers/bookName.helper';
import { Response } from 'express'

@Controller('archivist')
export class FilesController {
  constructor(private readonly bookService: BookService) { }

  @Get('book/:bookImageName')
  findProduct(
    @Res() res: Response,
    @Param('bookImageName') bookImageName: string) {
    const paths = this.bookService.staticProductImage(bookImageName);

    res.sendFile(paths)
  }

  @Post('book')
  @UseInterceptors(FileInterceptor('archivist',
    {
      fileFilter: filterBook,

      // el storge es para definir donde guardar el archivo
      storage: diskStorage({
        destination: './static/books',
        filename: BookNamer,
      }),
    }),
  )
  uploadProductImage(@UploadedFile() book: Express.Multer.File) {

    // si no viene una imagen que nos mande el siguiente imagen
    if (!book) {
      throw new BadRequestException('Asegurese que el archivo es una imagen')
    }
    const getUrlBook = `${book.filename}`

    return getUrlBook;
  }
}
