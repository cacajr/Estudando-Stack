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
        //validada pelo middleware auth.js e ele envio esse dado nela atraves do
        //userId
        console.log(req.userId);

        return res.json({ ok: true });
    }
}

export default new UserController();