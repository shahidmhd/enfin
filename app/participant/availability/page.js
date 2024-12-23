import Checkavailability from '@/components/Main/Availability/Checkavailability'
import Availableslot from '@/components/Main/Availableslots/Availableslot'
import { fetchParticipantsFromAPI } from '@/helpers/api';
import React from 'react'

async function page() {
    const response = await fetchParticipantsFromAPI();
    const { participants, participantAvailability, schedules } = response.data;
   

    return (
        <>
         <div className="container p-3">
            <div className="card p-4 shadow-sm mx-auto" style={{width:"700px"}}>
            <h3 className="text-center fw-bold p-3">Check Availability</h3>
            <Checkavailability participants={participants} participantAvailability={participantAvailability} schedules={schedules} />
            </div>
            </div>
        </>
    )
}

export default page
