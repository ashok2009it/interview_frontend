import { useEffect, useState } from 'react';

export function useSnackbar() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [hideDuration, setHideDuration] = useState<number>(5000);
  const [type, setType] = useState<string>('success');

  useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, hideDuration);
    }
  }, [isActive, hideDuration]);

  const handleClose = () => {
    setIsActive(false);
  };

  const openSnackBar = (
    message = 'Something went wrong...',
    hideDuration = 5000,
    type = 'success'
  ) => {
    setMessage(message);
    setIsActive(true);
    setHideDuration(hideDuration);
    setType(type);
  };

  return { isActive, message, type, openSnackBar, handleClose };
}
