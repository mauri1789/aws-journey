import React from 'react';
import './JourneyMap.scss';
import { Lines } from './dev_cert/Lines'
import { TopicDrawing, TOPIC_IN_PROGRESS, TOPIC_UNDONE, TOPIC_DONE } from './Topic'
import { JourneyTopic } from '../../redux/types/journey';

interface JourneyMapProps {
    journey_topics: JourneyTopic[],
    getTopic: (topic_id: string, topic_name: string) => void
}
function JourneyMap({journey_topics, getTopic}:JourneyMapProps) {
   return ( 
    <div className="map">
        <svg viewBox="0 0 800 1800">
            {journey_topics.map((topic, index) =>
                <TopicDrawing
                    topic={topic}
                    getTopic={getTopic}
                    key={`topic-drawing-${index}`}
                />
            )}
            <Lines />
        </svg>
    </div>
   );
  }
  
export { JourneyMap }