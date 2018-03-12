import ReactGA from 'react-ga';
import { action, observable } from "mobx";

ReactGA.initialize('UA-115308409-1');

class GoogleAnalyticsStore {

    @action
    addEvent(category, action, label, value) {
        ReactGA.event({
            category: category,
            action: action,
            label: label,
            value: value,
        });
    }

    @action
    addPageView(page) {
        ReactGA.ga('send', 'pageview', page);
    }
}

var googleAnalyticsStore = new GoogleAnalyticsStore();

export default googleAnalyticsStore;
