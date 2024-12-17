import {
  VscTerminalCmd,
  VscRemove,
  VscClose,
  VscChromeMaximize,
} from "react-icons/vsc";
import { clear, appDiv, lastDiv } from "./functions.js";
let path = "C:\\Users\\Dawid>->";
export default function Terminal() {
  return (
    <div className="w-auto h-[80vh] mx-[5vw] mt-8 cmdgradientbg flex flex-col rounded-md overflow-x-clip relative">
      <div className="h-8 cmdtopbg text-black flex items-center pl-2 justify-between rounded-md absolute w-full">
        <span className="flex items-center gap-3 select-none">
          <VscTerminalCmd className="text-2xl" />
          <p>Command Prompt</p>
        </span>
        <span className=" h-full flex items-center">
          <button className="cmdbtn">
            <VscRemove />
          </button>
          <button className="cmdbtn text-l">
            <VscChromeMaximize />
          </button>
          <button
            className="cmdbtn text-xl"
            onClick={() => {
              clear("cmd");
            }}
          >
            <VscClose />
          </button>
        </span>
      </div>
      <div id="cmd" className="flex flex-col pl-4 mt-12 break-words"></div>
      <div className="pl-4">
        <span id="path">{path}</span>&nbsp;
        <span id="inp" className="break-words"></span>
      </div>
    </div>
  );
}
let calc = false;
let say = "";
const ignoredKeys = [
  "Control",
  "Shift",
  "Alt",
  "Meta",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "CapsLock",
  "Tab",
  "Escape",
  "Pause",
  "Insert",
  "Home",
  "End",
  "PageUp",
  "PageDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
];

window.addEventListener("keydown", (e) => {
  let inp = document.getElementById("inp");
  const cmdhead = `${path}&nbsp;${inp.innerHTML} <br>`;
  const cmd = document.getElementById("cmd");
  const commands = {
    default: `'${inp.innerHTML}' is not recognized as an internal or external command, try <span id='cmdlist'>cmds</span> to see all commands`,
    cmdsc:
      "hello - prints hello world <br> clear - clears terminal <br> calc - allows you to calculate numbers",
    helloc: "Hello, World!",
    calcc:
      "Calculator mode, try 2+2 <br> type <span id='cmdlist'>exit</span> to exit",
    exit: "Exited calculator",
  };

  if (e.key === "Enter") {
    if (inp.innerHTML.length === 0) return;

    if (inp.innerHTML === "clear") {
      clear("cmd");
    } else if (inp.innerHTML === "cmds") {
      appDiv(cmd);
      lastDiv(cmd, commands["cmdsc"], cmdhead);
    } else if (inp.innerHTML === "hello") {
      appDiv(cmd);
      lastDiv(cmd, commands["helloc"], cmdhead);
    } else if (inp.innerHTML === "calc") {
      appDiv(cmd);
      lastDiv(cmd, commands["calcc"], cmdhead);
      calc = true;
    } else if (inp.innerHTML === "exit") {
      appDiv(cmd);
      lastDiv(cmd, commands["exit"], cmdhead);
      calc = false;
    } else if (inp.innerHTML.slice(0, 4) === "echo") {
      appDiv(cmd);
      say = inp.innerHTML.slice(4, inp.innerHTML.length);
      lastDiv(cmd, say, cmdhead);
    } else {
      if (!calc) {
        appDiv(cmd);
        lastDiv(cmd, commands["default"], cmdhead);
      } else {
        appDiv(cmd);
        lastDiv(cmd, eval(inp.innerHTML), "");
      }
    }
    inp.innerHTML = "";
  } else if (e.key === "Backspace") {
    inp.innerHTML = inp.innerHTML.slice(0, -1);
  } else {
    if (!ignoredKeys.includes(e.key)) {
      inp.innerHTML += e.key;
    }
  }
});
