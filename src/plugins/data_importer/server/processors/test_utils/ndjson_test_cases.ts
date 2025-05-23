/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface NDJSONTestCaseFormat {
  rawString: string[];
  expected: Array<Record<any, any>>;
}

export const VALID_NDJSON_TEST_CASES: NDJSONTestCaseFormat[] = [
  {
    rawString: [
      `{"index":0,"guid":"2fe66841-5d5f-4341-bcf1-7de152de3516","isActive":true,"balance":"$3,999.21","picture":"example.com","age":23,"eyeColor":"blue","name":"Watson Rasmussen","gender":"male","company":"DADABASE","email":"watsonrasmussen@example.com","phone":"+1 (818) 413-3869","address":"225 Lincoln Road, Salunga, Oregon, 1912","about":"Consectetur incididunt do ad eu aliquip. Ipsum dolore est aute quis dolor sit sit Lorem qui duis. Aliquip amet ea ullamco exercitation velit consequat.\\r\\n","registered":"2022-03-14T08:16:17 +07:00","latitude":-14.235158,"longitude":-126.483142,"tags":["eiusmod","ut","laboris","reprehenderit","voluptate","commodo","occaecat"],"friends":[{"id":0,"name":"Brittany Griffith"},{"id":1,"name":"Lelia Bolton"},{"id":2,"name":"Stephanie Paul"}],"greeting":"Hello, Watson Rasmussen! You have 9 unread messages.","favoriteFruit":"apple"}`,
      `{"index":1,"guid":"c8014edd-0efb-411f-8138-c14ab6fe502f","isActive":true,"balance":"$1,829.06","picture":"example.com","age":31,"eyeColor":"brown","name":"Charity Bradford","gender":"female","company":"MAGNINA","email":"charitybradford@example.com","phone":"+1 (865) 488-3455","address":"550 Martense Street, Beason, New Mexico, 5488","about":"Eiusmod ipsum cupidatat ut non ea. Excepteur dolor exercitation ipsum quis ipsum minim amet. Ad do id nostrud laboris do deserunt ea non. Adipisicing dolore elit cupidatat exercitation. Minim reprehenderit occaecat laborum sint quis quis pariatur Lorem. Sunt sunt labore labore dolore.\\r\\n","registered":"2017-03-06T11:29:42 +08:00","latitude":-78.400609,"longitude":-19.696437,"tags":["in","amet","labore","ex","voluptate","laborum","officia"],"friends":[{"id":0,"name":"Hallie Cooley"},{"id":1,"name":"Jamie Collier"},{"id":2,"name":"Lowe Bradshaw"}],"greeting":"Hello, Charity Bradford! You have 6 unread messages.","favoriteFruit":"strawberry"}`,
      `{"index":2,"guid":"f086603b-0856-4033-a7ef-408d7c200984","isActive":true,"balance":"$1,584.85","picture":"example.com","age":38,"eyeColor":"brown","name":"Stafford Odom","gender":"male","company":"QUADEEBO","email":"staffordodom@example.com","phone":"+1 (859) 565-2942","address":"262 Anna Court, Gardners, Colorado, 2959","about":"Labore eiusmod nostrud tempor esse culpa exercitation do est dolor elit amet Lorem ad. Officia mollit aliquip laborum exercitation est. Elit incididunt ipsum occaecat elit excepteur nulla quis. Labore voluptate sit consequat magna minim proident ad sunt velit eu culpa do esse amet. Voluptate enim exercitation non elit consequat enim. Dolor ipsum mollit qui ipsum aute dolore aute in est nostrud officia do culpa.\\r\\n","registered":"2018-03-28T04:23:02 +07:00","latitude":84.307741,"longitude":147.311241,"tags":["et","culpa","commodo","reprehenderit","tempor","consequat","do"],"friends":[{"id":0,"name":"Norman Ingram"},{"id":1,"name":"Cathleen Bishop"},{"id":2,"name":"Elvira Castaneda"}],"greeting":"Hello, Stafford Odom! You have 3 unread messages.","favoriteFruit":"banana"}`,
      `{"index":3,"guid":"766d8beb-2513-4485-aa77-a48f755caab5","isActive":true,"balance":"$3,967.16","picture":"example.com","age":28,"eyeColor":"green","name":"Branch Stuart","gender":"male","company":"KINETICA","email":"branchstuart@example.com","phone":"+1 (889) 485-3565","address":"861 Monitor Street, Richville, South Carolina, 4203","about":"Minim aute nisi Lorem amet veniam. Proident ea mollit labore sint amet aliqua esse nostrud. Ea Lorem cillum minim ut dolore anim cillum ipsum in voluptate enim. Aliqua non incididunt duis culpa quis cupidatat. Sint magna minim cillum Lorem irure fugiat nulla consectetur. Cupidatat commodo Lorem nulla commodo ad consequat est proident qui eiusmod culpa amet elit.\\r\\n","registered":"2023-04-19T04:41:24 +07:00","latitude":30.87967,"longitude":-147.679292,"tags":["eu","velit","quis","proident","ex","culpa","dolor"],"friends":[{"id":0,"name":"Herman Lane"},{"id":1,"name":"Ingrid Pierce"},{"id":2,"name":"Ferguson Lindsay"}],"greeting":"Hello, Branch Stuart! You have 2 unread messages.","favoriteFruit":"banana"}`,
      `{"index":4,"guid":"5be59864-3cd0-47b2-a4d7-70f823dbc0ea","isActive":true,"balance":"$2,681.05","picture":"example.com","age":40,"eyeColor":"green","name":"Jo Nash","gender":"female","company":"FURNAFIX","email":"jonash@example.com","phone":"+1 (969) 504-2988","address":"931 Prince Street, Herald, Hawaii, 6686","about":"Id labore eiusmod commodo pariatur incididunt velit ea sunt id et eiusmod commodo consectetur. Id id do amet minim cillum. Eiusmod duis deserunt velit id laboris culpa laboris fugiat consectetur ex. Commodo minim et labore cillum esse qui non excepteur est aliquip pariatur eiusmod.\\r\\n","registered":"2020-07-15T01:28:08 +07:00","latitude":76.643551,"longitude":111.097854,"tags":["consectetur","exercitation","officia","et","ex","non","est"],"friends":[{"id":0,"name":"Phoebe Rosa"},{"id":1,"name":"Aurora Sosa"},{"id":2,"name":"Julianne Acosta"}],"greeting":"Hello, Jo Nash! You have 5 unread messages.","favoriteFruit":"strawberry"}`,
      `{"index":5,"guid":"076bd26d-daba-4f2e-9dca-feae02331856","isActive":true,"balance":"$2,427.13","picture":"example.com","age":33,"eyeColor":"blue","name":"Rowe Taylor","gender":"male","company":"MAZUDA","email":"rowetaylor@example.com","phone":"+1 (891) 520-3186","address":"779 Highlawn Avenue, Rew, Rhode Island, 7836","about":"Tempor labore esse officia ut consectetur nisi excepteur consectetur Lorem non. Enim sunt exercitation consequat dolore qui velit proident ex sint anim quis. Labore do nisi non minim occaecat dolore nisi velit laboris enim ad ullamco consequat. Est excepteur veniam commodo proident elit dolor. Qui mollit quis sit anim ipsum et.\\r\\n","registered":"2024-09-02T07:35:33 +07:00","latitude":43.61443,"longitude":-108.026998,"tags":["proident","cillum","et","proident","nostrud","nulla","cillum"],"friends":[{"id":0,"name":"Collins Mullins"},{"id":1,"name":"Latisha Willis"},{"id":2,"name":"Price Hoffman"}],"greeting":"Hello, Rowe Taylor! You have 9 unread messages.","favoriteFruit":"banana"}`,
      `{"index":6,"guid":"2d52072d-ce4c-4889-8544-aeaf195acff1","isActive":false,"balance":"$2,300.79","picture":"example.com","age":28,"eyeColor":"green","name":"Tamera Daniels","gender":"female","company":"NAVIR","email":"tameradaniels@example.com","phone":"+1 (883) 580-2660","address":"395 Vandervoort Avenue, Graball, North Carolina, 4702","about":"Cupidatat exercitation sint est sunt irure cillum ullamco excepteur. Reprehenderit sit do sint Lorem amet officia consectetur cupidatat ad. Est labore duis fugiat deserunt duis eiusmod cillum do Lorem reprehenderit ea nulla deserunt velit. Officia non in velit laborum sit. Incididunt nisi reprehenderit in commodo commodo minim ea sint sunt officia officia. Est est irure mollit aute reprehenderit excepteur commodo aliquip magna nisi tempor id voluptate.\\r\\n","registered":"2019-12-23T01:28:23 +08:00","latitude":-6.896081,"longitude":-174.084986,"tags":["deserunt","enim","adipisicing","esse","amet","minim","sint"],"friends":[{"id":0,"name":"Celina Guerrero"},{"id":1,"name":"Tate Kirk"},{"id":2,"name":"Elnora Henson"}],"greeting":"Hello, Tamera Daniels! You have 4 unread messages.","favoriteFruit":"apple"}`,
    ],
    expected: [
      {
        index: 0,
        guid: '2fe66841-5d5f-4341-bcf1-7de152de3516',
        isActive: true,
        balance: '$3,999.21',
        picture: 'example.com',
        age: 23,
        eyeColor: 'blue',
        name: 'Watson Rasmussen',
        gender: 'male',
        company: 'DADABASE',
        email: 'watsonrasmussen@example.com',
        phone: '+1 (818) 413-3869',
        address: '225 Lincoln Road, Salunga, Oregon, 1912',
        about:
          'Consectetur incididunt do ad eu aliquip. Ipsum dolore est aute quis dolor sit sit Lorem qui duis. Aliquip amet ea ullamco exercitation velit consequat.\r\n',
        registered: '2022-03-14T08:16:17 +07:00',
        latitude: -14.235158,
        longitude: -126.483142,
        tags: ['eiusmod', 'ut', 'laboris', 'reprehenderit', 'voluptate', 'commodo', 'occaecat'],
        friends: [
          { id: 0, name: 'Brittany Griffith' },
          { id: 1, name: 'Lelia Bolton' },
          { id: 2, name: 'Stephanie Paul' },
        ],
        greeting: 'Hello, Watson Rasmussen! You have 9 unread messages.',
        favoriteFruit: 'apple',
      },
      {
        index: 1,
        guid: 'c8014edd-0efb-411f-8138-c14ab6fe502f',
        isActive: true,
        balance: '$1,829.06',
        picture: 'example.com',
        age: 31,
        eyeColor: 'brown',
        name: 'Charity Bradford',
        gender: 'female',
        company: 'MAGNINA',
        email: 'charitybradford@example.com',
        phone: '+1 (865) 488-3455',
        address: '550 Martense Street, Beason, New Mexico, 5488',
        about:
          'Eiusmod ipsum cupidatat ut non ea. Excepteur dolor exercitation ipsum quis ipsum minim amet. Ad do id nostrud laboris do deserunt ea non. Adipisicing dolore elit cupidatat exercitation. Minim reprehenderit occaecat laborum sint quis quis pariatur Lorem. Sunt sunt labore labore dolore.\r\n',
        registered: '2017-03-06T11:29:42 +08:00',
        latitude: -78.400609,
        longitude: -19.696437,
        tags: ['in', 'amet', 'labore', 'ex', 'voluptate', 'laborum', 'officia'],
        friends: [
          { id: 0, name: 'Hallie Cooley' },
          { id: 1, name: 'Jamie Collier' },
          { id: 2, name: 'Lowe Bradshaw' },
        ],
        greeting: 'Hello, Charity Bradford! You have 6 unread messages.',
        favoriteFruit: 'strawberry',
      },
      {
        index: 2,
        guid: 'f086603b-0856-4033-a7ef-408d7c200984',
        isActive: true,
        balance: '$1,584.85',
        picture: 'example.com',
        age: 38,
        eyeColor: 'brown',
        name: 'Stafford Odom',
        gender: 'male',
        company: 'QUADEEBO',
        email: 'staffordodom@example.com',
        phone: '+1 (859) 565-2942',
        address: '262 Anna Court, Gardners, Colorado, 2959',
        about:
          'Labore eiusmod nostrud tempor esse culpa exercitation do est dolor elit amet Lorem ad. Officia mollit aliquip laborum exercitation est. Elit incididunt ipsum occaecat elit excepteur nulla quis. Labore voluptate sit consequat magna minim proident ad sunt velit eu culpa do esse amet. Voluptate enim exercitation non elit consequat enim. Dolor ipsum mollit qui ipsum aute dolore aute in est nostrud officia do culpa.\r\n',
        registered: '2018-03-28T04:23:02 +07:00',
        latitude: 84.307741,
        longitude: 147.311241,
        tags: ['et', 'culpa', 'commodo', 'reprehenderit', 'tempor', 'consequat', 'do'],
        friends: [
          { id: 0, name: 'Norman Ingram' },
          { id: 1, name: 'Cathleen Bishop' },
          { id: 2, name: 'Elvira Castaneda' },
        ],
        greeting: 'Hello, Stafford Odom! You have 3 unread messages.',
        favoriteFruit: 'banana',
      },
      {
        index: 3,
        guid: '766d8beb-2513-4485-aa77-a48f755caab5',
        isActive: true,
        balance: '$3,967.16',
        picture: 'example.com',
        age: 28,
        eyeColor: 'green',
        name: 'Branch Stuart',
        gender: 'male',
        company: 'KINETICA',
        email: 'branchstuart@example.com',
        phone: '+1 (889) 485-3565',
        address: '861 Monitor Street, Richville, South Carolina, 4203',
        about:
          'Minim aute nisi Lorem amet veniam. Proident ea mollit labore sint amet aliqua esse nostrud. Ea Lorem cillum minim ut dolore anim cillum ipsum in voluptate enim. Aliqua non incididunt duis culpa quis cupidatat. Sint magna minim cillum Lorem irure fugiat nulla consectetur. Cupidatat commodo Lorem nulla commodo ad consequat est proident qui eiusmod culpa amet elit.\r\n',
        registered: '2023-04-19T04:41:24 +07:00',
        latitude: 30.87967,
        longitude: -147.679292,
        tags: ['eu', 'velit', 'quis', 'proident', 'ex', 'culpa', 'dolor'],
        friends: [
          { id: 0, name: 'Herman Lane' },
          { id: 1, name: 'Ingrid Pierce' },
          { id: 2, name: 'Ferguson Lindsay' },
        ],
        greeting: 'Hello, Branch Stuart! You have 2 unread messages.',
        favoriteFruit: 'banana',
      },
      {
        index: 4,
        guid: '5be59864-3cd0-47b2-a4d7-70f823dbc0ea',
        isActive: true,
        balance: '$2,681.05',
        picture: 'example.com',
        age: 40,
        eyeColor: 'green',
        name: 'Jo Nash',
        gender: 'female',
        company: 'FURNAFIX',
        email: 'jonash@example.com',
        phone: '+1 (969) 504-2988',
        address: '931 Prince Street, Herald, Hawaii, 6686',
        about:
          'Id labore eiusmod commodo pariatur incididunt velit ea sunt id et eiusmod commodo consectetur. Id id do amet minim cillum. Eiusmod duis deserunt velit id laboris culpa laboris fugiat consectetur ex. Commodo minim et labore cillum esse qui non excepteur est aliquip pariatur eiusmod.\r\n',
        registered: '2020-07-15T01:28:08 +07:00',
        latitude: 76.643551,
        longitude: 111.097854,
        tags: ['consectetur', 'exercitation', 'officia', 'et', 'ex', 'non', 'est'],
        friends: [
          { id: 0, name: 'Phoebe Rosa' },
          { id: 1, name: 'Aurora Sosa' },
          { id: 2, name: 'Julianne Acosta' },
        ],
        greeting: 'Hello, Jo Nash! You have 5 unread messages.',
        favoriteFruit: 'strawberry',
      },
      {
        index: 5,
        guid: '076bd26d-daba-4f2e-9dca-feae02331856',
        isActive: true,
        balance: '$2,427.13',
        picture: 'example.com',
        age: 33,
        eyeColor: 'blue',
        name: 'Rowe Taylor',
        gender: 'male',
        company: 'MAZUDA',
        email: 'rowetaylor@example.com',
        phone: '+1 (891) 520-3186',
        address: '779 Highlawn Avenue, Rew, Rhode Island, 7836',
        about:
          'Tempor labore esse officia ut consectetur nisi excepteur consectetur Lorem non. Enim sunt exercitation consequat dolore qui velit proident ex sint anim quis. Labore do nisi non minim occaecat dolore nisi velit laboris enim ad ullamco consequat. Est excepteur veniam commodo proident elit dolor. Qui mollit quis sit anim ipsum et.\r\n',
        registered: '2024-09-02T07:35:33 +07:00',
        latitude: 43.61443,
        longitude: -108.026998,
        tags: ['proident', 'cillum', 'et', 'proident', 'nostrud', 'nulla', 'cillum'],
        friends: [
          { id: 0, name: 'Collins Mullins' },
          { id: 1, name: 'Latisha Willis' },
          { id: 2, name: 'Price Hoffman' },
        ],
        greeting: 'Hello, Rowe Taylor! You have 9 unread messages.',
        favoriteFruit: 'banana',
      },
      {
        index: 6,
        guid: '2d52072d-ce4c-4889-8544-aeaf195acff1',
        isActive: false,
        balance: '$2,300.79',
        picture: 'example.com',
        age: 28,
        eyeColor: 'green',
        name: 'Tamera Daniels',
        gender: 'female',
        company: 'NAVIR',
        email: 'tameradaniels@example.com',
        phone: '+1 (883) 580-2660',
        address: '395 Vandervoort Avenue, Graball, North Carolina, 4702',
        about:
          'Cupidatat exercitation sint est sunt irure cillum ullamco excepteur. Reprehenderit sit do sint Lorem amet officia consectetur cupidatat ad. Est labore duis fugiat deserunt duis eiusmod cillum do Lorem reprehenderit ea nulla deserunt velit. Officia non in velit laborum sit. Incididunt nisi reprehenderit in commodo commodo minim ea sint sunt officia officia. Est est irure mollit aute reprehenderit excepteur commodo aliquip magna nisi tempor id voluptate.\r\n',
        registered: '2019-12-23T01:28:23 +08:00',
        latitude: -6.896081,
        longitude: -174.084986,
        tags: ['deserunt', 'enim', 'adipisicing', 'esse', 'amet', 'minim', 'sint'],
        friends: [
          { id: 0, name: 'Celina Guerrero' },
          { id: 1, name: 'Tate Kirk' },
          { id: 2, name: 'Elnora Henson' },
        ],
        greeting: 'Hello, Tamera Daniels! You have 4 unread messages.',
        favoriteFruit: 'apple',
      },
    ],
  },
];

