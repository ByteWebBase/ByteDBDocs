# ByteDBDocs

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 文件结构

```
├── bin
│   └──index.js               # 处理.dbml文件的脚本
│   
├── lib                       # bin调用的函数库
│
├── data
│   └──graph.ts               # 保存.dbml文件处理后的数据
│   
└── src                       # 可视化代码
```

## 开发流程思路

1. 通过包读取.dbml文件并得到db对象
2. 根据db对象生成`graph.ts`
3. 将`graph.ts`加入模板中，并启动

## 参考资料

[antv x6](https://x6.antv.vision/zh/docs/tutorial/about)

[DBML api](https://www.dbml.org/js-module/#api)
