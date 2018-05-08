import React from 'react'
import { inject, observer } from "mobx-react";
import { MainUrl, MediaUrl } from "../../util/RequestHandler";
import { latinToPersian, convertSecondToString, urlCorrection } from "../../util/util";
import invoiceImage from '../../../img/receipt.svg';
import portalImage from '../../../img/Dargah-Icon.svg';

@inject("session", "movieStore", "gaStore")
@observer
export default class Invoice extends React.Component {

    componentWillUnmount() {
        $(".content-holder").css("background", "white");
    }

    purchase() {
        if (
            this.props.session.session != null &&
            this.props.session.session != ""
        ) {
            this.props.session.showLoading = true;
            var url =
                MainUrl +
                "/purchase.ashx?movieId=" +
                this.props.movieStore.movie.id +
                "&token=" +
                this.props.session.session;
            this.props.gaStore.addEvent("Invoice", this.props.movieStore.movie.id.toString(), this.props.movieStore.movie.price.toString());
            window.location.replace(url);
        } else {
            this.props.session.showLogin = true;
            this.props.session.movieIdForPurchase = this.props.movieStore.movie.id;
        }
    }

    componentDidMount() {
        this.props.movieStore.movieId = this.props.match.params.id;
        this.props.movieStore.redirectToMovie = true;
        this.props.movieStore.fetchMovie();

        this.props.gaStore.addPageView("/invoice/" + this.props.match.params.id);

        this.props.movieStore.movieId = this.props.match.params.id;
        this.props.movieStore.fetchMovie();
        window.scrollTo(0, 0);
        $(".content-holder").css("background", "#dedede");
    }


    render() {
        if (this.props.movieStore.movie) {
            return <div class="invoice-parent-container" >
                <div style={{
                    height: '40px',
                    fontFamily: 'irsansbold',
                    fontSize: '22px',
                    textAlign: 'center',
                    background: "#cecece",
                    width: '100%',
                    borderRadius: '5px',
                    display: 'inline-flex'
                }}>
                    <img src={invoiceImage} style={{
                        width: '20px',
                        marginRight: '20px'
                    }} />
                    <span style={{
                        marginTop: '5px',
                        marginRight: '5px',
                        fontFamily: 'irsansbold',
                        fontSize: '17px'
                    }}> پیش فاکتور
                   </span>
                </div>
                <div class="invoice-container" style={{ background: "#f0f0f0" }}>
                    <div class="invoice-detail-container">
                        <div style={{ display: 'inline-flex' }}>
                            <div class="invoice-thumbnail">
                                <img src={MediaUrl +
                                    "/image.ashx?file=" +
                                    this.props.movieStore.movie.thumbnail.url +
                                    "&width=" +
                                    100}
                                    style={{ paddingTop: "10px", paddingRight: "10px" }} />
                            </div>
                            <div style={{ marginRight: '15px' }}>
                                <div class="invoice-title">{this.props.movieStore.movie.title}</div>
                                {this.props.movieStore.director != null ? (
                                    <Director directors={this.props.movieStore.director} />
                                ) : null}
                                <div class="invoice-price">{latinToPersian("هزینه نهایی : " + this.props.movieStore.movie.price + "تومان")}</div>
                                <div style={{ direction: "rtl" }}>مابقی هزینه ها بر عهده ودیو می باشد.</div>
                            </div>
                        </div>
                        <div class="invoice-purchase">
                            <button class="invoice-purchase-btn" onClick={this.purchase.bind(this)}>
                                <img src={portalImage} style={{
                                    width: '20px',
                                    marginTop: '2px',
                                    marginLeft: '5px'
                                }} />
                                <span style={{ width: '165px' }}>
                                    پرداخت از طریق درگاه بانکی</span></button></div>
                    </div>
                </div>
            </div>;
        } else { return <div></div> }
    }
}

var Director = React.createClass({
    render() {
        return (
            <div class="movie-main-content-detail-lineheight" style={{ marginTop: "4px" }}>
                <div className="inline-class" style={{ color: "black", fontFamily: "irsans", fontSize: "14px" }}>کارگردان : </div>
                {this.props.directors.agents.map((director, l) => (
                    <div className="inline-class" key={director.id} >
                        <div
                            className="inline-class r-disable"
                            style={{ color: "black", fontFamily: "irsans", fontSize: "14px" }}
                            to={{ pathname: "/agent/" + director.id + "/" + urlCorrection(director.name) }}
                        >
                            {director.name}
                        </div>
                        {this.props.directors.agents.length - 1 != l ? (
                            <p className="inline-class"> , </p>
                        ) : null}
                    </div>
                ))}
            </div >
        );
    }
});
