import React, { Component } from 'react';
import Visibility from 'visibilityjs';
import moment from 'moment';

class ChangeVisibility extends Component {
  state = {
    isChange: true,
    status: '',
    intervalList: [
      {
        time: moment().format('h:mm:ss a'),
        status: Visibility.state()
      }
    ]
  };

  componentDidMount() {
    console.warn('--- Start - ChangeVisibility ---');
    this.changeVisibility();
  }

  componentWillUnmount() {
    Visibility.unbind(this.visibilityChangeId);
    console.warn('!!! Deleted all subscriptions and asynchronous tasks !!! - ChangeVisibility');
  }

  setList = status => {
    this.setState(({ intervalList }) => ({
      status: status,
      intervalList: [{ time: moment().format('h:mm:ss a'), status: status }, ...intervalList]
    }));
  };

  changeVisibility = () => {
    this.state.isChange
      ? (this.visibilityChangeId = Visibility.change((event, status) => {
          console.log(event, '/// Change Event ///');
          console.log(status, '||| Change Status |||');

          if (Visibility.hidden()) {
            this.setList('hidden');
          } else {
            this.setList('visible');
          }
        }))
      : (this.visibilityChangeId = null);
  };

  startChange = () => {
    console.log('=== Start Change ===');
    this.setState(
      {
        isChange: true
      },
      () => {
        this.changeVisibility();
      }
    );
  };

  stopChange = () => {
    console.log('=== Stop Change ===');
    this.setState(
      {
        isChange: false
      },
      () => {
        Visibility.unbind(this.visibilityChangeId);
        this.visibilityChangeId = null;
      }
    );
  };

  render() {
    const { intervalList } = this.state;

    console.log(this.state, '--- ChangeVisibility STATE ---');

    return (
      <div className="ChangeVisibility">
        <h1>ChangeVisibility</h1>
        <h3>Change count: {intervalList.length}</h3>
        <button type="button" onClick={this.startChange}>
          &#9658; Start Change
        </button>{' '}
        <button type="button" onClick={this.stopChange}>
          &#9746; Stop Change
        </button>
        <h4>Logs:</h4>
        <ul>
          {intervalList.map(({ time, status }) => (
            <li key={time + status + Math.random()}>
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

export default ChangeVisibility;
