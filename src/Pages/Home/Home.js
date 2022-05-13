import React from 'react';
import Banner from './Banner';
import Info from './Info';
import MakeAppointment from './MakeAppointment';
import OurCare from './OurCare';
import Services from './Services';

const Home = () => {
    return (
        <div className='px-12'>
            <Banner />
            <Info />
            <Services />
            <OurCare></OurCare>
            <MakeAppointment></MakeAppointment>
        </div>
    );
};

export default Home;