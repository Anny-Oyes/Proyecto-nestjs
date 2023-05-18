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
import { CreateAuthorsDto } from './dto/author.dto';
import { AuthorService } from './author.service';

@Controller('author')
export class AuthorsController {
    constructor(private readonly AuthorServiceRepository: AuthorService) { }

    @Post()
    create(@Body() authorsDto: CreateAuthorsDto) {
        return this.AuthorServiceRepository.create(authorsDto);
    }

    @Get()
    findAll() {
        return this.AuthorServiceRepository.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.AuthorServiceRepository.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.AuthorServiceRepository.remove(id);
    }

    @Patch(':id')
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateauthorsDto: CreateAuthorsDto,
    ) {
        return this.AuthorServiceRepository.update(id, updateauthorsDto);
    }
}
