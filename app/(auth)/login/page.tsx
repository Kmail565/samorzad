import LoginForm from "../../ui/forms/login-form";
import {redirect} from "next/navigation";
import {getSession} from "@/app/lib/actions";

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