# 函数说明

该函数用于根据给定的路径重命名对象的键名，并返回重命名后的深拷贝对象。

# 函数签名

```typescript
export const renameKeysByPath = (
  value: any,
  pathMap: Map<string, string | null>,
  currentPath: string = ""
): any
```

# 参数说明

-  `value`：要转换的对象。
-  `pathMap`：匹配规则 Map 对象，键为要重命名的路径，值为重命名后的键名，或 null 表示删除该键。
-  `currentPath`：可选，内部递归用的当前路径，默认值为 ""。

# 返回值说明

根据规则重命名后的深拷贝对象。

# 使用示例

```typescript
const obj = {
  deps: [{ id: 1 }, { id: 2 }, { id: 3 }],
  posts: [{ id: 1, children: [{ id: 1 }] }, { id: 2 }, { id: 3 }],
  data: {
    id: 1,
  },
  id: 1,
};

renameKeysByPath(
  obj,
  new Map([
    ["deps.*.id", "depId"],
    ["data", "d"],
    ["data.id", "dataId"],
    ["posts.*.children.*.id", "childId"],
    ["posts.*.id", "postId"],
    ["id", null],
  ])
);
```

# 使用注意事项

-  该函数只能处理对象和数组类型的数据，其他类型的数据会直接返回。
-  `pathMap` 中的路径规则中可以使用通配符 `*`，表示匹配任意路径。
-  `pathMap` 中的路径规则中的键名必须是完整的路径，即包含所有父级路径和自身路径。
