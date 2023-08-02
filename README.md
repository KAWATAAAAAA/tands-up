# Tandsup

> Tab hands up 🙋🙋🙋🙋
> 🗣️ xxxxxx？
> 🙋🙋🙋🙋!

当前应用在同一个浏览器下同时打开了哪些 tab

# Usage

```js
import Tandsup from "tandsup";

/* 会往window.desk上生成一个随机id，代表当前tab标识 */
let channel = new Tandsup("center");

channel.all(); //当前应用在同一个浏览器下存在几个tab，返回id list, 可以用于检测tab是否存活
channel.race(); // 获取当前应用在同一个浏览器下任意一个 tab，可用于检测至少存在一个打开的tab

channel.onmessage = () => {};
channel.postMessage();
channel.close();
channel.addEventListener();
channel.removeEventListener();
```

# ...

基于 BroadcastChannel 实现，可能没什么卵用，但是写来玩玩, 正好尝试一下 Typescript in JSDoc
