import events from '../models/event.json';
/**
 * 
 */
export default class ModifyEvent {
    /**
   * @static
   * @param {req} -returns request object
   * @param {res} -returns response object
   * @returns {json} -returns a json object
   */
  static update(req, res) {
      for( let i = 0; i < events.length; i++){
          if (events[i].id === parseInt(req.params.eventId, 10)) {
              events[i].event_title = req.body.event_title;
              events[i].event_location = req.body.event_location;
              events[i].event_date = req.body.event_date;
              events[i].event_organizers = req.body.event_organizers;
              events[i].event_center = req.body.event_center;

              console.log(events[i].event_title);
              
              if(events[i].event_title || events[i].event_location || events[i].event_date || events[i].event_organizers || events[i].event_center){
                return res.json({
                    message: 'Event updated!',
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
            message: 'Event not found',
            error: true
        });
    }  
  
}
