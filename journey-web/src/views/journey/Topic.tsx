import React, { ReactNode } from 'react';
import Topic from '../topic/Topic';
import './Topic.scss';
let TOPIC_DONE = "DONE"
let TOPIC_IN_PROGRESS = "IN_PROGRESS"
let TOPIC_UNDONE = "UNDONE"

interface TopicDrawingProps {
    x: number
    y: number
    status: string
    selected: boolean
    text: string
    type: string
    icon: ((container: ReactNode)=>JSX.Element) | null
  }
 
function TopicDrawing ({x, y, status, selected, text, icon, type}: TopicDrawingProps) {
    let side = 149
    let titleHeight = 35
    let groupClass = "chapter-topic"
    if ( type == "Project" ) {
        groupClass = "project-topic"
    }
    let Container= () => (
        <g className={groupClass}>
            <rect x={x} y={y} className="topic-cont " width={side} height={side}/>
            <rect x={x} y={y+114} className="topic-title-cont " width={side} height={titleHeight}/>
            <text 
                x={x + side / 2}
                y={y + (side-titleHeight) + titleHeight / 2}
                dominantBaseline="middle"
                textAnchor="middle"
                className="topic-title">
                    {text}
            </text>
        </g>
    )
    return (
        <g className={(selected)?"active-topic topic-group":"topic-group"} >
            {icon && icon(<Container />)}
            {!icon && <Container />}
        </g>
    )
}

export { TopicDrawing, TOPIC_DONE, TOPIC_IN_PROGRESS, TOPIC_UNDONE }
