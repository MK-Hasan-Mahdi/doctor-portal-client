import React, { useState } from 'react';
import Footer from '../Shared/Footer';
import AppointmentBanner from './AppointmentBanner';
import AvailableAppointments from './AvailableAppointments';

const Appointment = () => {
    const [date, setDate] = useState(new Date);
    return (
        <div>
            <h2>take appointment</h2>
            <AppointmentBanner date={date} setDate={setDate}></AppointmentBanner>
            <AvailableAppointments date={date}></AvailableAppointments>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;