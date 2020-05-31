/** @jsx jsx */
import { getRequest } from 'shallan/dom';
import { jsx } from 'shallan/emotion';
import { formatNumber } from 'shallan/format';
import { compose, withState } from 'recompose';
import PulseLoader from "react-spinners/PulseLoader";

const sizeIphone = '@media (max-width: 600px)';


const css = {
  artistCard: {
    maxWidth: 300,
    maxHeight: 450,
    margin: 25,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    [sizeIphone]: {
      margin: '10px 0',
    }
  },
  image: {
    maxHeight: 300,
    maxWidth: 300
  },
  name: {
    fontSize: 17,
    padding: 0,
    margin: 0,
    fontWeight: 'bold',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    margin: 0,
  },
  followerCount: {
    fontSize: 15,
    margin: 3,
    color: `#939393`,
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    textDecoration: 'none',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4ECDC4',
    height: 60,
    width: 220,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    margin: 10,
    '&:hover': {
      cursor: 'pointer',
    }
  }
};

const getMerchLink = async props => {
  const { artist, setIsGettingMerchLink, setMessage } = props;
  setIsGettingMerchLink(true)
  const resp = await getRequest({ url: `${process.env.REACT_APP_HIPSTIFY_API}/merch-url`, query: { artist: artist.name }})
  setIsGettingMerchLink(false)
  if (resp.url) {
    window.location.href = resp.url;
  } else {
    setMessage("We couldn't find a merch link for this artist, but they could still use your support. Try looking them up directly!")
    setTimeout(() => {
      setMessage(null);
    }, 3000)
    setIsGettingMerchLink(false)
  }
}

const ArtistCard = props => {
  const { artist, isGettingMerchLink } = props;
  // const bandcampLink = `https://${artist.name.replace(/\s+/g, '').toLowerCase()}.bandcamp.com`;
  const imageUrl = !!artist.images[0] ? artist.images[0].url : '';
  return (
    <div css={css.artistCard}>
      <img css={css.image} src={imageUrl} alt={artist.name} />
      <div css={css.details}>
        <p css={css.name}>{artist.name}</p>
        <p css={css.followerCount}>{formatNumber(artist.followers.total)} followers</p>
        <div onClick={() => getMerchLink(props)} css={css.button}>
          {!isGettingMerchLink && (
            <span css={css.buttonText}>Browse Merch</span>
          )}
          {isGettingMerchLink && (
            <PulseLoader color="white"/>
          )}
        </div>
      </div>
    </div>
  );
}

export default compose(
  withState('isGettingMerchLink', 'setIsGettingMerchLink', false),
)(ArtistCard);
