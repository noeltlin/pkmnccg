import * as argon2 from 'argon2';

import { User, Collection } from '@/lib/db';
import { SessionContext, setSessionCookie, getSessionCookie } from '@/lib/session_context';

export default async function handler(req, res) {
    const usernameInput = req.body.username;
    const passwordInput = req.body.password;

    const checkUser = await User.findOne({ username: usernameInput });

    if (checkUser === null) {
        res.status(404).redirect('/redesign/');
        console.log('user not found');
    }

    try {
        if (await argon2.verify(checkUser.password, passwordInput)) {
            // password match
            res.status(200).json({ id: checkUser.userid });
            console.log('correct password');
        } else {
            // password did not match
            res.status(401).redirect('/redesign/');
            console.log('incorrect password');
        }
    } catch (err) {
        // internal failure
        res.status(400).redirect('/redesign/');
        console.log('error');
    }
}