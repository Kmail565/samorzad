import LogoutForm from "../ui/forms/logout-form";
import {getSession} from "../lib/actions";

export default async function Home()
{
    const session = await getSession();

    return(
        <>
            <h1>Dashboard</h1>
            <p>Witaj {session.user?.name} {session.user?.surname}</p>
        </>
    )
}