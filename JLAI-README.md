# JLAi 完整源码包

本包以 sub2api 官方源码为底，版本为 main 分支 `8f2cbb53`（2026-10-19，`VERSION` 0.2.17）。在此基础上：

- `frontend/` 整个替换为 JLAi 前端，也就是你的 `sub2api-frontend` 仓库加上这几轮的全部改动。前端改了什么见 `frontend/UI-REFRESH.md`。
- `backend/` 改了 5 个文件，见下文「后端改动」。
- `deploy/` 下的三个 docker compose 文件和 `build_image.sh` 改为从本源码构建镜像，不再拉官方镜像。

其余文件与官方完全一致。

## 部署（Docker，推荐）

```bash
cd deploy
cp .env.example .env        # 首次部署：按官方说明填写数据库密码等
docker compose up -d --build
```

`--build` 会用根目录的 `Dockerfile` 依次完成三步：构建前端、编译后端（前端打包进后端）、生成镜像 `sub2api-jlai:latest`。

- **构建网络：** 前端依赖默认从 npmmirror 下载，Go 依赖从 goproxy.cn 下载，国内服务器可以直接构建。
- **已经在跑官方版本：** 把原来的 `deploy/.env` 和数据目录（数据卷）保留，换成这个包里的 `deploy/` 再执行上面的命令即可。
- **数据库：** 后端改动不涉及数据库结构，没有迁移，升级和回退都不影响数据。

只想先打镜像，可以执行 `deploy/build_image.sh`，生成的镜像同样叫 `sub2api-jlai:latest`。

## 不用 Docker 时手动编译

需要 Node 24 + pnpm 9，以及 Go 1.27.2。

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm build                      # 输出到 backend/internal/web/dist
cd ../backend
CGO_ENABLED=0 go build -tags embed -trimpath -o bin/server ./cmd/server
```

必须带 `-tags embed`，否则编译出的后端里不包含前端页面。

## 测试

```bash
make test-frontend    # 前端：lint、类型检查、关键测试
make test-backend     # 后端：go test 和 golangci-lint
```

也可以把整个目录推到自己的 GitHub 仓库。仓库自带的 `.github/workflows/backend-ci.yml` 会在每次推送时自动跑前后端的类型检查和测试，不需要本地环境。

## 后端改动（相对官方）

| 文件 | 改动 |
| --- | --- |
| `internal/service/account_test_service.go` | 账号测试可以发送自定义消息，最长 4000 字，不填仍发 `hi`。覆盖 Claude、Vertex、Bedrock、OpenAI Responses 通道。 |
| `internal/service/account_test_service_cn_adaptive.go` | 国产厂商的自适应 Anthropic 和 Responses 通道同样使用自定义消息。 |
| `internal/service/account_test_service_text_prompt_test.go` | 新增的测试用例。 |
| `internal/service/api_key_service.go` | 密钥额度扣减后，回读密钥或写入「额度用完」状态失败时记录日志。原来这两种失败不留任何痕迹。 |
| `internal/web/embed_on.go` | 后端读取站点设置失败时，返回的页面里照常填入 CSP nonce，并禁止缓存，加载画面的提示脚本不会被拦截。 |

不打这些后端改动也能运行，只是账号测试的自定义消息对上述通道不生效。

## 与官方版本保持同步

以后官方更新时：

- `backend/`：重新应用上面 5 个文件的改动即可，单独的补丁文件是 `sub2api-backend-fixes.patch`。
- `frontend/`：以你的前端仓库为准。前端用到的所有后端接口都已和官方 `8f2cbb53` 核对过，见 `frontend/UI-REFRESH.md` 第十二轮。

## 计费说明

AI 对话、生图、生视频都是用用户选的 API 密钥调用本站网关，计费完全由后端完成，与外部程序调用 API 相同，每次调用都会出现在使用记录里。

- **AI 对话：** 按 token 计费。缓存读写单独计价，乘以分组倍率；分组开启高峰倍率时，高峰时段另外再乘。
- **生图：** 按张计费，价格按尺寸档位 1K / 2K / 4K 区分，乘以分组倍率，不乘高峰倍率。
- **生视频：** 按秒计费，价格按分辨率区分，乘以分组倍率，不乘高峰倍率。

余额分组从余额扣，订阅分组计入订阅额度。两种情况都同时计入密钥自己的额度和 5 小时、日、周限额。