export const INVALID_NDJSON_TEST_CASES: NDJSONTestCaseFormat[] = [
  {
    rawString: [
      `{"message":"Hello, Sandrine! Your order number is: #46","phoneNumber":"681.851.2611 x9828","phoneVariation":"+90 379 779 10 56","status":"disabled","name":{"first":"Buddy","middle":"Parker","last":"Huel"},"username":"Buddy-Huel","password":"bNSsCEpwcRMy2Gk","emails":["Don_Orn84@example.com","Clifton_Murazik@example.com"],"location":{"street":"11126 Noelia Stream","city":"Port Leda","state":"South Dakota","country":"Mongolia","zip":"44959","coordinates":{"latitude":"-46.744","longitude":"-139.6626"}},"website":"example.com","domain":"golden-booking.biz","job":{"title":"Forward Metrics Technician","descriptor":"Product","area":"Creative","type":"Specialist","company":"Howe Inc"},"creditCard":{"number":"3053-749605-8798","cvv":"216","issuer":"mastercard"},"uuid":"27e71328-417d-475b-b0e1-928243586cf7","objectId":"678464324ca493083b91b0cf"}`,
      `{"message":"Hello, Orlo! Your order number is: #76","phoneNumber":"525-430-8269","phoneVariation":"+90 377 726 10 93","status":"disabled","name":{"first":"Rosario","middle":"Parker","last":"Rowe"},"username":"Rosario-Rowe","password":"_Zq3znxnG_sVdZq","emails":["Roman48@example.com","Lori_Schumm@example.com"],"location":{"street":"553 Antonette Mountain","city":"Dareburgh","state":"Ohio","country":"China","zip":"50188","coordinates":{"latitude":"-41.7727","longitude":"17.8506"},"website":"example.com","domain":"stingy-impala.org","job":{"title":"Principal Program Executive","descriptor":"Central","area":"Creative","type":"Supervisor","company":"Leannon - Hodkiewicz"},"creditCard":{"number":"2380-6766-3889-0510","cvv":"033","issuer":"visa"},"uuid":"fc770d8c-c377-4ba2-a3b2-1be4d4b22bb2","objectId":"678464324ca493083b91b0d0"}`,
      `{"message":"Hello, Enid! Your order number is: #8","phoneNumber":"(380) 689-8338 x720","phoneVariation":"+90 356 576 10 49","status":"disabled","name":{"first":"Margarette","middle":"Blake","last":"Rohan"},"username":"Margarette-Rohan","password":"egqD4RardZ7KCPw","emails":["Betty99@example.com","Jerod44@example.com"],"location":{"street":"57952 Legros Port","city":"Raynorshire","state":"Arkansas","country":"Netherlands","zip":"23393-2658","coordinates":{"latitude":"-44.6269","longitude":"172.8557"}},"website":"example.com","domain":"elastic-museum.info","job":{"title":"Dynamic Branding Specialist","descriptor":"Regional","area":"Implementation","type":"Administrator","company":"Toy, Lebsack and Hand"},"creditCard":{"number":"6011-0087-1350-3388","cvv":"846","issuer":"american_express"},"uuid":"349ea673-c8bd-4aa6-8ecf-69f2ad033d62","objectId":"678464324ca493083b91b0d1"}`,
      `{"message":"Hello, Arlene! Your order number is: #65","phoneNumber":"(579) 231-4161 x26674","phoneVariation":"+90 346 189 10 75","status":"active","name":{"first":"Gilda","middle":"Jules","last":"Crist"},"username":"Gilda-Crist","password":"EsEfmq2j9dqTrjg","emails":["Angelo_Keebler-Farrell@example.com","Elta.Corkery51@example.com"],"location":{"street":"58402 Hassan Crossroad","city":"Gilbert","state":"Minnesota","country":"Armenia","zip":"60044-4839","coordinates":{"latitude":"-21.4405","longitude":"158.3099"}},"website":"example.com","domain":"austere-land.org","job":{"title":"National Applications Executive","descriptor":"Product","area":"Accountability","type":"Officer","company":"O'Reilly LLC"},"creditCard":{"number":"2558-3265-6705-0464","cvv":"970","issuer":"visa"},"uuid":"995c02be-847c-4ff3-8f31-fcd75402d2ba","objectId":"678464324ca493083b91b0d2"}`,
    ],
    expected: [],
  },
  {
    rawString: [
      `{"index":1,"guid":"c8014edd-0efb-411f-8138-c14ab6fe502f","isActive":true,"balance":"$1,829.06","picture":"example.com","age":31,"eyeColor":"brown","name":"Charity Bradford","gender":"female","company":"MAGNINA","email":"charitybradford@example.com","phone":"+1 (865) 488-3455","address":"550 Martense Street, Beason, New Mexico, 5488","about":"Eiusmod ipsum cupidatat ut non ea. Excepteur dolor exercitation ipsum quis ipsum minim amet. Ad do id nostrud laboris do deserunt ea non. Adipisicing dolore elit cupidatat exercitation. Minim reprehenderit occaecat laborum sint quis quis pariatur Lorem. Sunt sunt labore labore dolore.\\r\\n","registered":"2017-03-06T11:29:42 +08:00","latitude":-78.400609,"longitude":-19.696437,"tags":["in","amet","labore","ex","voluptate","laborum","officia"],"friends":[{"id":0,"name":"Hallie Cooley"},{"id":1,"name":"Jamie Collier"},{"id":2,"name":"Lowe Bradshaw"}],"greeting":"Hello, Charity Bradford! You have 6 unread messages.","favoriteFruit":"strawberry"}`,
      `{"index":2,"guid":"f086603b-0856-4033-a7ef-408d7c200984","isActive":true,"balance":"$1,584.85","picture":"example.com","age":38,"eyeColor":"brown","name":"Stafford Odom","gender":"male","company":"QUADEEBO","email":"staffordodom@example.com","phone":"+1 (859) 565-2942","address":"262 Anna Court, Gardners, Colorado, 2959","about":"Labore eiusmod nostrud tempor esse culpa exercitation do est dolor elit amet Lorem ad. Officia mollit aliquip laborum exercitation est. Elit incididunt ipsum occaecat elit excepteur nulla quis. Labore voluptate sit consequat magna minim proident ad sunt velit eu culpa do esse amet. Voluptate enim exercitation non elit consequat enim. Dolor ipsum mollit qui ipsum aute dolore aute in est nostrud officia do culpa.\\r\\n","registered":"2018-03-28T04:23:02 +07:00","latitude":84.307741,"longitude":147.311241,"tags":["et","culpa","commodo","reprehenderit","tempor","consequat","do"],"friends":[{"id":0,"name":"Norman Ingram"},{"id":1,"name":"Cathleen Bishop"},{"id":2,"name":"Elvira Castaneda"}],"greeting":"Hello, Stafford Odom! You have 3 unread messages.","favoriteFruit":"banana"}`,
      `{"index":3,"guid":"766d8beb-2513-4485-aa77-a48f755caab5","isActive":true,"balance":"$3,967.16","picture":"example.com","age":28,"eyeColor":"green","name":"Branch Stuart","gender":"male","company":"KINETICA","email":"branchstuart@example.com","phone":"+1 (889) 485-3565","address":"861 Monitor Street, Richville, South Carolina, 4203","about":"Minim aute nisi Lorem amet veniam. Proident ea mollit labore sint amet aliqua esse nostrud. Ea Lorem cillum minim ut dolore anim cillum ipsum in voluptate enim. Aliqua non incididunt duis culpa quis cupidatat. Sint magna minim cillum Lorem irure fugiat nulla consectetur. Cupidatat commodo Lorem nulla commodo ad consequat est proident qui eiusmod culpa amet elit.\\r\\n","registered":"2023-04-19T04:41:24 +07:00","latitude":30.87967,"longitude":-147.679292,"tags":["eu","velit","quis","proident","ex","culpa","dolor"],"friends":[{"id":0,"name":"Herman Lane"},{"id":1,"name":"Ingrid Pierce"},{"id":2,"name":"Ferguson Lindsay"}],"greeting":"Hello, Branch Stuart! You have 2 unread messages.","favoriteFruit":"banana"}`,
      `{"index":4,"guid":"5be59864-3cd0-47b2-a4d7-70f823dbc0ea","isActive":true,"balance":"$2,681.05","picture":"example.com","age":40,"eyeColor":"green","name":"Jo Nash","gender":"female","company":"FURNAFIX","email":"jonash@example.com","phone":"+1 (969) 504-2988","address":"931 Prince Street, Herald, Hawaii, 6686","about":"Id labore eiusmod commodo pariatur incididunt velit ea sunt id et eiusmod commodo consectetur. Id id do amet minim cillum. Eiusmod duis deserunt velit id laboris culpa laboris fugiat consectetur ex. Commodo minim et labore cillum esse qui non excepteur est aliquip pariatur eiusmod.\\r\\n","registered":"2020-07-15T01:28:08 +07:00","latitude":76.643551,"longitude":111.097854,"tags":["consectetur","exercitation","officia","et","ex","non","est"],"friends":[{"id":0,"name":"Phoebe Rosa"},{"id":1,"name":"Aurora Sosa"},{"":2,"name":"Julianne Acosta"}],"greeting":"Hello, Jo Nash! You have 5 unread messages.","favoriteFruit":"strawberry"}`,
    ],
    expected: [],
  },
];
