import { Entity, PrimaryGeneratedColumn, Column,BaseEntity,ManyToOne,JoinTable,OneToMany } from "typeorm";
import { Service } from './service';
import {Schedules} from './schedules';
import { User } from './User';
import user from "../controllers/user";


@Entity()
export class Hour extends BaseEntity {

    @PrimaryGeneratedColumn()
    hour_id: number

    @Column()
    initialTime: Date
    @Column()
    finalTime: Date

  
    @ManyToOne(()=>Service, service=>service.hour,{})
    service:Service

    @ManyToOne(()=>User, user=>user.hour,{})
    @JoinTable()
    user:User

    @OneToMany(()=>Schedules, schedule=>schedule.hour,{})
    @JoinTable()
    schedule:Schedules

}
