/** @jsx jsx */
import { jsx } from 'shallan/emotion';
import { formatNumber } from 'shallan/format';

const css = {
  artistCard: {
    width: 300,
    height: 450,
    margin: 25,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  image: {
    height: 300,
    width: 300
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
  }
};

const ArtistCard = props => {
  const { artist } = props;
  const bandcampLink = `https://${artist.name.replace(/\s+/g, '').toLowerCase()}.bandcamp.com`;
  const imageUrl = !!artist.images[0] ? artist.images[0].url : '';
  return (
    <div css={css.artistCard}>
      <img css={css.image} src={imageUrl} alt={artist.name} />
      <div css={css.details}>
        <p css={css.name}>{artist.name}</p>
        <p css={css.followerCount}>{formatNumber(artist.followers.total)} followers</p>
        <a href={bandcampLink} css={css.button}><span css={css.buttonText}>Browse Merch</span></a>
      </div>
    </div>
  );
}

export default ArtistCard;