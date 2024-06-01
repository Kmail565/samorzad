import {User} from "@/app/lib/definitions";
import {getSession} from "@/app/lib/actions";

export default async function EditButton({user}: { user: User })
{
    const session = await getSession();
    // @ts-ignore
    if(session.user.id === user.id || session.user.permission === user.permission) return <></>;
    return(
        <form action={"/dashboard/users/edit/" + user.id}>
            <button>
                Edit user
            </button>
        </form>
    )
}