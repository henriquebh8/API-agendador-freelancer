import { Hour } from './../entity/hour';
import { Schedules } from './../entity/schedules';
import { User } from "../entity/User"
import { AppDataSource } from "../data-source";
import { UserTypes } from "../entity/userType";
import { Service } from "../entity/service";
import { Like } from 'typeorm';


const scheduleRepository = AppDataSource.getRepository(Schedules)


async function findAll(req,res){
    const allSchedule:any = await scheduleRepository.find({
        relations: {
           hour:true,
           service:true
        }
    })
    .then( (allSchedule) => res.json(allSchedule))
    console.log("All schedules from the db: ", allSchedule)
}

async function findSchedule(req,res){
    const _id= req.params.id
    const findSchedule:any = await scheduleRepository.findOne({
        where: {schedule_id:_id},
          relations: {
           // userTypes:true,
        }
        
    }).then( (findSchedule) => res.json(findSchedule))
    console.log("Schedule ",findSchedule, " was found from the db: " )
}

/*async function updateSchedule(req,res){
   const _id=req.params.id
  
    let updateSchedule:any = await scheduleRepository.update({
        schedule_id: _id
    },{

    }).then( (updateSchedule) => res.json(updateSchedule))
    console.log("Schedule updated from the db: ", updateSchedule)
}*/
async function addSchedule(req,res){
    let user_id=req.body.user_id
    const findUserRepository = await AppDataSource.getRepository(User)
    let userId = await findUserRepository.findOneBy({
        id: user_id,
    })
    let hourSearch=req.body.hour_id
    const findHourRepository = await AppDataSource.getRepository(Hour)
    let hourId = await findHourRepository.findOneBy({
        hour_id: hourSearch,
    })
    let serviceSearch=req.body.serviceName
   
    const findServiceRepository = await AppDataSource.getRepository(Service)
    let serviceId = await findServiceRepository.findOneBy({
        serviceName: Like(`%${serviceSearch}%`)  
    })
    
    const allSchedule:any = await scheduleRepository.find({
        relations: {
           hour:true,
           service:true,
        }
    })
    let constteste=allSchedule.map(function (schedules){
        return schedules.hour
    })
    let findArraySchedule=constteste.filter(it => it.hour_id==hourSearch)

    if ( serviceSearch==serviceId.serviceName && findArraySchedule.length==0 ) {
    const registerSchedule:any= new Schedules()
    registerSchedule.service=serviceId
    registerSchedule.hour=hourId
    registerSchedule.users=userId
    const addSchedule:any = await scheduleRepository.save(registerSchedule)
    .then( (addSchedule) => res.json(addSchedule))
    console.log("New Schedule from the db: ", addSchedule)
    }else{
    res.json({"response": "Horáro já agendado"})
    }
}

async function deleteSchedule(req,res){
    const _id=req.params.id
    let scheduleToDelete:any = await scheduleRepository.findOneBy({
        schedule_id: _id,
    })
    await scheduleRepository.remove(scheduleToDelete)
    .then( (scheduleToDelete) => res.json(scheduleToDelete))
    console.log("schedule removed from the db: ", scheduleToDelete)
}



export default { findAll,findSchedule,addSchedule,deleteSchedule } 

