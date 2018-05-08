import React from 'react';
import { inject, observer } from "mobx-react";

@inject("gaStore")
@observer
export default class Rules extends React.Component {
    componentDidMount() {
        this.props.gaStore.addPageView("/rules");

        window.scrollTo(0, 0);
    }

    render() {
        return <div class="vodio-container">404</div>
    }
}