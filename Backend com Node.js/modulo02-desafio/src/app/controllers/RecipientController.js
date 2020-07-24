import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            street: Yup.string().required(),
            number: Yup.string().required(),
            complement: Yup.string().required(),
            state: Yup.string().required(),
            city: Yup.string().required(),
            zipcode: Yup.string().required()
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validations fails' });
        }

        const recipientExists = await Recipient.findOne({ where: { name: req.body.name } });

        if (recipientExists) {
            return res.status(400).json({ error: 'Recipient already exists.' });
        }

        const recipient = await Recipient.create(req.body);

        return res.json(recipient);
    }
}

export default new RecipientController();