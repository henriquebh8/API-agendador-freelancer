import { Schedules } from './../entity/schedules';
import { Hour } from './../entity/hour';
import { Service } from './../entity/service';
import { User } from "../entity/User"
import { AppDataSource } from "../data-source";
import { UserTypes } from "../entity/userType";

const userRepository = AppDataSource.getRepository(User)

async function findAll(req,res){
    const allUsers:any = await userRepository.find({
        relations: {
            userTypes:true,
        }
    })
    .then( (allUsers) => res.json(allUsers))
    console.log("All users from the db: ", allUsers)
}

async function findUser(req,res){
    const _id= req.params.id
    const findUser:any = await userRepository.findOne({
        where: {id:_id},
          relations: {
            userTypes:true,
        }
        
    }).then( (findUser) => res.json(findUser))
    console.log("User ",findUser, " was found from the db: " )
}

async function updateUser(req,res){
    let UserTypeIdToSearch=req.body.userTypes
    const findUserRepository = AppDataSource.getRepository(UserTypes)
    let userTypesId = await findUserRepository.findOneBy({
        Type_id: UserTypeIdToSearch,
    })
   const _id=req.params.id
  
    let updateUser:any = await userRepository.update({
        id: _id
    },{
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email":req.body.email,
        "nickname": req.body.nickname,
        "password": req.body.password
    }).then( (updateUser) => res.json(updateUser))
    console.log("New user from the db: ", updateUser)

}
async function addUser(req,res){
    let UserTypeIdToSearch=req.body.userTypes
    const findUserRepository = AppDataSource.getRepository(UserTypes)
    let userTypesId = await findUserRepository.findOneBy({
        Type_id: UserTypeIdToSearch,
    })
    const registerUse:any= new User()
    registerUse.firstName = req.body.firstName
    registerUse.lastName = req.body.lastName
    registerUse.email=req.body.email
    registerUse.nickname=req.body.nickname
    registerUse.password=req.body.password
    registerUse.userTypes=userTypesId
    const addUser:any = await userRepository.save(registerUse)
    .then( (addUser) => res.json(addUser))
    console.log("New user from the db: ", addUser)
}

async function deleteUser(req,res){
    let idUserDelete=req.params.id
    let userToDelete:any = await userRepository.findOne({
        where: {id:idUserDelete},
        relations: {
          userTypes:true,
          hour:true,
          schedule:true,
          services:true
      }
    })
    if(userToDelete.hour.length>0){
        console.log("PASSEI NO IF DA HORA")
        const deleteHourRepository = AppDataSource.getRepository(Hour)
        let findHourDelete = await deleteHourRepository.query(
            `DELETE FROM hour where userId=?;`   , [idUserDelete] 
        )}
    if(userToDelete.schedule.length>0){
    const deleteScheduleRepository = AppDataSource.getRepository(Schedules)
    let findScheduleDelete = await deleteScheduleRepository.query(
        `DELETE FROM schedule where userId=?;`   , [idUserDelete] 
    )}
    if(userToDelete.services.length>0){
    const deleteServiceRepository = AppDataSource.getRepository(Service)
    let findDelete = await deleteServiceRepository.query(
        `DELETE FROM service where userId=?;`   , [idUserDelete] 
    )}
    await userRepository.remove(userToDelete)
    .then( (userToDelete) => res.json(userToDelete))
    console.log("User removed from the db: ", userToDelete)
}

export default { findAll,findUser,updateUser,addUser,deleteUser } 

