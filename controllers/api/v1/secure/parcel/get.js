import { Users } from '../../../../../models';
import { isCadastralNumber } from '../../../../../helpers/validators';
import { getParcelInfo } from '../../../../../lib/parcel';

export default async function (req, res) {
  try {
    if (!isCadastralNumber(req.query.cadNum)) {
      return res.status(400).json({ error: 'A cadastral number is not valid' });
    }

    let user = await Users.findByPk(req.user.id, {
      attributes: ['firstName', 'lastName'],
    });

    if (!user) {
      let error = { error: 'The user is not exists.' };
      return res.status(400).json(error);
    }

    const owner = `${user.firstName} ${user.lastName}`;

    const data = await getParcelInfo(req.query.cadNum, owner, owner);

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
