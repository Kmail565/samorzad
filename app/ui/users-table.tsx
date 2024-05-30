import {fetchUsers} from "../lib/data";

export default async function UsersTable()
{
    const users = await fetchUsers()
    return(
        <>
            {users.map((user) => (
                <div key={user.id}>
                    {user.name} {user.surname} {user.email} {user.permission}
                </div>
            ))}
        </>
    );
}