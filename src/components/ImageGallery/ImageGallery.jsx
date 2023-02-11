import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import ImageGalleryItem from '../ImageGalleryItem';
import Button from 'components/Button';
import { getPhotos } from '../../services/api';
import { ImageGalleryList } from './ImageGallery.styled';
import Loader from '../Loader';
import { useEffect } from 'react';

const ImageGallery = ({ searchQuery, openModalImage }) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [imageTag, setImageTag] = useState('');

  const loadMore = useRef(false);

  useEffect(() => {
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
    setTotalPages('');
  }, [searchQuery]);

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await getPhotos(query, page);
        const totalPages = Math.ceil(response.totalHits / 12);
        const imagesArray = response.hits.map(
          ({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            imageTag: tags,
          })
        );

        setImages(prevState => [...prevState, ...imagesArray]);
        setTotalPages(totalPages);
      } catch (error) {
        toast.error('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleBattonClick = () => {
    if (totalPages === page) {
      toast.info('There is no more images');
      return;
    }
    setPage(state => state + 1);
    loadMore.current = true;
  };

  useEffect(() => {
    if (page > 1 && loadMore.current) {
      const { height: cardHeight } = document
        .querySelector('ul')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }
  });

  const onImageClick = id => {
    const { largeImageURL, imageTag } = images.find(image => image.id === +id);
    openModalImage(largeImageURL, imageTag);
    loadMore.current = false;
  };

  return (
    <>
      <ImageGalleryList>
        {images.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image.webformatURL}
            id={image.id}
            onImageClick={id => {
              onImageClick(id);
            }}
            alt={image.imageTag}
          />
        ))}
      </ImageGalleryList>
      {isLoading && <Loader />}
      {totalPages > 1 && <Button onClick={handleBattonClick} />}
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = { searchQuery: PropTypes.string.isRequired };
