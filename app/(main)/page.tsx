import styles from "@/app/styles/home.module.css";
import LatestNews from "@/app/ui/news/latest-news";

export default function Home() {
    return (
        <div className={styles.background}>
            <div className={styles.acc}>
                <div className={styles.greetings}>
                    <div className={styles.title}><h1>Witamy na stronie samorządu uczniowskiego XIX LO</h1></div>
                    <div className={styles.title2}><h1>Życzymy dobrze spędzonego czasu</h1></div>
                </div>
                <div className={styles.news}>
                    <h2>
                        Najnowsze wiadomości:
                    </h2>
                </div>
                <div className={styles.news2}>
                    <LatestNews/>
                </div>
            </div>
        </div>
    );
}
