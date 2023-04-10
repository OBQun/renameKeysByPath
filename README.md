# renameKeysByPath

根据路径重命名对象键。

## 用法

```typescript
import { renameKeysByPath } from './renameKeysByPath';

const obj = {
    deps: [{ id: 1 }, { id: 2 }, { id: 3 }],
    posts: [{ id: 1, children: [{ id: 1 }] }, { id: 2 }, { id: 3 }],
    data: {
        id: 1,
    },
    id: 1,
};
const pathMap = new Map([
    ["deps.id", "depId"],
    ["data", "d"],
    ["data.id", "dataId"],
    ["posts.children.id", "childId"],
    ["posts.id", "postId"],
    ["id", null],
]);
const result = renameKeysByPath(obj, pathMap);
console.log(result);
```

输出结果：

```json
{
  "d": {
    "dataId": 1
  },
  "deps": [
    {
      "depId": 1
    },
    {
      "depId": 2
    },
    {
      "depId": 3
    }
  ],
  "posts": [
    {
      "postId": 1,
      "children": [
        {
          "childId": 1
        }
      ]
    },
    {
      "postId": 2
    },
    {
      "postId": 3
    }
  ]
}
```

## API

```typescript
/**
 * 根据路径重命名对象键。
 * @param {any} value 要重命名键的对象。
 * @param {Map<string, string | null>} pathMap 匹配规则 Map 对象，键为要重命名的路径，值为重命名后的键名，或 null 表示删除该键。
 * @param {string} [currentPath=""] 可选，内部递归使用的当前路径。
 * @returns {any} 根据规则重命名后的深拷贝对象。
 */
export declare function renameKeysByPath<T extends object>(
  value: T,
  pathMap: Map<string, string | null>,
  currentPath?: string
): T;
```

## 参数

-  `value`：要重命名键的对象。
-  `pathMap`：匹配规则 Map 对象，键为要重命名的路径，值为重命名后的键名，或 null 表示删除该键。
-  `currentPath`：可选，内部递归使用的当前路径。

## 返回值

返回深拷贝对象，根据规则重命名后的键。

## 注意事项

-  该函数会返回一个新的对象，不会修改原始对象。
-  如果匹配规则中的路径不存在于对象中，则忽略该路径。
-  如果匹配规则中的路径指向的键名已经存在于对象中，则会覆盖原有的键值。
-  如果匹配规则中的路径指向的键名为 null，则会删除该键。
-  如果匹配规则中的路径指向的键名为空字符串，则会将整个对象重命名为指定的键名。
