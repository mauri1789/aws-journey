import { Navigation } from "../types/navigation";
import { NavigationActionTypes, SET_MAIN_TITLE, SetNavigation } from "../types/actions"

let navigationReducerDefaultState:Navigation = {
    main_title: null
}

let navigationReducer = (
    state=navigationReducerDefaultState,
    action: NavigationActionTypes
): Navigation => {
    let {type} = action
    switch (type) {
        case SET_MAIN_TITLE:
            let { main_title } = action
            return { main_title }
        default:
            return {...state}  
    }
}

export { navigationReducer }
