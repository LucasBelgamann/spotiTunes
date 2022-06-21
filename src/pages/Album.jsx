import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    loading: false,
    musicsSecond: [],
    favorites: [],
  };

  componentDidMount() {
    this.musicsGet();
  }

  musicsGet = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.setState({ loading: true });
    const musicas = await getMusics(id);
    const favoritas = await getFavoriteSongs();
    this.setState({
      favorites: favoritas,
      loading: false,
      musicsSecond: musicas
        .map(
          ({
            artistName,
            collectionName,
            trackName,
            previewUrl,
            artworkUrl100,
            trackId,
          }) => ({
            artistName,
            collectionName,
            trackName,
            previewUrl,
            artworkUrl100,
            trackId,
          }),
        ),
    });
  };

  render() {
    const { loading, musicsSecond, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading
          && <Loading />}
        {musicsSecond.length > 0
          && (
            <div className="imagem-siger">
              <img
                src={ musicsSecond[0].artworkUrl100 }
                alt="é uma imagem"
              />
              <p data-testid="artist-name">{ musicsSecond[0].artistName }</p>
              <p data-testid="album-name">{ musicsSecond[0].collectionName }</p>
            </div>
          )}
        {musicsSecond
          .filter(({ previewUrl }) => previewUrl)
          .map((som, index) => (
            <MusicCard
              key={ index }
              trackName={ som.trackName }
              previewUrl={ som.previewUrl }
              trackId={ som.trackId }
              isFavorites={ favorites.some((item) => item.trackId === som.trackId) }
            />
          ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
