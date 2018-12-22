import React from 'react';
import axios from 'axios';
import styles from './styles/Index.css';
import Photos from './components/Photos.jsx';
import getTrailIdURL from './services/utilities';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTrailId: getTrailIdURL(),
      photos: []
    };
  }

  componentDidMount() {
    let SERVICE_HOSTS = {};
    if (process.env.NODE_ENV === 'production') {
      SERVICE_HOSTS =
      {
        trails: '',
        profile: '',
        photos: 'http://trail-photos-service-dev.us-west-1.elasticbeanstalk.com',
        reviews: '',
        paths: ''
      };
    } else {
      SERVICE_HOSTS = {
        trails: 'http://localhost:3001',
        profile: 'http://localhost:3002',
        photos: 'http://localhost:3003',
        reviews: 'http://localhost:3004',
        paths: 'http://localhost:3005'
      };
    }
    console.log("PROCESS.ENV", process.env.NODE_ENV);
    let photosEndpoint = SERVICE_HOSTS.photos + `/${this.state.currentTrailId}/photos`;
    console.log("Target EndPoint:", photosEndpoint);
    axios.get(photosEndpoint)
      .then((response) => {
        let photoData = response.data.data;
        this.setState({photos: photoData});
      })
      .catch(function (error) {
        console.log('err', error);
      });
  }

  render() {
    return (

      <div className = 'servicePlaceholder'>
      {/* <div className = {styles.container}> */}
        <h2>
          Share your experience to help other people learn about this trail:
        </h2>
        <div>
          Button Bar Placeholder
        </div>
        <div>
          Sort Bar Placeholder
        </div>
        <Photos photos = {this.state.photos}/>
      </div>
    );
  }
}

window.NT = window.NT || {};
window.NT.TrailPhotosService = window.NT.TrailPhotosService || {};
window.NT.TrailPhotosService.App = App;