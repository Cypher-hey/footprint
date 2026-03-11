#!/bin/bash
# 同步源码解构文档到 footprint 项目

set -e

SOURCE_DIR="/home/admin/.openclaw/workspace-source-code/output"
TARGET_DIR="/home/admin/footprint/docs/note/sourceLearn"

echo "🔄 开始同步源码解构文档..."

if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ 源目录不存在：$SOURCE_DIR"
    exit 1
fi

rm -rf "$TARGET_DIR"
mkdir -p "$TARGET_DIR"
cp -r "$SOURCE_DIR"/* "$TARGET_DIR/"

if [ -n "$1" ]; then
    cd /home/admin/footprint
    git add -A
    git commit -m "$1" || echo "⚠️ 提交失败"
    git push origin develop || echo "⚠️ 推送失败"
fi

./sync-deploy.sh
echo "✅ 同步完成！"
