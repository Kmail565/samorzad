'use client'
import {User} from "@/app/lib/definitions";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import {deleteUser} from "@/app/lib/edit";

export default function DeleteButton({user}: { user: User })
{
    const [show,setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <button onClick={handleShow}>
                Delete Account
            </button>
            <Modal show={show} onHide={handleShow}>
                <div>
                    <button onClick={handleClose}>Close</button>
                    <p>Are you sure you want to delete {user.email}&#39;s account?</p>
                    <div>
                        <form action={deleteUser}>
                            <input type="hidden" name="id" value={user.id}/>
                            <button onClick={handleClose}>Confirm</button>
                        </form>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}