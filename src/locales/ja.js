export default {
  common: {
    offline: "現在オフラインです。",
  },
  redirect: {
    launching: "アプリケーションを起動中...",
    did_open: "アプリは開きましたか？",
    open_again: "アプリを再度開く",
    get_on_store: "Playストアで入手"
  },
  error: {
    title: "システムエラー",
    desc_1: "アプリケーションコア内で予期しない問題が発生しました。",
    desc_2: "ご安心ください、データは失われていません。",
    reload: "システムをリロード",
    home: "ホームに戻る",
    show_details: "技術的詳細を表示",
    hide_details: "技術的詳細を隠す",
    copy: "コピー",
    copied: "コピーしました"
  },
  hero: {
    greeting: "こんにちは、私は",
    role_prefix: "私は作ります",
    roles: ["Androidアプリ", "バックエンドシステム", "ユーザー体験", "デジタルソリューション"],
    cta_primary: "プロジェクトを見る",
    cta_secondary: "お問い合わせ"
  },
  not_found: {
    page_title: "ページが見つかりません",
    title: "404",
    subtitle: "おっと！何もないようです。",
    message: "お探しのページは現在存在しません。",
    suggestion_title: "こちらをお探しですか？",
    suggestion_desc: "リンクに基づき、こちらへのアクセスをご希望かと思われます：",
    suggestion_btn: "はい、移動する",
    home_btn: "ホームへ",
    apps_btn: "アプリを見る"
  },
  about: {
    title: "私について",
    subtitle: "エンジニアリングとデザインの融合",
    bio_1: "私はFernando Vazです。UniCesumarを卒業したソフトウェアエンジニアで、堅牢なコードと直感的なデザインの融合に情熱を注いでいます。",
    bio_2: "Androidエコシステム（Kotlin/Jetpack Compose）とスケーラブルなバックエンド（Spring Boot）を専門としています。機能的であるだけでなく、使って楽しいソリューションを作成します。",
    stats: {
      exp: "年の経験",
      projects: "プロジェクト",
      clients: "満足したクライアント"
    },
    cards: {
      education: { title: "教育", value: "ソフトウェア工学 学士", sub: "UniCesumar" },
      location: { title: "場所", value: "ブラジル、サルヴァドール", sub: "GMT-3" },
      stack: { title: "メインスタック", value: "Kotlin & Java", sub: "フルサイクル開発" }
    }
  },
  projects: {
    title: "主要な作品",
    subtitle: "技術的な深さと創造的な問題解決のショーケース。",
    view_project: "ケーススタディを見る",
    source_code: "ソースコード",
    items: [
      {
        id: "pixel_pulse",
        title: "Pixel Pulse",
        category: "Android エンジニアリング",
        desc: "リアルタイムFFT分析、Roomデータベースの永続性、WorkManagerによるバッテリー最適化されたバックグラウンドサービスを備えた高度な騒音計。",
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
        desc: "センサーフュージョンアルゴリズム、Jetpack Glanceウィジェット、関心の分離のためのマルチモジュールアーキテクチャを備えたプレミアムナビゲーションツール。",
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
        desc: "このサイト自体のアーキテクチャを深く掘り下げます。React、Material Design 3、およびカスタムMarkdownエンジンを使用して構築されています。",
        tags: ["React", "Vite", "Material 3", "Framer Motion"],
        icon: "web",
        link: "/site/overview",
        repo: "https://github.com/fertwbr/fertwbr.github.io",
        color: "tertiary"
      },
      {
        id: "box_idea",
        title: "boxIdea",
        category: "フルスタック Web",
        desc: "チームがアイデアを提出、投票、追跡できる企業向けイノベーションプラットフォーム。Spring Boot SecurityとPostgreSQLで構築。",
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
    subtitle: "アイデアを実現するために使用するツール"
  },
  github: {
    title: "オープンソース",
    stats: {
      contributions: "年間の貢献",
      repos: "リポジトリ",
      stars: "獲得スター数"
    }
  },
  contact: {
    title: "一緒にお仕事しませんか",
    desc: "プロジェクトをお考えですか、それとも最新のAndroid技術について話し合いたいですか？",
    email: "メールを送る",
    linkedin: "LinkedIn",
    github: "GitHub"
  },
  footer: {
    rights: "All rights reserved.",
    built: "Designed & Built by Fernando Vaz 🇧🇷",
    useful_links: "便利なリンク",
    social_title: "ソーシャル",
    appearance: {
      title: "テーマと外観",
      language_selector: "言語",
      en: "英語",
      pt: "ポルトガル語"
    }
  },
  pixel_pulse: {
    nav: {
      index: "概要",
      plus: "Pixel Pulse+",
      changelog: "更新履歴",
      roadmap: "ロードマップ",
      privacy: "プライバシー",
      help: "ヘルプ",
      overview: "ドキュメント",
      back: "ポートフォリオに戻る"
    },
    hero: {
      title: "あなたのスマートな音響コーチ",
      subtitle: "スタイルと精度で世界を測定しましょう。Androidのために美しくデザインされました。",
      download: "Playストアでダウンロード"
    },
    new_features: {
      label: "v1.17の新機能",
      title: "高度なカスタマイズ",
      view_history: "全履歴を見る",
      items: [
        {
          icon: "edit_attributes",
          title: "ツールバーエディタ",
          desc: "ドラッグ＆ドロップでワークスペースをカスタマイズ。よく使うツールを必要な場所に配置できます。"
        },
        {
          icon: "palette",
          title: "9つの新テーマ",
          desc: "エメラルドからサンセットまで。測定中のバッテリーを節約する完全な黒のAMOLEDモードも追加。"
        },
        {
          icon: "share",
          title: "画像エクスポート",
          desc: "チャートやセッション統計を美しい画像としてSNSに直接共有できます。"
        }
      ]
    },
    features: {
      title: "強力なツールキット、誰でも無料",
      cta_project: "技術概要を見る",
      items: [
        {
          title: "表現力豊かなリアルタイムメーター",
          desc: "落ち着いた青から警告の赤へと動的に色が変化するアニメーションゲージ。"
        },
        {
          title: "セッション履歴",
          desc: "測定値を保存し、インタラクティブなチャートで詳細を分析できます。"
        },
        {
          title: "精密キャリブレーション",
          desc: "プロレベルの精度を得るために、基準デバイスに対してセンサーを調整できます。"
        },
        {
          title: "Material You",
          desc: "壁紙のカラーパレットに適応し、ユニークな外観を実現します。"
        }
      ]
    },
    plus: {
      title: "究極の体験をアンロック",
      desc: "自動分析により、事後対応から事前対応へと進化しましょう。",
      cta: "Pixel Pulse+を見る"
    },
    plus_page: {
      title: "体験を向上させる",
      badge: "一回限りの購入",
      cta: "永久アクセスをアンロック",
      disclaimer: "サブスクリプションなし。隠れた手数料なし。",
      why_title: "なぜ買い切りなのか？",
      features_title: "Plusの利点",
      features_subtitle: "すぐに手に入るパワーを可視化します。",
      faq_title: "よくある質問"
    },
    privacy_section: {
      title: "プライバシー第一",
      cta_policy: "ポリシーを読む",
      cta_tech: "技術詳細",
      cards: [
        {
          icon: "mic_off",
          title: "音声は録音されません",
          desc: "生の音声は即座に処理され、破棄されます。会話を保存することはありません。"
        },
        {
          icon: "phonelink_lock",
          title: "デバイス内のみ",
          desc: "すべての分析はお使いのスマートフォン上で行われます。データがデバイスから出ることはありません。"
        },
        {
          icon: "block",
          title: "広告やトラッカーなし",
          desc: "サードパーティの追跡や侵襲的な広告のない、クリーンな体験。"
        },
        {
          icon: "visibility",
          title: "透明なストレージ",
          desc: "完全に管理可能です。セッション履歴はいつでもエクスポートまたは削除できます。"
        }
      ]
    },
    footer: {
      rights: "Pixel Pulse. All rights reserved.",
      links: "便利なリンク",
      theme_title: "テーマと外観"
    },
    changelog: {
      title: "バージョン履歴",
      subtitle: "Pixel Pulseの進化を追跡します。すべての機能、改善、修正を以下に詳述します。",
      search_placeholder: "機能、バージョンを検索 (例: 1.15, Beta)...",
      latest_release: "最新リリース",
      released: "リリース日",
      update_now: "今すぐ更新",
      on_this_page: "このページ内",
      load_more: "古いバージョンを読み込む",
      no_results: "フィルターに一致するバージョンが見つかりません。",
      jump_to: "バージョンへ移動",
      read_more: "リリースノートを読む",
      collapse: "折りたたむ",
      back_to_top: "トップへ戻る",
      plus_promo: {
        title: "開発を支援する",
        subtitle: "自動モニタリングをアンロックし、新機能の開発をご支援ください。",
        cta: "Pixel Pulse+を入手"
      },
      beta_program: {
        title: "ベータ版に参加",
        subtitle: "公開前に新機能をテストしましょう。",
        cta: "ベータプログラムに参加",
        badge: "早期アクセス"
      },
      wear_os_promo: {
        title: "Wear OS エクスペリエンス",
        subtitle_available: "手首から直接ナビゲート。シームレスな統合。",
        subtitle_coming: "2026年第1四半期に登場予定。",
        cta: "ウォッチで表示",
        badge: "コンパニオン"
      }
    },
    privacy_page: {
      page_title: "プライバシーポリシー",
      last_updated: "最終更新:",
      table_of_contents: "目次",
      contact_title: "ご質問ですか？",
      contact_desc: "データに関する懸念がある場合は、お問い合わせください。",
      contact_btn: "サポートへ連絡",
      print_btn: "ポリシーを印刷"
    },
    help_page: {
      page_title: "ヘルプとよくある質問",
      subtitle: "答えを見つけ、Pixel Pulseを最大限に活用する方法を学びましょう。",
      search_placeholder: "回答を検索 (例: キャリブレーション, エクスポート)...",
      table_of_contents: "トピック",
      contact_title: "お困りですか？",
      contact_desc: "お探しのものが見つかりませんか？チームがお手伝いします。",
      contact_btn: "サポートへ連絡",
      no_results: "検索に一致するトピックが見つかりません。"
    },
    roadmap_page: {
      title: "製品ロードマップ",
      subtitle: "これまでの成果と今後の予定をご確認ください。",
      suggest_btn: "機能を提案する",
      toc_title: "タイムライン"
    },
    overview_page: {
      title: "技術概要",
      subtitle: "アーキテクチャ、技術スタック、プライバシーエンジニアリングを深く掘り下げます。",
      github_btn: "GitHubで見る",
      toc_title: "このページ内"
    },
  },
  pixel_compass: {
    nav: {
      index: "概要",
      plus: "Pixel Compass+",
      changelog: "更新履歴",
      roadmap: "ロードマップ",
      privacy: "プライバシー",
      help: "ヘルプ",
      overview: "ドキュメント",
      back: "ポートフォリオに戻る"
    },
    hero: {
      title: "スマホとウォッチのためのスマートコンパス",
      subtitle: "スタイル、精度、そしてMaterial 3の魔法で世界をナビゲート。Androidのための究極のナビゲーション相棒。",
      download: "Playストアでダウンロード"
    },
    new_features: {
      label: "v1.15 Betaの新機能",
      title: "統一された体験",
      view_history: "全履歴を見る",
      items: [
        {
          icon: "responsive_layout",
          title: "レスポンシブレイアウト",
          desc: "フォルダブルやタブレットに最適化された「ようこそ」画面と「プラン」画面を完全に再設計。"
        },
        {
          icon: "error",
          title: "スマートなエラー処理",
          desc: "天気APIのエラーを、明確で役立つメッセージで適切に処理するようになりました。"
        },
        {
          icon: "palette",
          title: "ビジュアルの洗練",
          desc: "AMOLEDテーマのサーフェスカラーを更新し、動的なステータスバーのスクリムを追加しました。"
        }
      ]
    },
    features: {
      title: "高精度ツールキット",
      cta_project: "技術概要を見る",
      items: [
        {
          title: "精密ナビゲーション",
          desc: "プロレベルの精度と触覚フィードバックで、磁北と真北を切り替え可能。"
        },
        {
          title: "スマート環境",
          desc: "Insight Engine 4.0によるリアルタイムの高度、気温、UV指数のプロアクティブなアラート。"
        },
        {
          title: "革新的な水準器ツール",
          desc: "表現力豊かなアニメーション（波及効果と流体ウェーブ）で表面の傾きを確認。"
        },
        {
          title: "適応型ウィジェット",
          desc: "1x1からフルパネルまで、インテリジェントにサイズ変更される美しいホーム画面ウィジェット。"
        }
      ]
    },
    plus: {
      title: "究極の体験をアンロック",
      desc: "限定ウィジェット、高度な天気予報チャート、クラウド壁紙を入手し、広告を削除します。",
      cta: "Pixel Compass+を見る"
    },
    plus_page: {
      title: "体験を向上させる",
      badge: "柔軟なオプション",
      cta: "今すぐアンロック",
      disclaimer: "サブスクリプションまたは買い切りオプションが利用可能。",
      why_title: "なぜPlusなのか？",
      features_title: "Plusの利点",
      features_subtitle: "すぐに手に入るパワーを可視化します。",
      faq_title: "よくある質問"
    },
    privacy_section: {
      title: "プライバシー第一",
      cta_policy: "ポリシーを読む",
      cta_tech: "技術詳細",
      cards: [
        {
          icon: "location_off",
          title: "隠された追跡なし",
          desc: "位置情報は、アプリがアクティブなときのナビゲーションと天気情報にのみ使用されます。"
        },
        {
          icon: "phonelink_lock",
          title: "デバイス内処理",
          desc: "センサーデータは完全にデバイス内でローカルに処理されます。"
        },
        {
          icon: "cloud_off",
          title: "透明なデータ",
          desc: "位置履歴や支払い情報をサーバーに保存することはありません。"
        },
        {
          icon: "block",
          title: "広告なしオプション",
          desc: "Plusはすべてのサードパーティ広告を削除し、よりクリーンで高速な体験を提供します。"
        }
      ]
    },
    footer: {
      links: "便利なリンク",
      rights: "Pixel Compass. All rights reserved.",
      theme_title: "テーマと外観"
    },
    changelog: {
      title: "バージョン履歴",
      subtitle: "Pixel Compassの進化を追跡します。すべての機能、改善、修正を以下に詳述します。",
      search_placeholder: "機能、バージョンを検索...",
      latest_release: "最新リリース",
      released: "リリース日",
      update_now: "今すぐ更新",
      on_this_page: "このページ内",
      load_more: "古いバージョンを読み込む",
      no_results: "フィルターに一致するバージョンが見つかりません。",
      jump_to: "バージョンへ移動",
      read_more: "リリースノートを読む",
      collapse: "折りたたむ",
      back_to_top: "トップへ戻る",
      plus_promo: {
        title: "開発を支援する",
        subtitle: "ウィジェットとカスタマイズをアンロックし、新機能の開発をご支援ください。",
        cta: "Pixel Compass+を入手"
      },
      beta_program: {
        title: "ベータ版に参加",
        subtitle: "公開前に新機能をテストしましょう。",
        cta: "ベータプログラムに参加",
        badge: "早期アクセス"
      },
      wear_os_promo: {
        title: "Wear OS エクスペリエンス",
        subtitle_available: "手首から直接ナビゲート。シームレスな統合。",
        subtitle_coming: "2026年第1四半期に登場予定。",
        cta: "ウォッチで表示",
        badge: "コンパニオン"
      }
    },
    roadmap_page: {
      title: "製品ロードマップ",
      subtitle: "これまでの成果と今後の予定をご確認ください。",
      suggest_btn: "機能を提案する",
      toc_title: "タイムライン"
    },
    privacy_page: {
      page_title: "プライバシーポリシー",
      last_updated: "最終更新:",
      table_of_contents: "目次",
      contact_title: "ご質問ですか？",
      contact_desc: "データに関する懸念がある場合は、お問い合わせください。",
      contact_btn: "サポートへ連絡",
      print_btn: "ポリシーを印刷"
    },
    help_page: {
      page_title: "ヘルプとよくある質問",
      subtitle: "答えを見つけ、Pixel Compassを最大限に活用する方法を学びましょう。",
      search_placeholder: "回答を検索...",
      table_of_contents: "トピック",
      contact_title: "お困りですか？",
      contact_desc: "お探しのものが見つかりませんか？チームがお手伝いします。",
      contact_btn: "サポートへ連絡",
      no_results: "検索に一致するトピックが見つかりません。"
    },
    overview_page: {
      title: "技術概要",
      subtitle: "アーキテクチャ、センサー、エンジニアリングを深く掘り下げます。",
      github_btn: "GitHubで見る",
      toc_title: "このページ内"
    }
  }
};