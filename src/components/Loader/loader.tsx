/* eslint-disable -- TODO: fix eslint errors */

import { Backdrop, CircularProgress } from '@mui/material';

const Loader = ({ isShowing, hide, allowHide, loaderMessage }: any) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: 999999 }}
      open={isShowing}
      onClick={() => {
        allowHide ? hide() : null;
      }}
    >
      <div className='flex flex-col items-center'>
        <CircularProgress
          style={{ color: '#354740' }}
          size={40}
          className='py-5'
        />
        <h3 className='text-2xl font-nanum leading-5 py-5 text-forest-primary'>
          {loaderMessage}
        </h3>
      </div>
    </Backdrop>
  );
};

export default Loader;
