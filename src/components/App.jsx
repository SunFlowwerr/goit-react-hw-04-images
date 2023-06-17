import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from './Loader';
import { Searchbar } from './Searchbar';
import { ImageGallery } from './ImageGallery';
import { FetchImages } from '../services/api';
import { Button } from './Button';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    searchString: '',
    searchResult: [],
    totalSearchResult: 0,
    currentPage: 1,
    totalPages: 0,
    loading: false,
    error: false,
    isModalOpen: false,
    largeImg: null,
  };

  handleSearchbarSubmit = searchString => {
    this.setState({ searchString, currentPage: 1, searchResult: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    const { currentPage, searchString, searchResult } = this.state;

    const prevString = prevState.searchString;
    const prevPage = prevState.currentPage;
    const nextString = searchString;
    const nextPage = currentPage;

    if (prevString !== nextString || prevPage !== nextPage) {
      this.setState({ loading: true });
      FetchImages(currentPage, nextString)
        .then(images => {
          if (images.hits.length === 0) {
            toast.info('Found no matches with entered data!');
          }

          this.setState(prevState => ({
            searchResult: [...searchResult, ...images.hits],
            totalSearchResult: images.totalHits,
          }));
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ loading: false }));
    }
  }

  nextPage = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
  };

  toggleModal = () => {
    this.setState(prevState => ({
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  showLargeImg = clickedImage => {
    this.toggleModal();
    this.setState({
      largeImg: clickedImage,
    });
  };

  render() {
    const {
      searchResult,
      totalSearchResult,
      loading,
      error,
      isModalOpen,
      largeImg,
      searchString,
    } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSearchbarSubmit}></Searchbar>
        {error && <h2>Please, enter correct data!</h2>}
        {loading && <Loader></Loader>}
        <ToastContainer autoClose={3000}></ToastContainer>
        {searchResult.length > 0 && (
          <ImageGallery
            images={searchResult}
            openModal={this.showLargeImg}
          ></ImageGallery>
        )}
        {searchResult.length > 0 &&
          totalSearchResult > searchResult.length &&
          !loading && <Button onClick={this.nextPage}></Button>}
        {isModalOpen && (
          <Modal
            largeImageUrl={largeImg}
            description={searchString}
            onClose={this.toggleModal}
          ></Modal>
        )}
      </div>
    );
  }
}
