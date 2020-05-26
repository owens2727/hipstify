import { getRequest, buildUrl } from 'shallan/dom';

const spotifyAuthUrl = () => {
  const scope = encodeURIComponent([
    'user-top-read'
  ].join(' '));

  const url = 'https://accounts.spotify.com/authorize';
  const query = {
    client_id: '5819fcfe72054f889d199cf0cdbc65d2',
    response_type: 'token',
    redirect_uri: process.env.REACT_APP_SPOTIFY_REDIRECT_URI,
    scope,
    show_dialog: true,
  }

  return buildUrl({ url, query });
}

const spotifyApi = ({ accessToken, endpoint, query }) => (
  getRequest({
    url: `https://api.spotify.com/${endpoint}`,
    headers: { 'Authorization': 'Bearer ' + accessToken },
    query,
  })
);

const getTopArtists = accessToken => spotifyApi({
  accessToken,
  endpoint: 'v1/me/top/artists',
  query: {
    limit: 50,
    offset: 1,
    time_range: `medium_term`,
  },
});

const getMe = accessToken => spotifyApi({ accessToken, endpoint: 'v1/me'});

export {
  spotifyAuthUrl,
  getTopArtists,
  getMe,
}