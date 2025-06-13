import { Router } from 'express';
import InventoryController from '../controllers/InventoryController'
import InventoryService from '../services/InventoryService';
import validateRequest from '../middlewares/validateRequest';
import { CreateInventorySchema, UpdateInventorySchema } from '../models/inventoryModel';


const router = Router();
const inventoryService = new InventoryService();
const inventoryController = new InventoryController(inventoryService);

router.get('/',inventoryController.getAllInventory);

router.get('/inventory/new', inventoryController.newInventory);

router.post('/inventory',validateRequest(CreateInventorySchema),inventoryController.createInventory);
router.get('/inventory/:id',inventoryController.getInventory);
router.put('/inventory/:id',validateRequest(UpdateInventorySchema),inventoryController.updateInventory);
router.delete('/inventory/:id',inventoryController.deleteInventory);

export default router;