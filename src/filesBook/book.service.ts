import { Injectable, BadRequestException } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class BookService {
    staticProductImage(imageName: string) {
        const path = join(__dirname, '../../static/books', imageName);

        if (!existsSync(path)) {
            throw new BadRequestException(
                `No se encuentra el producto con la imagen ${imageName}`
            );
        }
        return path;
    }
}
