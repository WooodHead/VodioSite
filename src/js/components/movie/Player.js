import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MainUrl } from "../../util/RequestHandler";
import Hls from "hls.js";
import playInitialIcon from "../../../img/play-icon.png";
import "../../../css/video-loading.css";
import playIcon from "../../../img/player/play.svg";
import fastforwardIcon from "../../../img/player/fast-forward.svg";
import fastbackwardIcon from "../../../img/player/fast-backward.svg";
import "../../../css/controls.css";
import { latinToPersian, persianToLatin } from "../../util/util";
import { inject, observer } from "mobx-react";
import exit from "../../../img/exit.svg";


var lastQuarter = 0;
var gaStore;
var gaStoreCategory;
var TimeUpdate = function TimeUpdate() {
  var video = document.getElementById("video"),
    seekBar = document.getElementById("seek-bar");

  if (seekBar != null && !seekBar.getAttribute("max")) seekBar.setAttribute("max", video.duration);
  seekBar.value = video.currentTime;
  var val = video.currentTime / video.duration;
  seekBar.style.backgroundImage =
    "-webkit-gradient(linear, left top, right top, " +
    "color-stop(" +
    val +
    ", #7d1d65), " +
    "color-stop(" +
    val +
    ", transparent)" +
    ")";

  var quarter = video.currentTime / video.duration * 4;
  if (quarter > 1 && quarter < 2) {
    if (lastQuarter != 1) {
      lastQuarter = 1;
      gaStore.addEvent(gaStoreCategory, "watch", "Q1")
    }
  }
  if (quarter > 2 && quarter < 3) {
    if (lastQuarter != 2) {
      lastQuarter = 2;
      gaStore.addEvent(gaStoreCategory, "watch", "Q2")
    }
  }
  if (quarter > 3 && quarter < 4) {
    if (lastQuarter != 3) {
      gaStore.addEvent(gaStoreCategory, "watch", "Q3")
      lastQuarter = 3;
    }
  } else if (quarter == 4) {
    gaStore.addEvent(gaStoreCategory, "watch", "Q4")
  }

  var durationHour = parseInt(video.duration / 3600);
  var durationMinute = parseInt((video.duration - durationHour * 3600) / 60);
  var durationSecond =
    parseInt(video.duration) - durationHour * 3600 - durationMinute * 60;

  var currentHour = parseInt(video.currentTime / 3600);
  var currentMinute = parseInt((video.currentTime - currentHour * 3600) / 60);
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
};

