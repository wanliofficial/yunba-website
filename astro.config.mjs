// 由 scripts/generate-sidebar.mjs 根据根目录 yunba_doc.yaml 生成，勿手改；
// 导航结构变化时运行 pnpm sidebar 重新生成。
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const sidebar = [
	{
		"label": "文档中心",
		"slug": "index"
	},
	{
		"label": "快速入门",
		"items": [
			{
				"label": "云巴是什么",
				"slug": "product_kb_whats_yunba"
			},
			{
				"label": "云巴特色",
				"slug": "product_kb_yunba_charitic"
			},
			{
				"label": "云巴快速入门教程",
				"slug": "product_kb_yunba_quick_start"
			},
			{
				"label": "产品常见问题解答",
				"slug": "product_faq"
			},
			{
				"label": "身份认证信息",
				"slug": "product_kb_identification"
			}
		]
	},
	{
		"label": "功能介绍",
		"items": [
			{
				"label": "发布订阅模型",
				"slug": "product_kb_pub_sub"
			},
			{
				"label": "频道和别名",
				"slug": "product_kb_topic_and_alias"
			},
			{
				"label": "频道过滤器",
				"slug": "product_kb_topic_filter"
			},
			{
				"label": "AppKey",
				"slug": "product_kb_app_key"
			},
			{
				"label": "Portal",
				"slug": "product_kb_portal"
			},
			{
				"label": "云巴的实时在线",
				"slug": "product_kb_presence"
			},
			{
				"label": "云巴的离线消息",
				"slug": "product_kb_offline_message"
			},
			{
				"label": "权限管理",
				"slug": "product_kb_access_manager"
			},
			{
				"label": "QoS",
				"slug": "product_kb_qos"
			},
			{
				"label": "云巴服务的 IP 是不固定的",
				"slug": "product_kb_yunba_unfixed_ip"
			},
			{
				"label": "云巴对 MQTT 协议的调整",
				"slug": "product_kb_mqtt_porting"
			}
		]
	},
	{
		"label": "案例文档",
		"items": [
			{
				"label": "如何用云巴实现弹幕功能",
				"slug": "product_demo_bullet"
			}
		]
	},
	{
		"label": "云巴产品计费规则",
		"items": [
			{
				"label": "云巴产品计费规则",
				"slug": "product_kb_pricing_details"
			}
		]
	},
	{
		"label": "云巴实时通信最佳实践",
		"slug": "product_best_practice"
	},
	{
		"label": "Android",
		"items": [
			{
				"label": "云巴 Android 消息推送",
				"slug": "android_kb_android_push"
			},
			{
				"label": "Android SDK 快速入门",
				"slug": "android_sdk_quick_start"
			},
			{
				"label": "Android SDK API 手册",
				"slug": "android_sdk_api_manual"
			},
			{
				"label": "Android SDK 使用指南",
				"slug": "android_sdk_tutorial"
			},
			{
				"label": "第三方推送集成指南",
				"slug": "android_sdk_third_part_push"
			},
			{
				"label": "运行 Yunba Android Demo",
				"slug": "android_demo_quick_start"
			},
			{
				"label": "多包名",
				"slug": "android_kb_multiple_package"
			},
			{
				"label": "Android SDK 常见问题解答",
				"slug": "android_faq"
			},
			{
				"label": "Android SDK 故障排除",
				"slug": "android_sdk_troubleshooting"
			}
		]
	},
	{
		"label": "iOS",
		"items": [
			{
				"label": "云巴 iOS 消息推送",
				"slug": "ios_kb_ios_push"
			},
			{
				"label": "iOS SDK 快速入门",
				"slug": "ios_sdk_quick_start"
			},
			{
				"label": "iOS SDK API 手册",
				"slug": "ios_sdk_api_manual"
			},
			{
				"label": "运行 Yunba iOS Demo",
				"slug": "ios_demo_quick_start"
			},
			{
				"label": "如何通过云巴实现 APNs 推送",
				"slug": "ios_kb_apns_implementation"
			},
			{
				"label": "生成 APNs 证书的步骤",
				"slug": "ios_kb_create_apns_certificate"
			},
			{
				"label": "新建 App ID 的步骤",
				"slug": "ios_kb_create_app_id"
			},
			{
				"label": "新建 CSR 文件的步骤",
				"slug": "ios_kb_create_csr_file"
			},
			{
				"label": "生成 Provisioning Profile",
				"slug": "ios_kb_create_provisioning_profile"
			},
			{
				"label": "【翻译】远程通知的负载部分",
				"slug": "ios_kb_payload"
			},
			{
				"label": "【翻译】APNs Provider API",
				"slug": "ios_kb_provider_api"
			},
			{
				"label": "【翻译】配置远程通知服务",
				"slug": "ios_kb_cfg_remote_notification"
			},
			{
				"label": "多证书",
				"slug": "ios_kb_multiple_certificates"
			},
			{
				"label": "iOS 10 更新的影响",
				"slug": "ios_kb_ios_10_impact"
			},
			{
				"label": "iOS SDK 常见问题解答",
				"slug": "ios_faq"
			},
			{
				"label": "使用 Wireshark 对移动设备进行抓包",
				"slug": "product_kb_packet_capture"
			}
		]
	},
	{
		"label": "JavaScript",
		"items": [
			{
				"label": "JavaScript SDK 快速入门",
				"slug": "js_sdk_quick_start"
			},
			{
				"label": "JavaScript SDK API 手册",
				"slug": "js_sdk_api_manual"
			},
			{
				"label": "运行 Yunba JavaScript Demo",
				"slug": "js_demo_quick_start"
			},
			{
				"label": "JavaScript SDK 常见问题解答",
				"slug": "js_faq"
			}
		]
	},
	{
		"label": "C 和 Embedded C",
		"items": [
			{
				"label": "C SDK 快速入门",
				"slug": "c_sdk_quick_start"
			},
			{
				"label": "C SDK API 手册",
				"slug": "c_sdk_api_manual"
			},
			{
				"label": "Embedded C API 手册",
				"slug": "embeddedc_sdk_api_manual"
			},
			{
				"label": "运行 Yunba C Demo",
				"slug": "c_demo_quick_start"
			}
		]
	},
	{
		"label": "RESTful",
		"items": [
			{
				"label": "RESTful API 手册",
				"slug": "restful_api_api_manual"
			},
			{
				"label": "RESTful API 常见问题解答",
				"slug": "restful_faq"
			}
		]
	},
	{
		"label": "Socket.IO",
		"items": [
			{
				"label": "Socket.IO API 手册",
				"slug": "socketio_api_api_manual"
			},
			{
				"label": "通过 Socket.IO 在微信小程序中集成云巴",
				"slug": "socketio_wxapp_usage"
			},
			{
				"label": "运行 Yunba Socket.IO Python Demo",
				"slug": "socketio_python_demo_quick_start"
			},
			{
				"label": "运行 Yunba Socket.IO Java Demo",
				"slug": "socketio_java_demo_quick_start"
			},
			{
				"label": "Socket.IO API 常见问题解答",
				"slug": "socketio_faq"
			}
		]
	},
	{
		"label": "C Sharp",
		"items": [
			{
				"label": "运行 Yunba C Sharp Demo",
				"slug": "csharp_demo_quick_start"
			}
		]
	},
	{
		"label": "Java",
		"items": [
			{
				"label": "Java SDK API 手册",
				"slug": "java_sdk_api_manual"
			},
			{
				"label": "运行 Yunba Java Demo",
				"slug": "java_demo_quick_start"
			}
		]
	},
	{
		"label": "PHP(Cli)",
		"items": [
			{
				"label": "运行 Yunba PHP Demo",
				"slug": "php_demo_quick_start"
			}
		]
	},
	{
		"label": "参数说明",
		"slug": "product_kb_param"
	},
	{
		"label": "其他",
		"items": [
			{
				"label": "Message ID",
				"slug": "product_kb_message_id"
			},
			{
				"label": "文档仓库说明",
				"slug": "readme"
			}
		]
	}
];

export default defineConfig({
	site: 'https://yunba.github.io',
	integrations: [
		starlight({
			title: '云巴 Yunba 文档',
			description: '云巴（Yunba）跨平台双向实时通信系统开发者文档',
			locales: {
				// root locale：文档平铺在 src/content/docs/ 根目录，URL 不带语言前缀，UI 为简体中文
				root: { label: '简体中文', lang: 'zh-CN' },
			},
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/yunba/docs',
				},
			],
			sidebar,
		}),
	],
});
