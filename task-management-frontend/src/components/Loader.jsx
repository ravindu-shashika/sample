import React from 'react';

const Loader = ({ color, sizeSm, pullDown }) => {
  const spinnerColor = color ? color : '#F7911D';
  const spinnerSize = sizeSm ? '15px' : '30px';

  return (
    <div>
      {pullDown ? (
        <>
          <br />
          <br />
        </>
      ) : null}
      <div className="d-flex justify-content-center">
        <div
          className="spinner-border"
          role="status"
          style={{
            color: spinnerColor,
            width: spinnerSize,
            height: spinnerSize,
          }}
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
