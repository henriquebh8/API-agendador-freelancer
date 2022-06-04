import user from './src/controllers/user'
import service from './src/controllers/service'
import { Router } from 'express';
import hour from './src/controllers/hour';
import schedule from './src/controllers/schedules';

const routes = Router();

routes.get('/user',user.findAll);
routes.get('/user/:id',user.findUser);
routes.put('/user/:id',user.updateUser);
routes.delete('/user/:id',user.deleteUser);
routes.post('/user', user.addUser);


routes.get('/service',service.findAll);
routes.get('/service/:id',service.findService);
routes.put('/service/:id',service.updateService);
routes.delete('/service/:id',service.deleteService);
routes.post('/service', service.addService);

routes.get('/hour',hour.findAll);
routes.get('/hour/:id',hour.findHour);
routes.put('/hour/:id',hour.updateHour);
routes.delete('/hour/:id',hour.deleteHour);
routes.post('/hour', hour.addHour);

routes.get('/schedule',schedule.findAll);
routes.get('/schedule/:id',schedule.findSchedule);
routes.patch('/schedule/:id',function(req,res){res.send(" Devido as regras de negocio estabelecidas os agendamentos não estão permitidos serem atualizados")});
routes.put('/schedule/:id',function(req,res){res.send(" Devido as regras de negocio estabelecidas os agendamentos não estão permitidos serem atualizados")});
routes.delete('/schedule/:id',schedule.deleteSchedule);
routes.post('/schedule', schedule.addSchedule);

export default routes;