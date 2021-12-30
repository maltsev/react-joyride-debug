import React, { useEffect, useState } from 'react';
import Joyride, { ACTIONS, EVENTS, STATUS } from 'react-joyride';

const steps = [
    {
        target: '.my-first-step',
        content: 'First step',
        disableBeacon: true,
    },
    {
        target: '.my-second-step',
        content: 'second step',
        disableBeacon: true,
    },
    {
        target: '.my-third-step',
        content: 'third step',
        disableBeacon: true,
    },
];

export default function App() {
    const [run, setRun] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setRun(true);
        }, 2000);
    }, []);

    function handleJoyrideCallback(data) {
        const { action, index, status, type } = data;

        if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
            // Update state to advance the tour
            setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
        }
        else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Need to set our running state to false, so we can restart if we click start again.
            setRun(false);
        }

        console.log('handleJoyrideCallback', data);
    };

    return (
        <div className="app">
            <Joyride
                callback={handleJoyrideCallback}
                run={run}
                stepIndex={stepIndex}
                steps={steps}
                debug
                continuous
                showProgress
                showSkipButton
            />
        </div>
    );
}
