import PropTypes from 'prop-types';

export const playerPropTypes = {
  src: PropTypes.string,
  poster: PropTypes.string,
  controls: PropTypes.bool,
  autoplay: PropTypes.bool,
  preload: PropTypes.oneOf(['auto', 'none', 'metadata']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hideControls: PropTypes.arrayOf(PropTypes.string),
  bigPlayButton: PropTypes.bool,
  bigPlayButtonCentered: PropTypes.bool,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onTimeUpdate: PropTypes.func,
  onSeeking: PropTypes.func,
  onSeeked: PropTypes.func,
  onEnd: PropTypes.func,
  playbackRates: PropTypes.arrayOf(PropTypes.number),
  hidePlaybackRates: PropTypes.bool,
  className: PropTypes.string
};

export const defaultPlayerProps = {
  src: '',
  poster: '',
  controls: true,
  autoplay: false,
  preload: 'auto',
  playbackRates: [0.5, 1, 1.5, 2],
  hidePlaybackRates: false,
  className: '',
  hideControls: [],
  bigPlayButton: true,
  bigPlayButtonCentered: true,
  onReady: () => {},
  onPlay: () => {},
  onPause: () => {},
  onTimeUpdate: () => {},
  onSeeking: () => {},
  onSeeked: () => {},
  onEnd: () => {}
};
