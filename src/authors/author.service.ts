import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateAuthorsDto } from './dto/author.dto';
import { AuthorsBooks } from './entities/author-book.entity';
import { Authors } from './entities/author.entity';

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Authors)
        private readonly authorRepository: Repository<Authors>,
        @InjectRepository(AuthorsBooks)
        private readonly bookRepository: Repository<AuthorsBooks>,
        private readonly dataSource: DataSource,
    ) { }

    async create(authorDto: CreateAuthorsDto) {
        const { books = [], ...authorData } = authorDto;
        const Book = await this.authorRepository.create({
            ...authorData,
            books: books.map((book) =>
                this.bookRepository.create({ books: book }),
            ),
        });
        await this.authorRepository.save(Book);
        return Book;
    }

    findAll() {
        return this.authorRepository.find({
            relations: ['books'],
        });
    }

    findOne(id: string) {
        return this.authorRepository.findOneBy({ id });
    }

    async remove(id: string) {
        const Book = await this.findOne(id);
        await this.authorRepository.remove(Book);
        return 'Haz eliminado el autor satisfactoriamente';
    }


    async update(id: string, cambios: CreateAuthorsDto) {
        const { books, ...updateAll } = cambios;
        const Book = await this.authorRepository.preload({
            id: id,
            ...updateAll,
        });

        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        await queryRunner.connect();

        if (books) {
            await queryRunner.manager.delete(AuthorsBooks, { books: { id } });

            Book.books = books.map((book) =>
                this.bookRepository.create({ books: book }),
            );
        } else {
            Book.books = await this.bookRepository.findBy({ authors: { id } });
        }

        await queryRunner.manager.save(Book);
        await queryRunner.commitTransaction();
        await queryRunner.release();
        return Book;
    }
}
