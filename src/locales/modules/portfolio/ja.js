/**
 * Core portfolio localization strings (Japanese).
 */
export default {
    common: {
        offline: "現在オフラインです。",
    },
    redirect: {
        launching: "アプリケーションを起動中...",
        did_open: "アプリは開きましたか？",
        open_again: "アプリを再起動する",
        get_on_store: "Play Store で入手"
    },
    error: {
        title: "システム異常",
        desc_1: "アプリケーションのコア内で予期しないエラーが発生しました。",
        desc_2: "ご安心ください。データは失われていません。",
        reload: "システムを再読み込み",
        home: "ホームに戻る",
        show_details: "技術的な詳細を表示",
        hide_details: "技術的な詳細を非表示",
        copy: "コピー",
        copied: "コピー完了"
    },
    hero: {
        greeting: "こんにちは、私は",
        name: "Fernando Vaz",
        role_prefix: "私は",
        roles: ["Androidアプリ", "バックエンドシステム", "ユーザーエクスペリエンス", "デジタルソリューション"],
        cta_primary: "プロジェクトを見る",
        cta_secondary: "お問い合わせ"
    },
    not_found: {
        page_title: "ページが見つかりません",
        title: "404",
        subtitle: "おっと！虚無の世界へ。",
        message: "お探しのページは現在存在しません。",
        suggestion_title: "こちらをお探しでしたか？",
        suggestion_desc: "リンクに基づいて、こちらへの移動を希望されていると推測します：",
        suggestion_btn: "はい、移動します",
        home_btn: "ホームへ移動",
        apps_btn: "アプリを見る"
    },
    about: {
        title: "私について",
        subtitle: "エンジニアリングとデザインの融合",
        bio: {
            p1: {
                start: "私は Fernando Vaz です。",
                highlight: "UniCesumar",
                end: "を卒業したソフトウェアエンジニアで、堅牢なコードと直感的なデザインの交差に情熱を注いでいます。"
            },
            p2: {
                start: "",
                highlight_1: "Androidエコシステム",
                middle: "（Kotlin/Jetpack Compose）とスケーラブルな",
                highlight_2: "バックエンド",
                end: "（Spring Boot）を専門としています。機能的であるだけでなく、使うのが楽しくなるようなソリューションを創造します。"
            }
        },
        cta_work: "実績を見る",
        stats: {
            exp: "経験年数",
            projects: "プロジェクト",
            clients: "満足されたクライアント"
        },
        cards: {
            education: {title: "学歴", value: "ソフトウェア工学士", sub: "UniCesumar"},
            location: {title: "所在地", value: "ブラジル、サルバドール", sub: "GMT-3"},
            stack: {title: "メインスタック", value: "Kotlin & Java", sub: "フルサイクル開発"}
        }
    },
    projects: {
        title: "選りすぐりの実績",
        subtitle: "技術的な深みと創造的な問題解決のショーケース。",
        view_project: "ケーススタディを見る",
        source_code: "ソースコード",
        items: [
            {
                id: "pixel_pulse",
                title: "Pixel Pulse",
                category: "Androidエンジニアリング",
                desc: "リアルタイムFFT解析、Room Database による永続化、WorkManager を活用したバッテリー最適化バックグラウンドサービスを備えた高度な騒音計。",
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
                category: "Wear OS & モバイル",
                desc: "センサーフュージョンアルゴリズム、Jetpack Glance ウィジェット、および関心の分離を明確にするマルチモジュールアーキテクチャを採用したプレミアムナビゲーションツール。",
                tags: ["Wear OS", "Sensors", "Glance", "Retrofit"],
                icon_url: "https://raw.githubusercontent.com/FertwBr/PixelAssets/main/Compass/art/phone.svg",
                link: "/PixelCompass?page=index",
                repo: "https://github.com/fertwbr/PixelCompass",
                color: "secondary",
                icon: "explore"
            },
            {
                id: "portfolio_site",
                title: "このポートフォリオ",
                category: "Webエンジニアリング",
                desc: "このサイト自体のアーキテクチャを深く掘り下げます。React、Material Design 3、およびカスタム Markdown エンジンで構築されています。",
                tags: ["React", "Vite", "Material 3", "Framer Motion"],
                icon: "web",
                link: "/site/overview",
                repo: "https://github.com/fertwbr/fertwbr.github.io",
                color: "tertiary"
            },
            {
                id: "box_idea",
                title: "boxIdea",
                category: "フルスタックWeb",
                desc: "チームがアイデアを投稿、投票、追跡できる企業イノベーションプラットフォーム。Spring Boot Security と PostgreSQL で構築。",
                tags: ["Spring Boot", "Java", "PostgreSQL", "JWT"],
                link: "https://github.com/FertwBr/boxIdea",
                repo: "https://github.com/FertwBr/boxIdea",
                color: "tertiary",
                icon: "lightbulb"
            }
        ]
    },
    tech: {
        title: "技術スタック",
        subtitle: "アイデアを形にするためのツール"
    },
    github: {
        title: "オープンソース",
        stats: {
            contributions: "年間コントリビューション",
            repos: "リポジトリ",
            stars: "総スター数"
        }
    },
    contact: {
        title: "一緒に働きましょう",
        desc: "プロジェクトの構想や、Android技術の最新動向についてお話ししませんか？",
        email: "e-mail を送る",
        linkedin: "LinkedIn",
        github: "GitHub"
    },
    footer: {
        rights: "All rights reserved.",
        built: "Designed & Built by Fernando Vaz 🇧🇷",
        useful_links: "便利なリンク",
        social_title: "SNS",
        appearance: {
            title: "テーマと外観",
            language_selector: "言語",
            en: "English",
            pt: "Português"
        }
    }
};