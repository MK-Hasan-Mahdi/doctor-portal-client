import { format } from 'date-fns';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ treatment, setTreatment, date, refetch }) => {
    // console.log(treatment);
    const [user, loading, error] = useAuthState(auth);
    const { _id, name, slots } = treatment;
    const formatedDate = format(date, 'PP');

    const handleBooking = (event) => {
        event.preventDefault();
        const slot = event.target.timeSlot.value;
        // const name = event.target.name.value;
        // const email = event.target.email.value;
        // const phone = event.target.phone.value;
        // console.log(date, slot, name, email, phone);
        const booking = {
            treatmentId: _id,
            date: formatedDate,
            treatment: name,
            patient: user.email,
            patientName: user.displayName,
            slot: slot,
            phone: event.target.phone.value
        }
        fetch('https://enigmatic-anchorage-55835.herokuapp.com/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    toast(`Appointment is set, ${formatedDate} at ${slot}`)
                }
                else {
                    toast.error(`Already have an appointment on ${data.booking?.date} at ${data.booking?.slot}`)
                }
                refetch();
                // to close modal
                setTreatment(null);
            });
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">???</label>
                    <h3 className="font-bold text-lg text-secondary">Booked For: {name} </h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-3 '>
                        <input type="text" value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" disabled />
                        <select name='timeSlot' className="select select-bordered w-full max-w-xs">
                            {
                                slots?.map((slot, index) => <option
                                    key={index}
                                    value={slot}>{slot}
                                </option>)
                            }
                        </select>
                        <input type="text" name='name' disabled value={user?.displayName || ""} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' disabled value={user?.email || ""} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Phone" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" placeholder="Submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;