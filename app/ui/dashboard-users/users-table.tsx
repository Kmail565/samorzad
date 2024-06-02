import {fetchUsers} from "../../lib/data";
import ResendButton from "./resend-button";
import EditButton from "./edit-button";
import Table from 'react-bootstrap/Table';
import styles from "@/app/styles/user-table.module.scss";
import Link from "next/link";

export default async function UsersTable()
{
    const users = await fetchUsers();
    return(
            <Table striped bordered hover className={styles.table}>
                <thead>
                <tr>
                    {/*<th>#</th>*/}
                    <th>Imię</th>
                    <th>Nazwisko</th>
                    <th>Uprawnienia</th>
                    <th>email</th>
                    <th>Edycja</th>
                </tr>
                </thead>
                {users.map((user) => (

                    <tbody key={user.id}>


                    {user.registered ?
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.permission}</td>
                            <td className={styles.email}>{user.email}</td>
                            <td className={styles.edition}><EditButton user={user}/></td>
                        </tr> :
                        <tr>
                            <td colSpan={2}>Niezarejestrowany</td>
                            <td>{user.permission}</td>
                            <td>{user.email} <ResendButton user={user}/></td>
                            <td className={styles.edition}><EditButton user={user}/></td>
                        </tr>
                    }

                    </tbody>

                ))}
            </Table>
    );
}

