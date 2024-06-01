import {getSession} from "@/app/lib/actions";

export default async function Home()
{
    const session = await getSession();

    return(
        <>
            <div>
                <h1>Dashboard</h1>
                <p>Witaj {session.user?.name} {session.user?.surname}</p>
            </div>
        </>
    )
}