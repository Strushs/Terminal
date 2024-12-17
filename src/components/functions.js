export const clear = (arg) => {
    while (document.getElementById(arg).firstChild)
        document.getElementById(arg).lastElementChild.remove();
    }
export const appDiv = (arg) => {
        arg.appendChild(document.createElement("div"));
      };

export const lastDiv = (arg, value, cmdhead) => {
        arg.lastElementChild.innerHTML = cmdhead + value;
      };