import React from "react";
import vodioChistImage from '../../../img/Cinema-Vodio.png';
import vodioLogo from '../../../img/Vodio-chist.svg';
import { inject, observer } from "mobx-react";

@inject("gaStore")
@observer
export default class Vodio extends React.Component {
  componentDidMount() {
    this.props.gaStore.addPageView("/vodio");
    window.scrollTo(0, 0);
    $(".content-holder").css("background", "#1c1c1c");
  }
  componentWillUnmount() {
    $(".content-holder").css("background", "white");
  }
  render() {
    return (
      <div class="vodio-container" style={{
        paddingTop: '0px', color: 'white', width: '1000px',
        marginLeft: 'calc(50% - 500px)'
      }}>
        <img src={vodioChistImage} style={{
          width: '500px',
          marginRight: 'calc(50% - 250px)',
          display: 'flex'
        }
        } />
        <div
          style={{
            fontFamily: "IRsansBold",
            fontSize: "19px",
            display: "inline-flex"
          }}
        >
          <img src={vodioLogo} style={{
            width: '25px',
            height: '30px',
            marginLeft: '5px'
          }} />
          ودیو چیست؟
          </div>
        <div
          style={{
            marginTop: "20px",
            fontSize: "13px",
            lineHeight: '1.8'
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
            fontSize: "13px"
          }}
        >ودیو سامانه فروش قانونی  و رسانه ویدیو درخواستی فیلم های کوتاه، مستند، بلند، تئاتر، انیمیشن است.</div>
        <div
          style={{
            marginTop: "10px",
            textAlign: "left",
            fontSize: "12px",
            fontFamily: "irsansbold",
            marginBottom: '100px'
          }}
        >
          ودیو حامی سینمای مستقل ایران
          </div>
      </ div>
    );
  }
}
