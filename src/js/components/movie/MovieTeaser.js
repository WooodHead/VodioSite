import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MainUrl } from "../../util/RequestHandler";
import ReactPlayer from "react-player";
import Hls from "hls.js";
import playInitialIcon from "../../../img/play-icon.png";
import "../../../css/video-loading.css";
import playIcon from "../../../img/player/play.svg";
import fastforwardIcon from "../../../img/player/fast-forward.svg";
import fastbackwardIcon from "../../../img/player/fast-backward.svg";
import "../../../css/controls.css";
import { latinToPersian, persianToLatin } from "../../util/util";

export default class MovieTeaser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      showInitialPlay: false,
      showControls: true,
      url:
        "http://s4.filmnet.co/m3u8handler.ashx?id=2016&key=4f4272c5-3d4f-4673-901a-f3d071ab6b13&__DeviceId=b54b4f9d-c33f-4edc-a0f8-5cd2acb54280&clienttype=3"
    };
  }

  initiateVideo() {
    this.setState({ showControls: true, showInitialPlay: false });
    var url =
      "http://s4.filmnet.co/m3u8handler.ashx?id=2016&key=4f4272c5-3d4f-4673-901a-f3d071ab6b13&__DeviceId=b54b4f9d-c33f-4edc-a0f8-5cd2acb54280&clienttype=3";
    this.addEventListeners(url);
    // var bufferingIdx = -1;
    // var events = {
    //   url: url,
    //   t0: performance.now(),
    //   load: [],
    //   buffer: [],
    //   video: [],
    //   level: [],
    //   bitrate: []
    // };
    // if (Hls.isSupported()) {
    //   var video = document.getElementById("video");
    //   var hls = new Hls();
    //   hls.loadSource(url);
    //   hls.attachMedia(video);
    //   hls.on(
    //     Hls.Events.MEDIA_ATTACHED,
    //     function() {
    //       bufferingIdx = -1;
    //       events.video.push({
    //         time: performance.now() - events.t0,
    //         type: "Media attached"
    //       });
    //     }.bind(this)
    //   );
    //   hls.on(Hls.Events.FRAG_PARSING_INIT_SEGMENT, function(event, data) {
    //     var event = {
    //       time: performance.now() - events.t0,
    //       type: data.id + " init segment"
    //     };
    //     events.video.push(event);
    //   });
    //   hls.on(
    //     Hls.Events.MANIFEST_PARSED,
    //     function() {
    //       video.play();
    //       this.setState({ showLoading: false, showControls: true });
    //     }.bind(this)
    //   );
    // } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
    //   video.src = "https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8";
    //   video.addEventListener("canplay", function() {
    //     video.play();
    //   });
    // }
  }

  componentDidMount() {
    this.addEventListeners();
  }

  fullScreen() {
    var element = document.getElementById("player");
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }

  render() {
    return (
      <div class="player-container">
        <div id="player" class="fullscreen">
          {this.state.showInitialPlay && (
            <InitialPlay initialPlay={this.initiateVideo.bind(this)} />
          )}
          {this.state.showLoading && <Loading />}

          {this.state.showControls && (
            <div id="video-controls" class="controls display-control">
              <button id="playpause" type="button" data-state="play">
                Play/Pause
              </button>
              <p id="currentTime" class="current-time">
                {latinToPersian("00:00:00")}
              </p>
              <p id="duration" class="duration">
                / {latinToPersian("00:00:00")}{" "}
              </p>

              <button id="mute" type="button" data-state="mute">
                Mute/Unmute
              </button>

              <div id="volume" class="volume">
                <div id="volume-mask" class="volume-mask" />
                <input type="range" id="volume-bar" class="volume-bar" />
              </div>
              <div class="dropdown">
                <button id="quality-btn" class="dropbtn btn-settings" />
                <div id="quality" class="dropdown-content" />
              </div>

              <div class="progress-container" id="progress">
                <div
                  id="progress-bar"
                  style={{ height: "100%", background: "#7d1d65" }}
                />
              </div>
            </div>
          )}
          <video id="video" />
        </div>
      </div>
    );
  }

  addEventListeners(url) {
    url = this.state.url;
    // Hide controls in case of no mouse or touch activity for 10 seconds
    var videoControls = document.getElementById("video-controls"),
      video = document.getElementById("video"),
      player = document.getElementById("player");

    // Display controls on mouseover
    player.addEventListener("mouseover", function() {
      videoControls.classList.add("display-control");
    });

    // Hide controls on mouse out of video
    var isOnPlayer = false;

    player.addEventListener("mouseenter", function() {
      isOnPlayer = true;
    });

    // Make mouse out function for nested children
    function makeMouseOutFn(elem) {
      var list = traverseChildren(elem);
      return function onMouseOut(event) {
        var e = event.toElement || event.relatedTarget;
        if (!!~list.indexOf(e)) {
          return;
        }
        isOnPlayer = false;
        hideControls();
      };
    }

    player.addEventListener("mouseout", makeMouseOutFn(player), true);

    // Hide controls if no mouse movement for 12 seconds
    var timer = setTimeout(hideControls, 12000);
    document.addEventListener("mousemove", function() {
      if (isOnPlayer) {
        videoControls.classList.add("display-control");
      }
      clearTimeout(timer);
      timer = setTimeout(hideControls, 12000);
    });

    function hideControls() {
      if (!video.paused) {
        videoControls.classList.remove("display-control");
      }
    }

    // Utility function for traverse children nodes
    function traverseChildren(elem) {
      var children = [];
      var q = [];
      q.push(elem);
      while (q.length > 0) {
        var elem = q.pop();
        children.push(elem);
        pushAll(elem.children);
      }
      function pushAll(elemArray) {
        for (var i = 0; i < elemArray.length; i++) {
          q.push(elemArray[i]);
        }
      }
      return children;
    }

    var player = document.getElementById("player"),
      video = document.getElementById("video"),
      videoControls = document.getElementById("video-controls"),
      playpause = document.getElementById("playpause"),
      mute = document.getElementById("mute"),
      progress = document.getElementById("progress"),
      progressBar = document.getElementById("progress-bar"),
      volume = document.getElementById("volume"),
      volumeBar = document.getElementById("volume-bar"),
      volumeMask = document.getElementById("volume-mask"),
      duration = document.getElementById("duration"),
      currentTime = document.getElementById("currentTime");

    var videoSource = url;

    volumeBar.value = 100;
    video.volume = 1;
    volumeMask.style.width = volumeBar.value / 100 * volume.offsetWidth + "px";

    video.controls = false;

    // HLS video init
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSource);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        video.play();
        initVideoQualityOptions(hls);
      });
    }

    volumeBar.addEventListener(
      "input",
      function() {
        video.volume = volumeBar.value / 100;
        volumeMask.style.width =
          volumeBar.value / 100 * volume.offsetWidth + "px";
          if(volumeBar.value == 0){
            mute.setAttribute("data-state","unmute")
          }else{
            mute.setAttribute("data-state","mute")
          }
      },
      false
    );

    // volume.addEventListener("click", function(e) {
    //   var posX = $(this).offset().left;
    //   var pos = (e.pageX - posX) / 130;
    //   volumeBar.value = pos * 100;
    //   console.log(pos * 100);
    //   video.volume = volumeBar.value;
    // });

    // Add events for buttons
    playpause.addEventListener("click", function(e) {
      if (video.paused || video.ended) video.play();
      else video.pause();
    });

    mute.addEventListener("click", function(e) {
      video.muted = !video.muted;
      changeButtonState("mute");
    });

    // React to the user clicking within the progress bar
    progress.addEventListener("click", function(e) {
      var pos =
        (e.pageX -
          (this.offsetLeft +
            this.offsetParent.offsetLeft +
            player.offsetLeft)) /
        this.offsetWidth;
      video.currentTime = pos * video.duration;
    });

    // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
    video.addEventListener("loadedmetadata", function() {
      progress.setAttribute("max", video.duration);
    });

    // Add event listeners for video specific events
    video.addEventListener(
      "play",
      function() {
        changeButtonState("playpause");
      },
      false
    );
    video.addEventListener(
      "pause",
      function() {
        changeButtonState("playpause");
      },
      false
    );

    // As the video is playing, update the progress bar
    video.addEventListener("timeupdate", function() {
      if (!progress.getAttribute("max"))
        progress.setAttribute("max", video.duration);
      progress.value = video.currentTime;
      progressBar.style.width =
        Math.floor(video.currentTime / video.duration * 100) + "%";

      var durationHour = parseInt(video.duration / 3600);
      var durationMinute = parseInt(
        (video.duration - durationHour * 3600) / 60
      );
      var durationSecond =
        parseInt(video.duration) - durationHour * 3600 - durationMinute * 60;

      var currentHour = parseInt(video.currentTime / 3600);
      var currentMinute = parseInt(
        (video.currentTime - currentHour * 3600) / 60
      );
      var currentSecond =
        parseInt(video.currentTime) - currentHour * 3600 - currentMinute * 60;

      currentTime.innerHTML = latinToPersian(
        ("0" + currentHour).slice(-2) +
          ":" +
          ("0" + currentMinute).slice(-2) +
          ":" +
          ("0" + currentSecond).slice(-2)
      );
      duration.innerHTML = latinToPersian(
        "/ " +
          ("0" + durationHour).slice(-2) +
          ":" +
          ("0" + durationMinute).slice(-2) +
          ":" +
          ("0" + durationSecond).slice(-2)
      );
    });

    // Changes the button state of certain button's so the correct visuals can be displayed with CSS
    function changeButtonState(type) {
      // Play/Pause button
      if (type == "playpause") {
        if (video.paused || video.ended) {
          playpause.setAttribute("data-state", "play");
          videoControls.classList.add("display-control");
        } else {
          playpause.setAttribute("data-state", "pause");
        }
      } else if (type == "mute") {
        // Mute button
        mute.setAttribute("data-state", video.muted ? "unmute" : "mute");
      }
    }

    // Video Quality Controls

    function initVideoQualityOptions(hls) {
      var qualityBtn = document.getElementById("quality-btn");
      var quality = document.getElementById("quality");

      qualityBtn.addEventListener("click", function(event) {
        makeActive();
        quality.classList.toggle("show");
      });

      //Create and append the options
      var qualities = hls.levels;
      for (var i = 0; i < qualities.length; i++) {
        var q = document.createElement("a");
        q.setAttribute("data-value", i);
        q.setAttribute("class", "quality");
        q.text = qualities[i].name + "p";
        quality.appendChild(q);
      }

      // update dropdown selection
      var elems = document.querySelectorAll("#quality a");

      function makeActive(UserSelectionEvent) {
        for (var i = 0; i < elems.length; i++) {
          if (!UserSelectionEvent && i == hls.currentLevel) {
            elems[i].classList.add("active");
          } else {
            elems[i].classList.remove("active");
          }
        }
        if (UserSelectionEvent) {
          var q_level = parseInt(this.getAttribute("data-value"));
          hls.currentLevel = q_level;
          this.classList.add("active");
        }
      }

      for (var i = 0; i < elems.length; i++)
        elems[i].addEventListener("mousedown", makeActive);

      // hide dd if click elsewhere
      window.onclick = function(event) {
        if (!event.target.matches(".dropbtn")) {
          var dropdowns = document.getElementsByClassName("dropdown-content");
          var i;
          for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
              openDropdown.classList.remove("show");
            }
          }
        }
      };
    }
  }
}

var Loading = React.createClass({
  render() {
    return (
      <div
        style={{
          background: "transparent",
          position: "absolute",
          width: "62px",
          height: "62px",
          right: "calc(50% - 31px)",
          top: "calc(50% - 31px)"
        }}
      >
        <div class="vl-loader">
          <div class="vl-inner vl-one" />
          <div class="vl-inner vl-two" />
          <div class="vl-inner vl-three" />
        </div>
      </div>
    );
  }
});

var InitialPlay = React.createClass({
  render() {
    return (
      <div
        style={{
          background: "transparent",
          position: "absolute",
          width: "80px",
          height: "80px",
          right: "calc(50% - 40px)",
          top: "calc(50% - 40px)",
          zIndex: "20"
        }}
      >
        <img
          onClick={this.props.initialPlay}
          src={playInitialIcon}
          style={{
            width: "80px",
            height: "80px"
          }}
        />
      </div>
    );
  }
});
