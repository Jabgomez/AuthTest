const jwt = require('jsonwebtoken');
const fs = require('fs')

exports.createAuth = async (req, res) => {
    
    // Autenticar usuario
    const { username, id } = req.body;

    try {
        // Crear el JWT
        const payload = {
            username: username,
            id: id
        };

        //Leer la llave privada
        let key = fs.readFileSync('private.pem', 'utf-8');
        let passphrase = process.env.JWT_PASSPHRASE

        //Sign Options
        let signOpts = {
            expiresIn: 3600,
            algorithm: "RS256"
        }

        //Firmar el JWT
        jwt.sign(payload, {key, passphrase}, signOpts, (error, token) => {
            if (error) throw error;
            //Mensaje de confirmación
            res.json({ token: token })
        });

    } catch(error) {
        console.log(error);
    }
}

//verifica autenticación
exports.getAuth = async (req, res) => {
    try {
        const token = req.header('x-auth-token')

        //verify options
        let verifyOpts = {
            algorithms: ["RS256"]
        }

        //Leer la llave publica
        let publicKey = fs.readFileSync('public.pem', 'utf-8');

        const result = jwt.verify(token, publicKey, verifyOpts);

        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Hubo un error'});
    }
}