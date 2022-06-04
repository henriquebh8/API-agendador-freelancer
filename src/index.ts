import { AppDataSource } from "./data-source";
import { UserTypes } from "./entity/userType";
import express from 'express';
import routes from '../routes';
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(3000, () => 
console.log('Server is running on port 3000')
);

AppDataSource.initialize().then(async () => {

        const datasorce= await AppDataSource.manager.find(UserTypes)   
        const userTypesConsumer= new UserTypes()
        userTypesConsumer.description="consumer"
        const userTypesProfessional= new UserTypes()
        userTypesProfessional.description="profissional"
        await AppDataSource.manager.save(userTypesConsumer)
        console.log("Saved a new user with id: " + userTypesConsumer.Type_id)
        await AppDataSource.manager.save(userTypesProfessional)
        console.log("Saved a new user with id: " + userTypesProfessional.Type_id)
}).catch(error => console.log(error))
