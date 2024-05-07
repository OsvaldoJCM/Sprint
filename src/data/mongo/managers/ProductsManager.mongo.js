import Manager from '../Manager.mongo.js';
import Product from '../models/products.model.js';


const productsManager = new Manager(Product);
export default productsManager;