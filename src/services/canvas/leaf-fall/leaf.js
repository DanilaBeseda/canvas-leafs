class Leaf {
  constructor(image, axisX) {
    this.image = image;
    this.g = 9;
    this.yo = -100;
    this.x = axisX;
    this.y = 0;
    this.time0 = performance.now();
  }

  process(time, height) {
    this.y = this.yo + (this.g * Math.pow((time - this.time0) / 400, 2)) / 2;

    if (this.y > height) {
      this.time0 = performance.now();
    }
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y);
  }
}

export default Leaf;
