import {fetchNews} from "@/app/lib/data";

export default async function NewsTable() {
    const newsList = await fetchNews();

    return(
        <>
            {newsList.map((post) => (
                <div key={post.id}>
                    {post.title}, {post.text}
                </div>
            ))}
        </>
    )
}