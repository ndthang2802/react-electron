import React,{useState} from 'react';
import EnhancedTable from './table/Table'
import {RoomSideBar} from './sidebar.component'
import { Grid } from '@material-ui/core';

const data = [
    {
      "id": 0,
      "floor": 16,
      "number": 70,
      "category": {
        "id": 0,
        "name": "Savannah Fox",
        "price": 809,
        "notes": "235 Polhemus Place, Yettem, South Dakota, 1030"
      },
      "status": {
        "id": 0,
        "title": "Avis Kent",
        "isAvailable": true,
        "notes": "690 Stuyvesant Avenue, Wildwood, District Of Columbia, 4152"
      }
    },
    {
      "id": 1,
      "floor": 15,
      "number": 59,
      "category": {
        "id": 1,
        "name": "Alfreda Duffy",
        "price": 689,
        "notes": "637 Trucklemans Lane, Benson, Northern Mariana Islands, 270"
      },
      "status": {
        "id": 1,
        "title": "Skinner Johns",
        "isAvailable": true,
        "notes": "795 Montrose Avenue, Wilmington, Palau, 1181"
      }
    },
    {
      "id": 2,
      "floor": 1,
      "number": 159,
      "category": {
        "id": 2,
        "name": "Ashlee Roberts",
        "price": 957,
        "notes": "586 Victor Road, Woodruff, Virgin Islands, 947"
      },
      "status": {
        "id": 2,
        "title": "Alexander Barr",
        "isAvailable": false,
        "notes": "847 Nevins Street, Naomi, Alaska, 1344"
      }
    },
    {
      "id": 3,
      "floor": 19,
      "number": 77,
      "category": {
        "id": 3,
        "name": "Kelley Cummings",
        "price": 400,
        "notes": "721 Seton Place, Coalmont, Utah, 9072"
      },
      "status": {
        "id": 3,
        "title": "Brandi Castro",
        "isAvailable": false,
        "notes": "103 Orange Street, Darlington, New York, 8988"
      }
    },
    {
      "id": 4,
      "floor": 8,
      "number": 66,
      "category": {
        "id": 4,
        "name": "Finley Pollard",
        "price": 783,
        "notes": "321 Clifford Place, Loretto, Marshall Islands, 1811"
      },
      "status": {
        "id": 4,
        "title": "Lillian Casey",
        "isAvailable": true,
        "notes": "568 Montana Place, Alleghenyville, Wisconsin, 7054"
      }
    },
    {
      "id": 5,
      "floor": 9,
      "number": 168,
      "category": {
        "id": 5,
        "name": "Dona Chen",
        "price": 495,
        "notes": "539 Atlantic Avenue, Waikele, West Virginia, 1003"
      },
      "status": {
        "id": 5,
        "title": "Dominguez Gilbert",
        "isAvailable": false,
        "notes": "861 Pleasant Place, Marysville, Rhode Island, 8800"
      }
    },
    {
      "id": 6,
      "floor": 2,
      "number": 198,
      "category": {
        "id": 6,
        "name": "Newman Acosta",
        "price": 119,
        "notes": "827 Sunnyside Avenue, Delwood, Alabama, 1900"
      },
      "status": {
        "id": 6,
        "title": "Price Golden",
        "isAvailable": true,
        "notes": "195 Remsen Avenue, Morgandale, North Dakota, 8209"
      }
    },
    {
      "id": 7,
      "floor": 5,
      "number": 136,
      "category": {
        "id": 7,
        "name": "Bertie Walters",
        "price": 590,
        "notes": "732 Ferry Place, Lacomb, Maryland, 7447"
      },
      "status": {
        "id": 7,
        "title": "Erna Chan",
        "isAvailable": false,
        "notes": "899 Lester Court, Otranto, Mississippi, 5827"
      }
    },
    {
      "id": 8,
      "floor": 20,
      "number": 117,
      "category": {
        "id": 8,
        "name": "Rutledge Kaufman",
        "price": 113,
        "notes": "889 Rapelye Street, Tyhee, New Mexico, 9614"
      },
      "status": {
        "id": 8,
        "title": "Jana Keller",
        "isAvailable": true,
        "notes": "830 Claver Place, Hiwasse, Virginia, 5109"
      }
    },
    {
      "id": 9,
      "floor": 6,
      "number": 151,
      "category": {
        "id": 9,
        "name": "Koch Rivers",
        "price": 995,
        "notes": "589 Knickerbocker Avenue, Rodanthe, Wyoming, 7619"
      },
      "status": {
        "id": 9,
        "title": "Newton Odom",
        "isAvailable": false,
        "notes": "552 Clarendon Road, Sunriver, New Hampshire, 3921"
      }
    },
    {
      "id": 10,
      "floor": 20,
      "number": 149,
      "category": {
        "id": 10,
        "name": "Abbott Decker",
        "price": 1000,
        "notes": "328 Bevy Court, Gilmore, North Carolina, 3473"
      },
      "status": {
        "id": 10,
        "title": "Bettie Wilkinson",
        "isAvailable": false,
        "notes": "486 Townsend Street, Unionville, Oklahoma, 169"
      }
    },
    {
      "id": 11,
      "floor": 1,
      "number": 5,
      "category": {
        "id": 11,
        "name": "Janette Harvey",
        "price": 498,
        "notes": "957 Wortman Avenue, Wescosville, American Samoa, 1350"
      },
      "status": {
        "id": 11,
        "title": "Milagros Ayala",
        "isAvailable": false,
        "notes": "684 Seabring Street, Hiko, Florida, 3474"
      }
    },
    {
      "id": 12,
      "floor": 1,
      "number": 169,
      "category": {
        "id": 12,
        "name": "Shelby Mullins",
        "price": 206,
        "notes": "850 Everett Avenue, Ripley, Missouri, 2304"
      },
      "status": {
        "id": 12,
        "title": "Duffy Morse",
        "isAvailable": true,
        "notes": "676 Matthews Court, Sussex, Minnesota, 5309"
      }
    },
    {
      "id": 13,
      "floor": 2,
      "number": 30,
      "category": {
        "id": 13,
        "name": "Anthony Wooten",
        "price": 228,
        "notes": "109 Cypress Court, Roberts, Indiana, 1996"
      },
      "status": {
        "id": 13,
        "title": "Lancaster Lawrence",
        "isAvailable": false,
        "notes": "101 Grove Street, Falmouth, Arkansas, 7267"
      }
    },
    {
      "id": 14,
      "floor": 15,
      "number": 149,
      "category": {
        "id": 14,
        "name": "Mullins Burton",
        "price": 647,
        "notes": "381 Remsen Street, Teasdale, New Jersey, 6035"
      },
      "status": {
        "id": 14,
        "title": "Soto Love",
        "isAvailable": true,
        "notes": "426 Aster Court, Valle, Georgia, 3261"
      }
    }
  ]
function prepareRoomRenderData(data){
    var data_handle = []
    data.map((item)=>{
        var item_handle  = {}
        Object.keys(item).map((key)=>{
           if (typeof(item[key]) !== 'object' ) {
             item_handle[key] = item[key]
           }
           else {
             Object.keys(item[key]).map((_)=>{
               if (_ === 'name' | _ === 'price' || _ === 'notes' & key === 'category' || _ ==='isAvailable' )
                item_handle[_] = item[key][_]
             })
           }
        })
        data_handle.push(item_handle)
    })
    return data_handle
}
export default function Rooms(){
    const Headers = ['number','floor','name','isAvailable','price','notes']
    const data_render = prepareRoomRenderData(data)
    const [selected, setSelected] = useState([]);
    return (
        <React.Fragment>
          <Grid container item xs={4} sm={2}>
            <RoomSideBar  />
          </Grid>
          <Grid container item xs={12} sm={10}>
            <EnhancedTable data={data_render} Headers={Headers} tableName='Rooms' selected={selected} setSelected={setSelected} ></EnhancedTable>
          </Grid>
        </React.Fragment>
    )
}