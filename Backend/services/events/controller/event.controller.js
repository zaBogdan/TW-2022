const { eventService } = require('../services');

exports.getEventById = async (req, res, next) => {
    try {
        const event = await eventService.getEventById(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched event',
            data: {
                event
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get event using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.getEventsForDomain = async (req, res, next) => {
    try {
        const events = await eventService.getEventsForDomain(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched events for domain',
            data: {
                events
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get events for domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.addNewEventToDomain = async (req, res, next) => {
    try {
        const event = await eventService.addNewEventToDomain(req);

        return res.status(200).json({
            success: true,
            message: `Successfully added new event with id '${event?.id}' to domain`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to add new event using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.updateEventById = async (req, res, next) => {
    try {
        const event = await eventService.updateEventById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully updated event with it '${event?.id}`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to update event using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.deleteEventById = async (req, res, next) => {
    try {
        await eventService.deleteEventById(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully deleted event',
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to deleted event using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}