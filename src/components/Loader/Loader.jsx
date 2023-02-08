import React from 'react';
import styled from '@emotion/styled';
import { ThreeCircles } from 'react-loader-spinner';

const LoaderAnimation = styled.div`
  margin: 0 auto;
`;

const Loader = () => {
  return (
    <LoaderAnimation>
      <ThreeCircles
        height="100"
        width="100"
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </LoaderAnimation>
  );
};

export default Loader;
