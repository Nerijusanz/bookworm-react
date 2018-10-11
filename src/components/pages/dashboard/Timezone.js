import React, { Component } from 'react';
import map from 'lodash/map';

import timezones from '../../common/timezones';



class Timezone extends Component {

    state={
        data:{
            timezone:''
        }
    }

    onChangeInput = e => {

        e.preventDefault();
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        });

    }



  render() {

    const timezone = this.state.data.timezone;
   
    // note: "map" lodash function!!!
    const timezoneOpt = map(timezones,(val,key)=>(
        <option key={key} value={val}>{val}</option>
    )

    

);

    return (

      <div>
        <p>time zone: {timezone}</p>

        <select name="timezone" value={this.state.data.timezone} className="ui dropdown" onChange={this.onChangeInput}>
            <option value="">choose time zone</option>
            {timezoneOpt}
        </select>
      </div>
    )
  }
}

export default Timezone;

