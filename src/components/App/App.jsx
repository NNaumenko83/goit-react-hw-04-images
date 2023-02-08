import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';

export class App extends Component {
  state = {
    query: '',
    largeImageURL: '',
  };

  onSubmit = newQuery => {
    this.setState({ query: newQuery });
  };

  handleImageClick = image => {
    this.setState({ largeImageURL: image });
  };

  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const { query, largeImageURL } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {query && (
          <ImageGallery query={query} onImageClick={this.handleImageClick} />
        )}
        {largeImageURL && (
          <Modal closeModal={this.closeModal}>
            <img src={largeImageURL} alt="XXX" />
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
  }
}
