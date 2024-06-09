export async function fetchHealthArticles() {
  const apikey = '239e6dd5d4487358f370143d368a6b84';
  const category = 'health';
  const url = 'https://gnews.io/api/v4/top-headlines?category=' + category + '&lang=en&country=us&max=10&apikey=' + apikey;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.articles.map(article => ({
    title: article.title,
    summary: article.description,
    image: article.image,
  }));
}