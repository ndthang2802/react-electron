import React, { useState } from 'react';
import EnhancedTable from './table/Table'
import {BookingSideBar} from './sidebar.component'
import { Grid } from '@material-ui/core';
const data = [
  {
    "index": 63279,
    "start": "2019-03-15T10:14:25 -07:00",
    "checkout": "2019-01-29T01:20:38 -07:00",
    "client": {
      "id": 72686,
      "name": "Mccall Romero",
      "phone": 366090
    },
    "room": {
      "id": 55050,
      "number": 40,
      "floor": 21
    }
  },
  {
    "index": 63171,
    "start": "2018-02-22T05:13:30 -07:00",
    "checkout": "2019-07-16T05:25:28 -07:00",
    "client": {
      "id": 85587,
      "name": "Murphy Ruiz",
      "phone": 163428
    },
    "room": {
      "id": 68279,
      "number": 40,
      "floor": 38
    }
  },
  {
    "index": 96778,
    "start": "2020-01-28T12:54:26 -07:00",
    "checkout": "2019-02-08T08:22:55 -07:00",
    "client": {
      "id": 75696,
      "name": "Robin Coffey",
      "phone": 163010
    },
    "room": {
      "id": 41127,
      "number": 20,
      "floor": 37
    }
  },
  {
    "index": 74909,
    "start": "2018-08-02T08:51:57 -07:00",
    "checkout": "2017-11-05T09:18:57 -07:00",
    "client": {
      "id": 16349,
      "name": "Jefferson Cervantes",
      "phone": 672428
    },
    "room": {
      "id": 72547,
      "number": 22,
      "floor": 34
    }
  },
  {
    "index": 87932,
    "start": "2014-09-20T01:53:34 -07:00",
    "checkout": "2017-12-27T04:36:17 -07:00",
    "client": {
      "id": 20184,
      "name": "Glass Tran",
      "phone": 733564
    },
    "room": {
      "id": 58707,
      "number": 26,
      "floor": 22
    }
  },
  {
    "index": 31594,
    "start": "2021-02-10T04:42:50 -07:00",
    "checkout": "2014-03-28T05:38:49 -07:00",
    "client": {
      "id": 38362,
      "name": "Macdonald Flowers",
      "phone": 120683
    },
    "room": {
      "id": 42853,
      "number": 34,
      "floor": 28
    }
  },
  {
    "index": 79520,
    "start": "2019-05-12T09:52:50 -07:00",
    "checkout": "2018-07-07T12:51:04 -07:00",
    "client": {
      "id": 36527,
      "name": "Bender Strong",
      "phone": 823259
    },
    "room": {
      "id": 26298,
      "number": 31,
      "floor": 33
    }
  },
  {
    "index": 67554,
    "start": "2019-02-21T06:25:15 -07:00",
    "checkout": "2014-08-27T05:36:46 -07:00",
    "client": {
      "id": 94184,
      "name": "Tina Oneill",
      "phone": 336479
    },
    "room": {
      "id": 20008,
      "number": 21,
      "floor": 20
    }
  },
  {
    "index": 19835,
    "start": "2014-11-30T10:05:57 -07:00",
    "checkout": "2017-05-10T02:26:39 -07:00",
    "client": {
      "id": 40039,
      "name": "Keri Pratt",
      "phone": 861362
    },
    "room": {
      "id": 92785,
      "number": 20,
      "floor": 27
    }
  },
  {
    "index": 47116,
    "start": "2015-04-06T02:00:12 -07:00",
    "checkout": "2020-09-19T08:55:06 -07:00",
    "client": {
      "id": 38588,
      "name": "Petra Booker",
      "phone": 260426
    },
    "room": {
      "id": 71595,
      "number": 40,
      "floor": 33
    }
  },
  {
    "index": 23407,
    "start": "2017-06-04T05:23:13 -07:00",
    "checkout": "2014-06-20T08:10:02 -07:00",
    "client": {
      "id": 98923,
      "name": "Noemi Hurst",
      "phone": 958500
    },
    "room": {
      "id": 37494,
      "number": 22,
      "floor": 33
    }
  },
  {
    "index": 41948,
    "start": "2016-01-04T01:31:11 -07:00",
    "checkout": "2014-08-30T04:47:18 -07:00",
    "client": {
      "id": 48150,
      "name": "Kathryn Talley",
      "phone": 515710
    },
    "room": {
      "id": 91051,
      "number": 26,
      "floor": 36
    }
  },
  {
    "index": 29219,
    "start": "2017-06-09T03:43:32 -07:00",
    "checkout": "2018-11-30T09:48:10 -07:00",
    "client": {
      "id": 85680,
      "name": "Lindsey Pierce",
      "phone": 959825
    },
    "room": {
      "id": 51264,
      "number": 30,
      "floor": 21
    }
  },
  {
    "index": 29136,
    "start": "2019-03-16T01:35:15 -07:00",
    "checkout": "2015-01-27T12:18:11 -07:00",
    "client": {
      "id": 15444,
      "name": "Jodie Jacobson",
      "phone": 891439
    },
    "room": {
      "id": 62729,
      "number": 31,
      "floor": 28
    }
  },
  {
    "index": 96213,
    "start": "2018-01-01T06:18:36 -07:00",
    "checkout": "2019-02-11T01:53:57 -07:00",
    "client": {
      "id": 19605,
      "name": "Cherry Hartman",
      "phone": 657351
    },
    "room": {
      "id": 61456,
      "number": 37,
      "floor": 26
    }
  },
  {
    "index": 14495,
    "start": "2018-01-30T10:49:10 -07:00",
    "checkout": "2018-11-18T06:26:04 -07:00",
    "client": {
      "id": 43407,
      "name": "Laura Evans",
      "phone": 476836
    },
    "room": {
      "id": 61413,
      "number": 35,
      "floor": 31
    }
  },
  {
    "index": 47225,
    "start": "2021-03-31T02:22:41 -07:00",
    "checkout": "2019-01-30T07:20:51 -07:00",
    "client": {
      "id": 27992,
      "name": "Holmes Waller",
      "phone": 136771
    },
    "room": {
      "id": 92059,
      "number": 31,
      "floor": 30
    }
  },
  {
    "index": 97746,
    "start": "2020-06-21T01:32:52 -07:00",
    "checkout": "2021-05-28T12:26:43 -07:00",
    "client": {
      "id": 49905,
      "name": "Cassandra Austin",
      "phone": 106079
    },
    "room": {
      "id": 84219,
      "number": 27,
      "floor": 23
    }
  },
  {
    "index": 85068,
    "start": "2019-05-12T03:51:43 -07:00",
    "checkout": "2016-11-26T08:26:42 -07:00",
    "client": {
      "id": 31405,
      "name": "Regina Wong",
      "phone": 472289
    },
    "room": {
      "id": 31693,
      "number": 24,
      "floor": 33
    }
  },
  {
    "index": 39538,
    "start": "2017-08-28T05:57:00 -07:00",
    "checkout": "2014-07-08T11:48:02 -07:00",
    "client": {
      "id": 41835,
      "name": "Marina Kramer",
      "phone": 434809
    },
    "room": {
      "id": 23581,
      "number": 30,
      "floor": 28
    }
  },
  {
    "index": 43854,
    "start": "2015-04-12T02:55:24 -07:00",
    "checkout": "2019-03-02T08:32:54 -07:00",
    "client": {
      "id": 16012,
      "name": "Perkins Baxter",
      "phone": 656944
    },
    "room": {
      "id": 16933,
      "number": 30,
      "floor": 33
    }
  },
  {
    "index": 18956,
    "start": "2014-06-08T04:08:11 -07:00",
    "checkout": "2019-01-15T12:38:10 -07:00",
    "client": {
      "id": 96615,
      "name": "Concetta Gregory",
      "phone": 129114
    },
    "room": {
      "id": 34055,
      "number": 33,
      "floor": 33
    }
  },
  {
    "index": 53757,
    "start": "2016-09-22T05:49:39 -07:00",
    "checkout": "2019-07-24T10:20:29 -07:00",
    "client": {
      "id": 79475,
      "name": "Milagros Lynch",
      "phone": 742928
    },
    "room": {
      "id": 41920,
      "number": 33,
      "floor": 22
    }
  },
  {
    "index": 34862,
    "start": "2018-11-02T10:29:06 -07:00",
    "checkout": "2020-07-25T09:25:02 -07:00",
    "client": {
      "id": 17816,
      "name": "Morton Forbes",
      "phone": 465945
    },
    "room": {
      "id": 33838,
      "number": 33,
      "floor": 37
    }
  },
  {
    "index": 34213,
    "start": "2020-08-21T09:00:16 -07:00",
    "checkout": "2019-05-01T09:35:15 -07:00",
    "client": {
      "id": 96127,
      "name": "Iva Zamora",
      "phone": 163080
    },
    "room": {
      "id": 51422,
      "number": 25,
      "floor": 31
    }
  }
]

function prepareBookingRenderData(data){
    var data_handle = []
    data.map((item)=>{
        var item_handle  = {}
        Object.keys(item).map((key)=>{
           if (typeof(item[key]) !== 'object' ) {
             item_handle[key] = item[key]
           }
           else {
             Object.keys(item[key]).map((_)=>{
               if (key === 'client' & _ === 'id'){
                item_handle['idclient'] = item[key][_]
               }
               else item_handle[_] = item[key][_]
             })
           }
        })
        data_handle.push(item_handle)
    })
    return data_handle
}
export default function Bookings(){
    // api call Room Rentals
    const Headers = ['name','phone','start','checkout','floor','number']
    const data_render = prepareBookingRenderData(data)
    return (
        <React.Fragment>
          <Grid container item xs={4} sm={2}>
            <BookingSideBar  />
          </Grid>
          <Grid container item xs={12} sm={10}>
            <EnhancedTable data={data_render} Headers={Headers} tableName='Bookings' ></EnhancedTable>
          </Grid>
        </React.Fragment>
    )
}