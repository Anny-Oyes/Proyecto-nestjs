import { v4 as uuid } from 'uuid'

export const BookNamer = (
    req,
    book: Express.Multer.File,
    callback
) => {
    const bookExtension = book.mimetype.split('/')[1];
    const bookName = `${uuid()}.${bookExtension}`;

    callback(null, bookName);
}