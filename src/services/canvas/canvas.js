class Canvas {
  constructor() {
    this.resize = this.resize.bind(this);

    this.root = null;
    this.isMount = false;
    this.canvas = null;
    this.ctx = null;
  }

  mount(root) {
    this.root = root;

    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.isMount = true;
    this.root.appendChild(this.canvas);

    window.addEventListener('resize', this.resize, false);

    this.resize();
  }

  unmount() {
    this.isMount = false;
    window.removeEventListener('resize', this.resize, false);
  }

  resize() {
    const rect = this.root.getBoundingClientRect();

    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default Canvas;
