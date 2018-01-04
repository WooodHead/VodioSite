import React, { Component } from 'react';

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
                <a href="#">سوالات متداول</a>
              </li>
              <li>
                <a href="#">سوالات متداول</a>
              </li>
              <li>
                <a href="#">تخفیف و ارسال رایگان</a>
              </li>
              <li>
                <a href="#">مناسب بندی‌ها</a>
              </li>
              <li>
                <a href="#">درباره ما</a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <strong className="footer-title">تماس‌با‌ما</strong>
            <div className="footer-contact-content">
              <p>آدرس: بندرعباس بلوار ساحلی پارک غدیر</p>
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
            <strong className="footer-title">فیلم نت در کامپیوتر شما</strong>
            <div className="footer-url-finder-download-content">
              برای راحتی و دریافت اخرین اخبار و تریلر و فیلم ها نرم افزار فیلم
              نت را دانلود و نصب کنید
            </div>
            <a href="#" className="footer-url-finder-download-btn">
              <span className="icon-download-cloud" />
              <strong>دریافت نرم افزار</strong>
            </a>
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
