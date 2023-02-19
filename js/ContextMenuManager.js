export default class ContextMenuManager{
    constructor(){
        this.context_menus = [];
        this.active_context_menu = null;
    }

    registerContextMenu(context_menu){
        this.context_menus.push(context_menu);
    }

    update(){
        this.context_menus.forEach(context_menu => {
            context_menu.update();
        })
    }
}