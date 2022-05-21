import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({ doctor, index, refetch }) => {
    const { name, speciality, img, email } = doctor;

    const handleDelete = (email) => {
        fetch(`http://localhost:5000/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount) {
                    toast.success(`Doctor ${name} deleted successfully`);
                    refetch();
                }
            })
    }

    return (
        <tr class="hover">
            <th>{index + 1}</th>
            <td><div class="avatar">
                <div class="w-14  mask mask-squircle">
                    <img src={img} />
                </div>
            </div>
            </td>
            <td>{name}</td>
            <td>{speciality}</td>
            <td><button onClick={() => handleDelete(email)} class="btn btn-outline btn-error">Delete</button></td>
        </tr>
    );
};

export default DoctorRow;