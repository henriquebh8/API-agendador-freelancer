import { Service } from './service';
import {UserTypes} from './userType';
import {User} from './User';
import {Hour} from './hour';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany,BaseEntity,ManyToMany,JoinTable,ManyToOne } from "typeorm";

@Entity()
export class Schedules extends BaseEntity {

    @PrimaryGeneratedColumn()
    schedule_id: number

    @ManyToOne(()=>Service, service=>service.schedule,{nullable: true})
    service:Service

    @ManyToOne(()=>Hour, hour=>hour.schedule,{nullable: true})
    hour:Hour

    @ManyToOne(()=>User, user=>user.schedule,{nullable: true})
    users:User

}
