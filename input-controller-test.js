import { activityList, dopActivityList } from './plugin-settings.js'
import { InputController } from "./input-controller.js"
import { KeyBoard } from "./keyboard-plugin.js"
import {Mouse} from "./mouse-plugin.js"


const target = document.querySelector('.Car');

const inputController = new InputController(activityList, target);
const keyBoard = new KeyBoard();
const mouse= new Mouse();

inputController.pluginsAdd(keyBoard,mouse);

window.requestAnimationFrame(Move);
let x = 50;
let y = 50;
function Move() {
    if (keyBoard.isActionActive('right')||mouse.isActionActive('right')) {
        x += 0.2;
        target.style.left = `${x}%`;
    }
    if (keyBoard.isActionActive('left')||mouse.isActionActive('left')) {
        x -= 0.2;
        target.style.left = `${x}%`;
    }
    if (keyBoard.isActionActive('up')) {
        y -= 0.2;
        target.style.top = `${y}%`;
    }
    if (keyBoard.isActionActive('down')) {
        y += 0.2;
        target.style.top = `${y}%`;
    }
    if (keyBoard.isActionActive('jump')) {
        target.style.backgroundColor = 'blue'
    } else target.style.backgroundColor = 'green';
    window.requestAnimationFrame(Move)
}


const attach = document.querySelector('.Attach');
attach.onclick = () => {
    inputController.attach(target, false);
};

const detach = document.querySelector('.Detach');
detach.onclick = () => {
    inputController.detach();
};

const jumbBind = document.querySelector('.Jumpbind');
jumbBind.onclick = () => {
    inputController.bindActions(dopActivityList);
};
