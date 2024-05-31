import UsersTable from "../../ui/dashboard-users/users-table";
import Link from "next/link";
import {Suspense} from "react";

export default async function Users()
{
    return(
        <>
            <h1>Users</h1>
            <Link href={"/dashboard/users/create"}>Create new user account</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <UsersTable/>
            </Suspense>
        </>
    )
}