export const Native = {
    send(message: unknown) {
        window.external.sendMessage(JSON.stringify(message));
    },
};