import {User} from "@/app/lib/definitions";

export default function DeleteButton({user}: { user: User })
{
    return (
        <div>
            <h2>Are you sure you want to delete {user.email}&#39;s account?</h2>
            <button>Yes</button>
            <button>No</button>
        </div>
    )
}