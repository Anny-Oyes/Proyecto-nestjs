import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Authors } from './author.entity';

@Entity()
export class AuthorsBooks {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    books: string;

    @ManyToOne(() => Authors, (authors) => authors.books, {
        onDelete: 'CASCADE',
    })
    authors: Authors;
}