import React, { Component } from 'react';
import './Watches.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

class Watches extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            city: props.data.city,
            offset: props.data.offset,
            id: props.data.id
         }
    }
    onDelete = (id) => {
        this.props.data.handleDelete(id)
    }

    componentDidMount() {    
        let {offset, id} = this.state;
        if (offset.substring(0,1) === "-") {
            offset = -1 * offset.substring(1,)
        } else if (offset.substring(0,1) === "+") {
            offset = +offset.substring(1,)
        } else {
            offset = +offset
        }

        const deg = 6;
        const hr = document.querySelector(`#clock_${id} #hr`);
        const mn = document.querySelector(`#clock_${id} #mn`);
        const sc = document.querySelector(`#clock_${id} #sc`);
        const clocksBlock = document.querySelector(`#container_${id}`);
        this.interval = setInterval(() => {
            const now = new Date();
            const localTime = now.getTime();
            const localOffset = now.getTimezoneOffset() * 60 * 1000;
            const utcTime = localTime + localOffset;
            const timeClock = new Date(utcTime + Number(offset)*1000*3600);
            let hh = timeClock.getHours() * 30;
            let mm = timeClock.getMinutes() * deg;
            let ss = timeClock.getSeconds() * deg;
        
            hr.style.transform = `rotateZ(${(hh) + (mm/12)}deg)`;
            mn.style.transform = `rotateZ(${mm}deg)`;
            sc.style.transform = `rotateZ(${ss}deg)`;
        }, 500)
        
        this.timeout = setTimeout(() => {
            clocksBlock.style.opacity = '1';
        }, 500)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        clearInterval(this.timeout)
    }

    render() {  
        const {id, city} = this.state;     
        return (
            <div className="digital-clocks-container" id={`container_${id}`}>
                <div className="digital-clocks-city">{city}</div>
                <div className="digital-clocks-closer" onClick={()=> this.onDelete(id)}>
                    <FontAwesomeIcon icon={faTimesCircle} />
                </div>
                <div className="clocks" id={`clock_${id}`}>
                    <div className="hour">
                        <div className="hr" id="hr"></div>
                    </div>
                    <div className="min">
                        <div className="mn" id="mn"></div>
                    </div>
                    <div className="sec">
                        <div className="sc" id="sc"></div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Watches;