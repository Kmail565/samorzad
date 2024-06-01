import {getSession} from "@/app/lib/actions";
import styles from "@/app/styles/create-form.module.scss";

export default async function Home()
{
    const session = await getSession();

    return(
        <div>
            <div className={styles.parent}></div>
            <div className={styles.child2}>
                <p className={styles.h1}>{session.user?.name} {session.user?.surname}</p>
                <h1 className={styles.h1}>Witamy w Samorządzie</h1>
            </div>
        </div>
    )
}