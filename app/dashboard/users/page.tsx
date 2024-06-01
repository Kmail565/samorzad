import UsersTable from "../../ui/dashboard-users/users-table";
import Link from "next/link";
import {Suspense} from "react";

export default async function Users()
{
    return(
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <UsersTable/>
            </Suspense>
        </>
    )
}