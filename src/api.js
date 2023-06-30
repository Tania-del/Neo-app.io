
// const API_KEY = 'fhvVXvxuZmsucZ8Z8jAjfuKIIh6Samrwt1cvmGO3';
const API_KEY=`hyMg1el99OmlUNdgPp12a9uR1lYO1K8t5YrTg6RM`;
const API_URL = `https://api.nasa.gov/neo/rest/v1/feed`;

const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  export const fetchNeoData = async (startDate, endDate) => {
    try {
      const response = await fetch(`${API_URL}?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Something went wrong');
    }
  };
  
  export const getNeoDataForRange = async () => {
    try {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const neoDataList = [];
  
      let currentDate = new Date(startOfMonth);
      while (currentDate <= today) {
        const formattedDate = formatDate(currentDate);
        const endDate = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()));
        const neoData = await fetchNeoData(formattedDate, endDate);
        neoDataList.push({
          date: formattedDate,
          data: neoData,
        });
  
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      return neoDataList; 
    } catch (error) {
      console.log('Something went wrong');
    }
  };
  