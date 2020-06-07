import React from 'react';
import './TestParams.scss';
import { UserInput } from '../../../redux/types/execution';

interface TestParamsProps {
    userInput: UserInput[],
    setUserInput: React.Dispatch<React.SetStateAction<UserInput[] | undefined>>
}
function TestParamsComponent ({userInput, setUserInput}: TestParamsProps) {
    let updateUserInput = (event:React.FormEvent<HTMLInputElement>) => {
        let input_id = +event.currentTarget.id.split('-')[1]
        userInput![input_id].value = event.currentTarget.value
        userInput = [...userInput!]
        setUserInput(userInput)
    }
    return (
        <div className="test-parameters">
            {userInput.map((param:UserInput, index:number) => (
                <div key={`param-${index}`} className="test-param">
                    <label htmlFor={`param-${index}`}>
                        {param.key.split("_").join(" ")}:
                    </label>
                    <input
                        id={`param-${index}`}
                        type="text" onChange={updateUserInput}
                        value={param.value}
                    />
                </div>
            ))}
        </div>
    )
}

export { TestParamsComponent }
