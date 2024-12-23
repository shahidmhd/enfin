import redis from "@/lib/redis";

export async function POST(request) {
  try {
    const participants = {
      1: { name: "Adam", threshold: 4 },
      2: { name: "Bosco", threshold: 4 },
      3: { name: "Catherine", threshold: 5 },
    };

    const participantAvailability = {
      1: {
        Monday: [
          { start: "09:00", end: "11:00" },
          { start: "14:00", end: "16:30" },
        ],
        Tuesday: [{ start: "09:00", end: "18:00" }],
      },
      2: {
        Monday: [{ start: "09:00", end: "18:00" }],
        Tuesday: [{ start: "09:00", end: "11:30" }],
      },
      3: {
        Monday: [{ start: "09:00", end: "18:00" }],
        Tuesday: [{ start: "09:00", end: "18:00" }],
      },
    };

    const schedules = {
      1: {
        "28/10/2024": [
          { start: "09:30", end: "10:30" },
          { start: "15:00", end: "16:30" },
        ],
      },
      2: {
        "28/10/2024": [{ start: "13:00", end: "13:30" }],
        "29/10/2024": [{ start: "09:00", end: "10:30" }],
      },
    };

    // Store data in Redis
    await redis.set("participants", JSON.stringify(participants));
    await redis.set("participantAvailability", JSON.stringify(participantAvailability));
    await redis.set("schedules", JSON.stringify(schedules));

    return new Response(
      JSON.stringify({ message: "Data stored in Redis successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error storing data", error: error.message }), {
      status: 500,
    });
  }
}
