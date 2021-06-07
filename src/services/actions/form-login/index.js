import BaseState from "@src/services/actions/base";
import services from "@src/services";

class FormLoginState extends BaseState {

  defaultState() {
    return {
      data: {
        login: '',
        password: '123456',
      },
      wait: false,
      errors: null,
    };
  }

  /**
   * Изменение полей формы
   * @param data
   */
  change(data) {
    this.updateState({data}, 'Редактирование формы');
  }

  /**
   * Отправка формы в АПИ
   * @param data
   * @returns {Promise<*>}
   */
  async submit(data) {
    this.updateState({wait: true, errors: null}, 'Отправка формы');
    try {
      const response = await services.api.endpoint('users').login(data);
      const result = response.data.result;
      // Установка и сохранение сессии
      await services.actions.session.save({user: result.user, token: result.token});
      this.resetState({}, 'Сброс формы после успешной отправки');
      return result;
    } catch (e) {
      if (e.response && e.response.data && e.response.data.error) {
        this.updateState({wait: false, errors: e.response.data.error.data.issues}, 'Ошибка от сервера');
      } else {
        throw e;
      }
    }
  }
}

export default FormLoginState;