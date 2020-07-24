import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const recipientExists = await Recipient.findOne({ where: { name: req.body.name } });

        if (userExists) {
            return res.status(400).json({ error: 'Recipient already exists.' });
        }

        const { id, name } = await User.create(req.body);

        return res.json({ id, name});
    }
}

export default new RecipientController();