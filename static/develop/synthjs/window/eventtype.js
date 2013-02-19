goog.provide("synthjs.window.EventType");
goog.provide("synthjs.window.MessageType");

synthjs.window.MessageType = {
    LOADCHILD: 'message-load-child',
    SYNC: 'message-window-sync',
    MESSAGE: 'message-message'
};

synthjs.window.EventType = {
    MESSAGE: 'event-message',
    INTERNAL_MESSAGE: 'internal-event-message'
};