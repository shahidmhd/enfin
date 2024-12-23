
  // get un available times

// export function checkParticipantAvailableSlots(payload, participants, participantAvailability, schedules) {
//     const { participant_ids, date_range } = payload;

//     if (!participant_ids || !date_range) {
//         console.error("Invalid input data.");
//         return { success: false, message: "Invalid input data." };
//     }

//     // Helper to parse and format dates in "dd/mm/yyyy"
//     const parseDate = (dateStr) => {
//         const [day, month, year] = dateStr.split("/");
//         return new Date(`${year}-${month}-${day}`);
//     };

//     // const formatDate = (date) => {
//     //     const day = String(date.getDate()).padStart(2, "0");
//     //     const month = String(date.getMonth() + 1).padStart(2, "0");
//     //     const year = date.getFullYear();
//     //     return `${day}/${month}/${year}`;
//     // };

//     const startDate = parseDate(date_range.start);
//     const endDate = parseDate(date_range.end);

//     const result = {};

//     // Helper function to generate 30-minute slots
//     const generateSlots = (start, end) => {
//         const slots = [];
//         const startTime = new Date(`1970-01-01T${start}:00Z`);
//         const endTime = new Date(`1970-01-01T${end}:00Z`);

//         while (startTime < endTime) {
//             const nextSlot = new Date(startTime.getTime() + 30 * 60 * 1000);
//             slots.push(`${startTime.toISOString().slice(11, 16)}-${nextSlot.toISOString().slice(11, 16)}`);
//             startTime.setMinutes(startTime.getMinutes() + 30);
//         }

//         return slots;
//     };

//     // Iterate through each date in the range
//     for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
//         const dateStr = formatDate(currentDate);

//         let commonSlots = null;

//         for (const participant_id of participant_ids) {
//             const participant = participants.find((p) => p.id === participant_id);
//             const availability = participantAvailability.find((pa) => pa.id === participant_id)?.availability || [];
//             const schedule = schedules.find((s) => s.id === participant_id)?.schedule || [];

//             if (!participant) {
//                 console.error(`Participant with ID ${participant_id} not found.`);
//                 continue;
//             }

//             const threshold = participant.threshold;

//             // Get availability for the current day
//             const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: "long" });
//             const dayAvailability = availability.find((a) => a.day === dayOfWeek);

//             if (!dayAvailability) {
//                 commonSlots = [];
//                 break;
//             }

//             // Generate time slots for the day
//             const availableSlots = dayAvailability.slots.flatMap(({ start, end }) => generateSlots(start, end));

//             // Get busy slots for the current date
//             const dailySchedules = schedule.filter((s) => s.date === dateStr);
//             const busySlots = dailySchedules.flatMap(({ slots }) =>
//                 slots.map(({ start, end }) => generateSlots(start, end)).flat()
//             );

//             // Remove busy slots from available slots
//             const freeSlots = availableSlots.filter((slot) => !busySlots.includes(slot));

//             // Apply threshold
//             if (freeSlots.length > threshold) {
//                 freeSlots.length = threshold; // Keep only `threshold` number of slots
//             }

//             // Find common slots
//             commonSlots = commonSlots === null ? freeSlots : commonSlots.filter((slot) => freeSlots.includes(slot));

//             // If no common slots remain, skip further checks
//             if (commonSlots.length === 0) {
//                 break;
//             }
//         }

//         // Add common slots to the result
//         if (commonSlots && commonSlots.length > 0) {
//             result[dateStr] = commonSlots;
//         }
//     }

//     return { success: true, message: "Overlapping slots calculated successfully.", data: result };
// }


// get available times
export function checkParticipantAvailableSlots(payload, participants, participantAvailability, schedules) {
    const { participant_ids, date_range } = payload;

    if (!participant_ids || !date_range) {
        console.error("Invalid input data.");
        return { success: false, message: "Invalid input data." };
    }
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/");
        return new Date(`${year}-${month}-${day}`);
    };

    const startDate = parseDate(date_range.start);
    const endDate = parseDate(date_range.end);

    const result = {};

    const generateSlots = (start, end) => {
        const slots = [];
        const startTime = new Date(`1970-01-01T${start}:00Z`);
        const endTime = new Date(`1970-01-01T${end}:00Z`);

        while (startTime < endTime) {
            const nextSlot = new Date(startTime.getTime() + 30 * 60 * 1000);
            slots.push(`${startTime.toISOString().slice(11, 16)}-${nextSlot.toISOString().slice(11, 16)}`);
            startTime.setMinutes(startTime.getMinutes() + 30);
        }

        return slots;
    };

    // Iterate through each date in the range
    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        const dateStr = formatDate(currentDate);

        let allAvailableSlots = [];

        for (const participant_id of participant_ids) {
            const availability = participantAvailability.find((pa) => pa.id === participant_id)?.availability || [];
            const schedule = schedules.find((s) => s.id === participant_id)?.schedule || [];

            // Get availability for the current day
            const dayOfWeek = currentDate.toLocaleDateString("en-US", { weekday: "long" });
            const dayAvailability = availability.find((a) => a.day === dayOfWeek);

            if (!dayAvailability) continue;

            // Generate time slots for the day
            const availableSlots = dayAvailability.slots.flatMap(({ start, end }) => generateSlots(start, end));

            // Get busy slots for the current date
            const dailySchedules = schedule.filter((s) => s.date === dateStr);
            const busySlots = dailySchedules.flatMap(({ slots }) =>
                slots.map(({ start, end }) => generateSlots(start, end)).flat()
            );

            // Remove busy slots from available slots
            const freeSlots = availableSlots.filter((slot) => !busySlots.includes(slot));
            allAvailableSlots = [...allAvailableSlots, ...freeSlots];
        }

        // Remove duplicate slots and add to the result
        if (allAvailableSlots.length > 0) {
            result[dateStr] = [...new Set(allAvailableSlots)];
        }
    }

    return { success: true, message: "Non-overlapping slots calculated successfully.", data: result };
}


export const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
};