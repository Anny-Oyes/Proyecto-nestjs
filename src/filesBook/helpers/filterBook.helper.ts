export const filterBook = (
    req,
    book: Express.Multer.File,
    callback
) => {
    if (!book) {
        return callback(new Error('Archivo vacio'), false)
    }
    const bookExtension = book.mimetype.split('/')[1];
    const bookvalidExtension = ['jpeg', 'jpg', 'avif', 'png'];

    if (bookvalidExtension.includes(bookExtension)) {
        return callback(null, true)
    }
    callback(null, false);
};