@inject("session", "gaStore")
@observer
export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: false,
      showInitialPlay: false,
      showControls: true,
      volume: 0,
      url:
        "http://media.vodio.ir/StreamTokenHandler.ashx?token=D279F8F1-3A49-4676-91BE-3741AEDEFBB7&movieId=1&trailer=1",
      error: {
        cannotPlay: false
      },
      doesPlayed: false,
      testText: "",
      showTestText: false,
      gaStoreCategory: ""
    };
  }

  componentWillUnmount() {
    var video = document.getElementById("video");
    video.removeEventListener("timeupdate", TimeUpdate);
    var parts = video.duration / 8;
    this.props.gaStore.addEvent(this.state.gaStoreCategory, "exit " + this.props.movie.id.toString(), Math.ceil(video.currentTime / parts).toString());
  }

  componentDidMount() {
    gaStore = this.props.gaStore;
    if (this.props.isTrailer == true) {
      this.setState({
        url:
          "http://185.105.238.196:8080/StreamTokenHandler.ashx?movieId=" +
          this.props.movie.id +
          "&trailer=1"
        , gaStoreCategory: "player - trailer"
      });
      gaStoreCategory = "player - trailer";
    } else {
      document.body.style.overflowY = "hidden";
      this.setState({
        url:
          "http://185.105.238.196:8080/StreamTokenHandler.ashx?token=" +
          this.props.session.session +
          "&movieId=" +
          this.props.movie.id
        , gaStoreCategory: "player - film"
      });
      gaStoreCategory = "player - film";
    }

    setTimeout(function () {
      if (!this.state.doesPlayed && this.props.isTrailer == false) {
        this.setState({ doesPlayed: true });
        this.addEventListeners();
      }
    }.bind(this), 100);
  }

  close() {
    var video = document.getElementById("video");
    video.removeEventListener("timeupdate", TimeUpdate);
    document.body.style.overflowY = "auto";
    this.props.session.showPlayerFullscreen = false;
  }

  play() {
    if (!this.state.doesPlayed) {
      this.setState({ doesPlayed: true });
      this.addEventListeners();
    }
  }

  fullScreen() {
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement
    ) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      this.props.gaStore.addEvent(this.state.gaStoreCategory, "exitFullscreen " + this.props.movie.id.toString(), null);

    } else {
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
      this.props.gaStore.addEvent(this.state.gaStoreCategory, "enterFullscreen " + this.props.movie.id.toString(), null);
    }
  }

  render() {
    return (
      <div
        class={
          this.props.isTrailer
            ? "player-container"
            : "player-container-fullscreen"
        }
      >
        <div id="player" class="fullscreen">
          {this.props.isTrailer ? (
            null || !Hls.isSupported()
          ) : (
              <div className="close-animatedModal">
                <img
                  src={exit}
                  class="closemodal"
                  onClick={this.close.bind(this)}
                />
              </div>
            )}
          {this.state.showTestText && (
            <div class="error-cannot-play">{this.state.testText}</div>
          )}
          {this.state.error.cannotPlay && (
            <div class="error-cannot-play">این ویدیو قابلیت پخش ندارد</div>
          )}
          {this.state.showInitialPlay && (
            <InitialPlay initialPlay={this.initiateVideo.bind(this)} />
          )}
          {this.state.showLoading && <Loading />}

          {this.state.showControls &&
            Hls.isSupported() && (
              <div id="video-controls" class="controls display-control" >
                {Hls.isSupported() && (
                  <button
                    id="playpause"
                    type="button"
                    data-state="play"
                    onClick={this.play.bind(this)}
                  >
                    Play/Pause
                  </button>
                )}
                {Hls.isSupported() && (
                  <div>
                    <p id="currentTime" class="current-time">
                      {latinToPersian("00:00:00")}
                    </p>
                    <p id="duration" class="duration">
                      / {latinToPersian("00:00:00")}
                    </p>
                    <button
                      id="fullscreen"
                      class="fullscreen-button"
                      type="button"
                      onClick={this.fullScreen.bind(this)}
                    >
                      Play/Pause
                    </button>

                    <div id="volume-container" class="volume-container">
                      <button id="mute" type="button" data-state="unmute">
                        Mute/Unmute
                      </button>

                      <div id="volume" class="volume vertical-heighest-first">
                        <div id="volume-mask" class="volume-mask" />
                        <input
                          type="range"
                          id="volume-bar"
                          class="volume-bar"
                        />
                      </div>
                    </div>
                    <div class="dropdown">
                      <button id="quality-btn" class="dropbtn btn-settings" />
                    </div>
                    <div id="quality" class="dropdown-quality" />

                    <div class="seek-container" id="seek-container">
                      <input
                        type="range"
                        id="seek-bar"
                        min="0"
                        class="seek-bar"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          {Hls.isSupported() ? (
            <video id="video" />
          ) : (
              <video id="video" controls autoplay>
                <source src={this.state.url} type="application/x-mpegURL" />
              </video>
            )}
        </div>
      </div>
    );
  }

  addEventListeners() {
    var url = this.state.url;
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
      currentTime = document.getElementById("currentTime"),
      volumeContainer = document.getElementById("volume-container"),
      seekBar = document.getElementById("seek-bar"),
      seekContainer = document.getElementById("seek-container");


    if (Hls.isSupported()) {
      this.setState({ testText: "supported", showTestText: false });
      try {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
          this.initVideoQualityOptions(hls);
        }.bind(this));
        hls.on(Hls.Events.ERROR, function (event, data) {
          $.ajax({
            type: "Post",
            data: JSON.stringify({
              session: this.props.session.session,
              error: this.props.movie.id + " #-#" + data.url + " #-# " + data.type + " #-# " + data.reason + " #-# " + data.details
            }),
            url: MainUrl + "/clienterror.ashx",
            success: function (data, textStatus, request) {
            }.bind(this),
            error: function (request, textStatus, errorThrown) { }
          });
        }.bind(this));
        // HLS video init
        // Hide controls in case of no mouse or touch activity for 10 seconds

        // Display controls on mouseover
        player.addEventListener("mouseover", function () {
          videoControls.classList.add("display-control");
        });

        // Hide controls on mouse out of video
        var isOnPlayer = false;

        player.addEventListener("mouseenter", function () {
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
        document.addEventListener("mousemove", function () {
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

        volumeBar.value = 100;
        video.volume = 1;
        volumeMask.style.width =
          volumeBar.value / 100 * volumeBar.offsetWidth + "px";
        seekBar.value = 0;
        video.controls = false;

        playpause.addEventListener("click", function (e) {
          if (video.paused || video.ended) {
            video.play();
            this.props.gaStore.addEvent(this.state.gaStoreCategory, "play " + this.props.movie.id.toString(), null);
          }
          else {
            video.pause();
            this.props.gaStore.addEvent(this.state.gaStoreCategory, "pause " + this.props.movie.id.toString(), null);
          }
        }.bind(this));

        if (!this.props.session.isMobile) {
          volumeContainer.addEventListener("mouseover", function (e) {
            volume.style.display = "block";
            volumeContainer.style.height = "195px";
            volumeMask.style.width =
              volumeBar.value / 100 * volumeBar.offsetWidth + "px";
          });
          volumeContainer.addEventListener("mouseout", function (e) {
            volume.style.display = "none";
            volumeContainer.style.height = "30px";
          });
        }

        mute.addEventListener(
          "click",
          function (e) {
            video.muted = !video.muted;
            changeButtonState("mute");
            if (mute.getAttribute("data-state") == "unmute") {
              this.props.gaStore.addEvent(this.state.gaStoreCategory, "unmute " + this.props.movie.id.toString(), null);
              volumeBar.value = this.state.volume;
              volumeMask.style.width =
                volumeBar.value / 100 * volumeBar.offsetWidth + "px";
            } else {
              this.props.gaStore.addEvent(this.state.gaStoreCategory, "mute " + this.props.movie.id.toString(), null);
              this.setState({ volume: volumeBar.value });
              volumeBar.value = 0;
              volumeMask.style.width = "0px";
            }
          }.bind(this)
        );

        volumeBar.addEventListener(
          "input",
          function () {
            video.volume = volumeBar.value / 100;
            volumeMask.style.width =
              volumeBar.value / 100 * volumeBar.offsetWidth + "px";
            this.setState({ volume: volumeBar.value });
            if (volumeBar.value == 0) {
              mute.setAttribute("data-state", "mute");
            } else {
              video.muted = false;
              mute.setAttribute("data-state", "unmute");
            }
          }.bind(this),
          false
        );

        seekBar.addEventListener(
          "mousedown",
          function () {
            video.removeEventListener("timeupdate", TimeUpdate);
          }.bind(this)
        );

        seekBar.addEventListener(
          "mouseup",
          function () {
            video.currentTime = seekBar.value;
            video.addEventListener("timeupdate", TimeUpdate);
          }.bind(this)
        );

        seekBar.addEventListener(
          "input",
          function () {
            var val =
              ($("#seek-bar").val() - $("#seek-bar").attr("min")) /
              ($("#seek-bar").attr("max") - $("#seek-bar").attr("min"));

            $("#seek-bar").css(
              "background-image",
              "-webkit-gradient(linear, left top, right top, " +
              "color-stop(" +
              val +
              ", #7d1d65), " +
              "color-stop(" +
              val +
              ", transparent)" +
              ")"
            );
          }.bind(this),
          false
        );

        // Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
        video.addEventListener("loadedmetadata", function () {
          seekBar.setAttribute("max", video.duration);
        });

        video.addEventListener("loadeddata", function () {
          video.addEventListener("timeupdate", TimeUpdate);
        });

        // Add event listeners for video specific events
        video.addEventListener(
          "play",
          function () {
            changeButtonState("playpause");
          },

          false
        );
        video.addEventListener(
          "pause",
          function () {
            changeButtonState("playpause");
          },
          false
        );

        video.addEventListener("progress", function () {
          var bg = "linear-gradient(to right,";
          for (var i = 0; i < video.buffered.length; i++) {
            if (i > 0) {
              bg =
                bg +
                ",white " +
                video.buffered.start(i) / video.duration * 100 +
                "%,";
            }
            bg =
              bg +
              "#ed6fcd " +
              video.buffered.start(i) / video.duration * 100 +
              "%," +
              "#ed6fcd " +
              video.buffered.end(i) / video.duration * 100 +
              "%," +
              " white " +
              video.buffered.end(i) / video.duration * 100 +
              "%";
          }
          bg = bg + ")";
          seekContainer.style.backgroundImage = bg;
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
            mute.setAttribute("data-state", video.muted ? "mute" : "unmute");
          }
        }

        // Video Quality Controls


      } catch (err) {
        this.setState({ error: { cannotPlay: true } });
      }
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      this.setState({ showControls: false });
      video.src = url;
      video.setAttribute("controls", "controls");
      video.addEventListener("canplay", function () {
        video.play();
      });
    }
  }

  initVideoQualityOptions(hls) {
    var qualityBtn = document.getElementById("quality-btn");
    var quality = document.getElementById("quality");

    qualityBtn.addEventListener("click", function (event) {
      this.makeActive(event, hls);
      quality.classList.toggle("show");
    }.bind(this));

    //Create and append the options
    var qualities = hls.levels;
    for (var i = 0; i < qualities.length; i++) {
      var q = document.createElement("a");
      q.setAttribute("data-value", i);
      q.setAttribute("class", "quality");
      q.text = latinToPersian(qualities[i].attrs.RESOLUTION.split("x")[1] + "p");
      quality.appendChild(q);
    }

    // update dropdown selection
    var elems = document.querySelectorAll("#quality a");
    for (var i = 0; i < elems.length; i++)
      elems[i].addEventListener("mousedown", function (event) { this.makeActive(event, hls) }.bind(this));

    // hide dd if click elsewhere
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName(
          "dropdown-content"
        );
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


  makeActive(UserSelectionEvent, hls) {
    var elems = document.querySelectorAll("#quality a");
    var continute = false;
    for (var i = 0; i < elems.length; i++) {
      if (UserSelectionEvent.currentTarget == elems[i]) {
        continute = true
      }
    }
    for (var i = 0; i < elems.length; i++) {
      if (i == hls.currentLevel) {
        elems[i].classList.add("active-c");
      }
      if (continute == true) {
        elems[i].classList.remove("active-c");
      }
    }
    if (continute == true) {
      if (UserSelectionEvent.currentTarget.innerHTML != "")
        this.props.gaStore.addEvent(this.state.gaStoreCategory, "qualityChange " + this.props.movie.id.toString(), UserSelectionEvent.currentTarget.innerHTML);
      var q_level = parseInt(UserSelectionEvent.currentTarget.getAttribute("data-value"));
      hls.currentLevel = q_level;
      UserSelectionEvent.currentTarget.classList.add("active-c");
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
