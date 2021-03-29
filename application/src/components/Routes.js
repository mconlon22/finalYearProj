import React from 'react';
import Calculator from './Calculator'
import LeafletMap from './map/LeafletMap'
import Home from './Home/Home'



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