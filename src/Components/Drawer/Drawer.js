import React, { useContext } from 'react';
import { MainContext } from '../../MainContext';
import './Drawer.css';

const Drawer = () => {
    const { drawerOpen } = useContext(MainContext)
    return (
        <div className='drawer'
            style={{
                width: !drawerOpen ? '0px' : '200px'
            }}>
            <div className="drawer__content"
            style={{
                opacity: !drawerOpen?0:1
            }}>
                Drawer
            </div>
        </div>
    )
}

export default Drawer