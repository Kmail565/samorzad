import Link from "next/link";

export default async function EditPage()
{
    return(
        <>
            <h1>Edit User</h1>
            <p>Wrong Link</p>
            <Link href={"/dashboard/users"}> Return </Link>
        </>
    )
}