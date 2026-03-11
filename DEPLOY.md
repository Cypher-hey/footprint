# Footprint 文档站

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

修改文档后必须运行 `./sync-deploy.sh` 并刷新浏览器（Ctrl+Shift+R）
