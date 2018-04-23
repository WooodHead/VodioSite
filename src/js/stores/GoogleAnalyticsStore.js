import ReactGA from 'react-ga';
import { action, observable } from "mobx";

ReactGA.initialize('UA-115308409-1');

class GoogleAnalyticsStore {

    @action
    addEvent(category, action, label, value) {
        if (value == null) {
            ReactGA.event({
                category: category,
                action: action,
                label: label
            });
        } else {
            ReactGA.event({
                category: category,
                action: action,
                label: label,
                value: value
            });
        }
    }

    @action
    addPageView(page) {
        ReactGA.ga('send', 'pageview', page);
    }

    @action
    addEtranction() {
        ReactGA.Plugin.require('ec');
    }

    @action
    addTransaction(movieName, price, transactionId) {
        price = price / 1000
        ReactGA.plugin.require('ecommerce');
        ReactGA.plugin.execute(
            'ecommerce',
            'addItem',
            {
                'id': transactionId,
                'name': movieName,
                'sku': '',
                'category': "فیلم",
                'price': price,
                'quantity': '1'
            }
        ); ReactGA.plugin.execute(
            'ecommerce',
            'addTransaction',
            {
                'id': transactionId,
                'affiliation': 'Pay.ir',
                'revenue': price
            }
        );

        ReactGA.plugin.execute('ecommerce', 'send');
        ReactGA.plugin.execute('ecommerce', 'clear');
    }
}

var googleAnalyticsStore = new GoogleAnalyticsStore();

export default googleAnalyticsStore;
