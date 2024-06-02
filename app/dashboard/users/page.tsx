import UsersTable from "../../ui/dashboard-users/users-table";
import {Suspense} from "react";
import styles from "@/app/styles/user-table.module.scss";

export default async function Users()
{
    return(
        <>
            <div className={styles.child}>
                <h1 className={styles.h1}>Zarządzanie kontami</h1>
                <Suspense fallback={<div>Loading...</div>}>
                    <UsersTable/>
                </Suspense>
            </div>
        </>
    )
}