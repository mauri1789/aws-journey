import { Section } from "../types/sections";
import { SectionActionTypes, ADD_STEPS, ADD_SECTIONS, AddSection, AddSteps } from "../types/actions"

let sectionReducerDefaultState:Section[] = []

let sectionReducer = (
    state=sectionReducerDefaultState,
    action: SectionActionTypes
): Section[] => {
    let {type} = action
    switch (type) {
        case ADD_STEPS:
            let { steps, section_index } = action as AddSteps
            state[section_index].steps = steps
            let new_sections = [...state]
            return new_sections
        case ADD_SECTIONS:
            let { sections } = action as AddSection
            return [...sections]        
        default:
            return [...state]
    }
}

export { sectionReducer }
