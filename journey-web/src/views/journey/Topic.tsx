import React, { ReactNode } from 'react';
import './Topic.scss';
import { JourneyTopic } from '../../redux/types/journey';
let TOPIC_DONE = "DONE"
let TOPIC_IN_PROGRESS = "IN_PROGRESS"
let TOPIC_UNDONE = "UNDONE"

interface TopicDrawingProps {
    topic: JourneyTopic
    getTopic: (topic_id:string, topic_name: string)=>void
  }
 
function TopicDrawing ({topic, getTopic}: TopicDrawingProps) {
    let side = 149
    let titleHeight = 35
    let groupClass = "chapter-topic"
    if ( topic.type == "Project" ) {
        groupClass = "project-topic"
    }
    let x = topic.x
    let y = topic.y
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
                    {topic.description}
            </text>
        </g>
    )
    return (
        <g 
            className={(topic.selected)?"active-topic topic-group":"topic-group"}
            onClick={() => getTopic(topic.topic_id, topic.description)} >
            {topic.icon && topic.icon(<Container />)}
            {!topic.icon && <Container />}
        </g>
    )
}

export { TopicDrawing, TOPIC_DONE, TOPIC_IN_PROGRESS, TOPIC_UNDONE }
