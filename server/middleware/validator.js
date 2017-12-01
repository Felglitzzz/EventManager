/**
 * a class that validates inputs fields
 */
export default class Validate {
  /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} error
     */
  static signUp(req, res, next) {
    req.checkBody('surname', 'Surname field cannot be empty.').notEmpty();
    req.sanitizeBody('surname');
    req.checkBody('firstname', 'Firstname field cannot be empty.').notEmpty();
    req.sanitizeBody('firstname');
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.sanitizeBody('username');
    req.checkBody('email', 'Email field cannot be empty.').notEmpty();
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.sanitizeBody('email').normalizeEmail({
      remove_dots: false,
      remove_extension: false,
      gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password must more than 8 characters.').notEmpty();

    const error = req.validationErrors();
    if (error) {
      res.status(400).send({ message: 'Input error', error });
      return;
    }
    next();
  }
  /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} error
     */
  static signIn(req, res, next) {
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password field cannot be empty.').notEmpty();
    req.checkBody('password', 'Password must more than 8 characters.').notEmpty();

    const error = req.validationErrors();
    if (error) {
      res.status(400).send({ message: 'Input error', error });
      return;
    }
    next();
  }
  /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} error
     */
  static addEvent(req, res, next) {
    req.checkBody('name', 'Event name cannot be empty.').notEmpty();
    req.sanitizeBody('name');
    req.checkBody('location', 'Email field cannot be empty.').notEmpty();
    req.sanitizeBody('location');
    req.checkBody('date', 'Date field cannot be empty.').notEmpty();

    const error = req.validationErrors();
    if (error) {
      res.status(400).send({ message: 'Input error', error });
      return;
    }
    next();
  }
  /**
     * @param {object} req
     * @param {object} res
     * @param {object} next
     * @returns {object} error
     */
  static addCenter(req, res, next) {
    req.checkBody('name', 'Event name cannot be empty.').notEmpty();
    req.sanitizeBody('name');
    req.checkBody('location', 'location field cannot be empty.').notEmpty();
    req.sanitizeBody('location');
    req.checkBody('capacity', 'Capacity field cannot be empty.').notEmpty();
    req.checkBody('price', 'Price field cannot be empty.').notEmpty();
    

    const error = req.validationErrors();
    if (error) {
      res.status(400).send({ message: 'Input error', error });
      return;
    }
    next();
  }
}

