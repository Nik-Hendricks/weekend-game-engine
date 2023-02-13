import Scene from '/Engine/Scene.js'
import {ship, ship2, enemy, space_station, alien_crawfish, alien_dragonfly, gold, colorSet} from '/js/GameSprites.js'
import {GUI, GUIElement, ContainerElement, ButtonElement} from '/Engine/GUI/GUI.js'
import {Helpers} from '/Engine/Helpers.js';

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
    {
        name:'ShipManageButton1',
        src:'/images/ShipManageButton1.png'
    },
    {
        name:'AutomationButton1',
        src:'/images/AutomationButton1.png'
    },
    {
        name:'InventoryButton1',
        src:'/images/InventoryButton1.png'
    }
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

export const GUIElements = [
    {
        name:'inventory',
        type:ContainerElement,
        position:[10,20],
        width:100,
        height:200,
        transparency:.5,
        elements:[
            {
                uuid:'ShipManageButton1',
                type:GUIElement,
                position:[5,5],
                width:16,
                height:16,
                sprite_name:'ShipManageButton1',
                onclick:(GUI) => {
                    console.log(GUI.elements)
                    GUI.elements.InventoryView.close();
                    GUI.elements.AutomationView.close();
                    GUI.elements.ShipManageView.open();
                }
            },
            {
                uuid:'InventoryButton1',
                type:GUIElement,
                position:[26,5],
                width:16,
                height:16,
                sprite_name:'InventoryButton1',
                onclick:(GUI) => {
                    GUI.elements.ShipManageView.close();
                    GUI.elements.AutomationView.close();
                    GUI.elements.InventoryView.open();
                    
                }
            },
            {
                uuid:'AutomationButton1',
                type:GUIElement,
                position:[46,5],
                width:16,
                height:16,
                sprite_name:'AutomationButton1',
                onclick:(GUI) => {
                    GUI.elements.ShipManageView.close();
                    GUI.elements.InventoryView.close();
                    GUI.elements.AutomationView.open();
                    console.log('beep beep lettuce')
                }
            },
            {
                uuid:'ShipManageView',
                type:ContainerElement,
                position:[5,26],
                width:90,
                height:170,
                transparency:.5,
                background_color:'blk',
                elements:[
                    {
                        uuid:'ButtonTest1',
                        type:ButtonElement,
                        position: [5, 5],
                        width:80,
                        height:16,
                        text:'Resume',
                        onclick:(GUI) => {
                            console.log('good')
                        }
                    },
                    {
                        uuid:'ButtonTest2',
                        type:ButtonElement,
                        position: [5, 26],
                        width:80,
                        height:16,
                        text:'test',
                        onclick:(GUI) => {
                            console.log('good')
                        }
                    }
                ]
            },
            {
                uuid:'InventoryView',
                type:ContainerElement,
                position:[5,26],
                width:90,
                height:170,
                transparency:.5,
                opened:false,
                background_color:'blk',
                elements:[
                    {
                        uuid:'grid',
                        type:GUIElement,
                        position: [4, 4],
                        width:80,
                        height:16,
                        data: Helpers.build_grid(8, 8, 10),
                        onclick:(GUI) => {
                            console.log('good')
                        }
                    }
                ]
            },
            {
                uuid:'AutomationView',
                type:ContainerElement,
                position:[5,26],
                width:90,
                height:170,
                transparency:.5,
                opened:false,
                background_color:'blk',
            }
        ],
        
    }
]

export const GameItems = [
    
]

const DevScene = new Scene(GameSprites, GameObjects, GUIElements)

export default DevScene;
