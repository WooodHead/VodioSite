import React from "react";

import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Header from "./Header";
import Footer from "./Footer";
class Layout extends React.Component {
  
  componentDidMount() {
    var $w = $(window);
    var isFixed = true;
   
    const { cookies } = this.props;
 
    this.state = {
      session: cookies.get('session') || ''
    };
  }
  
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  cookies: instanceOf(Cookies).isRequired
};

export default withCookies(Layout);