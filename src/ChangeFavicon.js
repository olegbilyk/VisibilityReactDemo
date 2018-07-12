import React, { Component } from 'react';
import Visibility from 'visibilityjs';
import moment from 'moment';

class ChangeFavicon extends Component {
  state = {
    isChange: true,
    status: '',
    intervalList: [
      {
        time: moment().format('h:mm:ss a'),
        status: Visibility.state()
      }
    ],
    headTitle: '',
    headLink: ''
  };

  componentDidMount() {
    console.warn('--- Start - ChangeVisibility ---');
    this.changeVisibility();
  }

  componentWillUnmount() {
    Visibility.unbind(this.visibilityChangeId);
    this.resetFaviconAndTitle();
    console.warn('!!! Deleted all subscriptions and asynchronous tasks !!! - ChangeFavicon');
  }

  setList = status => {
    this.setState(({ intervalList }) => ({
      status: status,
      intervalList: [{ time: moment().format('h:mm:ss a'), status: status }, ...intervalList]
    }));
  };

  resetFaviconAndTitle() {
    const headTitle = document.getElementById('headTitle');
    const headLink = document.getElementById('dynamicFavicon');

    headTitle.innerText = this.state.headTitle;
    headLink.href = this.state.headLink;
  }

  changeFavicon(src) {
    console.log('+ changeFavicon +');
    const headLink = document.getElementById('dynamicFavicon');
    if (headLink) {
      headLink.href = src;
    } else {
      const prevLink = document.querySelector('[rel^=shortcut]');
      const link = document.createElement('link');

      link.id = 'dynamicFavicon';
      link.rel = 'shortcut icon';
      link.href = src;

      if (!this.state.headLink) {
        console.log(prevLink.href);
        this.setState({
          headLink: prevLink.href
        });
      }

      prevLink.parentNode.removeChild(prevLink);
      document.head.appendChild(link);
    }
  }

  changeTitle(text) {
    console.log('+ changeTitle +');
    const headTitle = document.getElementById('headTitle');
    if (headTitle) {
      headTitle.innerText = text;
    } else {
      const prevTitle = document.getElementsByTagName('title')[0];
      const title = document.createElement('title');

      title.id = 'headTitle';
      title.innerText = text;

      if (!this.state.headTitle) {
        this.setState({
          headTitle: prevTitle.innerText
        });
      }

      prevTitle.parentNode.removeChild(prevTitle);
      document.head.appendChild(title);
    }
  }

  changeVisibility = () => {
    this.state.isChange
      ? (this.visibilityChangeId = Visibility.change((event, status) => {
          console.log(event, '/// Change Event ///');
          console.log(status, '||| Change Status |||');

          if (Visibility.hidden()) {
            this.setList('hidden');
            this.changeFavicon('http://www.google.com/favicon.ico');
            this.changeTitle('Hidden');
          } else {
            this.setList('visible');
            this.changeFavicon('https://www.facebook.com/favicon.ico');
            this.changeTitle('Visible');
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

    console.log(this.state, '--- ChangeFavicon STATE ---');

    return (
      <div className="ChangeFavicon">
        <h1>Change Favicon and Title</h1>
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

export default ChangeFavicon;
