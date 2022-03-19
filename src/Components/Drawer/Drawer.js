import React, { useContext } from 'react';
import { MainContext } from '../../MainContext';
import { Home, DashboardOutlined} from '@mui/icons-material'
import './Drawer.css';

const Drawer = () => {
    const { drawerOpen } = useContext(MainContext)
    return (
        <div className='drawer'
            style={{
                width: !drawerOpen ? '0px' : '250px'
            }}>
            <div className="drawer__content"
            style={{
                opacity: !drawerOpen?0:1
            }}>
                <div className='drawer__content__item'>
                    <Home style={{fontSize:32, color:'#fff', marginRight:'30px'}}/>
                    <p className='drawer__content__item__header'>Home</p>
                </div>
                <div className='drawer__content__item'>
                    <DashboardOutlined style={{fontSize:32, color:'#fff', marginRight:'30px'}}/>
                    <p className='drawer__content__item__header'>Dashboard</p>
                </div>
            </div>
        </div>
    )
}

export default Drawer