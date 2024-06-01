import Link from "next/link";
import styles from "@/app/styles/login.module.css";

export default function RegisterPage()
{
    return(
        <div>
        <div className={styles.parent}></div>
            <div className={styles.child3}>
                <h1 className={styles.h1}>Rejestracja się nie powiodła</h1>
                <p className={styles.zly_link}>*Chuja ode mnie nie dostaniesz*</p>
                <Link href={"/"} className={styles.link}> Strona główna </Link>
            </div>
        </div>

    )
}
