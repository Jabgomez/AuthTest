//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');


// api/auth
router.post('/',
    authController.createAuth
);

router.get('/',
    authController.getAuth
);

module.exports = router;