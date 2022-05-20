import React from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../../Pages/Shared/Loading';
import { useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';

const Signup = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateProError] = useUpdateProfile(auth);
    const [token] = useToken(user || googleUser)

    const navigate = useNavigate();

    if (loading || googleLoading || updating) {
        return <Loading></Loading>
    }

    let erroMsg;
    if (error || googleError || updateProError) {
        erroMsg = <p className='text-red-500'><small>Errorrr: {error?.message || googleError?.message || updateProError?.message}</small></p>
    }

    if (token) {
        // console.log(user || googleUser);
        navigate('/appointment');
    }
    const onSubmit = async data => {
        // console.log(data)
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
        console.log('update done');

    };


    return (
        <div className='flex mt-32 justify-center items-center'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
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
                                <span className="label-text">Password</span>
                            </label>
                            <input {...register("password", {
                                required: {
                                    value: true,
                                    message: "Passworddd is Required"
                                },
                                minLength: {
                                    value: 6,
                                    message: '6 character must be input'
                                }
                            })}
                                type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-600">{errors.password.message}</span>}
                            </label>
                        </div>
                        <input className='btn w-full max-w-xs' type="submit" value="Sign Up" />
                    </form>
                    {erroMsg}
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className="btn btn-outline">Continue With Google</button>
                </div>

            </div>

        </div>
    );
};

export default Signup;