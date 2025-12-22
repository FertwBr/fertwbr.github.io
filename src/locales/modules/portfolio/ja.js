/**
 * Core portfolio localization strings (Japanese).
 */
export default {
    nav: {
        index: "ホーム",
        overview: "ドキュメント",
        changelog: "変更履歴",
        roadmap: "ロードマップ",
        privacy: "プライバシー",
        help: "ヘルプ",
        back: "戻る"
    },
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
        view_profile: "GitHubプロフィールを見る",
        languages: "最も使用されている言語",
        default_bio: "AndroidおよびWeb向けの開発を行っています。",
        stats: {
            contributions: "年間の貢献数",
            repos: "リポジトリ",
            stars: "スター合計",
            followers: "フォロワー"
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
    },
    changelog: {
        title: "バージョン履歴",
        subtitle: "サイトの進化を追跡します。ここでは、各バージョンの新機能、改善、修正に関する詳細なログを確認できます。",
        search_placeholder: "機能、バージョンを検索...",
        latest_release: "最新リリース",
        released: "リリース済み",
        update_now: "今すぐ更新",
        on_this_page: "このページ内",
        load_more: "以前のバージョンを読み込む",
        no_results: "フィルターに一致するバージョンが見つかりませんでした。",
        jump_to: "バージョンへ移動",
        read_more: "リリースノートを読む",
        collapse: "折りたたむ",
        back_to_top: "トップへ戻る"
    },
    overview_page: {
        title: "技術概要",
        subtitle: "アーキテクチャとスタックの詳細な分析。",
        github_btn: "GitHubで表示",
        toc_title: "このページ内",
        dynamic_docs_note: "この概要はMarkdownファイルから動的に生成されており、コードベースの最新の変更に合わせて常に最新の状態が保たれるようになっています。",
        about_docs_title: "このドキュメントについて"
    },
    feedback: {
        title: "フィードバックを送信",
        subtitle: "改善にご協力ください。バグ報告、機能のリクエスト、または単なる挨拶でも構いません。",

        form: {
            project_label: "プロジェクト",
            type_label: "トピック",
            platform_label: "プラットフォーム",
            description_label: "メッセージ",
            description_placeholder: "何が起きたのか、またはあなたのアイデアを教えてください...",
            include_device_info: "デバイス情報を含める (Browser/OS)",
            send_button: "メールを生成",
            draft_recovered: "下書きを復元しました",
            discard_draft: "下書きを破棄",
            attach_tip: "注意：必要に応じて、メールアプリで直接スクリーンショットを添付してください。"
        },

        success: {
            title: "送信の準備完了",
            message: "作成されたメッセージを表示した状態でメールクライアントを開きました。内容を確認して送信ボタンを押してください。",
            btn_retry: "メールアプリを再度開く",
            btn_edit: "メッセージを編集",
            btn_home: "ホームに戻る"
        },

        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "Portfolio Site"
        },

        platforms: {
            android: "Android (Phone)",
            wearos: "Wear OS",
            web: "Web / Site"
        },

        types: {
            general: "全般的なフィードバック",
            bug: "バグ報告",
            feature: "機能リクエスト",
            translation: "翻訳の問題",
            ui: "UIの提案",
            other: "その他"
        },
        guidance: {
            label: "ヒント",
            default_general: "皆様のご意見をお待ちしております！",
            default_bug: "バグが発生するまでの手順を説明してください。",
            default_feature: "この機能によって、あなたの体験はどのように向上しますか？",
            default_translation: "どの画面に誤ったテキストがありますか？",

            short_text: "より詳しく理解するために、もう少し詳細を教えてください。",
            crash: "アプリがクラッシュした場合、エラーコードやメッセージが表示されましたか？",
            screenshot: "百聞は一見に如かず。メールにスクリーンショットを添付することをご検討ください。",
            translation_keyword: "特定の言語と誤ったフレーズを明記していただくと、迅速な修正に役立ちます。",

            steps_received: "完璧です！手順を把握することで、問題を再現しやすくなります。",
            error_received: "エラーの詳細を含めていただき、ありがとうございます。",
            location_received: "素晴らしいです。画面上の場所がわかると非常に助かります。",
            idea_received: "それは興味深いアイデアですね！どのように機能するか詳しく教えてください。",
            great_detail: "詳細な情報をありがとうございます！理解を深めるのに非常に役立ちます。"
        },
        keywords: {
            crash: "クラッシュ,閉じる,停止,終了,フリーズ,ラグ,壊れた,白画面",
            error: "エラー,コード,失敗,例外,0x,番号,メッセージ",
            steps: "ステップ,最初,次に,後で,時,クリック,タップ,押す,スクロール",
            screen: "画面,ページ,ビュー,ウィンドウ,ダイアログ,タブ,カード,メニュー,ナビバー,フッター",
            correction: "テキスト,単語,誤字,間違い,正しくない,悪い,綴り,文法,翻訳,言語",
            idea: "追加,作成,希望,したい,できる,すべき,より良い,新しい,機能,モード"
        }
    }
};