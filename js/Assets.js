import {ship, ship2, enemy, space_station, alien_crawfish, alien_dragonfly, gold, colorSet} from '/js/GameSprites.js'
export const GameSprites = [
    {
        name:'Ship3',
        src:'/images/Ship3.png'
    },
    {
        name:'Ship4',
        src:'/images/Ship4.png'
    },
    {
        name:'Ship5',
        src:'/images/Ship5.png'
    },
    {
        name:'DolphinShip',
        src:'/images/DolphinShip.png'
    },
    {
        name:'Asteroid1',
        src:'/images/Asteroid1.png'
    },
    {
        name:'DolphinianCruiser1',
        src:'/images/DolphinianCruiser1.png'
    },
    {
        name:'DolphinianDestroyer1',
        src:'/images/DolphinianDestroyer1.png'
    },
    {
        name:'DolphinianPod1',
        src:'/images/DolphinianPod1.png'
    },
    {
        name:'DolphinianProwler1',
        src:'/images/DolphinianProwler1.png'
    },
    {
        name:'ThuulePredatorB',
        src:'/images/ThuulePredatorB.png'
    },
    {
        name:'ThuulePredatorG',
        src:'/images/ThuulePredatorG.png'
    },
    {
        name:'ThuulePredatorP',
        src:'/images/ThuulePredatorP.png'
    },
    {
        name:'ThuuleSpawnB',
        src:'/images/ThuuleSpawnB.png'
    },
    {
        name:'ThuuleSpawnG',
        src:'/images/ThuuleSpawnG.png'
    },
    {
        name:'ThuuleSpawnP',
        src:'/images/ThuuleSpawnP.png'
    },
    {
        name:'ProfoundDreadnaught',
        src:'/images/ProfoundDreadnaught.png'
    },
    {
        name:'Stars',
        src:'/images/Stars.png',
    },
    {
        name:'HumanDreadNaught',
        src:'/images/HumanDreadNaught.png',
    },
    {
        name:'ship',
        src:'/images/Ship1A.png'
    },
    {
        name:'ship2',
        data:ship2,
    },
]


export const GameObjects = [
    {
        name : 'ship',
        sprite: 'ship',
        position: [10, 15],
        phys_obj: {},
    },
    {
        name : 'rob',
        sprite: 'Ship3',
        position: [100, 50],
        phys_obj: {},
    },
    {
        name : 'other_rob',
        sprite: 'Ship4',
        position: [90, 100],
        phys_obj: {},
    },
    {
        name : 'other_other_rob',
        sprite: 'Ship5',
        position: [50, 100],
        phys_obj: {},
    },
    {
        name : 'dolphin_ship',
        sprite: 'DolphinShip',
        position: [-50, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianCruiser1',
        sprite: 'DolphinianCruiser1',
        position: [-100, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianDestroyer1',
        sprite: 'DolphinianDestroyer1',
        position: [-150,100],
        phys_obj: {},
    },
    {
        name : 'DolphinianPod1',
        sprite: 'DolphinianPod1',
        position: [-175, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianProwler1',
        sprite: 'DolphinianProwler1',
        position: [-210, 100],
        phys_obj: {},
    },
    {
        name : 'ProfoundDreadnaught',
        sprite: 'ProfoundDreadnaught',
        position: [-270, 500],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorB',
        sprite: 'ThuulePredatorB',
        position: [-300, 400],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorG',
        sprite: 'ThuulePredatorG',
        position: [-470, 500],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorP',
        sprite: 'ThuulePredatorP',
        position: [-500, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnB',
        sprite: 'ThuuleSpawnB',
        position: [-650, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnG',
        sprite: 'ThuuleSpawnG',
        position: [-500, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnP',
        sprite: 'ThuuleSpawnP',
        position: [-550, 100],
        phys_obj: {},
    },
    {
        name : 'HumanDreadNaught',
        sprite: 'HumanDreadNaught',
        position: [0, -200],
        phys_obj: {},
    },
]