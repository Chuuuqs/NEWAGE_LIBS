const express = require('express');
const { createAdmin, loginAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } = require('../controller/adminController')

const router = express.Router();

router.post('/', createAdmin);
router.post('/login', loginAdmin);
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);


module.exports = router;