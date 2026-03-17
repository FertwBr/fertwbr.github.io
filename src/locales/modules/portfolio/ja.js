// src/locales/modules/portfolio/ja.js
export default {
    nav: {
        index: "ホーム",
        overview: "ドキュメント",
        changelog: "変更履歴",
        roadmap: "ロードマップ",
        privacy: "プライバシー",
        terms: "利用規約",
        help: "ヘルプ",
        back: "戻る"
    },
    hero: {
        greeting: "こんにちは、私は",
        name: "Fernando Vaz",
        role_prefix: "開発分野:",
        roles: ["Androidアプリ", "バックエンドシステム", "ユーザー体験", "デジタルソリューション"],
        cta_primary: "プロジェクトを見る",
        cta_secondary: "お問い合わせ"
    },
    not_found: {
        page_title: "ページが見つかりません",
        title: "404",
        subtitle: "おっと！何もない空間に到達しました。",
        message: "お探しのページは現在存在しません。",
        suggestion_title: "お探しはこちらですか？",
        suggestion_desc: "リンクに基づいて、次のページへ行きたいのではないかと推測しました:",
        suggestion_btn: "はい、そこへ行く",
        home_btn: "ホームへ行く",
        apps_btn: "アプリを見る"
    },
    about: {
        title: "私について",
        subtitle: "エンジニアリングとデザインの融合",
        bio: {
            p1: {
                start: "私はFernando Vazです。",
                highlight: "UniCesumar",
                end: " を卒業したソフトウェアエンジニアであり、堅牢なコードと直感的なデザインの交差点に情熱を注いでいます。"
            },
            p2: {
                start: "",
                highlight_1: "Androidエコシステム",
                middle: "（Kotlin/Jetpack Compose）とスケーラブルな",
                highlight_2: "バックエンド",
                end: "（Spring Boot）を専門としています。機能的であるだけでなく、使って楽しいソリューションを作成します。"
            }
        },
        cta_work: "私の作品を見る",
        stats: {exp: "経験年数", projects: "プロジェクト", clients: "満足したクライアント"},
        cards: {
            education: {title: "学歴", value: "ソフトウェアエンジニアリング学士", sub: "UniCesumar"},
            location: {title: "場所", value: "ブラジル、サルヴァドール", sub: "GMT-3"},
            stack: {title: "メインスタック", value: "KotlinとJava", sub: "フルサイクル開発"}
        }
    },
    projects: {
        title: "厳選されたプロジェクト",
        subtitle: "技術的な深さと創造的な問題解決のショーケース。",
        view_project: "ケーススタディを見る",
        source_code: "ソースコード",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Androidエンジニアリング",
                desc: "リアルタイムのFFT分析、Room Databaseの永続性、およびWorkManagerを介したバッテリー最適化されたバックグラウンドサービスを備えた高度な騒音計。",
                tags: ["Kotlin", "Compose", "FFT", "Room"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Pulse/art/phone.svg",
                link: "/PixelPulse?page=index",
                repo: "https://github.com/fertwbr/PixelPulse",
                color: "primary",
                icon: "equalizer"
            },
            {
                id: "pixel_compass",
                title: "Pixel Compass",
                category: "Wear OSとモバイル",
                desc: "センサーフュージョンアルゴリズム、Jetpack Glanceウィジェット、および関心事のクリーンな分離のためのマルチモジュールアーキテクチャを備えたプレミアムナビゲーションツール。",
                tags: ["Wear OS", "センサー", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "secondary",
                icon: "explore"
            },
            {
                id: "portfolio_site",
                title: "このポートフォリオ",
                category: "ウェブエンジニアリング",
                desc: "このサイト自体のアーキテクチャへの深い探求。React、Material Design 3、およびカスタムMarkdownエンジンで構築されています。",
                tags: ["React", "Vite", "Material 3", "Framer Motion"],
                icon: "web",
                link: "/site/overview",
                repo: "https://github.com/fertwbr/fertwbr.github.io",
                color: "tertiary"
            },
            {
                id: "box_idea",
                title: "boxIdea",
                category: "フルスタックウェブ",
                desc: "チームがアイデアを提出、投票、追跡できる企業向けイノベーションプラットフォーム。Spring Boot SecurityとPostgreSQLで構築されています。",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {title: "テクノロジー", subtitle: "アイデアを形にするために使用するツール"},
    github: {
        title: "オープンソース", view_profile: "GitHubプロフィールを見る", languages: "最も使用されている言語",
        default_bio: "Androidとウェブ向けのものを構築しています。",
        stats: {
            contributions: "年間コントリビューション",
            repos: "リポジトリ",
            stars: "合計スター",
            followers: "フォロワー"
        }
    },
    contact: {
        title: "一緒に働きましょう",
        desc: "プロジェクトのアイデアがありますか、それとも最新のAndroid技術について話し合いたいですか？",
        email: "e-mailを送信",
        linkedin: "LinkedIn",
        github: "GitHub"
    }
};