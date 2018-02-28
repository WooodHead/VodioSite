import React from "react";
import { inject, observer } from "mobx-react";
import { MainUrl } from "../../util/RequestHandler";
import { latinToPersian, convertSecondToString } from "../../util/util";
var moment = require("moment-jalaali");

@inject("session")
@observer
export default class Factors extends React.Component {
  constructor() {
    super();
    this.state = { factors: null };
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      headers: {
        token: this.props.session.session
      },
      url: MainUrl + "/factors.ashx",
      success: function(data, textStatus, request) {
        this.setState({
          factors: data.data
        });
      }.bind(this),
      error: function(request, textStatus, errorThrown) {}.bind(this)
    });
  }

  convertMilToDate(mil) {
    var date = new Date(mil);

    var m = moment(
      date.getUTCFullYear() +
        "/" +
        (date.getUTCMonth() + 1) +
        "/" +
        date.getUTCDate(),
      "YYYY/M/D"
    );

    var month = "";
    switch (m.jMonth()) {
      case 0:
        month = "فروردین";
        break;
      case 1:
        month = "اردیبهشت";
        break;
      case 2:
        month = "خرداد";
        break;
      case 3:
        month = "تیر";
        break;
      case 4:
        month = "مرداد";
        break;
      case 5:
        month = "شهریور";
        break;
      case 6:
        month = "مهر";
        break;
      case 7:
        month = "آبان";
        break;
      case 8:
        month = "آذر";
        break;
      case 9:
        month = "دی";
        break;
      case 10:
        month = "بهمن";
        break;
      case 11:
        month = "اسفند";
        break;
      default:
        break;
    }

    return latinToPersian(m.jDate() + " " + month + " " + m.jYear());
  }

  render() {
    if (this.state.factors == null) {
      return <div />;
    } else {
      var elements = null;
      var width = $(window).width();
      if (width > 740) {
        elements = this.state.factors.map(
          function(element, l) {
            return (
              <tr key={l} style={{ borderBottom: "1px solid lightgray" }}>
                <td style={{ textAlign: "center", padding: "10px 0px" }}>
                  {element.id}
                </td>
                <td style={{ textAlign: "center", padding: "10px 0px" }}>
                  {element.movieName}
                </td>
                <td style={{ textAlign: "center", padding: "10px 0px" }}>
                  {this.convertMilToDate(element.date)}
                </td>
                {/* <td style={{ textAlign: "center",padding:'10px 0px'}}>{element.amount}</td> */}
                <td style={{ textAlign: "center", padding: "10px 0px" }}>
                  {latinToPersian("1000 تومان")}
                </td>
                <td style={{ textAlign: "center", padding: "10px 0px" }}>
                  {element.success ? "موفق" : "ناموفق"}
                </td>
              </tr>
            );
          }.bind(this)
        );
      } else {
        elements = this.state.factors.map(
          function(element, l) {
            return (
              <tr
                key={l}
                style={{
                  borderRadius: "5px"
                }}
              >
                <td>
                  <table
                    style={{
                      width: "calc(100% - 10px)",
                      padding: "20px",
                      borderRadius: "5px",
                      border: "1px solid lightgray",
                      margin: "5px"
                    }}
                  >
                    <tbody>
                      <tr>
                        <td>شناسه</td>
                        <td style={{ textAlign: "left" }}>{element.id}</td>
                      </tr>
                      <tr>
                        <td>نام فیلم</td>
                        <td style={{ textAlign: "left" }}>
                          {element.movieName}
                        </td>
                      </tr>
                      <tr>
                        <td>تاریخ</td>
                        <td style={{ textAlign: "left" }}>
                          {this.convertMilToDate(element.date)}
                        </td>
                      </tr>
                      <tr>
                        <td>مبلغ</td>
                        <td style={{ textAlign: "left" }}>
                          {latinToPersian("1000 تومان")}
                        </td>
                      </tr>
                      <tr>
                        <td>وضعیت خرید</td>
                        <td style={{ textAlign: "left" }}>
                          {element.success ? "موفق" : "ناموفق"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          }.bind(this)
        );
      }

      if (width > 740) {
        return (
          <table
            style={{
              width: "calc(100% - 120px)",
              margin: "10px 60px",
              borderCollapse: "collapse"
            }}
          >
            <thead>
              <tr style={{ borderBottom: "1px solid lightgray" }}>
                <th
                  style={{
                    textAlign: "center",
                    width: "10%",
                    padding: "10px 0px"
                  }}
                >
                  شناسه
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "30%",
                    padding: "10px 0px"
                  }}
                >
                  نام فیلم
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "20%",
                    padding: "10px 0px"
                  }}
                >
                  تاریخ
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "15%",
                    padding: "10px 0px"
                  }}
                >
                  مبلغ
                </th>
                <th
                  style={{
                    textAlign: "center",
                    width: "15%",
                    padding: "10px 0px"
                  }}
                >
                  وضعیت خرید
                </th>
              </tr>
            </thead>
            <tbody>{elements}</tbody>
          </table>
        );
      } else {
        return (
          <table
            style={{
              margin: "0px 20px",
              width: "calc(100% - 40px)",
              borderCollapse: "collapse"
            }}
          >
            <tbody>{elements}</tbody>
          </table>
        );
      }
    }
  }
}
