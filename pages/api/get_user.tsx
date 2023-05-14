import { User, Collection } from '@/lib/db';

export default async function handler(req, res) {
    const userId = req.body.userid;

    const findUser = await User.findOne({ userid: userId });

    const data = {
        id: findUser.userid,
        username: findUser.username,
        email: findUser.email
    };

    res.status(200).json(data);
}   