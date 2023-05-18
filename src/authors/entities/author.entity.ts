import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AuthorsBooks } from './author-book.entity';

@Entity()
export class Authors {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'varchar' })
    birthdate: string;

    @Column({ type: 'text' })
    residence: string;

    @Column({ type: 'text' })
    biography: string;

    @Column({ type: 'text' })
    gender: string;

    @OneToMany(() => AuthorsBooks, (authorsBooks) => authorsBooks.authors, {
        cascade: true,
        eager: true,
    })
    books?: AuthorsBooks[];
}