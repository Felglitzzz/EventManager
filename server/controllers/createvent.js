import events from '../models/event.json';
/**
 *
 */
export default class AddEvent {
 /**
   * @static
   * @param {req} -returns request object
   * @param {res} -returns response object
   * @return{json} -return a json object, indicating success or failure
   */
 static create(req, res) {
    if (!req.body.event_title || !req.body.event_location || !req.body.event_date || !req.body.event_organizers || !req.body.event_center) {
      return res.json({
        message: 'Please fill in the required field',
        error: true
      });
    }
    
    if (Date.parse(req.body.event_date)) {
      events.push(req.body);
      return res.json({
        message: 'Event Created successfully',
        error: false
      });
    }
    return res.json({
      message: 'Wrong format, enter in dd-mm-yy',
      error: true
    });
  }
}