import * as modules from './exports';
import mc from 'merge-change';

class CanvasService {
  init(config, services) {
    this.config = config;
    this.services = services;
    // Модули canvas
    this.modules = {};

    Object.keys(modules).forEach(name => this.initCanvas({ name }));
  }

  /**
   * Инициализация модулей canvas
   * @param {Object} config
   */
  initCanvas(config) {
    if (!config.name) throw new Error('Undefined graphic module name ');
    config = mc.merge(this.config[config.name], config);

    // Если нет класса сопоставленного с name, то используется класс по умолчанию
    if (!config.proto) config.proto = config.name;
    if (!modules[config.proto]) throw new Error(`Not found graphic module "${config.name}"`);

    // Cохранение экземпляра в this.modules
    const Constructor = modules[config.proto];
    this.modules[config.name] = new Constructor(config, this.services);
  }

  /**
   * Доступ к модулю canvas
   * @param name {String} Название модуля
   * @return {CanvasModule}
   */
  get(name) {
    return this.modules[name];
  }

  /**
   * @return {CanvasLeafFall}
   */
  get leafFall() {
    return this.get('leafFall');
  }
}

export default CanvasService;
