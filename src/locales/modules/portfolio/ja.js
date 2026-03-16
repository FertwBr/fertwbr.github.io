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
        subtitle: "サイトの進化を追跡します。ここでは、各バージョンの新機能、改善点、修正点の詳細なログを確認できます。",
        search_placeholder: "機能、バージョンを検索...",
        latest_release: "最新リリース",
        released: "リリース日",
        update_now: "今すぐ更新",
        on_this_page: "このページ内",
        read_more: "リリースノートを読む",
        collapse: "折りたたむ",
        back_to_top: "トップに戻る",
        update_details: "更新の詳細",
        view_all: "すべての更新を表示",
        share_update: "更新を共有",
        jump_to: "ジャンプ",
        version_not_found: "バージョンが見つかりません。",
        no_results: "結果が見つかりません。",
        back_to_changelog: "Changelogに戻る",
        load_more: "さらに読み込む",
        explore_more: "さらに探す",
        link_copied: "リンクをクリップボードにコピーしました！",
        open_full_screen: "全画面で開く",
        share_tooltip: "この更新を共有する",
        previous_update: "前の更新",
        next_update: "次の更新",
        table_of_contents: "目次",
        in_this_update: "この更新について",
        auto_translated_badge: "自動翻訳",
        auto_translated_tooltip: "お客様の利便性のためにAIシステムによって翻訳されています。",
        translate_modal_title: "自動翻訳",
        translate_modal_desc: "このコンテンツは、最新情報を提供するためにAIシステムによって自動的に翻訳されました。一部の専門用語やニュアンスが若干不正確な場合があります。",
        translate_modal_show_original: "オリジナル（英語）を表示",
        translate_modal_keep_translation: "翻訳を保持する"
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
            email_label: "メールアドレス",
            email_placeholder: "your@email.com",
            email_error: "有効なメールアドレスを入力してください。",
            description_label: "メッセージ",
            description_placeholder: "何が起きたか、またはあなたのアイデアを教えてください...",
            description_error: "メッセージは15文字以上である必要があります。",
            include_device_info: "デバイス情報を含める (ブラウザ/OS)",
            send_button: "フィードバックを送信",
            draft_recovered: "下書きを復元しました",
            discard_draft: "下書きを破棄"
        },
        success: {
            title: "送信完了！",
            message: "メッセージは support@fertwbr.com に正常に送信されました。確認用コピーが {email} に送信されました。",
            error_title: "送信失敗",
            error_message: "メッセージの送信中にネットワークエラーが発生しました。もう一度お試しください。",
            btn_retry: "再試行",
            btn_edit: "メッセージを編集",
            btn_home: "ホームに戻る"
        },
        projects: {
            pixelpulse: "Pixel Pulse",
            pixelcompass: "Pixel Compass",
            portfolio: "ポートフォリオサイト"
        },
        platforms: {
            android: "Android (スマートフォン)",
            wearos: "Wear OS",
            web: "Web / サイト"
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
            default_general: "皆様の声をお待ちしています！ご意見をお聞かせください。",
            default_bug: "バグが発生した際の手順を教えてください。",
            default_feature: "この機能によって、あなたの体験はどのように向上しますか？",
            default_translation: "どの画面に誤ったテキストがありますか？",
            short_text: "より詳細な情報をいただければ、より深く理解することができます。",
            crash: "アプリがクラッシュした場合、エラーコードやメッセージが表示されましたか？",
            screenshot: "百聞は一見に如かずです。スクリーンショットの添付をご検討ください。",
            translation_keyword: "特定の言語と誤ったフレーズを明記していただくと、迅速な修正に役立ちます。",
            steps_received: "ありがとうございます！手順を把握することで、問題を再現しやすくなります。",
            error_received: "エラーの詳細をお送りいただき、ありがとうございます。",
            location_received: "助かります。画面上の場所を把握することは非常に有用です。",
            idea_received: "面白いアイデアですね！具体的な仕組みについて詳しく教えてください。",
            great_detail: "詳細な情報をありがとうございます！理解を深める上で非常に助かります。"
        },
        keywords: {
            crash: "クラッシュ,終了,停止,フリーズ,ラグ,壊れた,白画面",
            error: "エラー,コード,失敗,例外,0x,番号,メッセージ",
            steps: "手順,最初,次に,後で,時,クリック,タップ,押す,スクロール",
            screen: "画面,ページ,ビュー,ウィンドウ,ダイアログ,タブ,カード,メニュー,ナビバー,フッター",
            correction: "テキスト,単語,タイポ,間違い,正しくない,悪い,スペル,文法,翻訳,言語",
            idea: "追加,作成,希望,したい,できる,すべき,より良い,新規,機能,モード"
        }
    }
};