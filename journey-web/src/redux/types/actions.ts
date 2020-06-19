import { Section, Step } from './sections'
import { Navigation } from './navigation'

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


export const SET_MAIN_TITLE = 'SET_MAIN_TITLE'

export interface SetNavigation {
    type: typeof SET_MAIN_TITLE,
    main_title: string
}

export type NavigationActionTypes =
    | SetNavigation


export type AppActions = SectionActionTypes | NavigationActionTypes
