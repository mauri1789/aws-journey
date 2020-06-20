import { ReactNode } from "react";

export interface JourneyTopic {
    topic_id: string
    type: string
    description: string,
    x: number,
    y: number,
    selected: boolean,
    icon: ((container: ReactNode)=>JSX.Element) | null
}
export interface UITopic {
    x: number,
    y: number,
    icon?: ((container: ReactNode)=>JSX.Element) | null
}