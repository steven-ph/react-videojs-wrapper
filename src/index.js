import React, { Component } from 'react';
import videojs from 'video.js';
import Controls from './Controls.json';
import 'video.js/dist/video-js.css';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import './index.css';
import { playerPropTypes, defaultPlayerProps } from './VideoPlayerProps';

require('silvermine-videojs-quality-selector')(videojs);
require('videojs-seek-buttons');

class VideoPlayer extends Component {
  playerId = `video-player-${new Date() * 1}`;
  player = {};

  componentDidMount() {
    this.initPlayer(this.props);
    this.initPlayerEvents(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setControlsVisibility(this.player, nextProps.hideControls);
    if (this.props.src !== nextProps.src) {
      this.initPlayer(nextProps);
    }
  }

  componentWillUnmount() {
    if (this.player) this.player.dispose();
  }

  initPlayer(props) {
    const playerOptions = this.generatePlayerOptions(props);
    this.player = videojs(
      document.querySelector(`#${this.playerId}`),
      playerOptions
    );
    this.player.controlBar.addChild('QualitySelector');
    this.player.src(props.src);
    this.player.poster(props.poster);
    this.setControlsVisibility(this.player, props.hideControls);
    this.player.seekButtons({
      forward: 15,
      back: 15
    });
  }

  generatePlayerOptions(props) {
    const playerOptions = {
      controls: props.controls,
      autoplay: props.autoplay,
      preload: props.preload,
      width: props.width,
      height: props.height,
      bigPlayButton: props.bigPlayButton
    };

    const hidePlaybackRates =
      props.hidePlaybackRates || props.hideControls.includes('playbackrates');

    if (!hidePlaybackRates) {
      playerOptions.playbackRates = props.playbackRates;
    }

    return playerOptions;
  }

  setControlsVisibility(player, hiddenControls) {
    Object.keys(Controls).map(x => {
      player.controlBar[Controls[x]].show();
    });
    hiddenControls.map(x => {
      player.controlBar[Controls[x]].hide();
    });
  }

  initPlayerEvents(props) {
    let currentTime = 0;
    let previousTime = 0;
    let position = 0;

    this.player.ready(() => {
      props.onReady(this.player);
      window.player = this.player;
    });
    this.player.on('play', () => {
      props.onPlay(this.player.currentTime());
    });
    this.player.on('pause', () => {
      props.onPause(this.player.currentTime());
    });
    this.player.on('timeupdate', e => {
      props.onTimeUpdate(this.player.currentTime());
      previousTime = currentTime;
      currentTime = this.player.currentTime();
      if (previousTime < currentTime) {
        position = previousTime;
        previousTime = currentTime;
      }
    });
    this.player.on('seeking', () => {
      this.player.off('timeupdate', () => {});
      this.player.one('seeked', () => {});
      props.onSeeking(this.player.currentTime());
    });

    this.player.on('seeked', () => {
      let completeTime = Math.floor(this.player.currentTime());
      props.onSeeked(position, completeTime);
    });
    this.player.on('ended', () => {
      props.onEnd();
    });
  }

  render() {
    return (
      <video
        id={this.playerId}
        className={`video-js ${
          this.props.bigPlayButtonCentered ? 'vjs-big-play-centered' : ''
        } ${this.props.className}`}
      />
    );
  }
}

VideoPlayer.propTypes = {
  ...playerPropTypes
};

VideoPlayer.defaultProps = {
  ...defaultPlayerProps
};

export default VideoPlayer;
