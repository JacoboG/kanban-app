export default function (alt, storage, storageName) {
    try {
        alt.bootstrap(storage.get(storageName));
    } catch (exception) {
        console.error('Failed to bootstrap data', exception);
    }

    alt.FinalStore.listen(() => {
        if(!storage.get('debug')){
            storage.set(storageName, alt.takeSnapshot());
        }
    });
}