import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webImage, description, openModal }) => {
  return (
    <li
      style={{
        borderRadius: '2px',
      }}
    >
      <img
        src={webImage}
        alt={description}
        onClick={openModal}
        style={{
          width: '100%',
          height: '260px',
          objectFit: 'cover',
          transition: 'transform 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />
    </li>
  );
};

Event.propTypes = {
  webImage: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
