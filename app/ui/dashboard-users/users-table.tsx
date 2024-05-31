import {fetchUsers} from "../../lib/data";
import ResendButton from "./resend-button";
import EditButton from "./edit-button";

export default async function UsersTable()
{
    const users = await fetchUsers();
    return(
        <>
            {users.map((user) => (
                <div key={user.id}>
                    {user.registered ?
                        <div> {user.name} {user.surname} {user.permission} {user.email} <EditButton user={user}/> </div> :
                        <div> Not registered {user.email} <ResendButton user={user}/> <EditButton user={user}/> </div>
                    }
                </div>
            ))}
        </>
    );
}

