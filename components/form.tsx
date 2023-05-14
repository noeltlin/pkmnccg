export default function Form() {

    return (
        <form action="/api/auth/sign_up" method="post">
            <label htmlFor="username">Username</label>
            <br />
            <input type="text" id="username" name="username" required />
            <br /><br />
            <label htmlFor="email">Email Address</label>
            <br />
            <input type="text" id="email" name="email" required />
            <br /><br />
            <label htmlFor="password">Password</label>
            <br />
            <input type="text" id="password" name="password" required />
            <br /><br />
            <button type="submit">Submit</button>
        </form>
    )
}