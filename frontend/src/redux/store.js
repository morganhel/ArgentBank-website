import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/root.reducer";
import { persistReducer, persistStore } from "redux-persist";

import storage from "redux-persist/lib/storage";

// Config de la persistance des données utilisateurs
const persistConfig = {
    key: "root",
    storage,
};

//Création du reducer persistant à partir du reducer principal 'rootReducer'
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Création du store Redux en utilisant configureStore
const store = configureStore({
    reducer: persistedReducer, // Utilisation du reducer persistant comme reducer principal
    devTools: true, // Activer l'extension Redux DevTools
});

// Création du persistor avec persistStore qui surveille les changements d'état dans le store et maj les données persistées
const persistor = persistStore(store);

export { store, persistor };