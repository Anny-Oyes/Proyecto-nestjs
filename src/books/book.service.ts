import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateBookDto } from './dto/Book.dto';
import { BookImage } from './entities/book-image.entity';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly booksRepository: Repository<Book>,
    @InjectRepository(BookImage)
    private readonly imageRepository: Repository<BookImage>,
    private readonly dataSource: DataSource,
  ) { }

  async create(bookDto: CreateBookDto) {
    const { images = [], ...bookData } = bookDto;
    const Book = await this.booksRepository.create({
      ...bookData,
      images: images.map((image) =>
        this.imageRepository.create({ url: image }),
      ),
    });
    await this.booksRepository.save(Book);
    return Book;
  }

  findAll() {
    return this.booksRepository.find({
      relations: ['images'],
    });
  }

  findOne(id: string) {
    return this.booksRepository.findOneBy({ id });
  }

  async remove(id: string) {
    const Book = await this.findOne(id);
    await this.booksRepository.remove(Book);
    return 'Haz eliminado el libro satisfactoriamente';
  }


  async update(id: string, cambios: CreateBookDto) {
    const { images, ...updateAll } = cambios;
    const Book = await this.booksRepository.preload({
      id: id,
      ...updateAll,
    });

    const queryRunner = await this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();
    await queryRunner.connect();

    if (images) {
      await queryRunner.manager.delete(BookImage, { book: { id } });

      Book.images = images.map((image) =>
        this.imageRepository.create({ url: image }),
      );
    } else {
      Book.images = await this.imageRepository.findBy({ book: { id } });
    }

    await queryRunner.manager.save(Book);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return Book;
  }
}
