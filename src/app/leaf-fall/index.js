import React, { useRef, useEffect } from 'react';
import LayoutPage from '@src/components/layouts/layout-page';
import HeaderContainer from '@src/containers/header-container';
import Canvas from '@src/components/canvas';
import useServices from '@src/utils/hooks/use-services';

function LeafFall() {
  const ref = useRef(null);

  const services = useServices();

  useEffect(() => {
    services.canvas.leafFall.mount(ref.current);
    return () => services.canvas.leafFall.unmount();
  }, []);

  return (
    <LayoutPage header={<HeaderContainer />}>
      <Canvas ref={ref} />
    </LayoutPage>
  );
}

export default React.memo(LeafFall);
