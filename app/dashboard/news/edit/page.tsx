import Link from "next/link";

export default async function EditPage()
{
    return(
        <>
            <h1>Edytuj użytkownika</h1>
            <h6>Zły link</h6>
            <Link href={"/dashboard/news"}> Return </Link>
        </>
    )
}