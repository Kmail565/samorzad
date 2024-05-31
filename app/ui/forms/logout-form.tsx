import {logout} from "../../lib/login";

export default function LogoutForm()
{
    return(
        <form action={logout}>
            <button>Log out</button>
        </form>
    )
}