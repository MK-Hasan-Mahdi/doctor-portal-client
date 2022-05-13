import { format } from 'date-fns';
import React, { useState } from 'react';

const BookingModal = ({ treatment, setTreatment, date }) => {
    // console.log(treatment);
    const { _id, name, slots } = treatment;
    const [modalVisible, setModalVisible] = useState(true);    // console.log(name, slots);

    const handleBooking = (event) => {
        event.preventDefault();
        const slot = event.target.timeSlot.value;
        const name = event.target.name.value;
        const email = event.target.email.value;
        const phone = event.target.phone.value;
        console.log(date, slot, name, email, phone);
        setTreatment(null);
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <label for="booking-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg text-secondary">Booked For: {name} </h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-3 '>
                        <input type="text" value={format(date, 'PP')} class="input input-bordered w-full max-w-xs" disabled />
                        <select name='timeSlot' class="select select-bordered w-full max-w-xs">
                            {
                                slots?.map(slot => <option key={slot._id} value={slot}>{slot}</option>)
                            }
                        </select>
                        <input type="text" name='name' placeholder="Your Name" class="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' placeholder="Email Address" class="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="Phone" class="input input-bordered w-full max-w-xs" />
                        <input type="submit" placeholder="Submit" class="btn btn-secondary w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;