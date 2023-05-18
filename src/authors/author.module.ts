import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorsBooks } from './entities/author-book.entity';
import { Authors } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authors, AuthorsBooks])],
  controllers: [AuthorsController],
  providers: [AuthorService],
})

export class AuthorsModule { }
