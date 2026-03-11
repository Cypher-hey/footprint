#!/bin/bash
# 同步到 Docker 容器并重启

set -e

echo "🔄 同步文件到容器..."
docker cp docs/. footprint:/app/docs/

echo "🚀 重启容器..."
docker restart footprint

echo "✅ 完成！"
echo "📖 文档站：http://123.56.28.217:3457"
