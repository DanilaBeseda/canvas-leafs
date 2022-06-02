export default class Leaf {
  constructor(ctx, leaf, gravity) {
    const randomAxisX = Math.random() * (window.innerWidth - 100);

    this.leaf = leaf;
    this.ctx = ctx;
    this.gravity = { x: 0, y: gravity };
    this.velocity = { x: 0, y: 0 };
    this.position = { x: randomAxisX, y: 0 };
  }

  /** Обновить скорость и позицию */
  update() {
    this.velocity.x += this.gravity.x;
    this.velocity.y += this.gravity.y;
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  /** Отрисовать лист */
  draw() {
    this.ctx.drawImage(this.leaf, this.position.x, this.position.y);
  }
}
