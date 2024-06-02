import {getSession} from "@/app/lib/actions";
import EditNamesForm from "@/app/ui/forms/edit-names-form";
import EditPasswordsForm from "../../ui/forms/edit-passwords-form";
import styles from "@/app/styles/dashboard/profile/edit-profile.module.scss"

export default async function Profile()
{
    const session = await getSession();
    if(!session.user) return <></>;

    return (
            <div className={styles.background}>
                <div className={styles.main}>
                    <div className={styles.title}>
                        <h1>Edytuj Profil</h1>
                        <p>- {session.user.email} -</p>
                    </div>
                    <div className={styles.form_names}>
                        <EditNamesForm user={session.user}/>
                    </div>
                    <div className={styles.form_passwords}>
                        <EditPasswordsForm user={session.user}/>
                    </div>
                </div>
            </div>
    )
}