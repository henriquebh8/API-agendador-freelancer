import { Schedules } from './schedules';
import { Hour } from './hour';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, BaseEntity,JoinTable } from "typeorm"
import {User} from './User';

@Entity()
export class Service extends BaseEntity{

    @PrimaryGeneratedColumn()
    service_id: number

    @Column()
    serviceName: string

    @Column()
    description: string

    @ManyToOne(()=>User, user=>user.services,{})
    user:User

    @OneToMany(()=>Hour, hour=>hour.service,{})
    @JoinTable()
    hour:Hour

    @OneToMany(()=>Schedules, schedule=>schedule.service,{})
    @JoinTable()
    schedule:Schedules
}
