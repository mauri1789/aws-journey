import { Section, Step } from "../types/sections";
import { AppActions, ADD_SECTIONS, ADD_STEPS } from "../types/actions";


export let addSections = (sections: Section[]): AppActions => ({
    type: ADD_SECTIONS,
    sections
})

export let addSteps = (steps: Step[], section_index: number): AppActions => ({
    type: ADD_STEPS,
    section_index,
    steps
})
