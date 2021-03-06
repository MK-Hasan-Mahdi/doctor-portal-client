import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointments = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState({});

    const formatedDate = format(date, 'PP');
    const { data: services, isLoading, refetch } = useQuery(['available', formatedDate], () => fetch(`https://enigmatic-anchorage-55835.herokuapp.com/available?date=${formatedDate}`)
        .then(res => res.json())
    );

    if (isLoading) {
        return <Loading></Loading>
    }

    // useEffect(() => {
    //     // fetch('https://enigmatic-anchorage-55835.herokuapp.com/service') - prothom e emon chilo
    //     fetch(`https://enigmatic-anchorage-55835.herokuapp.com/available?date=${formatedDate}`)
    //         .then(res => res.json())
    //         .then(data => setServices(data))
    // }, [formatedDate])

    return (
        <div>
            <h2 className='text-center text-xl text-secondary my-12'>Available Appointments: {format(date, 'PP')} </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services?.map(service => <Service
                        key={service._id}
                        service={service}
                        setTreatment={setTreatment}
                    ></Service>)
                }
            </div>
            {
                treatment && <BookingModal
                    date={date}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch={refetch}
                >
                </BookingModal>
            }
        </div>
    );
};

export default AvailableAppointments;