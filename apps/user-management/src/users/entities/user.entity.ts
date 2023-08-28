import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'first_name'})
    firstName: string;

    @Column({ name: 'last_name'})
    lastName: string;

    @Column({ name: 'email', unique: true})
    email: string;
}