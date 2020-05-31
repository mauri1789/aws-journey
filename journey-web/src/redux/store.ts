import { createStore, combineReducers, applyMiddleware } from "redux";
import { sectionReducer } from "./reducers/sections";

export let rootReducer = combineReducers({
    sections: sectionReducer
})

export type AppState = ReturnType<typeof rootReducer>

export let store = createStore(
    rootReducer
)