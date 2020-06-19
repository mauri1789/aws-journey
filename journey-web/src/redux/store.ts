import { createStore, combineReducers, applyMiddleware } from "redux";
import { sectionReducer } from "./reducers/sections";
import { navigationReducer } from "./reducers/navigation";

export let rootReducer = combineReducers({
    sections: sectionReducer,
    navigation: navigationReducer
})

export type AppState = ReturnType<typeof rootReducer>

export let store = createStore(
    rootReducer
)