#!/bin/sh
set -e
TS=$(date -u +%Y%m%dT%H%M%SZ)
REL=/opt/sub2api-ui/releases/ui-$TS
BAK=/opt/sub2api-backups/ui-$TS
PREV=$(cat /opt/sub2api-ui/current-release-path 2>/dev/null || echo "")
mkdir -p "$REL" "$BAK"
cd /tmp
tar -xzf dist2.tar.gz -C "$REL"
mkdir -p "$REL/frontend"
tar -xzf frontend-src2.tar.gz -C "$REL"
echo "[1] release=$TS created; prev=$PREV"

# 备份旧前端源码
if [ -e /opt/sub2api/frontend ]; then
  mv /opt/sub2api/frontend "$BAK/frontend-before-ui"
fi
cp -a "$REL/frontend" /opt/sub2api/frontend
echo "[2] frontend source swapped (old -> $BAK/frontend-before-ui)"

# 同步 dist 进 caddy 容器并平铺到 release 根
docker exec sub2api-caddy mkdir -p /data/sub2api-ui/releases/ui-$TS
docker cp "$REL/dist" sub2api-caddy:/data/sub2api-ui/releases/ui-$TS/dist
docker exec sub2api-caddy sh -c "mv /data/sub2api-ui/releases/ui-$TS/dist/* /data/sub2api-ui/releases/ui-$TS/ && rmdir /data/sub2api-ui/releases/ui-$TS/dist"
echo "[3] dist synced & flattened into caddy container"

# 备份 + 切换 Caddyfile。
# 关键：必须用 cp 原地覆盖（保持 inode），不能用 sed -i（会换 inode 导致
# 容器内单文件 bind-mount 停留在旧文件、容器重启后回退到旧版 UI release）。
cp /opt/sub2api/deploy/Caddyfile "$REL/Caddyfile.before"
cp /opt/sub2api/deploy/Caddyfile "$BAK/Caddyfile.before"
sed "s|/data/sub2api-ui/releases/ui-[0-9T]*Z|/data/sub2api-ui/releases/ui-$TS|" /opt/sub2api/deploy/Caddyfile > /tmp/Caddyfile.tmp
cp /tmp/Caddyfile.tmp /opt/sub2api/deploy/Caddyfile
docker cp /opt/sub2api/deploy/Caddyfile sub2api-caddy:/tmp/Caddyfile.new
docker exec sub2api-caddy caddy reload --config /tmp/Caddyfile.new --adapter caddyfile
echo "[4] caddy reloaded with new root"

echo "$REL" > /opt/sub2api-ui/current-release-path
echo "$TS" > /tmp/ui-ts.txt
echo "$PREV" > "$BAK/previous-release-path"
echo "[5] current -> $REL"

# 写自包含 rollback（路径全部写死，不依赖运行时变量）
cat > "$REL/rollback-ui.sh" <<ROLL
#!/bin/sh
set -eu
umask 077
cat "$REL/Caddyfile.before" > /opt/sub2api/deploy/Caddyfile
docker cp "$REL/Caddyfile.before" sub2api-caddy:/tmp/Caddyfile.rollback
docker exec sub2api-caddy caddy reload --config /tmp/Caddyfile.rollback --adapter caddyfile
if [ -d "$BAK/frontend-before-ui" ]; then
  if [ -e /opt/sub2api/frontend ]; then
    mv /opt/sub2api/frontend "$REL/frontend-rolled-back"
  fi
  mv "$BAK/frontend-before-ui" /opt/sub2api/frontend
fi
echo "$PREV" > /opt/sub2api-ui/current-release-path
printf "UI rolled back to %s; database and backend untouched.\n" "$PREV"
ROLL
chmod +x "$REL/rollback-ui.sh"
echo "[6] rollback script written at $REL/rollback-ui.sh"
echo "DONE"
