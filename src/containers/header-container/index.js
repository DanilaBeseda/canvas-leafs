import React, { useEffect, useState } from 'react';
import detectActive from '@src/utils/detect-active';
import LayoutHeader from '@src/components/layouts/layout-header';
import MenuTop from '@src/components/menus/menu-top';
import Logo from '@src/components/elements/logo';
import { useLocation } from 'react-router-dom';
import useSelector from '@src/utils/hooks/use-selector';

function HeaderContainer(props) {
  const location = useLocation();

  const [items, changeItems] = useState(
    detectActive(
      [
        { title: 'Paint', to: '/', active: true },
        { title: 'Leaf Fall', to: '/leaf-fall', active: false },
      ],
      location,
    ),
  );

  useEffect(() => {
    changeItems(detectActive(items, location));
  }, [location]);

  return <LayoutHeader left={<Logo />} center={<MenuTop items={items} />} />;
}

export default React.memo(HeaderContainer);
