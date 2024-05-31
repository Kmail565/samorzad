import LoginForm from "../../ui/forms/login-form";
import {getSession} from "../../lib/actions";
import {redirect} from "next/navigation";
import styles from "@/app/styles/login.module.css";

export default async function Login()
{
    const session = await getSession();
    if(session.isLoggedIn) redirect("/dashboard");


    return (
        <main>
            <LoginForm/>
        </main>
    );
}