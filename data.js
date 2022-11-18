export default {
  nodes: [
    {
      id: '527fc112-13de-456f-ac78-d9b797ca2c7d',
      name: 'Emirates Nuclear Energy Corporation',
      tileName: 'BARAKAH ONE',
      type: 'company',
      imageUrl: './assets/textures/plug.png',
      stack: [],
    },
    {
      id: '3a9e7911-9bd4-41fc-abf9-ed99433340c9',
      name: 'Emirates Water and Electricity Company',
      tileName: 'EWEC',
      type: 'company',
      imageUrl: './assets/textures/crane.png',
      stack: [],
    },
    {
      id: 'b487e86d-32c0-477e-aa5a-4f2301fbbaec',
      name: 'Korea Electric Power Corporation',
      tileName: 'KEPKO',
      type: 'company',
      imageUrl: './assets/textures/hand-wrench.png',
      stack: [],
    },
    {
      id: '47b4245e-2dce-437d-a1b1-9b0ff5d7b8b0',
      name: 'Debt & Equity',
      tileName: 'Debt & Equity',
      type: 'stack',
      imageUrl: './assets/textures/observatory.png',
      stack: [
        {
          id: 'd6c2290a-6e9c-4aef-a8e3-0f31a437e488',
          name: 'bank1',
          imageUrl: './assets/textures/observatory.png',
        },
        {
          id: 'd6c2290a-6e9c-4aef-a8e3-0f31a437e489',
          name: 'BOHC',
          imageUrl: './assets/textures/observatory.png',
        },
      ],
    },
  ],
  edges: [
    {
      id: 'c3ed5399-8003-474d-a73b-64c5010b45e2',
      name: 'Prime Contract',
      source: '527fc112-13de-456f-ac78-d9b797ca2c7d',
      target: 'b487e86d-32c0-477e-aa5a-4f2301fbbaec',
      docs: [
        {
          name: '4 - 03 Electricty Generation Licence',
          url: 'https://drive.google.com/file/d/1PCVxk4TXf9c0b4iw9UsUqGjzNlt9cOsU/view?usp=sharing',
        },
        {
          name: '5 - 11 Completion Support Agreement',
          url: 'https://drive.google.com/file/d/1vwvJgu09O0wyPPw39Y0G2pyBNTXBX1Jt/view?usp=sharing',
        },
      ],
    },
    {
      id: 'c3ed5399-8003-474d-a73b-64c5010b45e2',
      name: 'Debt & Equity Documents',
      source: '527fc112-13de-456f-ac78-d9b797ca2c7d',
      target: '47b4245e-2dce-437d-a1b1-9b0ff5d7b8b0',
      docs: [
        {
          name: 'Debt &  Equity document 1',
          url: 'https://drive.google.com/file/d/1PCVxk4TXf9c0b4iw9UsUqGjzNlt9cOsU/view?usp=sharing',
        },
        {
          name: 'Debt & Equity Document 2',
          url: 'https://drive.google.com/file/d/1vwvJgu09O0wyPPw39Y0G2pyBNTXBX1Jt/view?usp=sharing',
        },
      ],
    },
    {
      id: 'da8f8c4d-6750-4049-a74f-380972e8209b',
      name: 'Contract number 2',
      source: '527fc112-13de-456f-ac78-d9b797ca2c7d',
      target: '3a9e7911-9bd4-41fc-abf9-ed99433340c9',
      docs: [
        {
          name: 'Maintenance Contract',
          url: 'https://drive.google.com/file/d/1PCVxk4TXf9c0b4iw9UsUqGjzNlt9cOsU/view?usp=sharing',
        },
        {
          name: 'Maintenance Contract 2',
          url: 'https://drive.google.com/file/d/1PCVxk4TXf9c0b4iw9UsUqGjzNlt9cOsU/view?usp=sharing',
        },
        {
          name: 'Maintenance Contract 3',
          url: 'https://drive.google.com/file/d/1PCVxk4TXf9c0b4iw9UsUqGjzNlt9cOsU/view?usp=sharing',
        },
        {
          name: 'Master Agreement',
          url: 'https://drive.google.com/file/d/1vwvJgu09O0wyPPw39Y0G2pyBNTXBX1Jt/view?usp=sharing',
        },
      ],
    },
  ],
};
