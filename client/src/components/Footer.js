import React from 'react';
import {Divider} from 'antd';
import '../pages/main.css';

function Footer(props) {
    return(
        <Divider orientation="center" style={{borderWidth:2, borderColor: '#593e34' }} plain>
            <h2>Le Sillage</h2>
        </Divider>
    )
}

export default Footer;