import React, { useEffect, useState } from 'react';
import UserSingle from './UserSingle';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://enigmatic-anchorage-55835.herokuapp.com/user',
            {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    return (
        <div>
            <h2>All Users: {users.length} </h2>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => <UserSingle
                                key={user._id}
                                user={user}
                            ></UserSingle>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;