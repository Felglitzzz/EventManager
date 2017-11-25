import centers from '../models/center.json';
/**
 *
 * @class Center
 */
export default class Center {
  /**
     *
     * @param {object} req
     * @param {object} res
     */

  static addCenter(req, res) {
    if (!req.body.center_name || !req.body.center_location || !req.body.center_capacity || !req.body.center_price || !req.body.center_type) {
      return res.json({
        message: 'Please fill in required field',
      });
    }
    centers.push(req.body);
    return res.status(302).json({
      message: 'Center created',
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   */

  static editCenter(req, res) {
    for (let i = 0; i < centers.length; i++) {
      if (centers[i].id === parseInt(req.params.centerId, 10)) {
        centers[i].center_name = req.body.center_name;
        centers[i].center_location = req.body.center_location;
        centers[i].center_capacity = req.body.center_capacity;
        centers[i].center_price = req.body.center_price;
        centers[i].center_type = req.body.center_type;

        if (centers[i].center_name || centers[i].center_location || centers[i].center_capacity || centers[i].center_price || centers[i].center_type) {
          return res.status(200).json({
            message: 'center updated!',
          });
        }
        return res.status(422).json({
          message: 'Invalid Input',
        });
      }
    }
    return res.status(404).json({
      message: 'Center not found',
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   */
  static getOneCenter(req, res) {
    for (let i = 0; i < centers.length; i++) {
      if (centers[i].id === parseInt(req.params.centerId, 10)) {
        return res.status(302).json({
          Center: centers[i],
        });
      }
    }
    return res.status(404).json({
      message: 'Center not found!',
    });
  }
  /**
   *
   * @param {object} req
   * @param {object} res
   */
  static getAllCenters(req, res) {
    return res.status(200).json({
      Centers: centers,
    });
  }
}