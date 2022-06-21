import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checkado: false,
  }

  componentDidMount() {
    const { isFavorites } = this.props;
    this.setState({ checkado: isFavorites });
  }

  handleCheck = async ({ target }) => {
    const { checked } = target;
    const { trackId } = this.props;
    this.setState({ loading: true, checkado: checked });
    if (checked) {
      await addSong(getMusics(trackId));
    }
    await removeSong(getMusics(trackId));
    this.setState({ loading: false });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checkado } = this.state;
    return (
      loading ? <Loading />
        : (
          <div className="audio">
            <div className="trak">
              <h4>{trackName}</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor="favorita">
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  name="favorita"
                  checked={ checkado }
                  onChange={ this.handleCheck }
                />
              </label>
            </div>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
  isFavorites: PropTypes.bool.isRequired,
};

export default MusicCard;
