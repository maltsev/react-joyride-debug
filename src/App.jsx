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

function Child({ clicks, update }) {
    const [foo, setFoo] = useState(0);

    return (
        <div>
            Global clicks: {clicks}<br />
            Local clicks: {foo}<br />
        <button onClick={update}>Global</button>
        <button onClick={() => { setFoo(foo + 1) }}>Local</button>
        </div>
    );
}

class Prnt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0,
        };
        this.update = this.update.bind(this);
    }

    update() {
        this.setState({
            clicks: this.state.clicks + 1,
        });
    }

    render() {
        return (
            <Child update={this.update} clicks={this.state.clicks} />
        );
    }
}

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
            <Prnt />
            {/* <Joyride
                callback={handleJoyrideCallback}
                run={run}
                stepIndex={stepIndex}
                steps={steps}
                debug
                continuous
                showProgress
                showSkipButton
            /> */}
        </div>
    );
}
