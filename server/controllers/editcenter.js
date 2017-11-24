import centers from '../models/center.json';
/**
 * 
 */
export default class ModifyCenter {
    /**
   * @static
   * @param {req} -returns request object
   * @param {res} -returns response object
   * @returns {json} -returns a json object of all centers
   */
  static editCenter(req, res) {
      for( let i = 0; i < centers.length; i++){
          if (centers[i].id === parseInt(req.params.centerId, 10)) {
              centers[i].center_name = req.body.center_name;
              centers[i].center_location = req.body.center_location;
              centers[i].center_capacity = req.body.center_capacity;
              centers[i].center_price = req.body.center_price;
              centers[i].center_type = req.body.center_type;
              
              if(centers[i].center_name || centers[i].center_location || centers[i].center_capacity || centers[i].center_price || centers[i].center_type){
                return res.json({
                    message: 'center updated!',
                    error: false
                });
              }
              return res.status(422).json({
                  message: 'Invalid Input',
                  error: true
              });
            }
        }
        
        return res.status(404).json ({
            message: 'Center not found',
            error: true
        });  
  }
}
