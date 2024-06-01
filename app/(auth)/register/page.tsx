import Link from "next/link";
import styles from "@/app/styles/login.module.css";

export default function RegisterPage()
{
    return(
        <div>
        <div className={styles.bg}></div>
            <div className={styles.child3}>
                <h1 className={styles.h1}>Rejestracja się nie powiodła</h1>
                <p className={styles.zly_link}>*Niepoprawny link*</p>
                <Link href={"/"} className={styles.link}><button className={styles.button3}> Strona główna </button></Link>
            </div>
        </div>

    )
}
