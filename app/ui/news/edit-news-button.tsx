import {News} from "@/app/lib/definitions";
import styles from "@/app/styles/user-table.module.scss";

export default async function EditNewsButton({news}: { news: News })
{
    return(
        <form action={"/dashboard/news/edit/" + news.id}>
            <button className={styles.button}>
                Edytuj posta
            </button>
        </form>
    )
}