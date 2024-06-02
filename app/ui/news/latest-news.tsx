import {fetchLatestNews} from "@/app/lib/data";

export default async function LatestNews() {
    const news = await fetchLatestNews();
    return(
        <>
            <div>
                {news.title}, {news.text}
            </div>
        </>
    )
}