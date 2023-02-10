import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [largeImageURL, setlargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  const onSubmit = newQuery => {
    setQuery(newQuery);
  };

  const handleImageClick = (image, imageTag) => {
    setlargeImageURL(image);
    setTags(imageTag);
  };

  const closeModal = () => {
    setlargeImageURL('');
    setTags('');
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onSubmit} />
      {query && (
        <ImageGallery searchQuery={query} openModalImage={handleImageClick} />
      )}
      {largeImageURL && (
        <Modal closeModal={closeModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
