import centers from '../models/center.json';


export default class getAllCenters {

    /**
   * @static
   * @param {req} -returns request object
   * @param {res} -returns response object
   * @returns {json} -returns a json object of all centers
   */
  static getAll(req, res) {
      return res.json ({
          Centers: centers,
          error: false
      });
  }
}

