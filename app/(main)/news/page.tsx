import styles from "@/app/styles/home.module.css";
import NewsTable from "@/app/ui/news/news-table";

export default function News()
{
    return(
        <div>
            <div className={styles.acc}>
                <h1 className={styles.title}>Aktualności</h1>
                <NewsTable/>
            </div>
        </div>
    )
}