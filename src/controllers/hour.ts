import { Schedules } from './../entity/schedules';
import { User } from './../entity/User';
import { Service } from './../entity/service';
import { AppDataSource } from "../data-source";
import { UserTypes } from "../entity/userType";
import { Hour } from "../entity/hour";
import {DateTime}from 'luxon';

const hourRepository = AppDataSource.getRepository(Hour)


async function findAll(req,res){
    const allHour:any = await hourRepository.find({
        relations: {
            service:true,
        }
    })
    .then( (allHour) => res.json(allHour))
    console.log("All users from the db: ", allHour)
}

async function findHour(req,res){
    const _id= req.params.id
    const allHour:any = await hourRepository.findOne({
        where: {hour_id:_id},
          relations: {
            service:true,
        }
        
    }).then( (allHour) => res.json(allHour))
    console.log("this hour",allHour, " was found from the db: " )
}

async function updateHour(req,res){
   const _id=req.params.id
  
    let updateHour:any = await hourRepository.update({
        hour_id: _id
    },{
        "initialTime":DateTime.fromSQL(req.body.initialTime).toJSDate(),
        "finalTime":DateTime.fromSQL(req.body.finalTime).toJSDate()
    }).then( (allHour) => res.json(allHour))
    console.log("User updated from the db: ", updateHour)
}
async function addHour(req,res){
    let UserServiceIdToSearch=req.body.service_id
    let UserUserIdToSearch=req.body.id
    const findServicerRepository = AppDataSource.getRepository(Service)
    let serviceId = await findServicerRepository.findOneBy({
        service_id:UserServiceIdToSearch,
    })
    const findUserRepository = AppDataSource.getRepository(User)
    let userId = await findUserRepository.findOneBy({
        id:UserUserIdToSearch,
    })
    const registerHour:any= new Hour()
    registerHour.initialTime=DateTime.fromSQL(req.body.initialTime).toJSDate();
    registerHour.finalTime=DateTime.fromSQL(req.body.finalTime).toJSDate();
    registerHour.service=serviceId
    registerHour.user=userId
   
    const addHour:any = await hourRepository.save(registerHour)
    .then( (allHour) => res.json(allHour))
    console.log("New hour from the db: ", addHour)
}

async function deleteHour(req,res){
    const _id=req.params.id
    let hourToDelete:any = await hourRepository.findOne({
        where: {hour_id: _id,},
        relations: {
          schedule:true
      }
    })
    if(hourToDelete.schedule.length>0){
        const deleteScheduleRepository = AppDataSource.getRepository(Schedules)
        let findScheduleDelete = await deleteScheduleRepository.query(
            `DELETE FROM schedules where hourHourId=?;`   , [_id] 
        )}
    await hourRepository.remove(hourToDelete)
    .then( (allHour) => res.json(allHour))
    console.log("User removed from the db: ", hourToDelete)
}



export default { findAll,findHour,updateHour,addHour,deleteHour } 