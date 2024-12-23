import redis from "@/lib/redis";

export async function GET(request) {
  try {
    // Fetch raw data from Redis
    const rawParticipants = JSON.parse(await redis.get("participants"));
    const rawParticipantAvailability = JSON.parse(await redis.get("participantAvailability"));
    const rawSchedules = JSON.parse(await redis.get("schedules"));

    // Transform participantAvailability to an array format
    const participantAvailability = Object.entries(rawParticipantAvailability).map(([id, days]) => ({
      id,
      availability: Object.entries(days).map(([day, slots]) => ({
        day,
        slots: slots.map(({ start, end }) => ({ start, end })),
      })),
    }));

    // Transform schedules to an array format
    const schedules = Object.entries(rawSchedules).map(([id, days]) => ({
      id,
      schedule: Object.entries(days).map(([date, slots]) => ({
        date,
        slots: slots.map(({ start, end }) => ({ start, end })),
      })),
    }));

    // Keep participants as is
    const participants = Object.entries(rawParticipants).map(([id, details]) => ({
      id,
      ...details,
    }));

    // Combine data
    const data = {
      participants,
      participantAvailability,
      schedules,
    };

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: "Data fetched successfully",
        data,
      }),
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error fetching data",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
