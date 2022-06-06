import React, { useRef, useEffect } from 'react';
import LayoutPage from '@src/components/layouts/layout-page';
import HeaderContainer from '@src/containers/header-container';
import Canvas from '@src/components/canvas';
import useServices from '@src/utils/hooks/use-services';

function LeafFall() {
  const leafFallRef = useRef(null);

  const services = useServices();

  //!delete
  const CanvasleafFall = services.canvas.leafFall;

  useEffect(() => {
    services.canvas.leafFall.mount(leafFallRef.current);
    //!delete
    console.log(CanvasleafFall);
    services.canvas.leafFall.render();
    return () => {
      services.canvas.leafFall.unmount();
    };
  }, []);

  return (
    <LayoutPage header={<HeaderContainer />}>
      <Canvas ref={leafFallRef} />
    </LayoutPage>
  );
}

export default React.memo(LeafFall);
