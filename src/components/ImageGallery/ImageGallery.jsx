import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <ul
      style={{
        display: 'grid',
        maxWidth: 'calc(100vw - 48px)',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gridGap: '16px',
        marginTop: '0',
        marginBottom: '0',
        padding: '0',
        paddingTop: '24px',
        listStyle: 'none',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webImage={webformatURL}
          description={tags}
          openModal={() => openModal(largeImageURL)}
        />
      ))}
    </ul>
  );
};

Event.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webImage: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
