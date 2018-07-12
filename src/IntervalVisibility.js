import React, { Component } from 'react';
import Visibility from 'visibilityjs';
import moment from 'moment';

const interval = {
  visible: 2000,
  hidden: 5000
};

class IntervalVisibility extends Component {
  state = {
    intervalList: [
      {
        time: moment().format('h:mm:ss a'),
        status: Visibility.state()
      }
    ]
  };

  // Add setInterval
  componentDidMount() {
    console.warn('--- Start - IntervalVisibility ---');
    this.startIntervalVisibility();
  }

  startIntervalVisibility() {
    this.intervalVisibility = Visibility.every(interval.visible, interval.hidden, () => {
      this.setList();
    });
  }

  // Remove setInterval
  componentWillUnmount() {
    Visibility.stop(this.intervalVisibility);
    console.warn('!!! Deleted all subscriptions and asynchronous tasks !!! - IntervalVisibility');
  }

  setList = () => {
    this.setState(({ intervalList }) => ({
      intervalList: [{ time: moment().format('h:mm:ss a'), status: Visibility.state() }, ...intervalList]
    }));
  };

  render() {
    const { intervalList } = this.state;

    console.log(this.state, '--- IntervalVisibility STATE ---');

    return (
      <div className="IntervalVisibility">
        <h1>IntervalVisibility</h1>
        <h5>
          Interval update in visible: {interval.visible / 1000}s <br /> Interval update in hidden: {interval.hidden / 1000}s
        </h5>
        <h4>Logs:</h4>
        <ul>
          {intervalList.map(({ time, status }) => (
            <li key={time + status}>
              <p>
                Time: <strong>{time}</strong> <br />
                Status: <strong>{status}</strong>
                <br />
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default IntervalVisibility;
