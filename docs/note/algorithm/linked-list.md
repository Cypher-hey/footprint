# 链表：节点引用、不变量与边界处理

> 审阅日期：2026-10-08。状态：原创示例静态审阅，未运行。
> 本例使用带哨兵节点的单向链表，按严格相等寻找首个值。

## 1. 与数组比较

链表用引用连接节点；随机访问通常需要遍历。已知合适节点时局部插入/删除可为 O(1)，若先按值查找，则整次操作通常仍为 O(n)。

JavaScript 数组的具体存储由引擎决定，不能从“数组也是对象”推导必然比其他语言慢，也不能把 splice 易用等同于移动元素无成本。

## 2. 单向链表不变量

head 是哨兵，不保存业务值；最后一个节点 next 为 null；普通操作不得制造环。插入 API 接收值并创建新节点，避免把已在链中的节点重复插入。

```js
class LinkedList {
  constructor() {
    this.head = { next: null };
  }

  append(value) {
    let node = this.head;
    while (node.next !== null) node = node.next;
    node.next = { value, next: null };
  }

  find(value) {
    let node = this.head.next;
    while (node !== null) {
      if (node.value === value) return node;
      node = node.next;
    }
    return null;
  }

  insertAfter(targetValue, value) {
    const target = this.find(targetValue);
    if (target === null) return false;
    target.next = { value, next: target.next };
    return true;
  }

  remove(value) {
    let previous = this.head;
    while (previous.next !== null) {
      if (previous.next.value === value) {
        const removed = previous.next;
        previous.next = removed.next;
        removed.next = null;
        return true;
      }
      previous = previous.next;
    }
    return false;
  }

  toArray() {
    const values = [];
    for (let node = this.head.next; node !== null; node = node.next) {
      values.push(node.value);
    }
    return values;
  }
}
```

未找到时返回 false/null，不访问不存在节点。这个类公开 head，仅用于教学；生产设计可以封装节点所有权。

## 3. 双向链表

除 next 外保存 prev。插入时更新前驱与后继的双向连接；删除尾节点时后继为 null，不能执行 target.next.prev。删除哨兵、未知节点和跨链节点都需明确拒绝。

双向结构减少已知节点删除时找前驱的成本，但增加内存和维护不变量的工作。

## 4. 循环链表

末节点连回哨兵；空循环链表可让哨兵指向自身。遍历结束条件必须改成“回到起点”，不能继续用 while(node.next) 等待 null。原文只修改 head.next 就复用全部遍历会导致死循环。

## 5. 测试矩阵

| 情况 | 期望 |
| --- | --- |
| 空链查找/删除 | null / false |
| 单元素删除 | head.next 恢复 null |
| 删除尾部 | 前驱 next 为 null |
| 找不到插入目标 | 返回 false，原链不变 |
| 重复值 | 只处理首个，除非另有约定 |
| 大规模遍历 | 迭代，不依赖递归栈 |

## 6. 练习

增加 tail 让 append 达到 O(1)，随后检查删除最后一个元素时 tail 如何更新。为反转链表写循环不变量，而不只是记住三个临时指针。
