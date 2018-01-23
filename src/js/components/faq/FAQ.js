import React from "react";

export default class FAQ extends React.Component {
  render() {
    return (
      <div class="content-container max-width faq">
        <h2 style={{ color: "#eb0089" }}>پرسش های متداول : </h2>
        <br />
        <h3 class="faq-question-title">
          نحوه ثبت‌نام در وب‌سایت ودیو چگونه است؟
        </h3>
        <p class="faq-answer">
          برای تهیه اشتراک در وب‌سایت ودیو ابتدا باید در این سایت ثبت‌نام کنید.
          به منظور ثبت‌نام و ایجاد حساب کاربری در مرحله اول به قسمت «ثبت‌نام»
          مراجعه کرده و در ادامه نسبت به ورود اطلاعات کاربری خود اعم از نام
          کاربری، رمز عبور، پست الکترونیکی و شماره تماس اقدام کنید.
        </p>
        <br />
        <h3 class="faq-question-title">
          مبلغ فیلم را پرداخت کرده‌ام، با این حال دسترسی من به فیلم ایجاده نشده
          است ، راه حل چیست؟
        </h3>
        <p class="faq-answer">
          در صورت بروز چنین مشکلی مبلغ پرداخت شده نهایتا تا 72 ساعت پس از واریز
          به حساب بانکی شما بازخواهد گشت. درغیر این صورت تصویری(اسکرین شات) از
          رسید پرداخت یا شماره ارجاع پرداخت و نام کاربری خود به ایمیل
          support@vodio.ir ارسال نمایید تا همکاران ما مشکل را پیگیری کرده و شما
          را از نتیجه مطلع نمایند.
        </p>
        <br />
        <h3 class="faq-question-title">روش دانلود فیلم‌ها چگونه است؟</h3>
        <p class="faq-answer">
          با خرید هر فیلم شما به دانلود فیلم ها دسترسی خواهید داشت .
        </p>
        <div
          style={{
            padding: "10px",
            paddingTop: "80px"
          }}
        >
          <h3 style={{ color: "#eb0089" }}>پاسخ خود را پیدا نکردید؟</h3>
          <p
            style={{
              margin: "20px",
              marginTop: "20px"
            }}
          >
            سوال خود را برای ما ارسال کنید.
          </p>
          <input
            type="email"
            class="faq-question-email"
            placeholder="ایمیل خود را وارد کنید"
          />
          <br />
          <textarea
           class="faq-question-text"
            cols="43"
            rows="5"
            placeholder="سوال خود را بنویسید"
          />
          <br />
          <button class="faq-send-button">ارسال</button>
        </div>
      </div>
    );
  }
}
