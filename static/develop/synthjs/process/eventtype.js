goog.provide("synthjs.process.EventType");
goog.provide("synthjs.process.MessageType");

synthjs.process.MessageType = {
    SYNC: 'message-window-sync',
    MESSAGE: 'message-message'
};

synthjs.process.EventType = {
    MESSAGE: 'event-message',
    UNKNOWN_MESSAGE: 'unknown-event-message',
    SYNC: 'event-sync'
};