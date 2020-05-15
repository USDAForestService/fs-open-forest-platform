import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-esri-map',
  templateUrl: './esri-map.component.html',
  styleUrls: ['/esri-map.component.scss']
})

export class EsriMapComponent implements OnInit {

  @ViewChild('mapViewNode') private mapViewEl: ElementRef;

  constructor() { }

  ngOnInit() {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/GeoJSONLayer',
      'esri/widgets/Search',
      // 'esri/layers/CSVLayer',
      // 'esri/renderers/UniqueValueRenderer',
      // 'esri/layers/WMSLayer'
    ])
      .then(([EsriMap, MapView, GeoJSONLayer, Search]) => {
        const map = new EsriMap({
          basemap: 'topo',
        });

        const mapView = new MapView({
          container: this.mapViewEl.nativeElement,
          center: [-98, 38],
          zoom: 5,
          map: map,
        });

              // Search widget
      const search = new Search({
        mapView: mapView
      });

      mapView.ui.add(search, 'top-right');

      // const wmsLayer = new WMSLayer({
      //   url: 'https://apps.fs.usda.gov/arcx/services/EDW/EDW_ProclaimedForestBoundaries_01/MapServer/WMSServer?request=GetCapabilities&service=WMS',
      //   renderer: renderer,
      //   popupTemplate: {  // Enable a popup
      //     title: '{COMMONNAME}', // Show attribute value
      //     content: '<p>The {COMMONNAME} is part of {ADMINFORESTNAME}</p>' +
      //     '<p>It is located in region {REGION} </p>' +
      //     '<p> For more information please visit <a href='{URL}'>{URL}</a> </p>'  // Display text in pop-up
      //   }
      // })


      const geoJson = new GeoJSONLayer({
        url: 'https://opendata.arcgis.com/datasets/06ed165cbff74a819a1139d43067a5c1_1.geojson',
        // Enable renderer to outline forests
        renderer: {
          type: 'simple',
          symbol: {
            type: 'simple-line',
            color: 'green',
            width: '2px'
          }
        },
        popupTemplate: {  // Enable a popup
          title: '{COMMONNAME}', // Show attribute value
          content: '<p>The {COMMONNAME} is part of {ADMINFORESTNAME}</p>' +
          '<p>It is located in region {REGION} </p>' +
          `<p> For more information please visit <a href='{URL}'>{URL}</a> </p>`  // Display text in pop-up
        }
      });

      // keeping this below for future iterations
//       const csvContent = [
//         'ADMINFORESTID,REGION,FORESTNUMBER,FORESTORGCODE,GIS_ACRES,Shape_Length,Shape_Area,OBJECTID,ADMINFORESTNAME,COMMONNAME,URL,ADMINTYPE,CNID',
//         '99030300010343,03,03,0303,1401.715,14008.3583119131,8516993.81916756,1,Cibola National Forest,McClellan Creek National Grassland,https://www.fs.usda.gov/detail/cibola/home/?cid=stelprdb5397425,National Grassland,39',
//         '99060700010343,06,07,0607,173593.026,371441.370902852,1381358744.20219,2,Ochoco National Forest,Crooked River National Grassland,https://www.fs.usda.gov/ochoco,National Grassland,21',
//         '99011800010343,01,18,0118,1025313.868,7979907.92940194,8991008664.23572,3,Dakota Prairie Grasslands,Little Missouri National Grassland,https://www.fs.usda.gov/recarea/dpg/recarea/?recid=79469,National Grassland,23',
//         '99020600010343,02,06,0206,626249.208,5696263.79151852,4847624585.01131,4,Medicine Bow-Routt National Forest,Thunder Basin National Grassland,https://www.fs.usda.gov/recmain/mbr/recreation,National Grassland,24',
//         '99020700010343,02,07,0207,209044.225,188972.261792474,1643039566.17274,5,Nebraska National Forest,Fort Pierre National Grassland,https://www.fs.usda.gov/recarea/nebraska/recarea/?recid=10637,National Grassland,32',
//         '99041500010343,04,15,0415,74783.572,225531.899035999,551618327.300517,6,Caribou-Targhee National Forest,Curlew National Grassland,https://www.fs.usda.gov/detail/ctnf/about-forest/?cid=STELPRDB5110047,National Grassland,26',
//         '99050500010343,05,05,0505,19489.17,109493.773210187,142451425.949193,7,Klamath National Forest,Butte Valley National Grassland,https://www.fs.usda.gov/klamath,National Grassland,27',
//         '99030300010343,03,03,0303,33103.349,563703.915116983,203544625.751078,8,Cibola National Forest,Black Kettle National Grassland,https://www.fs.usda.gov/detail/cibola/home/?cid=stelprdb5397425,National Grassland,40',
//         '99030300010343,03,03,0303,144280.881,1219511.1173638,899553822.308132,9,Cibola National Forest,Kiowa National Grassland,https://www.fs.usda.gov/detail/cibola/home/?cid=fsbdev3_065702,National Grassland,38',
//         '99030300010343,03,03,0303,94127.091,815200.35381359,589280080.030032,10,Cibola National Forest,Rita Blanca National Grassland,https://www.fs.usda.gov/detail/cibola/home/?cid=fsbdev3_065702,National Grassland,37',
//         '99081300010343,08,13,0813,115408.461,140092.715090604,671097890.871204,11,National Forests in Texas,Lyndon B. Johnson National Grassland,https://www.fs.usda.gov/texas,National Grassland,22',
//         '99081300010343,08,13,0813,68466.877,138790.122521562,401036267.470597,12,National Forests in Texas,Caddo National Grassland,https://www.fs.usda.gov/texas,National Grassland,28',
//         '99011800010343,01,18,0118,6717.517,132694.140249799,56297841.4092899,13,Dakota Prairie Grasslands,Cedar River National Grassland,https://www.fs.usda.gov/recarea/dpg/recarea/?recid=79471,National Grassland,29',
//         '99011800010343,01,18,0118,70428.175,536086.460491434,599663175.234936,14,Dakota Prairie Grasslands,Sheyenne National Grassland,https://www.fs.usda.gov/dpg,National Grassland,30',
//         '99011800010343,01,18,0118,154705.267,1280354.95576624,1284309581.42142,15,Dakota Prairie Grasslands,Grand River National Grassland,https://www.fs.usda.gov/recarea/dpg/recarea/?recid=79472,National Grassland,31',
//         '99020700010343,02,07,0207,215804.927,242708.789994465,1629103621.26071,16,Nebraska National Forest,Oglala National Grassland,https://www.fs.usda.gov/detail/nebraska/about-forest/offices/?cid=stelprdb5097992#oglala,National Grassland,25',
//         '99020700010343,02,07,0207,654881.859,4245753.37570707,5047686445.46061,17,Nebraska National Forest,Buffalo Gap National Grassland,https://www.fs.usda.gov/recarea/nebraska/recarea/?recid=30329,National Grassland,33',
//         '99021000010343,02,10,0210,208424.885,1940408.4868622,1472318655.42765,18,Arapaho and Roosevelt National Forests,Pawnee National Grassland,https://www.fs.usda.gov/arp,National Grassland,34',
//         '99021200010343,02,12,0212,109101.348,688793.283324135,695683874.468876,19,Pike and San Isabel National Forests,Cimarron National Grassland,https://www.fs.usda.gov/detail/psicc/about-forest/districts/?cid=fsm9_032733,National Grassland,35',
//         '99021200010343,02,12,0212,444413.904,3298494.87698232,2856447327.92884,20,Pike and San Isabel National Forests,Comanche National Grassland,https://www.fs.usda.gov/detail/psicc/about-forest/offices/?cid=fsm9_032695,National Grassland,36',
//         '99081600010343,08,16,0816,55829.81,85697.5129919934,251971793.775072,41,El Yunque National Forest,El Yunque National Forest,https://www.fs.usda.gov/elyunque,National Forest,49',
//         '99080600010343,08,06,0806,1063026.621,1134072.61898544,5948179102.32574,42,Kisatchie National Forest,Kisatchie National Forest,https://www.fs.usda.gov/kisatchie,National Forest,48',
//         '99080800010343,08,08,0808,3497288.505,3755439.24285134,22650925102.745,43,George Washington and Jefferson National Forest,George Washington and Jefferson National Forest,https://www.fs.usda.gov/gwj,National Forest,79',
//         '99080400010343,08,04,0804,1228289.002,1082293.06868005,7586005461.57696,44,Cherokee National Forest,Cherokee National Forest,https://www.fs.usda.gov/cherokee,National Forest,66',
//         '99090500010343,09,05,0905,3071479.338,2662361.0105095,19654563979.8408,45,Mark Twain National Forest,Mark Twain National Forest,https://www.fs.usda.gov/mtnf,National Forest,43',
//         '99091000010343,09,10,0910,1299209.485,1193911.06533792,10956036900.4617,46,Hiawatha National Forest,Hiawatha National Forest,https://www.fs.usda.gov/hiawatha,National Forest,44',
//         '99091300010343,09,13,0913,2005322.044,1712938.60790456,16721432914.5091,47,Chequamegon-Nicolet National Forest,Chequamegon-Nicolet National Forest,https://www.fs.usda.gov/cnnf,National Forest,45',
//         '99091400010343,09,14,0914,856160.916,858043.646503528,5782903787.74597,48,Wayne National Forest,Wayne National Forest,https://www.fs.usda.gov/wayne,National Forest,46',
//         '99091200010343,09,12,0912,646956.888,701766.337838125,4283707638.45479,49,Hoosier National Forest,Hoosier National Forest,https://www.fs.usda.gov/hoosier,National Forest,47',
//         '99090400010343,09,04,0904,2028208.135,1752416.97832006,15925872963.3942,50,Huron-Manistee National Forest,Huron-Manistee National Forest,https://www.fs.usda.gov/hmnf,National Forest,124',
//         '99090900010343,09,09,0909,3887905.471,1862314.38251527,34965680987.2336,51,Superior National Forest,Superior National Forest,https://www.fs.usda.gov/superior,National Forest,125',
//         '99090800010343,09,08,0908,930027.572,901195.941172187,5992719105.08665,52,Shawnee National Forest,Shawnee National Forest,https://www.fs.usda.gov/shawnee,National Forest,70',
//         '99091900010343,09,19,0919,740874.417,516625.344728343,5374626772.15281,53,Allegheny National Forest,Allegheny National Forest,https://www.fs.usda.gov/allegheny,National Forest,71',
//         '99090300010343,09,03,0903,1598171.662,662614.287008093,14113442597.0596,54,Chippewa National Forest,Chippewa National Forest,https://www.fs.usda.gov/chippewa,National Forest,72',
//         '99092200010343,09,22,0922,947314.697,1425000.95708806,7447449228.27459,55,White Mountain National Forest,White Mountain National Forest,https://www.fs.usda.gov/whitemountain,National Forest,73',
//         '99092100010343,09,21,0921,1703694.705,1116277.7780256,11291968382.7132,56,Monongahela National Forest,Monongahela National Forest,https://www.fs.usda.gov/mnf,National Forest,74',
//         '99100500010343,10,05,1005,17687377.8496522,54510803.0301302,242025387654.07,57,Tongass National Forest,Tongass National Forest,https://www.fs.usda.gov/tongass/,National Forest,81',
//         '99010200010343,01,02,0102,3614084.108,5111225.39160842,29903148023.8736,58,Beaverhead-Deerlodge National Forest,Beaverhead-Deerlodge National Forest,https://www.fs.usda.gov/bdnf,National Forest,86',
//         '99011600010343,01,16,0116,2620357.04,3877199.73390041,22928667795.2656,59,Lolo National Forest,Lolo National Forest,https://www.fs.usda.gov/lolo,National Forest,87',
//         '99011400010343,01,14,0114,2622114.491,2893771.85912886,24088569097.9617,60,Kootenai National Forest,Kootenai National Forest,https://www.fs.usda.gov/kootenai,National Forest,88',
//         '99011500010343,01,15,0115,3177728.786,3792264.00171292,27652601615.5684,61,Helena-Lewis and Clark National Forest,Helena-Lewis and Clark National Forest,https://www.fs.usda.gov/helena/,National Forest,82',
//         '99011100010343,01,11,0111,3412076.126,3371615.55179244,27948410008.5646,62,Custer Gallatin National Forest,Custer Gallatin National Forest,https://www.fs.usda.gov/custergallatin,National Forest,83',
//         '99010300010343,01,03,0103,1664454.883,1636713.7322385,13922239827.134,63,Bitterroot National Forest,Bitterroot National Forest,https://www.fs.usda.gov/bitterroot,National Forest,84',
//         '99010400010343,01,04,0104,2943637.856,4231954.98632898,26514362102.4591,64,Idaho Panhandle National Forests,Idaho Panhandle National Forests,https://www.fs.usda.gov/ipnf,National Forest,97',
//         '99011700010343,01,17,0117,4072797.981,2389188.14566892,34400705599.8962,65,Nez Perce-Clearwater National Forest,Nez Perce-Clearwater National Forest,https://www.fs.usda.gov/nezperceclearwater,National Forest,98',
//         '99011000010343,01,10,0110,2651693.344,2597287.50227347,23980396931.5724,66,Flathead National Forest,Flathead National Forest,https://www.fs.usda.gov/flathead,National Forest,85',
//         '99030500010343,03,05,0305,1785095.582,1981849.53499908,10070333660.7107,67,Coronado National Forest,Coronado National Forest,https://www.fs.usda.gov/coronado,National Forest,106',
//         '99030800010343,03,08,0308,1261952.388,1148030.47137737,7273867254.30563,68,Lincoln National Forest,Lincoln National Forest,https://www.fs.usda.gov/lincoln,National Forest,107',
//         '99030700010343,03,07,0307,1581388.48,1130525.5013586,9787059829.92532,69,Kaibab National Forest,Kaibab National Forest,https://www.fs.usda.gov/kaibab,National Forest,108',
//         '99030600010343,03,06,0306,3389399.071,1237259.24832353,19739474415.2959,70,Gila National Forest,Gila National Forest,https://www.fs.usda.gov/gila/,National Forest,109',
//         '99030900010343,03,09,0309,1411550.042,1000119.90021027,8464305397.16391,71,Prescott National Forest,Prescott National Forest,https://www.fs.usda.gov/prescott,National Forest,110',
//         '99030100010343,03,01,0301,2110687.726,1096145.14080695,12446615158.038,72,Apache-Sitgreaves National Forests,Apache-Sitgreaves National Forests,https://www.fs.usda.gov/asnf,National Forest,111',
//         '99031000010343,03,10,0310,1681813.763,1514031.68776208,10393702295.4963,73,Santa Fe National Forest,Santa Fe National Forest,https://www.fs.usda.gov/santafe/,National Forest,112',
//         '99030400010343,03,04,0304,2000935.404,868428.682829134,12070608382.0064,74,Coconino National Forest,Coconino National Forest,https://www.fs.usda.gov/coconino,National Forest,103',
//         '99031200010343,03,12,0312,2966417.145,969888.358145716,17459298047.6915,75,Tonto National Forest,Tonto National Forest,https://www.fs.usda.gov/tonto,National Forest,104',
//         '99051400010343,05,14,0514,2715493.611,2817192.9294317,19267400547.6886,76,Shasta-Trinity National Forest,Shasta-Trinity National Forest,https://www.fs.usda.gov/stnf,National Forest,127',
//         '99051200010343,05,12,0512,805482.714,777072.175295912,4760980303.44989,77,San Bernardino National Forest,San Bernardino National Forest,https://www.fs.usda.gov/sbnf,National Forest,128',
//         '99050700010343,05,07,0507,1970270.154,1580404.80566472,11915151630.4597,78,Los Padres National Forest,Los Padres National Forest,https://www.fs.usda.gov/lpnf,National Forest,129',
//         '99051100010343,05,11,0511,1431799.968,1808785.0840537,9864343020.47821,79,Plumas National Forest,Plumas National Forest,https://www.fs.usda.gov/plumas,National Forest,130',
//         '99050600010343,05,06,0506,1488634.236,2359626.7699137,10444771986.0091,80,Lassen National Forest,Lassen National Forest,https://www.fs.usda.gov/lassen,National Forest,131',
//         '99050100010343,05,01,0501,706209.852,607267.426334227,4209127809.418,81,Angeles National Forest,Angeles National Forest,https://www.fs.usda.gov/angeles,National Forest,132',
//         '99020900010343,02,09,0209,1937280.065,1601213.03759719,12553695335.3007,82,Rio Grande National Forest,Rio Grande National Forest,https://www.fs.usda.gov/riogrande,National Forest,126',
//         '99041200010343,04,12,0412,2407303.238,1545589.97617475,19541696583.2242,83,Payette National Forest,Payette National Forest,https://www.fs.usda.gov/payette,National Forest,113',
//         '99040300010343,04,03,0403,3466308.286,1865650.48825187,26444740336.9181,84,Bridger-Teton National Forest,Bridger-Teton National Forest,https://www.fs.usda.gov/btnf,National Forest,114',
//         '99041300010343,04,13,0413,4396289.702,3222879.8522739,35181040489.6271,85,Salmon-Challis National Forest,Salmon-Challis National Forest,https://www.fs.usda.gov/scnf,National Forest,115',
//         '99041400010343,04,14,0414,2190138.414,1631477.66934661,16784677584.9903,86,Sawtooth National Forest,Sawtooth National Forest,https://www.fs.usda.gov/sawtooth,National Forest,116',
//         '99040100010343,04,01,0401,1401093.929,1190677.52147732,9859810252.74985,87,Ashley National Forest,Ashley National Forest,https://www.fs.usda.gov/ashley,National Forest,117',
//         '99040800010343,04,08,0408,1788262.532,1647415.83730845,11871770148.554,88,Fishlake National Forest,Fishlake National Forest,https://www.fs.usda.gov/fishlake,National Forest,118',
//         '99040200010343,04,02,0402,2526871.862,1714789.1910511,19787966760.9988,89,Boise National Forest,Boise National Forest,https://www.fs.usda.gov/boise,National Forest,119',
//         '99041700010343,04,17,0417,6705308.99,6040009.75189069,45399412702.2452,90,Humboldt-Toiyabe National Forest,Humboldt-Toiyabe National Forest,https://www.fs.usda.gov/htnf,National Forest,120',
//         '99041900010343,04,19,0419,2912961.552,2462622.95697328,20615332194.5583,91,Uinta-Wasatch-Cache National Forest,Uinta-Wasatch-Cache National Forest,https://www.fs.usda.gov/uwcnf,National Forest,121',
//         '99041000010343,04,10,0410,1414225.104,1388818.8982051,9461108984.05631,92,Manti-La Sal National Forest,Manti-La Sal National Forest,https://www.fs.usda.gov/mantilasal,National Forest,122',
//         '99021500010343,02,15,0215,2482642.348,1671013.10009668,16925976939.3243,93,White River National Forest,White River National Forest,https://www.fs.usda.gov/whiteriver,National Forest,99',
//         '99020400010343,02,04,0204,3153230.377,3041042.53665492,20907525924.7426,94,'Grand Mesa, Uncompahgre and Gunnison National Forests','Grand Mesa, Uncompahgre and Gunnison National Forests',https://www.fs.usda.gov/gmug,National Forest,100',
//         '99021400010343,02,14,0214,2469249.564,1668202.67127929,19346680527.0876,95,Shoshone National Forest,Shoshone National Forest,https://www.fs.usda.gov/shoshone,National Forest,101',
//         '99021300010343,02,13,0213,2094651.667,1114526.2668539,13489472833.2894,96,San Juan National Forest,San Juan National Forest,https://www.fs.usda.gov/sanjuan,National Forest,102',
//         '99020200010343,02,02,0202,1112869.262,652124.808326601,8867962971.56509,97,Bighorn National Forest,Bighorn National Forest,https://www.fs.usda.gov/bighorn,National Forest,91',
//         '99051900010343,05,19,0519,331788.692,283609.034224783,2228919834.39166,98,Lake Tahoe Basin Management Unit,Lake Tahoe Basin Management Unit,https://www.fs.usda.gov/ltbmu,National Forest,89',
//         '99060600010343,06,06,0606,1016043.625,1193774.04400876,8289310366.41719,99,Mt. Hood National Forest,Mt. Hood National Forest,https://www.fs.usda.gov/mthood,National Forest,54',
//         '99060300010343,06,03,0603,1357646.294,1595413.72488196,11490137885.5818,100,Gifford Pinchot National Forest,Gifford Pinchot National Forest,https://www.fs.usda.gov/giffordpinchot,National Forest,53',
//         '99051300010343,05,13,0513,1161449.344,1257403.71508775,7201899803.31913,101,Sequoia National Forest,Sequoia National Forest,https://www.fs.usda.gov/sequoia/,National Forest,134',
//         '99050400010343,05,04,0504,2096905.678,1770212.09703002,13452379218.9086,102,Inyo National Forest,Inyo National Forest,https://www.fs.usda.gov/inyo,National Forest,135',
//         '99051700010343,05,17,0517,1179497,1316828.77418952,8003016232.21568,103,Tahoe National Forest,Tahoe National Forest,https://www.fs.usda.gov/tahoe,National Forest,136',
//         '99050300010343,05,03,0503,793652.605,983316.122483203,5293708021.86896,104,Eldorado National Forest,Eldorado National Forest,https://www.fs.usda.gov/eldorado,National Forest,137',
//         '99061000010343,06,10,0610,1849092.632,1767717.67921075,13740541945.4145,105,Rogue River-Siskiyou National Forests,Rogue River-Siskiyou National Forests,https://www.fs.usda.gov/rogue-siskiyou,National Forest,58',
//         '99060500010343,06,05,0605,2025506.15,2778848.30837333,18307819885.4795,106,Mt. Baker-Snoqualmie National Forest,Mt. Baker-Snoqualmie National Forest,https://www.fs.usda.gov/mbs,National Forest,90',
//         '99060900010343,06,09,0609,697410.565,1138823.93999567,6226460679.21493,107,Olympic National Forest,Olympic National Forest,https://www.fs.usda.gov/olympic,National Forest,57',
//         '99060100010343,06,01,0601,1870116.015,1202358.75835877,14550173617.8408,108,Deschutes National Forest,Deschutes National Forest,https://www.fs.usda.gov/deschutes,National Forest,56',
//         '99061500010343,06,15,0615,986612.489,1498511.01839668,7523351701.86693,109,Umpqua National Forest,Umpqua National Forest,https://www.fs.usda.gov/umpqua,National Forest,55',
//         '99051500010343,05,15,0515,1418783.096,816682.506671815,9081192470.37868,110,Sierra National Forest,Sierra National Forest,https://www.fs.usda.gov/sierra,National Forest,92',
//         '99051600010343,05,16,0516,1090354.197,775710.479546322,7150432389.08315,111,Stanislaus National Forest,Stanislaus National Forest,https://www.fs.usda.gov/stanislaus,National Forest,93',
//         '99050800010343,05,08,0508,1073284.782,634948.579176085,7331576277.13379,112,Mendocino National Forest,Mendocino National Forest,https://www.fs.usda.gov/mendocino,National Forest,94',
//         '99050200010343,05,02,0502,561816.413,762351.998257685,3255147771.31899,113,Cleveland National Forest,Cleveland National Forest,https://www.fs.usda.gov/cleveland,National Forest,95',
//         '99050900010343,05,09,0509,2023025.034,1591679.9805085,14637226231.4129,114,Modoc National Forest,Modoc National Forest,https://www.fs.usda.gov/modoc,National Forest,96',
//         '99061400010343,06,14,0614,1405462.212,2597525.10186814,11572132858.8807,115,Umatilla National Forest,Umatilla National Forest,https://www.fs.usda.gov/umatilla,National Forest,59',
//         '99051000010343,05,10,0510,1273948.858,1361986.20138463,9109656470.15069,116,Six Rivers National Forest,Six Rivers National Forest,https://www.fs.usda.gov/srnf,National Forest,133',
//         '99062200010343,06,22,0622,292772.761,634593.307393478,2425216727.84216,117,Columbia River Gorge National Scenic Area,Columbia River Gorge National Scenic Area,https://www.fs.usda.gov/crgnsa,National Forest,60',
//         '99060200010343,06,02,0602,2280281.805,6533585.86122932,17082973133.7113,118,Fremont-Winema National Forest,Fremont-Winema National Forest,https://www.fs.usda.gov/fremont-winema,National Forest,138',
//         '99061600010343,06,16,0616,2405809.136,4918674.71377976,19628526924.7563,119,Wallowa-Whitman National Forest,Wallowa-Whitman National Forest,https://www.fs.usda.gov/wallowa-whitman,National Forest,63',
//         '99062100010343,06,21,0621,1354364.374,2120924.49274744,12553409069.7452,120,Colville National Forest,Colville National Forest,https://www.fs.usda.gov/colville,National Forest,62',
//         '99061700010343,06,17,0617,4255913.596,3844701.46873772,38443492123.3358,121,Okanogan-Wenatchee National Forest,Okanogan-Wenatchee National Forest,https://www.fs.usda.gov/okawen,National Forest,61',
//         '99081000010343,08,10,0810,1532896.473,1243345.97639138,9423586440.70214,122,Ozark-St. Francis National Forest,Ozark-St. Francis National Forest,https://www.fs.usda.gov/osfnf,National Forest,64',
//         '99091500010343,09,15,0915,27566.061,98077.5355296673,198291199.669619,123,Midewin National Tallgrass Prairie,Midewin National Tallgrass Prairie,https://www.fs.usda.gov/midewin,National Forest,69',
//         '99030200010343,03,02,0302,1592528.315,1438350.11156308,10000297797.2443,124,Carson National Forest,Carson National Forest,https://www.fs.usda.gov/carson,National Forest,105',
//         '99060400010343,06,04,0604,1722105.24,2848353.68283707,13555456842.8169,125,Malheur National Forest,Malheur National Forest,https://www.fs.usda.gov/malheur,National Forest,52',
//         '99061200010343,06,12,0612,630995.528,4023311.01044783,5002240346.70841,126,Siuslaw National Forest,Siuslaw National Forest,https://www.fs.usda.gov/siuslaw,National Forest,42',
//         '99061800010343,06,18,0618,1689862.02,2617076.37163354,13268358287.8776,127,Willamette National Forest,Willamette National Forest,https://www.fs.usda.gov/willamette,National Forest,41',
//         '99092000010343,09,20,0920,853901.477,1257684.09283928,6526454201.7939,128,Green Mountain and Finger Lakes National Forests,Green Mountain and Finger Lakes National Forests,https://www.fs.usda.gov/main/gmfl/home,National Forest,75',
//         '99090700010343,09,07,0907,1562758.863,935560.908984725,13320207697.094,129,Ottawa National Forest,Ottawa National Forest,https://www.fs.usda.gov/ottawa,National Forest,76',
//         '99081200010343,08,12,0812,1381168.138,1174323.87041694,8146070554.37145,130,Francis Marion and Sumter National Forests,Francis Marion and Sumter National Forests,https://www.fs.usda.gov/scnfs,National Forest,65',
//         '99020300010343,02,03,0203,1537477.974,1882738.09998656,12030981613.2621,131,Black Hills National Forest,Black Hills National Forest,https://www.fs.usda.gov/blackhills,National Forest,68',
//         '99100400010343,10,04,1004,6244703.986,20614608.7452813,104853498218.809,132,Chugach National Forest,Chugach National Forest,https://www.fs.usda.gov/chugach,National Forest,80',
//         '99040700010343,04,07,0407,1711285.732,1472299.5579432,11081880987.6924,133,Dixie National Forest,Dixie National Forest,https://www.fs.usda.gov/dixie,National Forest,123',
//         '99080300010343,08,03,0803,1796306.668,1563047.50915702,10743381646.2062,134,Chattahoochee-Oconee National Forests,Chattahoochee-Oconee National Forests,https://www.fs.usda.gov/conf,National Forest,77',
//         '99277d9a-c8c4-49c4-aced-d7f8e1d8c78a,08,36,0836,198068.396,237934.321232859,1149301659.81507,135,Savannah River Site,Savannah River Site,https://www.fs.usda.gov/savannahriver,National Forest,78',
//         'e23b8205-a516-4aa3-945e-5dd93dbfe227,08,60,0860,171280.759,723650.251644365,1081714226.51467,136,Land Between the Lakes National Recreation Area,Land Between the Lakes National Recreation Area,https://www.landbetweenthelakes.us/,National Forest,67',
//         '99080900010343,08,09,0809,2724419.604,1849031.7897182,16316608927.4646,137,Ouachita National Forest,Ouachita National Forest,https://www.fs.usda.gov/ouachita,National Forest,51',
//         '99080200010343,08,02,0802,2043069.253,1829951.87335168,13086992283.3546,138,Daniel Boone National Forest,Daniel Boone National Forest,https://www.fs.usda.gov/dbnf,National Forest,50',
//         '99080100010343,08,01,0801,1289516.221,285134.418937222,2069595039.48707,139,National Forests in Alabama,William B. Bankhead National Forest,https://www.fs.usda.gov/alabama,National Forest,139',
//         '99080100010343,08,01,0801,1289516.221,192740.533637098,948519311.035877,140,National Forests in Alabama,Conecuh National Forest,https://www.fs.usda.gov/detail/alabama/about-forest/districts/?cid=fsbdev3_002554,National Forest,140',
//         '99080100010343,08,01,0801,1289516.221,762966.843521025,4369626948.74323,141,National Forests in Alabama,Talladega National Forest,https://www.fs.usda.gov/detail/alabama/about-forest/districts/?cid=fsbdev3_002555,National Forest,141',
//         '99080100010343,08,01,0801,1289516.221,61290.4158856101,89229819.3677437,142,National Forests in Alabama,Tuskegee National Forest,https://www.fs.usda.gov/detail/alabama/about-forest/districts/?cid=stelprdb5152167,National Forest,142',
//         '99080500010343,08,05,0805,1423211.286,259544.497665184,1844884327.79704,143,National Forests in Florida,Osceola National Forest,https://www.fs.usda.gov/osceola,National Forest,143',
//         '99080500010343,08,05,0805,1423211.286,350351.061701513,2362430827.94563,144,National Forests in Florida,Ocala National Forest,https://www.fs.usda.gov/ocala,National Forest,144',
//         '99080500010343,08,05,0805,1423211.286,474199.062350582,3489351867.77827,145,National Forests in Florida,Apalachicola National Forest,https://www.fs.usda.gov/apalachicola,National Forest,145',
//         '99080700010343,08,07,0807,2373305.425,217396.938269981,698458603.651256,146,National Forests in Mississippi,Tombigbee National Forest,https://www.fs.usda.gov/detail/mississippi/about-forest/districts/?cid=stelprdb5209591,National Forest,146',
//         '99080700010343,08,07,0807,2373305.425,182044.362489189,692755202.992667,147,National Forests in Mississippi,Delta National Forest,https://www.fs.usda.gov/detail/mississippi/about-forest/districts/?cid=stelprdb5209587,National Forest,147',
//         '99080700010343,08,07,0807,2373305.425,501175.866841792,2122806146.43045,148,National Forests in Mississippi,Homochitto National Forest,https://www.fs.usda.gov/detail/mississippi/about-forest/districts/?cid=stelprdb5209590,National Forest,148',
//         '99080700010343,08,07,0807,2373305.425,401172.665196605,3166210843.65362,149,National Forests in Mississippi,Holly Springs National Forest,https://www.fs.usda.gov/detail/mississippi/about-forest/districts/?cid=stelprdb5209589,National Forest,149',
//         '99081100010343,08,11,0811,3026239.898,357286.571125205,1341035773.62842,150,National Forests in North Carolina,Uwharrie National Forest,https://www.fs.usda.gov/nfsnc,National Forest,150',
//         '99081100010343,08,11,0811,3026239.898,263522.167441222,1853765446.13971,151,National Forests in North Carolina,Croatan National Forest,https://www.fs.usda.gov/recarea/nfsnc/null/recarea/?recid=48466&actid=63,National Forest,151',
//         '99081100010343,08,11,0811,3026239.898,1387700.36361985,7420842155.89397,152,National Forests in North Carolina,Pisgah National Forest,https://www.fs.usda.gov/recarea/nfsnc/recarea/?recid=48114,National Forest,152',
//         '99081100010343,08,11,0811,3026239.898,577710.740482919,7864384179.86247,153,National Forests in North Carolina,Nantahala National Forest,https://www.fs.usda.gov/recarea/nfsnc/recarea/?recid=48634,National Forest,153',
//         '99020700010343,02,07,0207,2064866.668,291491.348797486,1532778300.87191,154,Nebraska National Forest,Samuel R. McKelvie National Forest,https://www.fs.usda.gov/recarea/nebraska/recarea/?recid=30324,National Forest,154',
//         '99081300010343,08,13,0813,1921477.822,380886.526731723,2711097624.75202,155,National Forests in Texas,Sam Houston National Forest,https://www.fs.usda.gov/detail/texas/about-forest/districts/?cid=fswdev3_008443,National Forest,155',
//         '99081300010343,08,13,0813,1921477.822,448433.932115423,2537727243.08772,156,National Forests in Texas,Sabine National Forest,https://www.fs.usda.gov/detail/texas/about-forest/districts/?cid=fswdev3_008442,National Forest,156',
//         '99081300010343,08,13,0813,1921477.822,423693.799823969,2166146939.56491,157,National Forests in Texas,Davy Crockett National Forest,https://www.fs.usda.gov/detail/texas/about-forest/districts/?cid=fswdev3_008441,National Forest,157',
//         '99081300010343,08,13,0813,1921477.822,448628.012985844,2210097818.52658,158,National Forests in Texas,Angelina National Forest,https://www.fs.usda.gov/detail/texas/about-forest/districts/?cid=fswdev3_008439,National Forest,158',
//         '99080700010343,08,07,0807,2373305.425,616130.550762732,4615143906.12579,159,National Forests in Mississippi,De Soto National Forest,https://www.fs.usda.gov/detail/mississippi/about-forest/districts/?cid=stelprdb5209588,National Forest,159',
//         '99080700010343,08,07,0807,2373305.425,248987.823596594,2204897355.77519,160,National Forests in Mississippi,Bienville National Forest,https://www.fs.usda.gov/detail/mississippi/about-forest/districts/?cid=stelprdb5209585,National Forest,160',
//         '99020600010343,02,06,0206,2334475.93788527,2161790.42666912,16505619889.4436,161,Medicine Bow-Routt National Forest,Medicine Bow-Routt National Forest,https://www.fs.usda.gov/recmain/mbr/recreation,National Forest,161',
//         '99020700010343,02,07,0207,139278.083303249,261624.164600509,1042988279.10306,162,Nebraska National Forest,Nebraska National Forest,https://www.fs.usda.gov/recarea/nebraska/recarea/?recid=30324,National Forest,162',
//         '99021000010343,02,10,0210,1723617.56635132,1769487.67666808,12009814337.1847,163,Arapaho and Roosevelt National Forests,Arapaho and Roosevelt National Forests,https://www.fs.usda.gov/arp,National Forest,163',
//         '99021200010343,02,12,0212,2505052.72874149,2811626.76564314,16740005903.1849,164,Pike and San Isabel National Forests,Pike and San Isabel National Forests,https://www.fs.usda.gov/psicc,National Forest,164',
//         '99030300010343,03,03,0303,2107855.3045764,1899872.65718246,12601798456.1865,165,Cibola National Forest,Cibola National Forest,https://www.fs.usda.gov/detail/cibola/home/?cid=fsbdev3_065702,National Forest,165',
//         '99041500010343,04,15,0415,3002692.69755633,3721401.89110053,23083796473.5009,166,Caribou-Targhee National Forest,Caribou-Targhee National Forest,https://www.fs.usda.gov/detail/ctnf/about-forest/?cid=STELPRDB5110047,National Forest,166',
//         '99050500010343,05,05,0505,1685977.28487555,2486069.45354924,12215610465.1233,167,Klamath National Forest,Klamath National Forest,https://www.fs.usda.gov/klamath,National Forest,167',
//         '99060700010343,06,07,0607,739129.181304614,749799.953446241,5848355772.29413,168,Ochoco National Forest,Ochoco National Forest,https://www.fs.usda.gov/ochoco,National Forest,168',
// ].join('\n');
// const blob = new Blob([csvContent], {type: 'text/csv'});
// const url  = URL.createObjectURL(blob);

      map.add(geoJson);
      })
      .catch(err => {
        console.error(err);
      });
  }
}
