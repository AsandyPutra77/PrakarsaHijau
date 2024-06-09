export async function fetchHealthArticles() {
    const apiKey = 'a77ce0b908e84700951fe15d6a0c0e75';
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.articles;
    } catch (error) {
      console.error('Error fetching health articles:', error);
      return [];
    }
  }