import { dopActivityList } from './plugin-settings.js'
import { inputController } from "./input-controller.js"
import { KeyBoard } from "./keyboard-plugin.js"
import { Mouse } from "./mouse-plugin.js"


const target = document.querySelector('.Car');

const keyBoard = new KeyBoard();
const mouse = new Mouse();

inputController.setTarget(target);
inputController.pluginsAdd(keyBoard, mouse);

let x = 50;
let y = 50;
let color = 'green';
window.requestAnimationFrame(Move);
function Move() {
    if (inputController.isActionActive('right')) {
        x += 0.2;
        target.style.left = `${x}%`;
    }
    if (inputController.isActionActive('left')) {
        x -= 0.2;
        target.style.left = `${x}%`;
    }
    if (inputController.isActionActive('up')) {
        y -= 0.2;
        target.style.top = `${y}%`;
    }
    if (inputController.isActionActive('down')) {
        y += 0.2;
        target.style.top = `${y}%`;
    }
    if (inputController.isActionActive('jump')) {
        color = target.style.backgroundColor = color === 'green' ? 'blue' : 'green';
    } 
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
