import {logout} from "../../lib/actions";

export default function LogoutForm()
{
    return(
        <form action={logout}>
            <button>Log out</button>
        </form>
    )
}