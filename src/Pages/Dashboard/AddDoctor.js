import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();

    // loading service for doctors
    const { data: services, isLoading } = useQuery(['services'], () =>
        fetch('http://localhost:5000/service')
            .then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }

    const onSubmit = async data => {
        // console.log(data)
        console.log('update done', data);

    };
    return (
        <div>
            <h2 className="text-2xl">Add a Doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" placeholder="Your Name" className="input input-bordered w-full max-w-xs"
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Nameee is Required"
                            },
                        })}
                    />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email Address" className="input input-bordered w-full max-w-xs"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Emmailll is Required"
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'Provide valid Email'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>

                    <select {...register("speciality")} class="select select-bordered w-full max-w-xs">
                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            > {service.name} </option>)
                        }


                    </select>


                </div>
                <input className='btn w-full max-w-xs mt-4' type="submit" value="Add Doctor" />
            </form>
        </div>
    );
};

export default AddDoctor;