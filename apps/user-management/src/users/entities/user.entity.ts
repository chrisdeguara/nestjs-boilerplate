import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    public toString(): string {
        return `id: ${this.id}, first_name: ${this.firstName}, last_name: ${this.lastName}, email: ${this.email}`
    }
}