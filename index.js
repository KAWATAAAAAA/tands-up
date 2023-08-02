// @ts-check
import idGen from "./id-gen.js";

/** @typedef { import("./index.d.ts").Message } Message */

const MESSAGE_ACTION = {
  ALIVE_QUERY: 1,
};
const listensToChannelMessage = Symbol("listensToChannelMessage");
const handsUp = Symbol("handsUp");

class TandsUp extends BroadcastChannel {
  /** @param {string} channel */
  constructor(channel) {
    if (!channel) {
      throw new Error("please enter channel name");
    }
    super(channel);
    this.node = idGen.get(4);
    this[listensToChannelMessage]();
    window.desk = this.node;
  }

  [listensToChannelMessage]() {
    this.addEventListener("message", (event) => {
      const { data } = event;
      const { idempotent, ack, cmd } = data;

      const MESSAGE_ACTIONS = {
        [MESSAGE_ACTION.ALIVE_QUERY]: () => {
          if (!ack) {
            return;
          }
          this[handsUp](idempotent);
        },
      };

      MESSAGE_ACTIONS[cmd] && MESSAGE_ACTIONS[cmd]();
    });
  }
  /** @param {string} idempotent */
  [handsUp](idempotent) {
    /** @type { Message } */
    const reply = {
      ack: false,
      idempotent: idempotent,
      cmd: MESSAGE_ACTION.ALIVE_QUERY,
      payload: {
        from: this.node,
      },
    };
    this.postMessage(reply);
  }

  /**
   * 返回当前应用在同一个浏览器下其他🏷️标签页
   * Return to the current application in the same browser Other 🏷️ Tabs
   * @param { number } [patience = 500] 愿意等多久、默认500ms
   * @returns { Promise<Array<string>> }
   *
   * @example
   * const channel = new TandsUp("center")
   * const ids = await channel.all()
   * */
  all(patience = 500) {
    const idempotent = idGen.get(4);
    let collection = [];
    const callback = (event) => {
      const { data } = event;
      const { idempotent: check, payload } = data;
      if (idempotent === check) {
        collection.push(payload.from);
      }
    };
    this.addEventListener("message", callback);

    this.postMessage({
      ack: true,
      idempotent: idempotent,
      cmd: MESSAGE_ACTION.ALIVE_QUERY,
      payload: {
        from: this.node,
      },
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(collection);
        this.removeEventListener("message", callback);
        collection = [];
      }, patience);
    });
  }
  /**
   * 当前应用在同一个浏览器下是否存在于其他🏷️标签页, 返回应答节点的id（仅返回一个）。
   * under the same browser,Does the current application exist in another 🏷️ Tab, return the ID of the response node (only one is returned)
   * @returns { Promise<string> }
   *
   * @example
   * const channel = new TandsUp("center")
   * const id = await channel.race()
   * */
  race() {
    const idempotent = idGen.get(4);

    return new Promise((resolve, reject) => {
      this.addEventListener(
        "message",
        (event) => {
          const { data } = event;
          const { idempotent: check, payload } = data;
          if (idempotent === check) {
            resolve(payload.from);
          }
        },
        { once: true }
      );

      this.postMessage({
        ack: true,
        idempotent: idempotent,
        cmd: MESSAGE_ACTION.ALIVE_QUERY,
        payload: {
          from: this.node,
        },
      });
      setTimeout(reject, 500, "no response!");
    });
  }
}

export default TandsUp;
