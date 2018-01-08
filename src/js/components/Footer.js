import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends React.Component {
  render() {
    return (
      <footer id="footer">
        <a href="#body" id="#top-float" className="float-top-header">
          <span className="icon-angle-up" />
        </a>
        <div className="footer-content max-width">
          <div className="footer-links">
            <strong className="footer-title">لینک‌ها</strong>
            <ul>
              <li>
              <Link to={{ pathname: "/" }}>صفحه اصلی</Link>
              </li>
              <li>
              <Link to={{ pathname: "/vodio" }}>ودیو چیست؟</Link>
              </li>
              <li>
              <Link to={{ pathname: "/ContactUs" }}>تماس با ما</Link>
              </li>
              <li>
                <a href="#">پرسش های متداول</a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <strong className="footer-title">تماس‌با‌ما</strong>
            <div className="footer-contact-content">
              <p>خ یوسف اباد، بالاتر از میدان فرهنگ، پ 283، واحد 6</p>
              <p>تلفن: ۳۲۲۲۰۰۰۰ ۰۷۶</p>
              <p>ایمیل: Info@yourmail.com</p>
              <div className="footer-contact-content-socail">
                <a href="#" className="telegram">
                  <span className="icon-paper-plane-empty" />
                </a>
                <a href="#" className="instagram">
                  <span className="icon-instagram-1" />
                </a>
                <a href="#" className="twitter">
                  <span className="icon-twitter" />
                </a>
                <a href="#" className="facebook">
                  <span className="icon-facebook" />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-url-finder-download">
            <strong className="footer-title">
              © تمام حقوق این سایت متعلق به ودیو می باشد.
            </strong>
            <div className="footer-url-finder-download-content">
              تمامي كالاها و خدمات اين سایت، حسب مورد، داراي مجوزهاي لازم از
              مراجع مربوطه مي‌باشند.
            </div>
          </div>
          <div className="footer-news-letter">
            <strong className="footer-title">خبرنامه</strong>
            <div className="footer-news-letter-content">
              ما هر روزه برای شما آخرین فیلم و سریال های روز را در ایمیلتان
              ارسال میکنیم!
            </div>
            <form className="footer-news-letter-form">
              <div className="footer-news-letter-form-input-bg">
                <input
                  type="email"
                  className="text-input"
                  placeholder="ایمیل..."
                />
                <button type="submit" className="submit">
                  <span className="icon-paper-plane-empty" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </footer>
    );
  }
}
