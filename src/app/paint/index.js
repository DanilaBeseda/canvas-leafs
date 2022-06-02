import React from 'react';
import LayoutPage from '@src/components/layouts/layout-page';
import CanvasPaint from '@src/components/graphic/canvas-paint';
import HeaderContainer from '@src/containers/header-container';

function Paint() {
  return (
    <LayoutPage header={<HeaderContainer />}>
      <CanvasPaint>
        <h1>Что-то пошло не по плану</h1>
      </CanvasPaint>
    </LayoutPage>
  );
}

export default React.memo(Paint);
