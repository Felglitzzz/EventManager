import events from '../models/event.json';
/**
 * @class Event
 * @classdesc creates an Event classs
 */
export default class Event {
  /**
     * @param {object} req
     * @param {object} res
     */
  static addEvent(req, res) {
    if (!req.body.event_title || !req.body.event_location || !req.body.event_date || !req.body.event_organizers || !req.body.event_center) {
      return res.status(422).json({
        message: 'Please fill in the required field',
      });
    }

    if (Date.parse(req.body.event_date)) {
      events.push(req.body);
      return res.status(201).json({
        message: 'Event Created successfully',
      });
    }
  }


  /**
   * @delete event
   */
  static deleteEvent(req, res) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(req.params.eventId, 10)) {
        events.splice(i, 1);
        return res.status(200).json({
          message: 'Deleted event successfully',
          error: false,
        });
      }
    }
    return res.status(404).json({
      message: 'Event not found',
      error: true,
    });
  }


  /**
   * @ edit event
   *
   */
  static editEvent(req, res) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(req.params.eventId, 10)) {
        events[i].event_title = req.body.event_title;
        events[i].event_location = req.body.event_location;
        events[i].event_date = req.body.event_date;
        events[i].event_organizers = req.body.event_organizers;
        events[i].event_center = req.body.event_center;

        if (events[i].event_title || events[i].event_location || events[i].event_date || events[i].event_organizers || events[i].event_center) {
          return res.status(200).json({
            message: 'Event updated!',
            error: false,
          });
        }
        return res.status(422).json({
          message: 'Invalid Input',
          error: true,
        });
      }
    }
    return res.status(404).json({
      message: 'Event not found',
      error: true,
    });
  }
}

