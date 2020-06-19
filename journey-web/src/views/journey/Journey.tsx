import React, { ReactNode, useEffect, useState, Dispatch } from 'react';
import './Journey.scss';
import axios from 'axios';
import { journey_url } from '../../Project';
import {
  useParams
} from "react-router-dom";
import { Lines } from './drawings/Lines'
import { TopicDrawing, TOPIC_IN_PROGRESS, TOPIC_UNDONE, TOPIC_DONE } from './drawings/Topic'
import { setMainTitle } from '../../redux/actions/navigation'
import { BucketDrawing } from './drawings/Bucket'
import { AppActions } from '../../redux/types/actions'
import { connect } from 'react-redux';

interface JourneyTopic {
   topic_id: string
   type: string
   description: string,
   x: number,
   y: number,
   selected: boolean,
   icon: ((container: ReactNode)=>JSX.Element) | null
}
type Props = LinkDispatchProps
function Journey({setMainTitle}:Props) {
   let [Journeytopics, setJourneyTopics] = useState<JourneyTopic[]>([])
   let {journey_id} = useParams()
   useEffect(() => {
      let get_execution = async () => {
         let user = "user1"
         let response = await axios.get(journey_url('content', `journey/${journey_id}`))
         let { data } = response;
         let {topics, journey} = data
         let UITopics: JourneyTopic[] = topics.map((topic: JourneyTopic) => ({
            ...topic,
            selected: false,
            ...topicDr[topic["topic_id"]]
         }))
         if ( setMainTitle ) {
            setMainTitle(journey.journey)
         }
         setJourneyTopics(UITopics)
       }
       get_execution();
       
    },[])
   interface UITopic {
      x: number,
      y: number,
      icon?: ((container: ReactNode)=>JSX.Element) | null
   }
   let topicDr:{[name:string]: UITopic} = {
      "S3": {
         x: 575.5,
         y: 251.5,
         icon: (container:ReactNode) => <BucketDrawing container={container}/>
      },
      "fundamentals": {
         x: 325.5,
         y: 26.5,
         icon: null
      },
      "EC2": {
         x: 75.5,
         y: 251.5,
         icon: null
      },
      "lambda": {
         x: 325.5,
         y: 251.5,
         icon: null
      },
      "kinesis": {
         x: 125.5,
         y: 476.5,
         icon: null
      },
      "DynamoDB": {
         x: 325.5,
         y: 476.5,
         icon: null
      },
      "security": {
         x: 325.5,
         y: 701.5,
         icon: null
      },
      "excel_import": {
         x: 525.5,
         y: 476.5,
         icon: null
      },
      "relational_dbs": {
         x: 75.5,
         y: 701.5,
         icon: null
      },
      "accessing_cloud": {
         x: 575.5,
         y: 701.5,
         icon: null
      },
      "messaging": {
         x: 125.5,
         y: 926.5,
         icon: null
      },
      "cloudformation": {
         x: 325.5,
         y: 926.5,
         icon: null
      },
      "serverless_app": {
         x: 525.5,
         y: 926.5,
         icon: null
      },
      "elastic_beanstalk": {
         x: 75.5,
         y: 1151.5,
         icon: null
      },
      "cloudformation_project": {
         x: 325.5,
         y: 1151.5,
         icon: null
      },
      "user_management": {
         x: 575.5,
         y: 1151.5,
         icon: null
      },
      "monitoring": {
         x: 125.5,
         y: 1376.5,
         icon: null
      },
      "ci_cd": {
         x: 525.5,
         y: 1376.5,
         icon: null
      },
      "dynamodb_cache": {
         x: 225.5,
         y: 1601.5,
         icon: null
      },
      "ci_cd_project": {
         x: 425.5,
         y: 1601.5,
         icon: null
      }
   }
   return (
      <div className="journey">
         <div className="map">
            <svg viewBox="0 0 800 1800">
               {Journeytopics.map((topic, index) =>
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
         <div className="topic">
         topic
         </div>
      </div>
   );
  }

interface LinkDispatchProps {
   setMainTitle?: (main_title: string) => void
}

const mapDispatchToProps = (
   dispatch: Dispatch<AppActions>,
   ownProps: {}
): LinkDispatchProps => ({
   setMainTitle: (main_title) => dispatch(setMainTitle(main_title))
});

let JourneyComponent = connect(
   null,
   mapDispatchToProps
 )(Journey);
  
  export default JourneyComponent;
  