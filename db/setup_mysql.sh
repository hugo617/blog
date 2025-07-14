#!/bin/bash

# MySQL数据库设置脚本
# 确保MySQL服务正在运行

echo "正在设置MySQL数据库..."

# 执行SQL脚本
mysql -u root -p < db/mysql_setup.sql

echo "数据库设置完成！"
echo ""
echo "接下来请执行以下命令："
echo "1. bundle install  # 安装新的gem依赖"
echo "2. rails db:migrate  # 运行迁移（可选，因为表已经创建）"
echo "3. rails db:seed  # 运行种子数据（如果有的话）"
echo "4. rails server  # 启动服务器"
