import React,{lazy} from 'react';
import Home from './Home/Home'
import Calculator from './Calculator'
import LeafletMap from './map/LeafletMap'





const Routes =[
  {
    path: '/',
    sidebarName: 'Home',
    component: Home
  },
   {
    path: '/Map',
    sidebarName: 'Go Somewhere',
    component: LeafletMap
  },
 {
    path: '/Calculator',
    sidebarName: 'Calculator',
    component: Calculator
  },

  
  
]

export default Routes;