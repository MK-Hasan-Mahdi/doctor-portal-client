import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../assets/icons/clock.svg';
import marker from '../../assets/icons/marker.svg';
import phone from '../../assets/icons/phone.svg';

const Info = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <InfoCard cardTitle='Openging Hours' bgClass='bg-gradient-to-r from-secondary to-primary' img={clock} cardDetail='Sat-Thu, 10am - 5pm'></InfoCard>
            <InfoCard cardTitle='Visit Location' bgClass='bg-neutral' img={marker} cardDetail='Dhanmondi, Dhaka'></InfoCard>
            <InfoCard cardTitle='Contact us now' bgClass='bg-gradient-to-r from-secondary to-primary' img={phone} cardDetail='01912-121212'></InfoCard>
        </div>
    );
};

export default Info;