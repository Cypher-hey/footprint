# Footprint

持续积累前端工程与 AI 应用知识：从概念、机制，到可验证的工程实践。

## 阅读入口

- [知识地图](docs/README.md)
- [全部文档索引](docs/ALL_DOCUMENTS.md)
- [写作规范](MARKDOWN_SPEC.md)
- [Mermaid 图表规范](docs/MERMAID_SPEC.md)
- [本轮审阅记录](docs/REVIEW_STATUS.md)

## 仓库结构

- docs/note：知识正文、学习记录和源码阅读。
- docs/index.html：现有 Docute 页面入口。
- docs/asset：站点资源。
- code：历史示例。
- DEPLOY.md：历史部署说明；运行前核对自己的环境。

当前文件入口仍使用 Docute，不应仅根据 next 的提交说明认定已经迁移到 Docusaurus。

## 本地阅读

可直接在 GitHub 阅读 Markdown。若已有 Python 3，也可在仓库根目录运行：

```sh
python3 -m http.server 9090
```

随后访问 http://localhost:9090/docs/ 。这是可选操作说明，本轮没有启动服务或执行部署。

## 维护约定

按知识点组织内容，注明适用版本、来源和验证状态；保留历史路径，避免批量搬迁造成断链。本轮文档整理在 ai/next 进行，next 为原始基线。

本仓库现有 package.json 的 test 脚本是失败占位，不是文档测试套件。不要把未运行测试写成“全部测试通过”。

## 致谢

站点基于 [Docute](https://github.com/egoist/docute)。AI 主题组织参考 [Bojie Li 的 AI Agent 书籍](https://github.com/bojieli/ai-agent-book)，具体参考与扩展边界见各章节。
