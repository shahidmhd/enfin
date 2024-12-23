export async function addDataToRedis() {
    try {
      const response = await fetch('/api/storeData', {
        method: 'POST',
      });
  
      if (response.ok) {
        const result = await response.json();
        return { success: true, message: result.message };
      } else {
        const error = await response.json();
        return { success: false, message: error.message };
      }
    } catch (error) {
      console.error('Error in addDataToRedis:', error);
      return { success: false, message: 'An unexpected error occurred.' };
    }
  }

 export async function fetchParticipantsFromAPI() {
  try {
    const response = await fetch("http://localhost:3000/api/fetchData", {
      method: "GET",
      cache: "no-store", // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching participants:", error);
    return {};
  }
}
  

  