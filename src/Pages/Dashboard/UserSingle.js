import React from 'react';
import { toast } from 'react-toastify';

const UserSingle = ({ user }) => {
    const { email, role } = user;

    const makeAdmin = () => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: "PUT",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 403) {
                    toast.error('Failed to Make Admin');
                }
                return res.json()
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    console.log(data);
                    toast.success(`Successfully insert Admin`);
                }
            })
    }
    return (
        <tr >
            <th>{email}</th>
            <td></td>
            <td>{role !== 'admin' && <button onClick={makeAdmin} class="btn btn-xs">Make Admin</button>}</td>
            <td><button class="btn btn-xs">Remove User</button></td>
        </tr>
    );
};

export default UserSingle;