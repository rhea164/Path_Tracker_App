import createDataContext from "./createDataContext";
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload;
        default:
            return state;
    }
}

const fetchTracks = dispatch => async() => { 
    const response= await trackerApi.get('/tracks');
    dispatch({type:'fetch_tracks', payload:response.data});

}

// const createTrack = dispatch => async (name, locations) => {
//     await trackerApi.post('/tracks', { name, locations });
// }

const createTrack = dispatch => async (name, locations) => {
    try {
      console.log('Sending track data:', { name, locations });
      const response = await trackerApi.post('/tracks', { name, locations });
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error creating track:', error.response?.data || error.message);
      // Re-throw or handle as needed
    }
  };

export const { Context, Provider } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
)