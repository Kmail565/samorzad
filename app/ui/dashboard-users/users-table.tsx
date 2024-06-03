import {fetchUsers, formatDateToLocal} from "../../lib/data";
import ResendButton from "./resend-button";
import EditButton from "./edit-button";
import Table from 'react-bootstrap/Table';
import styles from "@/app/styles/user-table.module.scss";
import Link from "next/link";

export default async function UsersTable()
{
    const users = await fetchUsers();
    return(
        <div className={styles.main_table}>
            <div className={styles.button_wrapper}>
                <Link href={"/dashboard/users/create"}>
                    <button className={styles.button3}>Utwórz nowe konto</button>
                </Link>
            </div>
            <Table striped bordered hover className={styles.table}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Data</th>
                    <th>Uprawnienia</th>
                    <th>Email</th>
                    <th>Edycja</th>
                </tr>
                </thead>
                {users.map((user, index) => (

                    <tbody key={user.id}>
                    {user.registered ?
                        <tr>
                            <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td> {formatDateToLocal(user.date)} </td>
                            <td>{user.permission}</td>
                            <td className={styles.email}>{user.email}</td>
                            <td className={styles.edition}><EditButton user={user}/></td>
                        </tr> :
                        <tr>
                            <td>{index + 1}</td>
                            <td colSpan={2}>Niezarejestrowany</td>
                            <td> {formatDateToLocal(user.date)} </td>
                            <td>{user.permission}</td>
                            <td>{user.email} <ResendButton user={user}/></td>
                            <td className={styles.edition}><EditButton user={user}/></td>
                        </tr>
                    }

                    </tbody>
                ))}
            </Table>
        </div>
    );
}

