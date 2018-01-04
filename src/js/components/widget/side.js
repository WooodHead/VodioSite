import React, { Component } from 'react';

export default class Side extends React.Component {
  render() {
    return (
      <div className="widget-left">
        <div className="widget-ad">
          <a href="#">
            <img src="images/Best-Anim.png" alt="بهترین انیمیشن ها" />
          </a>
        </div>
        <div className="widget-box-office">
          <div className="widget-box-office-header">
            <strong className="widget-box-office-title">باکس‌آفیس</strong>
            <span className="widget-box-office-date">
              آخرين بروز رساني : ۱۷ اردیبهشت ۱۳۹۶{" "}
            </span>
          </div>
          <div className="widget-box-office-moviez">
            <a href="#" className="widget-box-office-movie">
              <div className="widget-box-office-movie-image">
                <img src="images/top-movez-04.jpg" alt="movie name" />
                <div className="widget-box-office-movie-image-top-layer">
                  <span className="icon-play-1" />
                </div>
              </div>
              <div className="widget-box-office-movie-meta">
                <strong className="widget-box-office-movie-meta-title">
                  قسمت ۷ سریال عاشقانه
                </strong>
                <p className="widget-box-office-movie-meta-gener">فصل اول</p>
                <span className="widget-box-office-movie-meta-score">۹.۳</span>
                <p className="widget-box-office-movie-meta-value">۲۰۰۰ تومان</p>
              </div>
            </a>
            <a href="#" className="widget-box-office-movie">
              <div className="widget-box-office-movie-image">
                <img src="images/top-movez-02.jpg" alt="movie name" />
                <div className="widget-box-office-movie-image-top-layer">
                  <span className="icon-play-1" />
                </div>
              </div>
              <div className="widget-box-office-movie-meta">
                <strong className="widget-box-office-movie-meta-title">
                  مجموعه خندوانه
                </strong>
                <p className="widget-box-office-movie-meta-gener">فصل اول</p>
                <span className="widget-box-office-movie-meta-score">۸.۳</span>
                <p className="widget-box-office-movie-meta-value">
                  ۲۰.۰۰۰ تومان
                </p>
              </div>
            </a>
            <a href="#" className="widget-box-office-movie">
              <div className="widget-box-office-movie-image">
                <img src="images/top-movez-07.jpg" alt="movie name" />
                <div className="widget-box-office-movie-image-top-layer">
                  <span className="icon-play-1" />
                </div>
              </div>
              <div className="widget-box-office-movie-meta">
                <strong className="widget-box-office-movie-meta-title">
                  قسمت ۱ سریال عالیجناب
                </strong>
                <p className="widget-box-office-movie-meta-gener">فصل اول</p>
                <span className="widget-box-office-movie-meta-score">۸.۶</span>
                <p className="widget-box-office-movie-meta-value">۳۰۰۰ تومان</p>
              </div>
            </a>
            <a href="#" className="widget-box-office-movie">
              <div className="widget-box-office-movie-image">
                <img src="images/top-movez-06.jpg" alt="movie name" />
                <div className="widget-box-office-movie-image-top-layer">
                  <span className="icon-play-1" />
                </div>
              </div>
              <div className="widget-box-office-movie-meta">
                <strong className="widget-box-office-movie-meta-title">
                  خرید فیلم سینمایی ویلایی ها
                </strong>
                <p className="widget-box-office-movie-meta-gener">فصل اول</p>
                <span className="widget-box-office-movie-meta-score">۸.۶</span>
                <p className="widget-box-office-movie-meta-value">۳۰۰۰ تومان</p>
              </div>
            </a>
          </div>
          <a href="#" className="widget-box-office-see-more">
            اطلاعات کامل باکس آفیس{" "}
            <span className="icon-arrow-pointing-to-left" />
          </a>
        </div>
        <div className="widget">
          <div className="widget-header" />
          <strong className="widget-header-title">
            آخرین فیلم ها و سریال ها
          </strong>
          <div className="widget-content">
            <a href="#" className="widget-movie">
              <div className="widget-movie-cover">
                <img src="images/top-movez-03.jpg" alt="movie name" />
                <div className="widget-movie-cover-top-layer" />
              </div>
              <div className="widget-movie-content">
                <strong className="widget-movie-content-title">
                  قسمت ۱ فصل دوم سریال شهرزاد
                </strong>
                <div className="widget-movie-content-meta">
                  <span className="widget-movie-content-meta-score">۶.۱</span>
                  <span className="widget-movie-content-meta-quality">
                    {" "}
                    - <span className="blue">۷۲۰p</span>
                  </span>
                </div>
                <strong className="widget-movie-content-price">
                  ۱۵,۰۰۰ تومان
                </strong>
              </div>
            </a>
            <a href="#" className="widget-movie">
              <div className="widget-movie-cover">
                <img src="images/top-movez-07.jpg" alt="movie name" />
                <div className="widget-movie-cover-top-layer" />
              </div>
              <div className="widget-movie-content">
                <strong className="widget-movie-content-title">
                  قسمت ۱ سریال عالیجناب
                </strong>
                <div className="widget-movie-content-meta">
                  <span className="widget-movie-content-meta-score">۸.۷</span>
                  <span className="widget-movie-content-meta-quality">
                    {" "}
                    - <span className="red">HDRipe</span>
                  </span>
                </div>
                <strong className="widget-movie-content-price">
                  ۱۵,۰۰۰ تومان
                </strong>
              </div>
            </a>
            <a href="#" className="widget-movie">
              <div className="widget-movie-cover">
                <img src="images/top-movez-05.jpg" alt="movie name" />
                <div className="widget-movie-cover-top-layer" />
              </div>
              <div className="widget-movie-content">
                <strong className="widget-movie-content-title">
                  خرید فیلم سینمایی گشت ۲
                </strong>
                <div className="widget-movie-content-meta">
                  <span className="widget-movie-content-meta-score">۸.۷</span>
                  <span className="widget-movie-content-meta-quality">
                    {" "}
                    - <span className="red">HDRipe</span>
                  </span>
                </div>
                <strong className="widget-movie-content-price">
                  ۱۵,۰۰۰ تومان
                </strong>
              </div>
            </a>
            <a href="#" className="widget-movie">
              <div className="widget-movie-cover">
                <img src="images/top-movez-02.jpg" alt="movie name" />
                <div className="widget-movie-cover-top-layer" />
              </div>
              <div className="widget-movie-content">
                <strong className="widget-movie-content-title">
                  خرید مجموعه خندوانه
                </strong>
                <div className="widget-movie-content-meta">
                  <span className="widget-movie-content-meta-score">۹.۵</span>
                  <span className="widget-movie-content-meta-quality">
                    {" "}
                    - <span className="green">۱۰۸۰p</span>
                  </span>
                </div>
                <strong className="widget-movie-content-price">
                  ۱۵,۰۰۰ تومان
                </strong>
              </div>
            </a>
            <a href="#" className="widget-movie">
              <div className="widget-movie-cover">
                <img src="images/top-movez-06.jpg" alt="movie name" />
                <div className="widget-movie-cover-top-layer" />
              </div>
              <div className="widget-movie-content">
                <strong className="widget-movie-content-title">
                  خرید فیلم سینمایی ویلایی ها
                </strong>
                <div className="widget-movie-content-meta">
                  <span className="widget-movie-content-meta-score">۹.۵</span>
                  <span className="widget-movie-content-meta-quality">
                    {" "}
                    - <span className="green">۱۰۸۰p</span>
                  </span>
                </div>
                <strong className="widget-movie-content-price">
                  ۱۵,۰۰۰ تومان
                </strong>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
