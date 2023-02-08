import React from 'react';
import PropTypes from 'prop-types';

import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, id, onImageClick, alt }) => {
  const handleClick = e => {
    onImageClick(e.currentTarget.id);
  };

  return (
    <ImageItem>
      <Image src={image} alt={alt} onClick={handleClick} id={id} />
    </ImageItem>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onImageClick: PropTypes.func.isRequired,
  alt: PropTypes.string.isRequired,
};
