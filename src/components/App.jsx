import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { FetchImages } from '../services/api';
import { Button } from './Button';
import { Modal } from './Modal';

export function App() {
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [totalSearchResult, setTotalSearchResult] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImg, setLargeImg] = useState(null);

  const handleSearchbarSubmit = searchString => {
    setSearchString(searchString);
    setCurrentPage(1);
    setSearchResult([]);
  };

  useEffect(() => {
    setLoading(true);
    FetchImages(currentPage, searchString)
      .then(images => {
        if (images.hits.length === 0) {
          toast.info('Found no matches with entered data!');
        }

        setSearchResult(prevState => [...prevState, ...images.hits]);
        setTotalSearchResult(images.totalHits);
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [searchString, currentPage]);

  const nextPage = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  const showLargeImg = clickedImage => {
    toggleModal();
    setLargeImg(clickedImage);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchbarSubmit}></Searchbar>
      {error && <h2>Please, enter correct data!</h2>}
      {loading && <Loader></Loader>}
      <ToastContainer autoClose={3000}></ToastContainer>
      {searchResult.length > 0 && (
        <ImageGallery
          images={searchResult}
          openModal={showLargeImg}
        ></ImageGallery>
      )}
      {searchResult.length > 0 &&
        totalSearchResult > searchResult.length &&
        !loading && <Button onClick={nextPage}></Button>}
      {isModalOpen && (
        <Modal
          largeImageUrl={largeImg}
          description={searchString}
          onClose={toggleModal}
        ></Modal>
      )}
    </div>
  );
}
