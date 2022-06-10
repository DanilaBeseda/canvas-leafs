import Leaf from './leaf';
import * as leafImages from '@theme/images/leafs';

class CanvasLeafFall {
  constructor(config, services) {
    this.render = this.render.bind(this);
    this.resize = this.resize.bind(this);

    this.root = null;
    this.isMount = false;
    this.canvas = null;
    this.ctx = null;
    this.images = [];
    this.leafs = [];
    this.lastTime = 0;

    this.dpr = 1;
    this.timeInterval = 1000;
    this.leafsLimit = 25;
  }

  /**
   * Монтирование модуля canvas
   * @param {HTMLElement} root корневой элемент, в который монтируется HTMLCanvasElement
   */
  async mount(root) {
    this.root = root;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.isMount = true;
    this.root.appendChild(this.canvas);

    window.addEventListener('resize', this.resize, false);
    this.resize();

    await this.initLeafs(leafImages);
    this.render();
  }

  /** Размонтирование модуля canvas */
  unmount() {
    this.isMount = false;
    window.removeEventListener('resize', this.resize, false);
  }

  /** Изменение размеров canvas элемента под root элемент */
  resize() {
    const rect = this.root.getBoundingClientRect();

    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  /** Очистка canvas */
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Инициализация картинок
   * @param {Object} images картинки
   */
  async initLeafs(images) {
    await Promise.all(
      Object.values(images).map(src => {
        const leaf = new Image();
        leaf.src = src;

        return new Promise(resolve => {
          leaf.onload = () => resolve();
        }).then(() => this.images.push(leaf));
      }),
    );
  }

  /**
   * Анимация
   * @param {number} timestamp временная метка
   */
  render(timestamp) {
    if (!this.isMount) {
      this.leafs = [];
      return;
    }

    const isTime = timestamp - this.lastTime >= this.timeInterval;
    const isLimit = this.leafs.length < this.leafsLimit;

    if (isTime && isLimit) {
      this.leafs.push(
        new Leaf(this.randomElement(this.images), this.canvas.width, this.canvas.height),
      );
      this.lastTime = timestamp;
    }

    this.clear();

    for (const item of this.leafs) {
      item.process(timestamp);
      item.draw(this.ctx);
    }

    requestAnimationFrame(this.render);
  }

  /**
   * Рандомный элемент списка
   * @param {Array} arr any массив
   * @returns {any} рандомный элемент
   */
  randomElement(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))];
  }
}

export default CanvasLeafFall;
