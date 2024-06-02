import UsersTable from "../../ui/dashboard-users/users-table";
import Link from "next/link";
import {Suspense} from "react";
import styles from "@/app/styles/user-table.module.scss";

export default async function Users()
{
    return(
        <>
            <div className={styles.child}>
                <h1 className={styles.h1}>Zarządzanie kontami</h1>
                <Link href={"/dashboard/users/create"}><button className={styles.button3}>Create new user account</button></Link>
                <Suspense fallback={<div>Loading...</div>}>
                    <UsersTable/>
                </Suspense>
            </div>
        </>
    )
}