import React from "react";
import { Link } from "react-router-dom";

export default class MovieDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      director: null,
      researcher: null,
      actors: null,
      provider: null,
      loadPage: false
    };
  }

  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "http://localhost:58583/role.ashx?movieId=" + this.props.movie.id,
      success: function(data, textStatus, request) {
        var directorTemp;
        var ActorTemp;
        var providerTemp;
        var ResearcherTemp;
        $.each(data.data, function(index, role) {
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
          actors: ActorTemp,
          loadPage: true
        });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}
    });
  }

  render() {
    if (!this.state.loadPage) {
      return <div />;
    }
    return (
      <div id="tab-1" className="single-product-dec-content">
        <div className="single-product-dec-content-text">
          {this.props.movie.genres != null ? (
            <Genre genres={this.props.movie.genres} />
          ) : null}
         
          {this.state.director != null ? (
            <Director directors={this.state.director} />
          ) : null}
         
          {this.state.actors != null ? (
            <Actor actors={this.state.actors} />
          ) : null}
         
          {this.state.provider != null ? (
            <Provider providers={this.state.provider} />
          ) : null}

          {this.state.researcher != null ? (
            <Researcher researchers={this.state.researcher} />
          ) : null}
         
          <div>
            <strong>خلاصه داستان:</strong> <p>{this.props.movie.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

var Genre = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">ژانر : </strong>
        {this.props.genres.map((genre, l) => (
          <div className="inline-class" key={genre.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + genre.id }}
            >
              {genre.name}
            </Link>
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
              to={{ pathname: "/agent/" + director.id }}
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

var Actor = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">بازیگران : </strong>
        {this.props.actors.agents.map((actor, l) => (
          <div className="inline-class" key={actor.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + actor.id }}
            >
              {actor.name}
            </Link>
            {this.props.actors.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Provider = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">تهیه کننده : </strong>
        {this.props.providers.agents.map((provider, l) => (
          <div className="inline-class" key={provider.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + provider.id }}
            >
              {provider.name}
            </Link>
            {this.props.providers.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});

var Researcher = React.createClass({
  render() {
    return (
      <div>
        <strong className="inline-class">محقق : </strong>
        {this.props.researchers.agents.map((researcher, l) => (
          <div className="inline-class" key={researcher.id}>
            <Link
              className="inline-class"
              to={{ pathname: "/agent/" + researcher.id }}
            >
              {researcher.name}
            </Link>
            {this.props.researchers.agents.length - 1 != l ? (
              <p className="inline-class"> , </p>
            ) : null}
          </div>
        ))}
      </div>
    );
  }
});
