import Scene from '/Engine/Scene.js'
import {ship, ship2, enemy, space_station, alien_crawfish, alien_dragonfly, gold, colorSet} from '/js/GameSprites.js'
import {GUI, GUIElement, ContainerElement, ButtonElement} from '/Engine/GUI/GUI.js'
import {Helpers} from '/Engine/Helpers.js';
import Entity from '/Engine/Entity.js';
import Ship from '/js/Ship.js';
import GameItem from '/js/GameItem.js';
import {WeaponSystem, Weapon} from '/js/WeaponSystem.js';

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
    },
    {
        name:'SpaceWeed',
        src:'/images/SpaceWeed1.png'
    },
    {
        name:'ShipEditModeButton1',
        src:'/images/EnterShipEditModeButton.png'
    }
]

export const GameObjects = [
    {
        name : 'ship',
        type:Ship,
        sprite: 'ship',
        position: [10, 15],
        phys_obj: {},
        WeaponSystem:new WeaponSystem({
            weapons:[],            
        })
    },
    {
        name : 'rob',
        type:Ship,
        sprite: 'Ship3',
        position: [100, 50],
        phys_obj: {},
    },
    {
        name : 'other_rob',
        type:Ship,
        sprite: 'Ship4',
        position: [90, 100],
        phys_obj: {},
        WeaponSystem:new WeaponSystem({
            weapons:[
                new Weapon({
                    name:'Laser',
                    type:'Laser',
                    damage:10,
                    cooldown:0.5,
                    range:100,
                    
                })
            ],            
        })
    },
    {
        name : 'other_other_rob',
        type:Ship,
        sprite: 'Ship5',
        position: [50, 100],
        phys_obj: {},
    },
    {
        name : 'dolphin_ship',
        type:Ship,
        sprite: 'DolphinShip',
        position: [-50, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianCruiser1',
        type:Ship,
        sprite: 'DolphinianCruiser1',
        position: [-100, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianDestroyer1',
        type:Ship,
        sprite: 'DolphinianDestroyer1',
        position: [-150,100],
        phys_obj: {},
    },
    {
        name : 'DolphinianPod1',
        type:Ship,
        sprite: 'DolphinianPod1',
        position: [-175, 100],
        phys_obj: {},
    },
    {
        name : 'DolphinianProwler1',
        type:Ship,
        sprite: 'DolphinianProwler1',
        position: [-210, 100],
        phys_obj: {},
    },
    {
        name : 'ProfoundDreadnaught',
        type:Ship,
        sprite: 'ProfoundDreadnaught',
        position: [-270, 500],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorB',
        type:Ship,
        sprite: 'ThuulePredatorB',
        position: [-300, 400],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorG',
        type:Ship,
        sprite: 'ThuulePredatorG',
        position: [-470, 500],
        phys_obj: {},
    },
    {
        name : 'ThuulePredatorP',
        type:Ship,
        sprite: 'ThuulePredatorP',
        position: [-500, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnB',
        type:Ship,
        sprite: 'ThuuleSpawnB',
        position: [-650, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnG',
        type:Ship,
        sprite: 'ThuuleSpawnG',
        position: [-500, 100],
        phys_obj: {},
    },
    {
        name : 'ThuuleSpawnP',
        type:Ship,
        sprite: 'ThuuleSpawnP',
        position: [-550, 100],
        phys_obj: {},
    },
    {
        name : 'HumanDreadNaught',
        type:Ship,
        sprite: 'HumanDreadNaught',
        position: [0, -200],
        phys_obj: {},
    },
    {
        name:'Space Weed',
        type:GameItem,
        sprite:'SpaceWeed',
        position:[-100,-100],
        phys_obj:{},
    }
]

export const GUIElements = [
    {
        uuid:'inventory',
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
                    },
                    {
                        uuid:'DiscordButton1',
                        type:ButtonElement,
                        position: [5, 46],
                        width:80,
                        height:16,
                        text:'Discord',
                        onclick:(GUI) => {
                            console.log('good')
                        }
                    },
                    {
                        uuid:'OtherButton1',
                        type:ButtonElement,
                        position: [5, 66],
                        width:80,
                        height:16,
                        text:'Discord',
                        onclick:(GUI) => {
                            console.log('good')
                        }
                    },
                    {
                        uuid:'HalfButton1',
                        type:ButtonElement,
                        position: [5, 86],
                        width:38,
                        height:16,
                        text:'Discord',
                        onclick:(GUI) => {
                            console.log('good')
                        }
                    },
                    {
                        uuid:'HalfButton2',
                        type:ButtonElement,
                        position: [47, 86],
                        width:38,
                        height:16,
                        text:'Discord',
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
                    },
                    {
                        uuid:'EnterShipEditButton',
                        type:GUIElement,
                        position:[70,90],
                        width:16,
                        height:16,
                        sprite_name:'ShipEditModeButton1',
                        onclick:(GUI, Game) => {
                            Game.EnterShipEditMode()
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
        
    },
    {
        uuid:'Radar',
        type:ContainerElement,
        width:100,
        height:100,
        position:[650, 250],
        transparency:.5,
        background_color:'blk',
        opened:true,
    },
    {
        uuid:"ContextMenu",
        type:ContainerElement,
        width:80,
        height:120,
        position:[100,100],
        transparency:.5,
        background_color:'drkgry',
        opened:false,
    }
]

export const GameItems = [
    
]

const DevScene = new Scene(GameSprites, GameObjects, GUIElements)

export default DevScene;
