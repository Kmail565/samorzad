import LoginForm from "../../ui/forms/login-form";
import {getSession} from "../../lib/actions";
import {redirect} from "next/navigation";

export default async function Login()
{
    const session = await getSession();
    if(session.isLoggedIn) redirect("/dashboard");


    return (
        <main>
            <h1>Login</h1>
            <LoginForm/>
        </main>
    );
}