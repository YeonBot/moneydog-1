import React, { Component, PropTypes } from 'react';
import youtube from '../../static/img/youtube.png';

import './List.css';

class List extends Component {
    constructor(props) {
    super(props);
  }
  render() {
      console.log(youtube);
    return(
     <div>
       <div className='row img-back'>
         <div className='col-2'>
           <h2>8일</h2>
         </div>
         <div className='img-border'>
           <img className="line-Img" src={youtube}
                alt="First slide"/>
         </div>
       </div>
      </div>
    );
  }
}

export default List;
