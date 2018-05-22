import React, { Component } from "react";
import { Link } from "react-router-dom";
import { latinToPersian, convertSecondToString, urlCorrection } from '../../util/util'
import { MainUrl, MediaUrl } from "../../util/RequestHandler";
import { inject, observer } from "mobx-react";

@inject("movieStore", "session", "gaStore")
@observer
export default class FeaturedMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            durationString: "",
            director: null,
            researcher: null,
            provider: null,
            actors: null,
            elementId: makeid()
        };
    }

    componentDidMount() {
        // if (this.mobileTabletCheck() == true) {
        $("#" + this.state.elementId).attr('draggable', 'false');
        // }
        this.setState({
            durationString: convertSecondToString(this.props.movie.duration)
        });
        var directorTemp;
        var ActorTemp;
        var providerTemp;
        var ResearcherTemp;
        if (this.props.movie.role != undefined) {
            $.each(this.props.movie, function (index, role) {
                if (role.name == "کارگردان") {
                    directorTemp = role;
                } else if (role.name == "بازیگر") {
                    ActorTemp = role;
                } else if (role.name == "تهیه کننده") {
                    providerTemp = role;
                } else if (role.name == "پژوهشگر") {
                    ResearcherTemp = role;
                }
            });
            this.setState({
                director: directorTemp,
                researcher: ResearcherTemp,
                provider: providerTemp,
                actors: ActorTemp
            });
        }

        var width = $(window).width();
        if (width > 750) {
            $(".top-moviez-inner" + this.state.elementId).hover(
                function () {
                    $(".top-moviez-post-overlay" + this.state.elementId).css(
                        "visibility",
                        "visible"
                    );
                    $(".top-moviez-post-overlay" + this.state.elementId).css(
                        "opacity",
                        "1"
                    );
                    $(".top-moviez-post-title" + this.state.elementId).css(
                        "top",
                        "calc(45% - 20px)"
                    );
                    $(".top-moviez-post-director" + this.state.elementId).css(
                        "top",
                        "calc(50% - 20px)"
                    );
                }.bind(this),
                function () {
                    $(".top-moviez-post-overlay" + this.state.elementId).css(
                        "opacity",
                        "0"
                    );
                    $(".top-moviez-post-overlay" + this.state.elementId).css(
                        "visibility",
                        "hidden"
                    );
                    $(".top-moviez-post-title" + this.state.elementId).css(
                        "top",
                        "calc(60% - 20px)"
                    );
                    $(".top-moviez-post-director" + this.state.elementId).css(
                        "top",
                        "calc(75% - 20px)"
                    );
                }.bind(this)
            );
        }
    }

    movieClicked(movieId, e) {
        if (this.props.session.featuredDragging == true) {
            e.preventDefault();
        }
        this.props.gaStore.addEvent("FeaturedBar - " + this.props.movie.title, "MovieItem", movieId.toString());
        this.props.movieStore.movieId = movieId;
        this.props.movieStore.fetchMovie();
    }

    mobileTabletCheck() {
        var check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    }

    render() {
        var style = {
            width: "100%",
            height: "100%",
            position: "absolute",
            zIndex: "2",
            opacity: "0",
            transition: "visibility 0.5s, opacity 0.5s linear",
            visibility: "hidden",
            background: 'RGBA(0,166,156,0.6)'
        };

        var titleStyle = {
            position: "relative",
            top: "calc(60% - 20px)",
            color: "white",
            height: "40px",
            width: "100%",
            textAlign: "center",
            fontSize: "20px",
            transition: "top 0.3s linear",
            fontFamily: "IRSansBold",
            lineHeight: "1"
        };

        var directorStyle = {
            position: "relative",
            top: "calc(75% - 20px)",
            color: "white",
            height: "40px",
            width: "100%",
            textAlign: "center",
            fontSize: "14px",
            transition: "top 0.3s linear"
        };

        return (
            <div className={"top-moviez-inner" + this.state.elementId + " shadow-item"} style={{ width: this.props.parentWidth }}>
                <Link
                    id={this.state.elementId}
                    draggable="false"
                    to={{ pathname: "/movie/" + this.props.movie.id + "/" + urlCorrection(this.props.movie.title) }}
                    onClick={e => this.movieClicked(this.props.movie.id, e)}
                    className="top-moviez-post-inner"
                >
                    <div
                        class={"top-moviez-post-overlay" + this.state.elementId}
                        style={style}
                    >
                        <div

                            class={"top-moviez-post-title" + this.state.elementId}
                            style={titleStyle}
                        >
                            {latinToPersian(this.props.movie.title)}
                        </div>
                        {this.props.movie.directors && (
                            <div

                                class={"top-moviez-post-director" + this.state.elementId}
                                style={directorStyle}
                            >
                                {this.props.movie.directors[0].name}
                            </div>
                        )}
                    </div>

                    <img
                        src={
                            MediaUrl +
                            "/image.ashx?file=" +
                            this.props.movie.thumbnail.url +
                            "&height=" +
                            this.props.height +
                            "&width=" +
                            this.props.width
                        }
                        alt={"دانلود " + this.props.movie.categories[0].name
                            + " " + this.props.movie.title + " اثری از " + this.props.movie.directors[0].name}
                        className="top-moviez-post-image"
                    />
                </Link>

            </div>
        );
    }
}

function makeid() {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

var Genre = React.createClass({
    render() {
        return (
            <div>
                <strong className="inline-class">ژانر : </strong>
                {this.props.genres.map((genre, l) => (
                    <div className="inline-class" key={genre.id}>
                        {genre.name}
                        {this.props.genres.length - 1 != l ? (
                            <p className="inline-class"> , </p>
                        ) : null}
                    </div>
                ))}
            </div>
        );
    }
});

var Director = React.createClass({
    render() {
        return (
            <div>
                <strong className="inline-class">کارگردان : </strong>
                {this.props.directors.agents.map((director, l) => (
                    <div className="inline-class" key={director.id}>
                        <Link
                            className="inline-class"
                            to={{ pathname: "/agent/" + director.id + "/" + urlCorrection(director.name) }}
                        >
                            {director.name}
                        </Link>
                        {this.props.directors.agents.length - 1 != l ? (
                            <p className="inline-class"> , </p>
                        ) : null}
                    </div>
                ))}
            </div>
        );
    }
});
