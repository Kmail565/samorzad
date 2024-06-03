import {redirect} from "next/navigation";
import {checkId, getUser} from "@/app/lib/edit";
import EditForm from "@/app/ui/dashboard-users/edit-user-form";
import DeleteButton from "@/app/ui/dashboard-users/delete-button";
import ResetPasswordButton from "@/app/ui/dashboard-users/reset-password-button";
import styles from "@/app/styles/create-form.module.scss";

type Props = {
    params: {
        id: string;
    }
}

export default async function Edit({params} : Props)
{
    const user = await getUser(params.id);
    const correctId = await checkId(params.id);
    if(!correctId) redirect("/dashboard/users/edit");
    return(
        <div>
            <div className={styles.parent}></div>
            <div className={styles.child3}>
                <h1 className={styles.h1}>Edit User</h1>
                <EditForm user={user}/>
                <div><DeleteButton user={user}/></div>
                <div><ResetPasswordButton user={user}/></div>
            </div>
        </div>
    )
}