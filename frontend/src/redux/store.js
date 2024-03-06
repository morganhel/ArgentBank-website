import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root.reducer";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

// Configuration de la persistance
const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux en utilisant configureStore
const store = configureStore({
    reducer: persistedReducer, // Utiliser le reducer persistant comme reducer principal
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    devTools: true, // Activer l'extension Redux DevTools
});

// Création du persistor en utilisant persistStore avec le store
const persistor = persistStore(store);

export { store, persistor };