import events from '../models/event.json';
/**
 *
 */
export default class DeleteEvent {
  /**
   * @param {req} -users request
   * @param {res} -servers response
   * @return {json} - reurns json object indicating status
   */
  static delete(req, res) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === parseInt(req.params.eventId, 10)) {
        events.splice(i, 1);
        return res.json({
          message: 'Deleted event successfully',
          error: false
        });
      }
    }

    return res.status(404).json({
      message: 'Event not found',
      error: true
    });
  }

};