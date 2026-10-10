/* Canonical navigation: domains → groups/projects → articles. Preserve existing routes. */
window.FootprintNavigation = {
  "formatVersion": 1,
  "domains": [
    {
      "id": "ai",
      "title": "AI 知识",
      "groups": [
        {
          "id": "group-ea0d23f2c85e",
          "title": "知识地图与编写资料",
          "articles": [
            {
              "id": "article-69d6de01effa",
              "title": "知识地图与全部主题",
              "path": "/note/ai/README"
            },
            {
              "id": "article-a60c8b87c29e",
              "title": "Advance 入口：值得继续展开的问题",
              "path": "/note/ai/ADVANCE"
            },
            {
              "id": "article-e7e853d9db53",
              "title": "AI 主题内容审核与迁移记录 · 2026-10-10",
              "path": "/note/ai/CONTENT_REVIEW_2026-10-10"
            },
            {
              "id": "article-a485fdb3e809",
              "title": "AI 术语与别名索引",
              "path": "/note/ai/GLOSSARY"
            },
            {
              "id": "article-10f45925c0d0",
              "title": "AI 知识关系图：按问题定位概念",
              "path": "/note/ai/KNOWLEDGE_MAP"
            },
            {
              "id": "article-86d29234800c",
              "title": "AI 知识条目规范：可回顾、可查证、可扩展",
              "path": "/note/ai/KNOWLEDGE_SPEC"
            },
            {
              "id": "article-b51324549dd8",
              "title": "AI 知识库审阅记录与证据范围",
              "path": "/note/ai/REVIEW"
            },
            {
              "id": "article-6766464d790c",
              "title": "AI 单主题作者规范：内容、模式与共享资源",
              "path": "/note/ai/TOPIC_AUTHORING"
            }
          ]
        },
        {
          "id": "group-089e1df96697",
          "title": "AI 主题",
          "articles": [
            {
              "id": "article-08e588baaa31",
              "title": "Agent Loop",
              "path": "/note/ai/03-agent-loop"
            },
            {
              "id": "article-d81ac2c48215",
              "title": "Tool Calling",
              "path": "/note/ai/03-tool-calling"
            },
            {
              "id": "article-2e0947778c84",
              "title": "ReAct",
              "path": "/note/ai/03-react"
            },
            {
              "id": "article-de318dc34be4",
              "title": "AI 基础全景：从学习能力到可行动的系统",
              "path": "/note/ai/01-foundations"
            },
            {
              "id": "article-e3443cde2070",
              "title": "推理请求：输入、采样、结构化输出与流式传输",
              "path": "/note/ai/02-inference"
            },
            {
              "id": "article-d968b56b2420",
              "title": "Context Builder：选择、预算、压缩与记忆",
              "path": "/note/ai/04-context-memory"
            },
            {
              "id": "article-1e6b77ba4624",
              "title": "工具、MCP 与 Skills：三种不同的能力边界",
              "path": "/note/ai/05-tools-mcp-skills"
            },
            {
              "id": "article-d53b1fb7c506",
              "title": "RAG 与长期记忆：从找得到到用得对",
              "path": "/note/ai/06-retrieval"
            },
            {
              "id": "article-945343ae2db4",
              "title": "AI 原生界面：Catalog、UI IR、Event IR 与可信执行",
              "path": "/note/ai/07-ui-ir"
            },
            {
              "id": "article-e908bedcc88a",
              "title": "Workflow、状态机与 XState：把行为边界写清楚",
              "path": "/note/ai/08-workflow-state"
            },
            {
              "id": "article-2dbe2ef05209",
              "title": "Agent 可靠性与安全：把权限和恢复放在模型之外",
              "path": "/note/ai/09-reliability-security"
            },
            {
              "id": "article-f35e9252b45b",
              "title": "Evals 与可观测性：让改进成为可验证的判断",
              "path": "/note/ai/10-evaluation"
            },
            {
              "id": "article-107d65efef96",
              "title": "多 Agent：分工收益、上下文成本与单一责任人",
              "path": "/note/ai/11-multi-agent"
            },
            {
              "id": "article-a32919c0a84b",
              "title": "AI Coding 与 Harness：把交付变成受控闭环",
              "path": "/note/ai/12-ai-coding"
            },
            {
              "id": "article-79fa99cf8e3a",
              "title": "深入模型层：后训练、蒸馏与推理系统",
              "path": "/note/ai/13-training-inference-systems"
            },
            {
              "id": "article-044e8281d1fd",
              "title": "AI 应用全景：把模型、知识、控制与证据连接起来",
              "path": "/note/ai/14-learning-project"
            },
            {
              "id": "article-82625ccc511e",
              "title": "机器学习基础：数据、目标、优化与泛化",
              "path": "/note/ai/15-machine-learning"
            },
            {
              "id": "article-5b821b529214",
              "title": "语言模型机制：Token、表示、Attention 与自回归生成",
              "path": "/note/ai/16-language-models"
            },
            {
              "id": "article-c2bf9a70321b",
              "title": "提示与模型行为：指令、示例、证据和不确定性",
              "path": "/note/ai/17-prompt-behavior"
            },
            {
              "id": "article-7474f8d71b8d",
              "title": "多模态基础：图像、语音、视频与跨模态表示",
              "path": "/note/ai/18-multimodal"
            }
          ]
        },
        {
          "id": "group-e55febae7b06",
          "title": "OpenClaw Agent · 实例与模板",
          "articles": [
            {
              "id": "article-e917456d7220",
              "title": "📚 文档首页",
              "path": "/note/openclaw-agent/README"
            },
            {
              "id": "article-0796ee856aa6",
              "title": "main (主 Agent)",
              "path": "/note/openclaw-agent/main"
            },
            {
              "id": "article-0e14b7dc01a3",
              "title": "agent-frontend",
              "path": "/note/openclaw-agent/agent-frontend"
            },
            {
              "id": "article-bbf0d0204917",
              "title": "agent-source-code",
              "path": "/note/openclaw-agent/agent-source-code"
            },
            {
              "id": "article-2b7af45383bc",
              "title": "agent-invoice",
              "path": "/note/openclaw-agent/agent-invoice"
            },
            {
              "id": "article-1d2ab643f5ea",
              "title": "SOUL.md - Who You Are",
              "path": "/note/openclaw-agent/01-soul"
            },
            {
              "id": "article-3d0431652a10",
              "title": "AGENTS.md - Your Workspace",
              "path": "/note/openclaw-agent/02-agents"
            },
            {
              "id": "article-d92afe4b26a1",
              "title": "USER.md - About Your Human",
              "path": "/note/openclaw-agent/03-user"
            },
            {
              "id": "article-c78b31dc7e97",
              "title": "IDENTITY.md - Who Am I?",
              "path": "/note/openclaw-agent/04-identity"
            },
            {
              "id": "article-d7ab6b0416c2",
              "title": "TOOLS.md - Local Notes",
              "path": "/note/openclaw-agent/05-tools"
            },
            {
              "id": "article-c29db08cbe9c",
              "title": "BOOTSTRAP.md - Hello, World",
              "path": "/note/openclaw-agent/06-bootstrap"
            },
            {
              "id": "article-62f07a753fa1",
              "title": "MEMORY.md - Long-Term Memory",
              "path": "/note/openclaw-agent/07-memory"
            }
          ]
        }
      ]
    },
    {
      "id": "frontend",
      "title": "前端开发",
      "groups": [
        {
          "id": "group-bd9bbf782763",
          "title": "JavaScript 基础",
          "articles": [
            {
              "id": "article-82cb6e74b76c",
              "title": "基础概念",
              "path": "/note/basis/concepts"
            },
            {
              "id": "article-758a2f1a200a",
              "title": "函数",
              "path": "/note/basis/func"
            },
            {
              "id": "article-99663491ccee",
              "title": "数组",
              "path": "/note/basis/array"
            },
            {
              "id": "article-43eceb5dc9db",
              "title": "字符串",
              "path": "/note/basis/string"
            },
            {
              "id": "article-28b254aeb2f4",
              "title": "正则表达式",
              "path": "/note/basis/regexp"
            },
            {
              "id": "article-25fb59bc90ea",
              "title": "cookie和storage",
              "path": "/note/basis/cookie-storage"
            },
            {
              "id": "article-2ae1e0545eb2",
              "title": "异步处理",
              "path": "/note/basis/async"
            },
            {
              "id": "article-4308b73a6772",
              "title": "函数包装与转发：阅读笔记",
              "path": "/note/basis/javascript-info"
            },
            {
              "id": "article-b9c84455243e",
              "title": "JavaScript 模块：ESM、CommonJS 与运行时边界",
              "path": "/note/basis/module"
            }
          ]
        },
        {
          "id": "group-061a4969ccb1",
          "title": "DOM 与事件",
          "articles": [
            {
              "id": "article-fdb0fa8f0ffe",
              "title": "DOM操作",
              "path": "/note/dom/dom"
            },
            {
              "id": "article-09bb24924381",
              "title": "DOM事件",
              "path": "/note/dom/dom-event"
            }
          ]
        },
        {
          "id": "group-47598bfc76c1",
          "title": "JavaScript 进阶",
          "articles": [
            {
              "id": "article-5463d44d81c8",
              "title": "JS进阶",
              "path": "/note/advanceJS/advance-base"
            },
            {
              "id": "article-131a82f90766",
              "title": "improvement",
              "path": "/note/advanceJS/useful-tips"
            },
            {
              "id": "article-6b89cadd8f3e",
              "title": "JS-snippets",
              "path": "/note/advanceJS/useful-snippets"
            },
            {
              "id": "article-73f2f8ef7eec",
              "title": "stack-snippets",
              "path": "/note/advanceJS/stackoverflow-snippets"
            },
            {
              "id": "article-7c7e5e6aee47",
              "title": "design-pattern",
              "path": "/note/advanceJS/design-pattern"
            },
            {
              "id": "article-8b89fec98bf7",
              "title": "Alexa Presentation Language：历史资料入口",
              "path": "/note/advanceJS/APL"
            },
            {
              "id": "article-fa9959ec97eb",
              "title": "懒加载：按需获取与生命周期",
              "path": "/note/advanceJS/js-in-use"
            },
            {
              "id": "article-854fac9e69af",
              "title": "中间件：职责链、横切逻辑与异步顺序",
              "path": "/note/advanceJS/node"
            }
          ]
        },
        {
          "id": "group-6dccebc5b494",
          "title": "规范与概念",
          "articles": [
            {
              "id": "article-8b26c646b04a",
              "title": "js编码规范 .eslitrc.js",
              "path": "/note/specification/eslintrc"
            },
            {
              "id": "article-5d88263c08f6",
              "title": "无障碍访问与ARIA",
              "path": "/note/specification/aria"
            },
            {
              "id": "article-38c66d834713",
              "title": "文档模式",
              "path": "/note/specification/dtd"
            },
            {
              "id": "article-5fb38ed5fbc2",
              "title": "工程协作规范：历史版本与维护边界",
              "path": "/note/specification/cypher"
            }
          ]
        },
        {
          "id": "group-ef1359b55451",
          "title": "CSS 与布局",
          "articles": [
            {
              "id": "article-ee235ad490c4",
              "title": "CSS选择器整理",
              "path": "/note/css3/selector"
            },
            {
              "id": "article-7c022e47ae60",
              "title": "transform",
              "path": "/note/css3/transform"
            },
            {
              "id": "article-1f59c9cf2ce1",
              "title": "从矩阵与空间操作的关系理解CSS3的transform",
              "path": "/note/css3/matrix"
            },
            {
              "id": "article-d137410084cb",
              "title": "BFC",
              "path": "/note/css3/bfc"
            },
            {
              "id": "article-6314f9e4f2a7",
              "title": "常见布局",
              "path": "/note/css3/layout"
            }
          ]
        },
        {
          "id": "group-7da2015fe13a",
          "title": "性能与兼容",
          "articles": [
            {
              "id": "article-9d7fdf628c9e",
              "title": "ECMAScript",
              "path": "/note/performance/ECMAScript"
            },
            {
              "id": "article-362814eaa7c7",
              "title": "DOM",
              "path": "/note/performance/DOM"
            },
            {
              "id": "article-c7aa233246c9",
              "title": "H5 性能优化整理",
              "path": "/note/performance/h5-perf"
            },
            {
              "id": "article-fce7f1099189",
              "title": "基础性能知识",
              "path": "/note/performance/performance"
            },
            {
              "id": "article-cffab36e5c7e",
              "title": "浏览器渲染页面的过程",
              "path": "/note/performance/render-page"
            },
            {
              "id": "article-5ca144b2f7f3",
              "title": "重排和重绘的概念及触发条件查看这里",
              "path": "/note/performance/reflow-repaint"
            },
            {
              "id": "article-47c1d7eee430",
              "title": "数据直出与服务端渲染的首屏优化",
              "path": "/note/performance/ssr"
            },
            {
              "id": "article-7553a78cc1e5",
              "title": "兼容性",
              "path": "/note/compatibility/compatibility"
            }
          ]
        },
        {
          "id": "group-7690908e407f",
          "title": "Vue",
          "articles": [
            {
              "id": "article-a3a8cc4d27b5",
              "title": "Vue实例与生命周期",
              "path": "/note/vue/cycle-life"
            },
            {
              "id": "article-4c87e817f47a",
              "title": "数据双向绑定",
              "path": "/note/vue/data-bind"
            },
            {
              "id": "article-8b301389dd92",
              "title": "Vue computed 与 key：缓存和组件身份",
              "path": "/note/vue/vue-records"
            },
            {
              "id": "article-9b735bb90bfb",
              "title": "Vue 3 渲染：VNode 与平台适配",
              "path": "/note/vue/vue3"
            }
          ]
        },
        {
          "id": "group-d1657abe837b",
          "title": "React / Redux",
          "articles": [
            {
              "id": "article-c348523bfa1c",
              "title": "React基础",
              "path": "/note/react/react-base"
            },
            {
              "id": "article-e8fa05eec7dc",
              "title": "Redux",
              "path": "/note/react/redux-base"
            }
          ]
        },
        {
          "id": "group-aa319b7d3992",
          "title": "point · 面试与速查",
          "articles": [
            {
              "id": "article-680575fb6328",
              "title": "js",
              "path": "/note/point/collect-js"
            },
            {
              "id": "article-1424014f5573",
              "title": "http",
              "path": "/note/point/collect-http"
            },
            {
              "id": "article-a8acfa82c9ca",
              "title": "css",
              "path": "/note/point/collect-css"
            },
            {
              "id": "article-68c7b7724cbd",
              "title": "html",
              "path": "/note/point/collect-html"
            },
            {
              "id": "article-cbc50dd630ea",
              "title": "web",
              "path": "/note/point/collect-web"
            },
            {
              "id": "article-9955366108ad",
              "title": "编码练习：先写合同，再检查边界",
              "path": "/note/point/collect-code"
            },
            {
              "id": "article-06433adea6a3",
              "title": "Web 平台学习导航",
              "path": "/note/point/collect-h5"
            },
            {
              "id": "article-a055796c241d",
              "title": "面试编码题：二分、异步与调用语义",
              "path": "/note/point/collect-ti"
            }
          ]
        },
        {
          "id": "group-13b6f274058b",
          "title": "YDKJS 阅读",
          "articles": [
            {
              "id": "article-4e857c0e9577",
              "title": "this&OBJECT PROTOTYPE",
              "path": "/note/ydkJS/this&OBJECT PROTOTYPES"
            },
            {
              "id": "article-bc24cd658306",
              "title": "You Don't Know JS 阅读摘记：真值与 NaN",
              "path": "/note/ydkJS/note"
            }
          ]
        },
        {
          "id": "group-6098a55a3fcb",
          "title": "阅读笔记",
          "articles": [
            {
              "id": "article-7ba54ceb5d50",
              "title": "JavaScript核心原理精讲",
              "path": "/note/readings/lagou/js"
            },
            {
              "id": "article-5e64e2921b94",
              "title": "Flutter",
              "path": "/note/readings/lagou/flutter"
            },
            {
              "id": "article-eccf763f468d",
              "title": "JavaScript 内存：可达性、资源生命周期与泄漏证据",
              "path": "/note/readings/hjswks/memory-leaks"
            }
          ]
        },
        {
          "id": "group-34d8acf0780b",
          "title": "专题速查",
          "articles": [
            {
              "id": "article-e3c43de9a0c2",
              "title": "JavaScript 片段集合：使用前验证输入合同",
              "path": "/note/collect/javascript"
            },
            {
              "id": "article-c93903dbe7a6",
              "title": "渐进增强与优雅降级",
              "path": "/note/collect/related-work"
            }
          ]
        },
        {
          "id": "group-bad8d5da025b",
          "title": "函数式编程",
          "articles": [
            {
              "id": "article-f7de867b701f",
              "title": "函数式编程：纯计算、组合与副作用边界",
              "path": "/note/functionalProgram/fp-base"
            }
          ]
        },
        {
          "id": "group-a8cf95112339",
          "title": "HTML5",
          "articles": [
            {
              "id": "article-6ef4652432d0",
              "title": "CSS 相对单位：rem、em、视口与响应式布局",
              "path": "/note/h5/rem"
            }
          ]
        },
        {
          "id": "group-944586296cc2",
          "title": "TypeScript",
          "articles": [
            {
              "id": "article-7daa03d14ed0",
              "title": "TypeScript 基础：静态契约与运行时边界",
              "path": "/note/ts/base"
            },
            {
              "id": "article-0def3dac4863",
              "title": "TypeScript 运算符：非空断言、可选链与空值合并",
              "path": "/note/ts/symbols"
            }
          ]
        }
      ]
    },
    {
      "id": "computer",
      "title": "计算机基础",
      "groups": [
        {
          "id": "group-7f5925a191e0",
          "title": "网络与安全",
          "articles": [
            {
              "id": "article-abbbdb6f622e",
              "title": "http相关基本概念",
              "path": "/note/http/http-concepts"
            },
            {
              "id": "article-fcff3dbd5ee9",
              "title": "get和post请求的区别",
              "path": "/note/http/get-post"
            },
            {
              "id": "article-850ff048eeb4",
              "title": "从输入URL到页面加载完成的过程中都发生了什么事情？",
              "path": "/note/http/url-render"
            },
            {
              "id": "article-fc96619bf7d6",
              "title": "DNS",
              "path": "/note/http/dns"
            },
            {
              "id": "article-bc7c2c5bdbca",
              "title": "ajax及其优缺点",
              "path": "/note/http/ajax"
            },
            {
              "id": "article-00c5b53b73b0",
              "title": "跨域及跨域的方案",
              "path": "/note/http/cross-domain"
            },
            {
              "id": "article-5f37e1029cd6",
              "title": "强缓存与协商缓存",
              "path": "/note/http/cache"
            },
            {
              "id": "article-180a388d2309",
              "title": "CSP(内容安全策略)",
              "path": "/note/security/csp"
            }
          ]
        },
        {
          "id": "group-d2714f227720",
          "title": "算法与数据结构",
          "articles": [
            {
              "id": "article-412f86258db2",
              "title": "数据结构以及相关术语的概念",
              "path": "/note/algorithm/data-structure"
            },
            {
              "id": "article-2560f5dfa7d8",
              "title": "栈",
              "path": "/note/algorithm/stack"
            },
            {
              "id": "article-4d61b835ed68",
              "title": "队列",
              "path": "/note/algorithm/queue"
            },
            {
              "id": "article-094bdf20937d",
              "title": "链表",
              "path": "/note/algorithm/linked-list"
            },
            {
              "id": "article-bd442fb67fa5",
              "title": "二叉树和二叉查找树",
              "path": "/note/algorithm/bst"
            },
            {
              "id": "article-701942d41dcb",
              "title": "图",
              "path": "/note/algorithm/graph"
            },
            {
              "id": "article-2f9eb46562d6",
              "title": "算法的时间复杂度和空间复杂度",
              "path": "/note/algorithm/time-space"
            },
            {
              "id": "article-0c8db5575b0e",
              "title": "基本排序算法",
              "path": "/note/algorithm/basic-sort"
            },
            {
              "id": "article-dc8ce43f1cd8",
              "title": "高级排序算法",
              "path": "/note/algorithm/advance-sort"
            },
            {
              "id": "article-770e353b5612",
              "title": "collection1",
              "path": "/note/algorithm/example-1"
            }
          ]
        }
      ]
    },
    {
      "id": "tools",
      "title": "工程工具",
      "groups": [
        {
          "id": "group-33e0611b6971",
          "title": "Git",
          "articles": [
            {
              "id": "article-017ea9b8254e",
              "title": "git简明",
              "path": "/note/git/git-base"
            },
            {
              "id": "article-091b918a6e66",
              "title": "git常用命令及技巧",
              "path": "/note/git/commonly-used"
            },
            {
              "id": "article-ce60138324ca",
              "title": "config配置项",
              "path": "/note/git/config"
            }
          ]
        },
        {
          "id": "group-4723a22dd4c0",
          "title": "npm",
          "articles": [
            {
              "id": "article-c2c56e0f4a6a",
              "title": "npm基础",
              "path": "/note/npm/npm-base"
            }
          ]
        },
        {
          "id": "group-45ac38ea971f",
          "title": "Linux / Shell / Vim",
          "articles": [
            {
              "id": "article-f67896150c54",
              "title": "Ubuntu使用知识积累",
              "path": "/note/linux/ubuntu-utils"
            },
            {
              "id": "article-32dabf447d41",
              "title": "Linux基础",
              "path": "/note/linux/linux-base"
            },
            {
              "id": "article-7845ede2ac21",
              "title": "常用命令",
              "path": "/note/linux/linux-command"
            },
            {
              "id": "article-78ccb84067f2",
              "title": "Vim基础",
              "path": "/note/linux/vim"
            },
            {
              "id": "article-06e43f221f30",
              "title": "Shell：交互环境与脚本解释器",
              "path": "/note/linux/shell"
            }
          ]
        },
        {
          "id": "group-f44b7b72b5ea",
          "title": "Nginx",
          "articles": [
            {
              "id": "article-2552e919aa71",
              "title": "nginx基础",
              "path": "/note/nginx/nginx-base"
            }
          ]
        },
        {
          "id": "group-3ba2470a5524",
          "title": "代码规范与部署",
          "articles": [
            {
              "id": "article-7d14751f6d78",
              "title": "代码规范与检查",
              "path": "/note/deploy/norm"
            }
          ]
        },
        {
          "id": "group-a4f476e5b6e4",
          "title": "站点索引与规范",
          "articles": [
            {
              "id": "article-d3a7b28d730b",
              "title": "Footprint 知识地图",
              "path": "/README"
            },
            {
              "id": "article-c27adb9f9068",
              "title": "全部文档索引",
              "path": "/ALL_DOCUMENTS"
            },
            {
              "id": "article-53014859c86d",
              "title": "Mermaid 图表规范与兼容边界",
              "path": "/MERMAID_SPEC"
            },
            {
              "id": "article-ad1ae59ca216",
              "title": "文档审阅与迭代记录",
              "path": "/REVIEW_STATUS"
            }
          ]
        }
      ]
    },
    {
      "id": "source",
      "title": "源码专题",
      "groups": [
        {
          "id": "group-683a2285286a",
          "title": "OpenClaw Agent Skills",
          "articles": [
            {
              "id": "article-8a94ca51e996",
              "title": "架构设计",
              "path": "/note/sourceLearn/openclaw-agent-skills/ch01-agent-architecture"
            },
            {
              "id": "article-a6f77d448bd6",
              "title": "技能系统",
              "path": "/note/sourceLearn/openclaw-agent-skills/ch02-skills-system"
            },
            {
              "id": "article-7f4564cf7fde",
              "title": "技能集成",
              "path": "/note/sourceLearn/openclaw-agent-skills/ch03-agent-skills-integration"
            },
            {
              "id": "article-ff82353f3e7a",
              "title": "架构对比",
              "path": "/note/sourceLearn/openclaw-agent-skills/ch04-architecture-comparison"
            }
          ]
        },
        {
          "id": "group-b9975a425c12",
          "title": "Preact",
          "articles": [
            {
              "id": "article-db05ad442438",
              "title": "架构概览",
              "path": "/note/sourceLearn/preactAnalysis/ch01-architecture-overview"
            },
            {
              "id": "article-9e5b1d54ae09",
              "title": "h 函数与 VNode",
              "path": "/note/sourceLearn/preactAnalysis/ch02-h-function-vnode"
            },
            {
              "id": "article-e07bbf469957",
              "title": "渲染挂载流程",
              "path": "/note/sourceLearn/preactAnalysis/ch03-render-mount-flow"
            },
            {
              "id": "article-e1f1b8b27cdc",
              "title": "Diff 算法核心",
              "path": "/note/sourceLearn/preactAnalysis/ch04-diff-algorithm-core"
            },
            {
              "id": "article-8c2a03c57f4a",
              "title": "Children Diff 与 Key",
              "path": "/note/sourceLearn/preactAnalysis/ch05-children-diff-keyed"
            },
            {
              "id": "article-59f21c998693",
              "title": "组件生命周期",
              "path": "/note/sourceLearn/preactAnalysis/ch06-component-lifecycle"
            },
            {
              "id": "article-3e48e9f0819d",
              "title": "Hooks 实现",
              "path": "/note/sourceLearn/preactAnalysis/ch07-hooks-implementation"
            },
            {
              "id": "article-7a656d46d7b3",
              "title": "总结与最佳实践",
              "path": "/note/sourceLearn/preactAnalysis/ch08-summary-best-practices"
            }
          ]
        },
        {
          "id": "group-adc0343caf34",
          "title": "React Native",
          "articles": [
            {
              "id": "article-e5159e6f4fb2",
              "title": "架构概览",
              "path": "/note/sourceLearn/react-native-analysis/ch01-architecture-overview"
            },
            {
              "id": "article-c27afddaf057",
              "title": "JavaScript 端",
              "path": "/note/sourceLearn/react-native-analysis/ch02-javascript-side"
            },
            {
              "id": "article-5c120b8c65e7",
              "title": "Native 端",
              "path": "/note/sourceLearn/react-native-analysis/ch03-native-side"
            },
            {
              "id": "article-a64f6e08c65c",
              "title": "渲染系统",
              "path": "/note/sourceLearn/react-native-analysis/ch04-rendering-system"
            },
            {
              "id": "article-f3104d0425e5",
              "title": "总结与最佳实践",
              "path": "/note/sourceLearn/react-native-analysis/ch05-summary-best-practices"
            }
          ]
        },
        {
          "id": "group-c3f69f28ed90",
          "title": "Zustand",
          "articles": [
            {
              "id": "article-08466d9206ab",
              "title": "概览",
              "path": "/note/sourceLearn/zustandAnalysis/ch01-overview"
            },
            {
              "id": "article-3456bfadffe5",
              "title": "Store 创建",
              "path": "/note/sourceLearn/zustandAnalysis/ch02-store-creation"
            },
            {
              "id": "article-35fb05adfb2f",
              "title": "React 集成",
              "path": "/note/sourceLearn/zustandAnalysis/ch03-react-integration"
            },
            {
              "id": "article-77ed381826cb",
              "title": "中间件",
              "path": "/note/sourceLearn/zustandAnalysis/ch04-middleware"
            },
            {
              "id": "article-929ad6c6a94f",
              "title": "流程分析",
              "path": "/note/sourceLearn/zustandAnalysis/ch05-flow-analysis"
            },
            {
              "id": "article-f5b9a3ad5725",
              "title": "总结与最佳实践",
              "path": "/note/sourceLearn/zustandAnalysis/ch06-summary-best-practices"
            }
          ]
        },
        {
          "id": "group-2f16f8712521",
          "title": "Mobx",
          "articles": [
            {
              "id": "article-62522ee9dec5",
              "title": "第01章：Introduction",
              "path": "/note/sourceLearn/mobxAnalysis/ch01-introduction"
            },
            {
              "id": "article-603533bd48a5",
              "title": "第02章：Core Algorithm",
              "path": "/note/sourceLearn/mobxAnalysis/ch02-core-algorithm"
            },
            {
              "id": "article-5c7a01299e26",
              "title": "第03章：Types Layer",
              "path": "/note/sourceLearn/mobxAnalysis/ch03-types-layer"
            },
            {
              "id": "article-80fbfdd9e609",
              "title": "第04章：Api Layer",
              "path": "/note/sourceLearn/mobxAnalysis/ch04-api-layer"
            },
            {
              "id": "article-e65f00a474d3",
              "title": "第05章：Best Practices",
              "path": "/note/sourceLearn/mobxAnalysis/ch05-best-practices"
            },
            {
              "id": "article-7bcfe152c99e",
              "title": "📚 MobX 源码解析 - 文档索引",
              "path": "/note/sourceLearn/mobxAnalysis/00-README"
            }
          ]
        },
        {
          "id": "group-5415a539a0f6",
          "title": "Webpack 5",
          "articles": [
            {
              "id": "article-254305bf9e78",
              "title": "项目概览",
              "path": "/note/sourceLearn/webpackAnalysis/ch01-introduction"
            },
            {
              "id": "article-bb0f2f24a05f",
              "title": "Compiler 与 Compilation",
              "path": "/note/sourceLearn/webpackAnalysis/ch02-compiler-compilation"
            },
            {
              "id": "article-42b96f903335",
              "title": "Module 与依赖解析",
              "path": "/note/sourceLearn/webpackAnalysis/ch03-module-dependency"
            },
            {
              "id": "article-a00f51d627be",
              "title": "Chunk 与代码分割",
              "path": "/note/sourceLearn/webpackAnalysis/ch04-chunk-split"
            },
            {
              "id": "article-dec16c0f3a8e",
              "title": "代码生成与输出",
              "path": "/note/sourceLearn/webpackAnalysis/ch05-code-generation"
            },
            {
              "id": "article-02ffb8809740",
              "title": "运行时机制与 HMR",
              "path": "/note/sourceLearn/webpackAnalysis/ch06-runtime-hmr"
            },
            {
              "id": "article-04514b969584",
              "title": "缓存机制与性能优化",
              "path": "/note/sourceLearn/webpackAnalysis/ch07-cache-optimization"
            },
            {
              "id": "article-2b961b16cc64",
              "title": "Tree Shaking 与优化",
              "path": "/note/sourceLearn/webpackAnalysis/ch08-tree-shaking"
            },
            {
              "id": "article-3b392cd6f099",
              "title": "Module Federation",
              "path": "/note/sourceLearn/webpackAnalysis/ch09-module-federation"
            },
            {
              "id": "article-dcdd2d168389",
              "title": "总结与最佳实践",
              "path": "/note/sourceLearn/webpackAnalysis/ch10-summary"
            },
            {
              "id": "article-45d79602a72d",
              "title": "📚 Webpack 源码解析 - 文档索引",
              "path": "/note/sourceLearn/webpackAnalysis/00-README"
            },
            {
              "id": "article-5b7b0968ea2c",
              "title": "Webpack 5 源码解析系列",
              "path": "/note/sourceLearn/webpackAnalysis/README"
            }
          ]
        },
        {
          "id": "group-4465e2a8cb5b",
          "title": "图解与实验",
          "articles": [
            {
              "id": "article-50b47f8d3d78",
              "title": "Mermaid 错误诊断",
              "path": "/note/mermaid-diag"
            },
            {
              "id": "article-41e10f6611d4",
              "title": "Mermaid 图表测试",
              "path": "/note/mermaid-test"
            },
            {
              "id": "article-44e13438cce5",
              "title": "Mermaid 测试",
              "path": "/note/sourceLearn/mermaid-test"
            }
          ]
        }
      ]
    },
    {
      "id": "language",
      "title": "语言",
      "groups": [
        {
          "id": "group-b59fbbfa6a88",
          "title": "English",
          "articles": [
            {
              "id": "article-4b82ff3f0e95",
              "title": "音标与发音",
              "path": "/note/cultureLanguage/english/pronunciation"
            }
          ]
        },
        {
          "id": "group-c901ef076e60",
          "title": "Japanese",
          "articles": [
            {
              "id": "article-8e8bd795a83d",
              "title": "音标与发音",
              "path": "/note/cultureLanguage/japanese/pronunciation"
            }
          ]
        }
      ]
    }
  ]
};
