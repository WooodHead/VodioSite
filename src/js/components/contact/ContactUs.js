import React from "react";

export default class ContactUs extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);

    $(".content-holder").css("background", "#dedede");
  }
  componentWillUnmount() {
    $(".content-holder").css("background", "white");
  }
  render() {
    return (
      <div class="vodio-container">
        <p
          style={{
            margin: "30px 0px 30px 30px",
            fontSize: "14px"
          }}
        >
          با ارسال ایمیل به بخش مورد نظر خود می توانید با ودیو در تماس باشید.
        </p>
        <p
          style={{
            marginRight: "30px",
            fontSize: "14px"
          }}
        >
          پشتیبانی سایت : support [at] vodio [dot] ir
        </p>
        <p
          style={{
            marginRight: "30px",
            fontSize: "14px",
            marginTop: "10px"
          }}
        >
          پیشنهادات و انتقادات : info [at] vodio [dot] ir
        </p>
        <p
          style={{
            marginRight: "30px",
            fontSize: "14px",
            marginBottom: "30px",
            marginTop: "10px"
          }}
        >
          پیگیری پرداخت ها : payment [at] vodio [dot] ir
        </p>
      </div>
    );
  }
}
