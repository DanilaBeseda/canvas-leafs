import SimplexNoise from 'simplex-noise';
const simplex = new SimplexNoise();

class Leaf {
  constructor(config, image, canvasWidth, canvasHeight) {
    this.image = image;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    this.g = 9.81;
    this.xo = Math.random() * this.canvasWidth;
    this.x = this.xo;
    this.yo = -100;
    this.y = 0;
    this.time0 = performance.now();
    this.angleChange = config.angleChange;
    this.angle = 0;
    this.deviation = config.deviation;
    this.speed = config.speed;
    this.imageSize = this.randomImageSize(this.image.width, this.image.height);

    this.perlinX = this.x + 100 * Math.random();
  }

  /** Установка нового коэффициента в this.perlin */
  setNewPerlin() {
    this.perlin = simplex.noise2D(this.xo / 500, this.y / 500);
  }

  /** Сброс до начального состояния */
  reset() {
    this.time0 = performance.now();
    this.x = Math.random() * this.canvasWidth;
    this.angle = 0;
  }

  /**
   * Вычисление расположения листка
   * @param {number} time временная метка
   */
  process(time) {
    this.setNewPerlin();
    this.y = this.yo + (this.g * Math.pow((time - this.time0) * this.speed, 2)) / 2;
    this.x = this.x + this.deviation * this.perlin;
    this.angle += this.perlin * this.angleChange;

    if (this.y > this.canvasHeight) this.reset();
  }

  /**
   * Отрисовка листка
   * @param {Object} ctx CanvasRenderingContext2D
   */
  draw(ctx) {
    ctx.save();

    ctx.globalAlpha = (this.canvasHeight - this.y) / this.canvasHeight;
    ctx.translate(this.x + this.imageSize.width / 2, this.y + this.imageSize.height / 2);
    ctx.rotate((Math.PI / 180) * this.angle);
    ctx.translate(-this.x - this.imageSize.width / 2, -this.y - this.imageSize.height / 2);

    if (this.y < this.canvasHeight) {
      ctx.drawImage(this.image, this.x, this.y, this.imageSize.width, this.imageSize.height);
    }

    ctx.restore();
  }

  /**
   * Рандомный размер листка
   * @param {number} width ширина по умолчанию
   * @param {number} height высота по умолчанию
   * @returns {Object} рандомные ширина и высота
   */
  randomImageSize(width, height) {
    const aspectRatio = width / height;
    const newWidth = width / 2 + (width / 2) * Math.random();
    const newHeight = newWidth / aspectRatio;

    return { width: newWidth, height: newHeight };
  }
}

export default Leaf;
