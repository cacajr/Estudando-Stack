import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Carlos Junior',
        email: 'carlosjr@estudando.com.br',
        password_hash: '123',
    });

    return res.json(user);
})

export default routes;