(this.webpackJsonpreactleaflet=this.webpackJsonpreactleaflet||[]).push([[0],{127:function(e,t,a){},128:function(e,t,a){},161:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a(0),i=a.n(s),o=a(13),r=a.n(o),c=(a(127),a.p,a(128),a(23)),l=a(24),d=a(35),j=a(34),h=a(221),u=a(253),b=a(254),m=a(234),p=a(235),g=(a(129),a(76)),x=a(3),O=a.n(x),f=(a(130),a(25)),v=function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"createLeafletElement",value:function(){if(console.log("this.props.to"),console.log(this.props.to),!isNaN(this.props.to.lat)&&!isNaN(this.props.from.lat)){var e=this.props.map,t=this.props.to,a=this.props.from;return console.log("type"),console.log(parseFloat(t.lat),53.30001),O.a.Routing.control({waypoints:[O.a.latLng(t.lat,t.lng),O.a.latLng(a.lat,a.lng)],lineOptions:{styles:[{color:"blue",opacity:.6,weight:4}]},addWaypoints:!1,draggableWaypoints:!1,fitSelectedRoutes:!1,showAlternatives:!1}).addTo(e.leafletElement).getPlan()}}}]),a}(g.a),C=(Object(f.b)(v),a(133),a(222)),S=(a(91),a(92),O.a.icon({iconSize:[25,41],iconAnchor:[10,41],popupAnchor:[2,-40],iconUrl:"https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"}));Object(f.b)((function(e){var t=e.map.map;return Object(s.useEffect)((function(){var e=O.a.Control.Geocoder.nominatim();if("undefined"!==typeof URLSearchParams&&window.location.search){var a=new URLSearchParams(window.location.search).get("geocoder");a&&O.a.Control.Geocoder[a]?e=O.a.Control.Geocoder[a]():a&&console.warn("Unsupported geocoder",a)}O.a.Control.geocoder({query:"",placeholder:"Search here...",defaultMarkGeocode:!1,geocoder:e}).on("markgeocode",(function(e){var a=e.geocode.center;O.a.marker(a,{icon:S}).addTo(t).bindPopup(e.geocode.name).openPopup(),t.fitBounds(e.geocode.bbox)})).addTo(t)}),[]),null}));var y=a(39),w=a(65),k=a(20),D=a.n(k),N=a(226),R=a(227),_=a(229),P=a(233),A=a(232),T=a(228),F=a(230),I=a(231),L=a(115),B=null,G=!1;function H(e){var t=function(){for(var e=0,t=0;t<B.features.length;t++)B.features[t].properties.P14_100k>e&&(e=B.features[t].properties.P14_100k);return e}(),a=function(){for(var e=1e3,t=0;t<B.features.length;t++)B.features[t].properties.P14_100k<e&&(e=B.features[t].properties.P14_100k);return e}(),n=(e-a)/(t-a)*100;return e>t&&(n=100),n}var M=function(e){var t,a,n=100-H(e);return n<50?(t=255,a=Math.round(5.1*n)):(a=255,t=Math.round(510-5.1*n)),"#"+("000000"+(65536*t+256*a+0).toString(16)).slice(-6)};function U(e,t){t.setStyle({fillColor:M(e.properties.P14_100k)}),t.bindPopup('<table class="table">\n        <thead>\n          <tr>\n            <th scope="col">Title</th>\n            <th scope="col">Value</th>\n          </tr>\n        </thead>\n        <tr>\n      <th scope="row">county</th>\n      <td>'.concat(e.properties.COUNTY,'</td>\n   \n    </tr>\n    <tr>\n      <th scope="row">population</th>\n      <td>').concat(e.properties.Pop2016,'</td>\n   \n    </tr>\n    <tr>\n      <th scope="row">Cases per 100k in the last 14 days</th>\n      <td>').concat(e.properties.P14_100k,"</td>\n   \n    </tr>\n"))}var E={fillColor:"blue"},V=function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={zoom:7,isMapInit:!1,from:{lat:null,lng:null},to:{lat:null,lng:null},routeData:null,routeCovidData:null},e.getRoutingData=function(){var t=[],a=[],n=[],s={params:{fromlat:e.state.from.lat,fromlon:e.state.from.lng,tolat:e.state.to.lat,tolon:e.state.to.lng}};D.a.get("http://178.62.61.92:3101/getSafestRoute",s).then((function(s){s.data.map((function(e){a.push(JSON.parse(e)),console.log(JSON.parse(e))}));var i=[];console.log(a.length);for(var o=0;o<a.length;o++){console.log(a[o]),i.push(a[o][0].LocNames);for(var r=1;r<a[o][0].latlons.length-1;r++){var c=a[o][0].latlons[r-1],l=a[o][0].latlons[r];t.push({from_lat:c.lat,from_long:c.lon,to_lat:l.lat,to_long:l.lon,id:a[o][0].latlons[r].id})}console.log("push",t),n.push(t)}console.log(n),e.setState({routeData:n}),e.setState({routeCovidData:i})}))},e.setAddressTo=function(t){Object(y.b)(t.label).then((function(e){return Object(y.c)(e[0])})).then((function(t){var a=t.lat,n=t.lng;null!=a&&null!=n&&e.setState({to:{lat:a,lng:n}},(function(){null!=e.state.from.lat&&e.getRoutingData()}))}))},e.setAddressFrom=function(t){Object(y.b)(t.label).then((function(e){return Object(y.c)(e[0])})).then((function(t){var a=t.lat,n=t.lng;null!=a&&null!=n&&e.setState({from:{lat:a,lng:n}},(function(){null!=e.state.to.lat&&e.getRoutingData()}))}))},e.saveMap=function(t){e.map=t,e.setState({isMapInit:!0})},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;D.a.get("https://opendata.arcgis.com/datasets/27d401c9ae084097bb1f3a69b69462a1_0.geojson").then((function(e){B=e.data,G=!0})),navigator.geolocation.getCurrentPosition((function(t){e.setState({lat:t.coords.latitude,lon:t.coords.longitude})}));this.map}},{key:"render",value:function(){return this.map,Object(n.jsxs)("div",{children:[Object(n.jsx)("br",{}),Object(n.jsxs)(C.a,{container:!0,spacing:1,children:[Object(n.jsxs)(C.a,{item:!0,sm:3,xs:12,spacing:1,children:[Object(n.jsx)(N.a,{children:Object(n.jsxs)(R.a,{children:[Object(n.jsx)(w.a,{children:"Route 1"}),Object(n.jsx)(T.a,{component:L.a,children:Object(n.jsxs)(_.a,{"aria-label":"simple table",children:[Object(n.jsx)(F.a,{children:Object(n.jsxs)(I.a,{children:[Object(n.jsx)(A.a,{children:"Location"}),Object(n.jsx)(A.a,{align:"right",children:"Covid Level Per 100k"})]})}),Object(n.jsx)(P.a,{})]})}),null!=this.state.routeCovidData?this.state.routeCovidData[0].map((function(e){return Object(n.jsxs)(I.a,{children:[Object(n.jsx)(A.a,{component:"th",scope:"row",children:e.ENGLISH}),Object(n.jsx)(A.a,{align:"right",children:e.P14_100k_T})]},e.ENGLISH)})):Object(n.jsx)("div",{})]})}),Object(n.jsx)(N.a,{children:Object(n.jsxs)(R.a,{children:[Object(n.jsx)(w.a,{children:"Route 2"}),Object(n.jsx)(T.a,{component:L.a,children:Object(n.jsxs)(_.a,{"aria-label":"simple table",children:[Object(n.jsx)(F.a,{children:Object(n.jsxs)(I.a,{children:[Object(n.jsx)(A.a,{children:"Location"}),Object(n.jsx)(A.a,{align:"right",children:"Covid Level Per 100k"})]})}),Object(n.jsx)(P.a,{})]})}),null!=this.state.routeCovidData?this.state.routeCovidData[1].map((function(e){return Object(n.jsxs)(I.a,{children:[Object(n.jsx)(A.a,{component:"th",scope:"row",children:e.ENGLISH}),Object(n.jsx)(A.a,{align:"right",children:e.P14_100k_T})]},e.ENGLISH)})):Object(n.jsx)("div",{})]})})]}),Object(n.jsxs)(C.a,{item:!0,sm:9,xs:12,spacing:1,children:[Object(n.jsx)(C.a,{item:!0,sm:2,xs:12,spacing:1,children:Object(n.jsx)(w.a,{variant:"h6",component:"h2",justify:"flex-end",children:"From"})}),Object(n.jsx)(y.a,{apiKey:"AIzaSyDp3YVDuLumOSd_jdEUxeDkN4g1fkWR9Vk",selectProps:{onChange:this.setAddressFrom}}),Object(n.jsx)(C.a,{item:!0,sm:2,xs:12,spacing:1,children:Object(n.jsx)(w.a,{variant:"h6",component:"h2",justify:"flex-end",children:"To"})}),Object(n.jsx)(y.a,{apiKey:"AIzaSyDp3YVDuLumOSd_jdEUxeDkN4g1fkWR9Vk",selectProps:{onChange:this.setAddressTo}}),Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),Object(n.jsxs)(u.a,{className:"map",center:[53.305,-7.177],zoom:8,ref:this.saveMap,scrollWheelZoom:!0,children:[Object(n.jsx)(b.a,{attribution:'\xa9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),Object(n.jsx)(m.a,{center:null!=this.state.lat?[this.state.lat,this.state.lon]:[53.305,-7.177],pathOptions:E,radius:5e3}),G?Object(n.jsx)(h.a,{data:B,color:"red",fillColor:"green",weight:1,onEachFeature:U}):Object(n.jsx)("div",{}),null!=this.state.routeData?this.state.routeData[0].map((function(e){var t=e.id,a=e.from_lat,s=e.from_long,i=e.to_lat,o=e.to_long;return Object(n.jsx)(p.a,{positions:[[a,s],[i,o]],color:"blue"},t)})):Object(n.jsx)("div",{}),null!=this.state.routeData?this.state.routeData[1].map((function(e){var t=e.id,a=e.from_lat,s=e.from_long,i=e.to_lat,o=e.to_long;return Object(n.jsx)(p.a,{positions:[[a,s],[i,o]],color:"blue"},t)})):Object(n.jsx)("div",{})]})]})]})]})}}]),a}(s.Component),W=a(28),q=a(236),z=a(255),Y=a(240),J=a(237),K=a(249),Q=a(238),Z=a(241),X=a(242),$=a(15),ee=Object(q.a)((function(e){return{formControl:{margin:e.spacing(1),minWidth:120},selectEmpty:{marginTop:e.spacing(2)},button:{marginTop:e.spacing(2),padding:"0 30px",height:60}}})),te=function(){var e=Object($.f)();var t=ee(),a=i.a.useState(""),s=Object(W.a)(a,2),o=s[0],r=s[1],c=i.a.useState(!1),l=Object(W.a)(c,2),d=l[0],j=(l[1],i.a.useState("")),h=Object(W.a)(j,2),u=h[0],b=h[1],m=i.a.useState(""),p=Object(W.a)(m,2),g=p[0],x=p[1],O=i.a.useState(""),f=Object(W.a)(O,2),v=f[0],S=f[1],y=i.a.useState(""),k=Object(W.a)(y,2),N=k[0],R=k[1],_=i.a.useState(""),P=Object(W.a)(_,2),A=P[0],T=P[1];return d?Object(n.jsx)($.a,{to:"/Map"}):Object(n.jsxs)("div",{children:[Object(n.jsx)("br",{}),Object(n.jsx)(w.a,{variant:"h2",component:"h2",children:"Covid Risk Calculator"}),Object(n.jsx)(w.a,{variant:"body1",component:"h2",children:"This was developed as part of my final year project. The source code is available "}),Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),Object(n.jsxs)(C.a,{container:!0,spacing:1,children:[Object(n.jsx)(C.a,{item:!0,sm:3,xs:0,spacing:1}),Object(n.jsx)(C.a,{item:!0,xs:3,spacing:3,sm:3,children:Object(n.jsx)(w.a,{variant:"body1",component:"h2",children:" What age are you"})}),Object(n.jsx)(C.a,{item:!0,xs:8,sm:6,children:Object(n.jsxs)(J.a,{variant:"filled",className:t.formControl,children:[Object(n.jsx)(z.a,{id:"demo-simple-select-filled-label",children:"Age"}),Object(n.jsxs)(K.a,{labelId:"demo-simple-select-filled-label",id:"demo-simple-select-filled",value:o,onChange:function(e){r(e.target.value)},children:[Object(n.jsx)(Y.a,{value:20,children:"18\u201339"}),Object(n.jsx)(Y.a,{value:45,children:"40\u201349"}),Object(n.jsx)(Y.a,{value:55,children:"50\u201359"}),Object(n.jsx)(Y.a,{value:65,children:"60\u201369"}),Object(n.jsx)(Y.a,{value:75,children:"70\u201379"}),Object(n.jsx)(Y.a,{value:85,children:"80+"})]})]})}),Object(n.jsx)(C.a,{item:!0,sm:3,xs:0,spacing:1}),Object(n.jsxs)(C.a,{item:!0,xs:3,spacing:3,sm:3,children:["             ",Object(n.jsx)(w.a,{variant:"body1",component:"h2",children:" What gender are you"})]}),Object(n.jsx)(C.a,{item:!0,xs:8,sm:6,children:Object(n.jsxs)(J.a,{variant:"filled",className:t.formControl,children:[Object(n.jsx)(z.a,{id:"demo-simple-select-filled-label",children:"Gender"}),Object(n.jsxs)(K.a,{labelId:"demo-simple-select-filled-label",id:"demo-simple-select-filled",value:u,onChange:function(e){b(e.target.value)},children:[Object(n.jsx)(Y.a,{value:"male",children:"Male"}),Object(n.jsx)(Y.a,{value:"female",children:"Female"})]})]})}),Object(n.jsx)(C.a,{item:!0,sm:3,xs:0,spacing:1}),Object(n.jsxs)(C.a,{item:!0,xs:3,spacing:3,sm:3,children:["             ",Object(n.jsx)(w.a,{variant:"body1",component:"h2",children:" What weight are you"})]}),Object(n.jsx)(C.a,{item:!0,xs:8,sm:6,children:Object(n.jsxs)(J.a,{variant:"filled",className:t.formControl,children:[Object(n.jsx)(z.a,{id:"demo-simple-select-filled-label",children:"Weight"}),Object(n.jsx)(Q.a,{id:"standard-adornment-weight",value:v,onChange:function(e){S(e.target.value)},endAdornment:Object(n.jsx)(Z.a,{position:"end",children:"Kg"}),"aria-describedby":"standard-weight-helper-text",inputProps:{"aria-label":"weight"}})]})}),Object(n.jsx)(C.a,{item:!0,sm:3,xs:0,spacing:1}),Object(n.jsxs)(C.a,{item:!0,xs:3,spacing:3,sm:3,children:["             ",Object(n.jsx)(w.a,{variant:"body1",component:"h2",children:" What height are you"})]}),Object(n.jsx)(C.a,{item:!0,xs:8,sm:6,children:Object(n.jsxs)(J.a,{variant:"filled",className:t.formControl,children:[Object(n.jsx)(z.a,{id:"demo-simple-select-filled-label",children:"Height"}),Object(n.jsx)(Q.a,{id:"standard-adornment-weight",value:g,onChange:function(e){x(e.target.value)},endAdornment:Object(n.jsx)(Z.a,{position:"end",children:"cm"}),"aria-describedby":"standard-weight-helper-text",inputProps:{"aria-label":"weight"}})]})}),Object(n.jsx)(C.a,{item:!0,sm:3,xs:0,spacing:1}),Object(n.jsxs)(C.a,{item:!0,xs:3,spacing:3,sm:3,children:["             ",Object(n.jsx)(w.a,{variant:"body1",component:"h2",children:" What is your smoking status"})]}),Object(n.jsx)(C.a,{item:!0,xs:8,sm:6,children:Object(n.jsxs)(J.a,{variant:"filled",className:t.formControl,children:[Object(n.jsx)(z.a,{id:"demo-simple-select-filled-label"}),Object(n.jsxs)(K.a,{labelId:"demo-simple-select-filled-label",id:"demo-simple-select-filled",value:N,onChange:function(e){R(e.target.value)},children:[Object(n.jsx)(Y.a,{value:"current",children:"Current"}),Object(n.jsx)(Y.a,{value:"former",children:"Former"}),Object(n.jsx)(Y.a,{value:"never",children:"Never"})]})]})}),Object(n.jsx)(C.a,{item:!0,sm:3,xs:0,spacing:1}),Object(n.jsxs)(C.a,{item:!0,xs:3,spacing:3,sm:3,children:["             ",Object(n.jsx)(w.a,{variant:"body1",component:"h2",children:" What ethnicity are you"})]}),Object(n.jsxs)(C.a,{item:!0,xs:8,sm:6,children:[Object(n.jsxs)(J.a,{variant:"filled",className:t.formControl,children:[Object(n.jsx)(z.a,{id:"demo-simple-select-filled-label",children:"Ethnicity"}),Object(n.jsxs)(K.a,{labelId:"demo-simple-select-filled-label",id:"demo-simple-select-filled",value:A,onChange:function(e){T(e.target.value)},children:[Object(n.jsx)(Y.a,{value:"white",children:"white"}),Object(n.jsx)(Y.a,{value:"mixed",children:"mixed"}),Object(n.jsx)(Y.a,{value:"south asian",children:"south asian"}),Object(n.jsx)(Y.a,{value:"black",children:"black"}),Object(n.jsx)(Y.a,{value:"other",children:"other"})]})]}),Object(n.jsx)(C.a,{item:!0,xs:12,children:Object(n.jsx)(X.a,{className:t.button,variant:"contained",color:"primary",onClick:function(){var t={age:o,height:g,weight:v,smoking:N,ethnicity:A,sex:u};D.a.post("http://178.62.61.92:3102/userRisk",null,{params:t}).then((function(t){console.log(t.data),window.localStorage.setItem("userRisk",Math.round(10*t.data)/10),e.push("/")}))},disableElevation:!0,children:"Calculate Risk"})})]})]})]})},ae=(a(154),a(63)),ne=function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={areaData:[],position:null},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;navigator.geolocation.getCurrentPosition((function(t){t=t,D.a.get("http://178.62.61.92:3101/getLocalData?lat=".concat(t.coords.latitude,"&lon=").concat(t.coords.longitude)).then((function(t){var a=t.data;console.log(n);for(var n=[],s=0;s<a.length-1;s++)n.push([new Date(a[s].date),a[s].amount]);n.sort((function(e,t){return e[0].getTime()-t[0].getTime()}));for(s=0;s<a.length-1;s++)n[s][0]=n[s][0].toISOString().slice(5,10).replace("-","/");n.location=a[0].location,n.unshift(["Date","Cases per 100k"]),console.log(n[n.length-1][1]),window.localStorage.setItem("locationRisk",Math.round(n[n.length-1][1]/200*10)/10),console.log(window.localStorage.getItem("locationRisk")),e.setState({areaData:n})}))}))}},{key:"render",value:function(){var e={title:"Cases In ".concat(this.state.areaData.location),curveType:"function",legend:{position:"bottom"}};return Object(n.jsx)(L.a,{children:Object(n.jsx)(ae.a,{chartType:"LineChart",width:"100%",height:"400px",data:this.state.areaData,options:e})})}}]),a}(s.Component);function se(){}var ie=function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={personalRisk:0,locationRisk:0},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){navigator.geolocation.getCurrentPosition((function(e){e=e}))}},{key:"render",value:function(){var e=this;se=function(){console.log("working"),e.props.history.push("/Calculator")},console.log(window.localStorage.getItem("userRisk")),this.state.locationRisk=null!=window.localStorage.getItem("locationRisk")?this.state.locationRisk=Number(window.localStorage.getItem("locationRisk")):this.state.locationRisk=0,this.state.personalRisk=null!=window.localStorage.getItem("userRisk")?this.state.personalRisk=Number(window.localStorage.getItem("userRisk")):this.state.personalRisk=0;var t=this.state.locationRisk,a=this.state.personalRisk;this.state.total=null!=a&&null!=t?t+a/2:0;var s=this.state.total;return console.log(typeof Number(t),typeof Number(a),typeof s),Object(n.jsxs)("div",{children:[Object(n.jsx)(ae.a,{width:400,height:120,chartType:"Gauge",loader:Object(n.jsx)("div",{children:"Loading Chart"}),data:[["Label","Value"],["Personal",a],["Location",t],["Total",s]],options:{majorTicks:1,max:5,greenFrom:0,greenTo:1.5,redFrom:3.5,redTo:5,yellowFrom:1.5,yellowTo:3.5,minorTicks:5},rootProps:{"data-testid":"1"}}),0==a?Object(n.jsx)(X.a,{variant:"contained",color:"primary",onClick:se,children:"Calculate Personal Risk"}):Object(n.jsx)("div",{})]})}}]),a}(s.Component),oe=Object($.g)(ie),re=[{path:"/",sidebarName:"Home",component:function(e){Object(d.a)(a,e);var t=Object(j.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),i=0;i<n;i++)s[i]=arguments[i];return(e=t.call.apply(t,[this].concat(s))).state={covidData:[],personalRisk:0,locationRisk:0,dateStr:null,deaths:null,cases:null,icu:null,totalvac:null},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;D.a.get("http://178.62.61.92:3101/getCovid").then((function(t){var a=t.data[0];console.log(a),a.date=a.date.split("T")[0],e.setState({covidData:a})})),D.a.get("https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/CovidStatisticsProfileHPSCIreland_DailyDateView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22Date%22%2C%22outStatisticFieldName%22%3A%22Date_max%22%2C%22statisticType%22%3A%22max%22%7D%5D").then((function(t){var a=t.data.features[0].attributes.Date_max,n=new Date(a).toISOString().slice(0,10);console.log(n),e.setState({dateStr:n})})),D.a.get("https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19StatisticsProfileHPSCIrelandView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22ConfirmedCovidCases%22%2C%22outStatisticFieldName%22%3A%22ConfirmedCovidCases_sum%22%2C%22statisticType%22%3A%22sum%22%7D%5D").then((function(t){var a=t.data.features[0].attributes.ConfirmedCovidCases_sum;console.log("cases",a),e.setState({cases:a})})),D.a.get("https://services1.arcgis.com/eNO7HHeQ3rUcBllm/arcgis/rest/services/Covid19StatisticsProfileHPSCIrelandView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22ConfirmedCovidDeaths%22%2C%22outStatisticFieldName%22%3A%22ConfirmedCovidDeaths_max%22%2C%22statisticType%22%3A%22max%22%7D%5D").then((function(t){var a=t.data.features[0].attributes.ConfirmedCovidDeaths_max;e.setState({deaths:a})})),D.a.get("https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/ICUBISCurrentTimelinePublicView/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22ncovidconf%22%2C%22outStatisticFieldName%22%3A%22ncovidconf_sum%22%2C%22statisticType%22%3A%22sum%22%7D%5D").then((function(t){var a=t.data.features[0].attributes.ncovidconf_sum;e.setState({icu:a})})),D.a.get("https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/Covid19_Vaccine_Administration_Hosted_View/FeatureServer/0/query?f=json&where=1%3D1&outFields=*&returnGeometry=false&outStatistics=%5B%7B%22onStatisticField%22%3A%22totalAdministered%22%2C%22outStatisticFieldName%22%3A%22totalAdministered_max%22%2C%22statisticType%22%3A%22max%22%7D%5D").then((function(t){var a=t.data.features[0].attributes.totalAdministered_max;e.setState({totalvac:a})}))}},{key:"render",value:function(){var e=Object(q.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(1),textAlign:"left",color:e.palette.text.secondary,marginLeft:0}}}));return Object(n.jsxs)("div",{children:[Object(n.jsx)("br",{}),Object(n.jsx)(w.a,{variant:"h6",component:"h2",children:"Your Risk Levels"}),Object(n.jsxs)(C.a,{container:!0,spacing:1,children:[Object(n.jsx)(C.a,{item:!0,sm:5,xs:0,spacing:1}),Object(n.jsx)(C.a,{item:!0,xs:9,spacing:5,sm:7,children:Object(n.jsx)(oe,{personalRisk:this.state.personalRisk,locationRisk:this.state.locationRisk})}),Object(n.jsx)(C.a,{item:!0,sm:12,xs:12,spacing:1,children:Object(n.jsxs)(w.a,{className:e.paper,variant:"h4",component:"h2",children:["Stats ",null!=this.state.dateStr?this.state.dateStr:Object(n.jsx)("div",{})]})}),Object(n.jsx)(C.a,{item:!0,xs:3,spacing:1,sm:6}),Object(n.jsx)(C.a,{item:!0,xs:6,spacing:1,sm:12,children:Object(n.jsxs)(w.a,{variant:"h6",component:"h2",children:["Cases:                ",null!=this.state.cases?this.state.cases:Object(n.jsx)("div",{})]})}),Object(n.jsx)(C.a,{item:!0,xs:12,spacing:1,sm:12,children:Object(n.jsxs)(w.a,{variant:"h6",component:"h2",children:["ICU Admissions:  ",null!=this.state.icu?this.state.icu:Object(n.jsx)("div",{})]})}),Object(n.jsx)(C.a,{item:!0,xs:3,spacing:1,sm:9}),Object(n.jsx)(C.a,{item:!0,xs:12,spacing:1,sm:12,children:Object(n.jsxs)(w.a,{variant:"h6",component:"h2",children:["Deaths: ",null!=this.state.deaths?this.state.deaths:Object(n.jsx)("div",{})]})}),Object(n.jsx)(C.a,{item:!0,xs:3,spacing:1,sm:9}),Object(n.jsx)(C.a,{item:!0,xs:12,spacing:1,sm:12,children:Object(n.jsxs)(w.a,{variant:"h6",component:"h2",children:["Total Vaccienes Given:",null!=this.state.totalvac?this.state.totalvac:Object(n.jsx)("div",{})]})}),Object(n.jsx)(C.a,{item:!0,xs:3,spacing:1,sm:2}),Object(n.jsx)(C.a,{item:!0,xs:12,spacing:1,sm:10}),Object(n.jsx)(C.a,{item:!0,xs:3,spacing:1,sm:3}),Object(n.jsx)(C.a,{item:!0,xs:12,spacing:1,sm:9,children:Object(n.jsx)(ne,{style:{height:"25%",paddingTop:5,backgroundColor:"#fff"}})})]})]})}}]),a}(i.a.Component)},{path:"/Map",sidebarName:"Go Somewhere",component:V},{path:"/Calculator",sidebarName:"Calculator",component:te}],ce=a(82),le=a(247),de=a(248),je=a(243),he=a(113),ue=a.n(he),be=a(244),me=a(252),pe=a(251),ge=a(111),xe=a.n(ge),Oe=a(239),fe=a(163),ve=a(245),Ce=a(246),Se=a(110),ye=a.n(Se),we=a(19),ke=a(108),De=a.n(ke),Ne=a(109),Re=a.n(Ne),_e=a(112),Pe=a.n(_e),Ae=250,Te=Object(q.a)((function(e){return{root:{display:"flex"},appBar:{transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen})},appBarShift:{width:"calc(100% - ".concat(Ae,"px)"),transition:e.transitions.create(["margin","width"],{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:Ae},title:{flexGrow:1},hide:{display:"none"},drawer:{width:Ae,flexShrink:0},drawerPaper:{width:Ae},drawerHeader:Object(ce.a)(Object(ce.a)({display:"flex",alignItems:"center",padding:e.spacing(0,1)},e.mixins.toolbar),{},{justifyContent:"flex-start"}),content:{flexGrow:1,padding:e.spacing(3),transition:e.transitions.create("margin",{easing:e.transitions.easing.sharp,duration:e.transitions.duration.leavingScreen}),marginRight:-250},contentShift:{transition:e.transitions.create("margin",{easing:e.transitions.easing.easeOut,duration:e.transitions.duration.enteringScreen}),marginRight:0}}}));function Fe(e){var t=Object($.f)(),a=Object(we.a)(),s=e.window,o=Te(),r=i.a.useState(!0),c=Object(W.a)(r,2),l=(c[0],c[1],i.a.useState(null)),d=Object(W.a)(l,2),j=d[0],h=(d[1],Boolean(j),i.a.useState(!1)),u=Object(W.a)(h,2),b=u[0],m=u[1],p=function(e){m(!b)},g=Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:o.toolbar}),Object(n.jsx)("div",{className:o.drawerHeader,children:Object(n.jsx)(je.a,{onClick:p,children:"left"===a.direction?Object(n.jsx)(De.a,{}):Object(n.jsx)(Re.a,{})})}),Object(n.jsx)(be.a,{}),Object(n.jsx)(Oe.a,{children:re.map((function(e,a){return Object(n.jsxs)(fe.a,{button:!0,onClick:function(){return function(e){t.push(e)}(e.path)},children:[0===a?Object(n.jsxs)(ve.a,{children:[" ",Object(n.jsx)(ye.a,{})]}):null,1===a?Object(n.jsxs)(ve.a,{children:[Object(n.jsx)(xe.a,{})," "]}):null,2===a?Object(n.jsxs)(ve.a,{children:[" ",Object(n.jsx)(Pe.a,{})," "]}):null,Object(n.jsx)(Ce.a,{primary:e.sidebarName})]},e.sidebarName)}))}),Object(n.jsx)(be.a,{})]}),x=void 0!==s?function(){return s().document.body}:void 0;return Object(n.jsxs)("div",{className:o.root,children:[Object(n.jsx)(le.a,{position:"fixed",children:Object(n.jsx)(de.a,{children:Object(n.jsx)(je.a,{color:"inherit","aria-label":"open drawer",edge:"start",onClick:p,className:o.menuButton,children:Object(n.jsx)(ue.a,{})})})}),Object(n.jsx)("nav",{className:o.drawer,"aria-label":"mailbox folders",children:Object(n.jsx)(pe.a,{smUp:!0,implementation:"css",children:Object(n.jsx)(me.a,{container:x,variant:"temporary",anchor:"rtl"===a.direction?"right":"left",open:b,onClose:p,classes:{paper:o.drawerPaper},ModalProps:{keepMounted:!0},children:g})})})]})}a(158),a(159),a(160);var Ie=a(56);var Le=function(){var e=re.map((function(e,t){var a=e.path,s=e.component;return Object(n.jsx)($.b,{exact:!0,path:a,component:s},t)}));return Object(n.jsx)("div",{className:"App",children:Object(n.jsxs)(Ie.a,{children:[Object(n.jsx)(Fe,{}),Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),e]})})},Be=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,257)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,i=t.getLCP,o=t.getTTFB;a(e),n(e),s(e),i(e),o(e)}))};r.a.render(Object(n.jsx)(i.a.StrictMode,{children:Object(n.jsx)(Le,{})}),document.getElementById("root")),Be()}},[[161,1,2]]]);
//# sourceMappingURL=main.8a593d1b.chunk.js.map