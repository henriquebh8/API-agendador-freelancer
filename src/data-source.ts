import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Service} from "./entity/service"
import {UserTypes} from "./entity/userType"
import {Schedules} from "./entity/schedules"
import {Hour} from "./entity/hour"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "bancoAPI",
    synchronize: true,
    logging: false,
    entities: [User,Service,UserTypes,Schedules,Hour],
    migrations: [],
    subscribers: [],
})
