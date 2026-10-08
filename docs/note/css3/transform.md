# CSS Transform：函数顺序、矩阵与三维透视

> 审阅日期：2026-10-08。状态：公式和语法修订，未进行视觉实测。

## 1. 常见二维变换

```css
transform: translate(100px, 20px);
transform: rotate(20deg);
transform: scale(2, 1);
transform: skewX(15deg);
transform-origin: 0 0;
```

transform 改变视觉几何，不等于重新分配正常流中的占位。不同函数组合不能任意交换。

## 2. 矩阵含义

matrix(a, b, c, d, e, f) 对应：

```text
x' = a*x + c*y + e
y' = b*x + d*y + f
```

a/b 和 c/d 分别描述基向量的像，e/f 是平移。只有特定简单矩阵中才可以独立把某个参数叫“x 缩放”或“旋转”，一般组合需要矩阵乘法。

## 3. 顺序

采用列向量约定时，列表形成按顺序相乘的矩阵，对点体现为右侧变换先作用。也可理解为局部坐标系依次变化；两种解释不要混用。验证 translate(... ) rotate(... ) 与反过来的效果，不能只背“先写后执行”。

## 4. 三维语法

```css
.scene { perspective: 600px; }
.object {
  transform-style: preserve-3d;
  transform: translateZ(40px) rotate3d(0, 1, 0, 25deg);
  backface-visibility: hidden;
}
```

perspective 长度需要单位，旧文 perspective: 200 无效。matrix3d 使用 16 个参数，不能把 16 个参数传给二维 matrix。变换可建立新的包含块或层叠上下文，需要结合布局理解。

## 5. 性能与可访问性

transform 动画可能利于合成，但不保证“开 GPU 就无成本”。尊重减少动态效果偏好，避免大面积动画导致眩晕或耗电。

## 6. 练习

用点 (1, 0) 比较先旋转再平移与先平移再旋转。再改变 transform-origin，说明为什么实际盒子变化还包含基点平移。

## 7. 深入

- [矩阵与空间变换](matrix.md)
- [CSS transform](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/transform)
