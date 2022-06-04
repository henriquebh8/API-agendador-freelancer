import { User } from './User';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany,BaseEntity,JoinTable,OneToMany,ManyToOne } from "typeorm";
import  './User';

@Entity()
export class UserTypes extends BaseEntity {

    @PrimaryGeneratedColumn()
    Type_id: number

    @Column({ unique: true })
    description: string

    
    @OneToMany(()=>User, user=>user.userTypes,{})
    cascade: true
    users:User


}
