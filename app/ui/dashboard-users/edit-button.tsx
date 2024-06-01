import {User} from "@/app/lib/definitions";
import {getSession} from "@/app/lib/actions";
import styles from "@/app/styles/user-table.module.scss";

export default async function EditButton({user}: { user: User })
{
    const session = await getSession();
    // @ts-ignore
    if(session.user.id === user.id || session.user.permission === user.permission) return <></>;
    return(
        <form action={"/dashboard/users/edit/" + user.id}>
            <button className={styles.button}>
                Edit user
            </button>
        </form>
    )
}