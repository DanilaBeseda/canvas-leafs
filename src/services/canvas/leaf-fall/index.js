import Leaf from './leaf';
import Canvas from '../canvas';
import * as leafImages from '@theme/images/leafs';

class CanvasLeafFall extends Canvas {
  constructor(config, services) {
    super();
    this.render = this.render.bind(this);

    this.config = services.canvas.config.leafs;
    this.dpr = this.config.dpr;
    this.images = [];
    this.leafs = [];
    this.lastTime = 0;
    this.timeInterval = 1000;
    this.leafsLimit = 20;

    this.initLeafs(leafImages);
  }

  initLeafs(images) {
    Object.values(images).map(src => {
      const leaf = new Image();

      leaf.src = src;
      this.images.push(leaf);
    });
  }

  render(timestamp) {
    if (!this.isMount) return;

    const isTime = timestamp - this.lastTime >= this.timeInterval;
    const isLimit = this.leafs.length < this.leafsLimit;

    if (isTime && isLimit) {
      this.leafs.push(new Leaf(this.randomElement(this.images), this.randomX()));
      this.lastTime = timestamp;
    }

    this.clear();

    const time = performance.now();

    for (const item of this.leafs) {
      item.process(time, this.canvas.height);
      item.draw(this.ctx);
    }

    requestAnimationFrame(this.render);
  }

  randomElement(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  }

  randomX() {
    return Math.random() * (this.canvas.width - 100);
  }
}

export default CanvasLeafFall;
