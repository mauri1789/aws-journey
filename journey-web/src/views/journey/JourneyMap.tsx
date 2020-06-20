import React from 'react';
import './JourneyMap.scss';
import { Lines } from './dev_cert/Lines'
import { TopicDrawing, TOPIC_IN_PROGRESS, TOPIC_UNDONE, TOPIC_DONE } from './Topic'
import { JourneyTopic } from '../../redux/types/journey';

interface JourneyMapProps {
    journey_topics: JourneyTopic[]
}
function JourneyMap({journey_topics}:JourneyMapProps) {
   return ( 
    <div className="map">
        <svg viewBox="0 0 800 1800">
        {journey_topics.map((topic, index) =>
            <TopicDrawing
                x={+topic.x}
                y={+topic.y}
                status={""}
                selected = {topic.selected}
                text={topic.description}
                icon={topic.icon}
                type={topic.type}
                key={`topic-drawing-${index}`}
            />
        )}
        <Lines />
        </svg>
    </div>
   );
  }
  
export { JourneyMap }