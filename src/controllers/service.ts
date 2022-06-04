import { Schedules } from './../entity/schedules';
import { Hour } from './../entity/hour';
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";
import { Service } from "../entity/service";

const serviceRepository = AppDataSource.getRepository(Service)


async function findAll(req,res){
    const allServices:any = await serviceRepository.find({
        relations: {
            user:true,
            hour:true,
            schedule:true
      }
      
    
    })
    .then( (allServices) => res.json(allServices))
    console.log("All Services from the db: ", allServices)
}

async function findService(req,res){
    const _id= req.params.id
    const findService:any = await serviceRepository.findOne({
        where: {service_id:_id},
        relations: {hour:true}

        
    }).then( (findService) => res.json(findService))
    console.log("Service ",findService, " was found from the db: " )
}

async function updateService(req,res){
   const _id=req.params.id
  
    let updateService:any = await serviceRepository.update({
        service_id: _id,
    },{
        "serviceName": req.body.serviceName,
        "description": req.body.description
    })
    .then( (updateService) => res.json(updateService))
    console.log("Service updated from the db: ", updateService)
}
async function addService(req,res){
    let hourSearch=req.body.hour
    const findHourRepository = await AppDataSource.getRepository(Hour)
    let hourId = await findHourRepository.findOneBy({
        hour_id: hourSearch,
    })
    let user_id=req.body.user_id
    const findUserRepository = await AppDataSource.getRepository(User)
    let userId = await findUserRepository.findOneBy({
        id: user_id,
    })
    const newServiceAdd:any= new Service()
    newServiceAdd.serviceName = req.body.serviceName
    newServiceAdd.description = req.body.description
    newServiceAdd.user=userId
    newServiceAdd.serviceHour=hourId

    const addService:any = await serviceRepository.save(newServiceAdd)
    .then( (addService) => res.json(addService))
    console.log("New Service from the db: ", addService)
}

async function deleteService(req,res){
    let idUserDelete=req.params.id
    const serviceToDelete:any = await serviceRepository.findOne({
        where: {service_id:idUserDelete},
        relations: {
            hour:true,
            schedule:true
        }
    })
    if(serviceToDelete.hour.length>0){
    const deleteHourRepository = AppDataSource.getRepository(Hour)
    let findHourDelete = await deleteHourRepository.query(
        `DELETE FROM hour where userId=?;`   , [idUserDelete] 
    )}
    if(serviceToDelete.schedule.length>0){
    const deleteScheduleRepository = AppDataSource.getRepository(Schedules)
    let findScheduleDelete = await deleteScheduleRepository.query(
        `DELETE FROM schedule where userId=?;`   , [idUserDelete] 
    )}
    await serviceRepository.remove(serviceToDelete)
    .then( (ServiceToDelete) => res.json(ServiceToDelete))
    console.log("Service removed from the db: ", serviceToDelete)
}



export default { findAll,findService,updateService,addService,deleteService } 

