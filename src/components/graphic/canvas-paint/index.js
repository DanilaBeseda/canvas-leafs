import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';

function CanvasPaint({ children }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 10;

    ctxRef.current = ctx;
  }, []);

  const onMouseDown = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const onMouseUp = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const onMouseMove = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {children}
      </canvas>
    </>
  );
}

CanvasPaint.propTypes = {
  children: PropTypes.node,
};

CanvasPaint.defaultProps = {};

export default React.memo(CanvasPaint);
