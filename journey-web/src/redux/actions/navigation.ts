import { Navigation } from "../types/navigation";
import { AppActions, SET_MAIN_TITLE } from "../types/actions";


export let setMainTitle = (main_title: string): AppActions => ({
    type: SET_MAIN_TITLE,
    main_title
})
