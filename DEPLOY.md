# Footprint 历史部署说明

> 审阅日期：2026-10-08。以下目录、服务器地址与容器流程来自历史环境，尚未核实当前可用性。它们不是通用安装路径，也不是本轮文档工作的执行要求。
> 本轮仅更新 Markdown，没有同步、重启、部署或更改安全配置。执行任意脚本前先阅读内容，确认目标、权限和回退方式。

## 原部署记录

## 📁 目录

```
/home/admin/footprint/
├── docs/                   # 文档目录
│   ├── index.html         # 主页面（含 Mermaid 支持）
│   └── note/               # 文档内容
├── sync-deploy.sh         # 同步到容器
├── sync-source-learn.sh   # 同步源码解构
├── docker-compose.yml     # Docker 配置
└── Dockerfile             # Docker 镜像
```

## 🚀 常用命令

### 同步文档
```bash
cd /home/admin/footprint
./sync-deploy.sh
```

### 同步源码解构
```bash
./sync-source-learn.sh "提交信息"
```

### 容器管理
```bash
docker ps | grep footprint    # 查看状态
docker restart footprint      # 重启
docker logs footprint         # 日志
docker stop footprint         # 停止
```

## 📖 访问

- **主页**: http://123.56.28.217:3457
- **Mermaid 测试**: http://123.56.28.217:3457/#/note/mermaid-test
- **源码解构**: http://123.56.28.217:3457/#/note/sourceLearn

## ⚠️ 注意

仅在已经确认的部署流程中才考虑同步脚本；文档提交本身不要求自动部署。刷新浏览器不能代替验证部署版本。
