import {fetchLatestNews} from "@/app/lib/data";
import styles from "@/app/styles/latest-news.module.scss";

export default async function LatestNews() {
    const news = await fetchLatestNews();
    return(
        <div className={styles.acc}>
            <h2 className={styles.title}>- {news.title} -</h2>
            <p className={styles.content}>{news.text}</p>
        </div>
    )
}