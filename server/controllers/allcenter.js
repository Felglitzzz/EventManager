import centers from '../models/center.json';
/**
 * 
 */
export default class GetAllCenters {
    /**
   * @static
   * @param {req} -returns request object
   * @param {res} -returns response object
   * @returns {json} -returns a json object of all centers
   */
  static getAllCenters(req, res) {
      return res.json ({
          Centers: centers,
          error: false
      });
  }
}

