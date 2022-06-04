import { Service } from './service';
import {UserTypes} from './userType';
import {Schedules} from "./schedules";
import {Hour} from "./hour";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,BaseEntity,ManyToOne,JoinTable } from "typeorm";


@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    nickname: string

    @Column()
    password: string
    
    @OneToMany(()=>Service, service=>service.user,{})
    @JoinTable()
    services:Service

    @OneToMany(()=>Hour, hour=>hour.user,{})
    hour:Hour

    @ManyToOne(()=>UserTypes, userType=>userType.users,{})
    @JoinTable()
    userTypes:UserTypes

    @OneToMany(()=>Schedules, schedule=>schedule.users,{})
    schedule:Schedules
    
    


}
