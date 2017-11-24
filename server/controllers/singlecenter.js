import centers from '../models/center.json';
/**
 * 
 */
export default class GetSingleCenter {
    /**
   * @static
   * @param {req} -returns request object
   * @param {res} -returns response object
   * @returns {json} -returns a json object of centers
   */
  static getOneCenter(req, res) {
      for( let i = 0; i < centers.length; i++){
          if (centers[i].id === parseInt(req.params.centerId, 10)) {
              const id = centers[i].id;
              const center_name = centers[i].center_name;
              const center_location = centers[i].center_location;
              const center_capacity = centers[i].center_capacity;
              const center_price = centers[i].center_price;
              const center_type = centers[i].center_type;

              const eachCenter = [
                  {
                      id,
                      center_name,
                      center_location,
                      center_capacity,
                      center_price,
                      center_type
                    }
                ]

                return res.json({
                    Center: eachCenter,
                    error: false
                });
            }
        }
        
        return res.status(404).json ({
            message: 'Center not found',
            error:true
        });  
  }
}
