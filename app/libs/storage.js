export default storage => ({
    get(key) {
        try {
            return JSON.parse(storage.getItem(key));
        } catch (exception) {
            return null;
        }
    },
    set(key, value) {
        storage.setItem(key, JSON.stringify(value));
    }
})