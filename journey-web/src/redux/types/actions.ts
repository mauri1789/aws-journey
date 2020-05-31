import { Section, Step } from './sections'

export const ADD_SECTIONS = 'ADD_SECTIONS'
export const ADD_STEPS = 'ADD_STEPS'

export interface AddSection {
    type: typeof ADD_SECTIONS
    sections: Section[]
}

export interface AddSteps {
    type: typeof ADD_STEPS
    section_index: number
    steps: Step[]
}

export type SectionActionTypes =
    | AddSection
    | AddSteps

export type AppActions = SectionActionTypes
