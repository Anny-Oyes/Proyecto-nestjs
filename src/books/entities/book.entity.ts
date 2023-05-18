import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BookImage } from './book-image.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  author: string;

  @Column({ type: 'numeric' })
  amountPage: number;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'numeric' })
  stock: number;

  @Column({ type: 'varchar', nullable: true })
  filename: string



  @OneToMany(() => BookImage, (bookImage) => bookImage.book, {
    cascade: true,
    eager: true,
  })
  images?: BookImage[];
}
