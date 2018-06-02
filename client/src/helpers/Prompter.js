import toastr from 'toastr';

/**
 * description - TpastMessages for popping messages
 *
 * @class ToastMessages
 */
class Prompter {
  /**
   * description - Toasts error messages
   *
   * @static
   * @param {any} message
   *
   * @memberof ToastMessages
   *
   * @return { void } nothing
   */
  static error(message) {
    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.remove();
    toastr.error(message);
  }
  /**
   *description - Toast success messages
   *
   * @static
   * @param {any} message
   *
   * @memberof ToastMessages
   *
   * @return { void } nothing
   */
  static success(message) {
    toastr.options.closeButton = true;
    toastr.options.positionClass = 'toast-bottom-right';
    toastr.remove();
    toastr.success(message);
  }
}

export default Prompter;
