import React from 'react';
import LayoutPage from '@src/components/layouts/layout-page';
import HeaderContainer from '@src/containers/header-container';
import CanvasLeafFall from '@src/components/graphic/canvas-leaf-fall';

function LeafFall() {
  return (
    <LayoutPage header={<HeaderContainer />}>
      <CanvasLeafFall>
        <h1>Что-то пошло не по плану</h1>
      </CanvasLeafFall>
    </LayoutPage>
  );
}

export default React.memo(LeafFall);
