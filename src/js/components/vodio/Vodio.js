import React from "react";

export default class Vodio extends React.Component {
  componentDidMount() {
    $(".content-holder").css("background", "#dedede");
  }
  componentWillUnmount() {
    $(".content-holder").css("background", "white");
  }
  render() {
    return (
        <div class="vodio-container">
          <div
            style={{
              fontFamily: "IRsansBold",
              fontSize: "20px"
            }}
          >
            ودیو چیست؟
          </div>
          <div
            style={{
              marginTop: "20px",
              fontSize: "15px"
            }}
          >
            ودیو امکانیست برای تماشا، لذت و حمایت از فیلم‌های کوتاه، مستند و
            مستقل ایرانی. ودیو علاوه بر نشر و پخش این آثار، و ساخت برنامه‌ای
            مرتبط با این نوع سینما، بناست سالیانه در ساخت و مشارکت چندی از
            فیلم‌های کوتاه، مستند و مستقل ایرانی هم حمایت به عمل آورد. ودیو این
            امکان را برای تماشاگران این نوع از سینما مهیا می‌کند، که با خرید این
            آثار، مستقیم از صاحبان آن‌ها برای ساخت آثار بعدی و به نوعی ادامه‌ی
            حیات این نوع از سینما که همیشه مهجور واقع شده است حمایت به عمل
            آورند.
          </div>
          <div
            style={{
              marginTop: "20px",
              float: "left",
              fontSize: "13px",
              fontFamily: "irsansbold"
            }}
          >
            ودیو حامی سینمای مستقل ایران
          </div>
        </div>
    );
  }
}
