import UsersTable from "../../ui/users-table";
import Link from "next/link";

export default async function Users()
{
    return(
        <>
            <h1>Users</h1>
            <Link href={"/dashboard/users/create"}>Create new user account</Link>
            <UsersTable/>
        </>
    )
}