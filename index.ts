/**
 * 根据路径重命名键
 * @param {any} value 要转换的对象
 * @param {Map<string, string | null>} pathMap 匹配规则 Map 对象，键为要重命名的路径，值为重命名后的键名，或 null 表示删除该键
 * @param {string} [currentPath=""] 可选，内部递归用的当前路径
 * @returns {any} 根据规则重命名后的深拷贝对象
 * @example
 * const obj = {
 *     deps: [{ id: 1 }, { id: 2 }, { id: 3 }],
 *     posts: [{ id: 1, children: [{ id: 1 }] }, { id: 2 }, { id: 3 }],
 *     data: {
 *         id: 1,
 *     },
 *     id: 1,
 * };
 * renameKeysByPath(
 *     obj,
 *     new Map([
 *         ["deps.id", "depId"],
 *         ["data", "d"],
 *         ["data.id", "dataId"],
 *         ["posts.children.id", "childId"],
 *         ["posts.id", "postId"],
 *         ["id", null],
 *     ])
 * );
 */
 export const renameKeysByPath = (
  value: any,
  pathMap: Map<string, string | null>,
  currentPath: string = ""
): any =>
  typeof value === "object"
    ? Array.isArray(value)
      ? value.map((item) => renameKeysByPath(item, pathMap, currentPath))
      : Object.fromEntries(
          Object.entries(value)
            .map(([key, value]) => {
              const path = currentPath ? `${currentPath}.${key}` : key;
              const target = pathMap.get(path);
              if (target === null) return null;
              return [target || key, renameKeysByPath(value, pathMap, path)];
            })
            .filter(Boolean) as [string, any][]
        )
    : value;


