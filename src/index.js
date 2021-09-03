  
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle';

import Home from './Home';
import Comics from './Comics';

ReactDOM.render(<>
<Home />
<Comics />
</>
, document.querySelector("#root"));