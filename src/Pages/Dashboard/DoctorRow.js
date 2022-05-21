import React from 'react';

const DoctorRow = ({ doctor, index, refetch }) => {
    const { name, speciality, img } = doctor;
    return (
        <tr class="hover">
            <th>{index + 1}</th>
            <td><div class="avatar">
                <div class="w-24  mask mask-squircle">
                    <img src={img} />
                </div>
            </div>
            </td>
            <td>{name}</td>
            <td>{speciality}</td>
            <td><button class="btn btn-outline btn-error">Delete</button></td>
        </tr>
    );
};

export default DoctorRow;