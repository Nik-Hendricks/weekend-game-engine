export class WeaponSystem{
    constructor(props){
        this.weapons = [];
        this.current_weapon = 0;
        this.init(props)
    }

    init(props){
        if(typeof props.weapons !== 'undefined'){
            props.weapons.forEach(weapon => {
                this.registerWeapon(weapon)
            })
        }
    }

    registerWeapon(weapon){
        if(weapon instanceof Weapon){
            this.weapons.push(weapon);
        }else{
            this.weapons.push(new Weapon(weapon));
        }
    }

    update(){

    }
}

export class Weapon{
    constructor(props){
        this.fire_rate = 1;
        this.bullet_speed = 1;
        this.bullet_damage = 1;
        this.bullet_type = 'bullet';
    }

    update(){

    }
}