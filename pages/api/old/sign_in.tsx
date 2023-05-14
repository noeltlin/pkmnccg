import * as argon2 from 'argon2';

import { User, Collection } from '@/lib/db';

export default async function handler(req, res) {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;

    const checkUser = await User.findOne({ username: usernameInput });

    try {
        if (await argon2.verify(checkUser.password, passwordInput)) {
            // password match
            console.log('correct password');
        } else {
            // password did not match
            console.log('incorrect password');
        }
    } catch (err) {
        // internal failure
        console.log('error');
    }

    res.status(200).json({ checkUser });
}