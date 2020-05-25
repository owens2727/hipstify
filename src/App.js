/** @jsx jsx */
import { jsx } from 'shallan/emotion';

import { compose, withState, withPropsOnChange, lifecycle } from 'recompose';
import { sortBy } from 'lodash';
import { getHashParamsValue } from 'shallan/dom';
import { getTopArtists, spotifyAuthUrl } from './spotify';
import ArtistCard from './components/ArtistCard';

import SpotifyLogo from './spotify-icon.png';
import HipstifyLogo from './hipstify-logo.svg';

/**
 * TODO
 *
 * button for authorizing with spotify (general intro handling)
 * CSS on root should apply to everything
 * copy improvements
 * deploy
 * hover card
 * spotify branding guide
 * all CSS should live in shallan - these should all be generic components
 */

const css = {
  app: {
    width: `100vw`,
    minHeight: `100vh`,
    fontFamily: 'Futura',
    lineHeight: '150%',
    backgroundColor: '#4ECDC4',
    color: `#272727`,
  },
  contents: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
  },
  artistsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 1100,
    marginBottom: 200,
  },
  header: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `center`,
    marginTop: 60,
    width: `600px`
  },
  logo: {
    height: 92,
    width: 267,
  },
  subtitle: {
    margin: 20,
    fontSize: 22,
    color: `white`,
    fontWeight: 'initial',
    width: 450,
    textAlign: 'center'
  },
  connectCard: {
    marginTop: 50,
    height: 260,
    width: 520,
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  description: {
    fontSize: 19,
    textAlign: 'center',
    p: {
      marginBottom: 30,
    }
  },
  connectButton: {
    backgroundColor: '#272727',
    height: 60,
    width: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    margin: 10,
  },
  connectButtonContent: {
    fontSize: 17,
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
  },
  spotifyIcon: {
    height: 25,
    width: 25,
    marginRight: 10,
  }
};

const Connect = props => (
  <div css={css.connectCard}>
    <div css={css.description}>
      <p>The band writing your next play-it-on-repeat banger is stuck at home instead of earning $ on the road.</p>
      <p>Hipstify discovers merch from the artists you love who could most use your support right now.</p>
    </div>
    <a css={css.connectButton} href={spotifyAuthUrl()}>
      <img css={css.spotifyIcon} src={SpotifyLogo} alt='Spotify' />
      <span css={css.connectButtonContent}>Connect to Spotify</span>
    </a>
  </div>
);

const Artists = props => {
  const { topArtists } = props;
  const artistsWithFewestFollowers = sortBy(topArtists, (item) => item.followers.total).slice(0, 18);

  return (
    <div css={css.artistsContainer}>
      {artistsWithFewestFollowers.map(artist => <ArtistCard artist={artist} />)}
    </div>
  );
}

const Content = props => {
  const { accessToken } = props;

  if (!accessToken) {
    return (<Connect {...props } />);
  } else {
    return (<Artists {...props} />);
  }
}

const App = props => {
  const content = Content(props);

  return (
    <div css={css.app}>
      <div css={css.contents}>
        <div css={css.header}>
          <img css={css.logo} src={HipstifyLogo} alt='hipstify' />
          <h3 css={css.subtitle}>Support your favorite up and coming artists.</h3>
        </div>
        {content}
      </div>
    </div>
  );
}

export default compose(
  withState('topArtists', 'setTopArtists', []),
  withState('accessToken', 'setAccessToken', null),
  lifecycle({
    componentDidMount() {
      const accessToken = getHashParamsValue(`access_token`);

      if (accessToken) {
        this.props.setAccessToken(accessToken);
      }
    }
  }),
  withPropsOnChange(['accessToken'], props => {
    const { accessToken, setTopArtists } = props;

    if (!accessToken) {
      return;
    }

    getTopArtists(accessToken).then(response => setTopArtists(response.items));
  }),
)(App);
