export function FetchImages(page, search) {
  const API_KEY = '35432410-5608666ea6b12176b87f6dc6c';

  return fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('No matches with entered data'));
  });
}
