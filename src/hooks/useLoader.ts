/* eslint-disable -- TODO: fix eslint errors */

import { useState } from 'react';
import Loader from '../components/Loader/loader';

const useLoader = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [loaderMessage, setMessage] = useState('');

  function hideLoader() {
    setIsShowing(false);
    setMessage('');
  }
  function showLoader(message: string = '') {
    setIsShowing(true);
    setMessage(message);
  }

  return {
    isShowing,
    showLoader,
    hideLoader,
    loaderMessage,
  };
};

export default useLoader;
