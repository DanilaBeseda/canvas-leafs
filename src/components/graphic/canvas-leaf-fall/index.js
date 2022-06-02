import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Leaf from './leaf';

import './style.less';

import * as images from './images';

function CanvasLeafFall({ children }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  /** отображаемые листья */
  const currentLeafs = [];
  /** список всех картинок */
  const leafImgs = [];
  /** интервал создания нового экземпляра листа */
  const timeInterval = 300;
  /** последнее сохранённое время (для создания экземпляра с определённым интервалом) */
  let savedTime = 0;
  /** гравитация */
  const gravity = 0.05;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    /** сохранение canvas контекста */
    ctxRef.current = ctx;

    initLeafs(images);

    requestAnimationFrame(animate);
  }, []);

  /**
   * Заполнение массива leafs элементами <img src='...'/>
   * @param {Object} images {leaf: src};
   */
  function initLeafs(images) {
    Object.values(images).map(src => {
      const leaf = new Image();
      leaf.src = src;
      leafImgs.push(leaf);
    });
  }

  /**
   * Анимирование листопада
   * @param {number} timestamp временная метка
   */
  function animate(timestamp) {
    const ctx = ctxRef.current;
    requestAnimationFrame(animate);

    if (timestamp - savedTime >= timeInterval) {
      currentLeafs.push(new Leaf(ctx, randomize(leafImgs), gravity));
      savedTime = timestamp;
    }

    //clear frame
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //update frame
    currentLeafs.map(leaf => {
      leaf.update();
      leaf.draw();
    });
  }

  /**
   * Рандомный элемент массива
   * @param {Array} arr массив
   * @returns randomize index
   */
  function randomize(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  }

  return (
    <>
      <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}>
        {children}
      </canvas>
    </>
  );
}

CanvasLeafFall.propTypes = {
  children: PropTypes.node,
};

CanvasLeafFall.defaultProps = {};

export default React.memo(CanvasLeafFall);
