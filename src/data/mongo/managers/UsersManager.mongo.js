import Manager from '../Manager.mongo.js';
import User from '../models/users.model.js';


const usersManager = new Manager(User);
export default usersManager;