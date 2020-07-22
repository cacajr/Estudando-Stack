import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({ where: { email: req.body.email } });

        if (userExists) {
            return res.status(400).json({ error: 'User email already exists.' });
        }

        const { id, name, email } = await User.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        //mostrando que o id do usuario veio na requisicao, pois a sessao dele foi
        //validada pelo middleware auth.js e ele enviou esse dado nela atraves do
        //userId
        //console.log(req.userId);

        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if (email != user.email) {
            const userExists = await User.findOne({ where: { email: req.body.email } });

            if (userExists) {
                return res.status(400).json({ error: 'User email already exists.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Password does not match.' })
        }

        const { id, name } = await user.update(req.body);

        return res.json({ id, name, email });

        // FALTA TESTAR ESSA REQUISICAO DE UPDATE DE USUARIOS
    }
}

export default new UserController();