const express = require('express');
const router = express.Router();

const vehicleController = require('../controllers/vehicleController');

router.post('/', vehicleController.save);
router.delete('/:id', vehicleController.delete);
router.get('/', vehicleController.listVehicles);
router.get('/:id', vehicleController.FindVehicle);
router.post('/:id', vehicleController.UpdateVehicle);
router.post('/gang/:id', vehicleController.UpdateAssignVehicle);


// router.get('/list/:page', vehicleController.list);
// router.get('/view', wharehouseController.view);
// router.post('/add', wharehouseController.save);
// router.delete('/:id', wharehouseController.delete); 
// router.get('/:id', wharehouseController.edit); 
// router.put('/update/:id', wharehouseController.update); 
// router.get('/find/:word', wharehouseController.search); 
// router.post('/listSearch', wharehouseController.listFind); 

module.exports = router;

// GET: Es utilizado únicamente para consultar información al servidor, muy parecidos a realizar un SELECT a la base de datos. No soporta el envío del payload
// POST: Es utilizado para solicitar la creación de un nuevo registro, es decir, algo que no existía previamente, es decir, es equivalente a realizar un INSERT en la base de datos. Soporta el envío del payload.
// PUT: Se utiliza para actualizar por completo un registro existente, es decir, es parecido a realizar un UPDATE a la base de datos. Soporta el envío del payload.
// PATCH: Este método es similar al método PUT, pues permite actualizar un registro existente, sin embargo, este se utiliza cuando actualizar solo un fragmento del registro y no en su totalidad, es equivalente a realizar un UPDATE a la base de datos. Soporta el envío del payload
// DELETE: Este método se utiliza para eliminar un registro existente, es similar a DELETE a la base de datos. No soporta el envío del payload.
// HEAD: Este método se utilizar para obtener información sobre un determinado recurso sin retornar el registro. Este método se utiliza a menudo para probar la validez de los enlaces de hipertexto, la accesibilidad y las modificaciones recientes.