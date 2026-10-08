export type LanguageCode = "en" | "es" | "fr" | "de" | "ja";

export interface Translations {
  dashboardTitle: string;
  dashboardSubtitle: string;
  navFeed: string;
  navTrending: string;
  navFavorites: string;
  navAnalytics: string;
  navSettings: string;
  searchPlaceholder: string;
  searchAria: string;
  filterAll: string;
  filterNews: string;
  filterRecommendations: string;
  filterSocial: string;
  activeCategories: string;
  customizeFeed: string;
  reorderHint: string;
  resetOrder: string;
  loadMore: string;
  noResults: string;
  noResultsDesc: string;
  favoritesEmpty: string;
  favoritesEmptyDesc: string;
  trendingRank: string;
  trendingScore: string;
  readMore: string;
  playPreview: string;
  viewThread: string;
  saveFavorite: string;
  saved: string;
  share: string;
  liked: string;
  like: string;
  settingsTitle: string;
  settingsDesc: string;
  categoriesTitle: string;
  themeTitle: string;
  darkMode: string;
  lightMode: string;
  layoutDensity: string;
  autoRefresh: string;
  saveChanges: string;
  liveUpdatesTitle: string;
  newUpdatesAvailable: string;
  clickToView: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    dashboardTitle: "PulseDesk",
    dashboardSubtitle: "Personalized Intelligence Hub",
    navFeed: "Unified Feed",
    navTrending: "Trending Radar",
    navFavorites: "Saved Favorites",
    navAnalytics: "Reading Insights",
    navSettings: "Preferences",
    searchPlaceholder: "Search news, movies, tweets, hashtags (Ctrl + K)...",
    searchAria: "Universal Search",
    filterAll: "All Streams",
    filterNews: "News",
    filterRecommendations: "Recommendations",
    filterSocial: "Social Buzz",
    activeCategories: "Active Categories",
    customizeFeed: "Customize",
    reorderHint: "Drag cards to prioritize your personal stream",
    resetOrder: "Reset Order",
    loadMore: "Load More Content",
    noResults: "No matching items found",
    noResultsDesc: "Try adjusting your search terms or expanding category filters.",
    favoritesEmpty: "No saved items yet",
    favoritesEmptyDesc: "Bookmark items from your feed to review them here anytime.",
    trendingRank: "Rank",
    trendingScore: "Velocity",
    readMore: "Read Article",
    playPreview: "Play Preview",
    viewThread: "View Post",
    saveFavorite: "Bookmark",
    saved: "Saved",
    share: "Share",
    liked: "Liked",
    like: "Like",
    settingsTitle: "Dashboard Preferences",
    settingsDesc: "Configure your categories, layout density, and stream behavior.",
    categoriesTitle: "Preferred Categories",
    themeTitle: "Appearance & Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    layoutDensity: "Display Layout",
    autoRefresh: "Live Stream Polling",
    saveChanges: "Save Preferences",
    liveUpdatesTitle: "Live Feed Active",
    newUpdatesAvailable: "new updates available",
    clickToView: "Click to load",
  },
  es: {
    dashboardTitle: "PulseDesk",
    dashboardSubtitle: "Centro de Inteligencia Personalizado",
    navFeed: "Feed Unificado",
    navTrending: "Tendencias",
    navFavorites: "Favoritos Guardados",
    navAnalytics: "Estadísticas de Lectura",
    navSettings: "Preferencias",
    searchPlaceholder: "Buscar noticias, películas, tweets (Ctrl + K)...",
    searchAria: "Búsqueda universal",
    filterAll: "Todos los Canales",
    filterNews: "Noticias",
    filterRecommendations: "Recomendaciones",
    filterSocial: "Redes Sociales",
    activeCategories: "Categorías Activas",
    customizeFeed: "Personalizar",
    reorderHint: "Arrastra las tarjetas para reorganizar tu feed",
    resetOrder: "Restablecer Orden",
    loadMore: "Cargar Más Contenido",
    noResults: "No se encontraron resultados",
    noResultsDesc: "Intente ajustar su búsqueda o cambiar los filtros de categoría.",
    favoritesEmpty: "Sin elementos guardados aún",
    favoritesEmptyDesc: "Guarde artículos de su feed para revisarlos aquí.",
    trendingRank: "Puesto",
    trendingScore: "Velocidad",
    readMore: "Leer Artículo",
    playPreview: "Reproducir Avance",
    viewThread: "Ver Publicación",
    saveFavorite: "Guardar",
    saved: "Guardado",
    share: "Compartir",
    liked: "Me Gusta",
    like: "Me Gusta",
    settingsTitle: "Preferencias del Panel",
    settingsDesc: "Configure sus categorías, diseño y comportamiento de flujo.",
    categoriesTitle: "Categorías Preferidas",
    themeTitle: "Apariencia y Tema",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    layoutDensity: "Diseño de Visualización",
    autoRefresh: "Transmisión en Vivo",
    saveChanges: "Guardar Preferencias",
    liveUpdatesTitle: "Transmisión en Vivo Activa",
    newUpdatesAvailable: "nuevas actualizaciones disponibles",
    clickToView: "Clic para cargar",
  },
  fr: {
    dashboardTitle: "PulseDesk",
    dashboardSubtitle: "Hub d'Intelligence Personnalisé",
    navFeed: "Flux Unifié",
    navTrending: "Tendances",
    navFavorites: "Favoris Enregistrés",
    navAnalytics: "Statistiques de Lecture",
    navSettings: "Préférences",
    searchPlaceholder: "Rechercher actualités, films, tweets (Ctrl + K)...",
    searchAria: "Recherche universelle",
    filterAll: "Tous les Flux",
    filterNews: "Actualités",
    filterRecommendations: "Recommandations",
    filterSocial: "Réseaux Sociaux",
    activeCategories: "Catégories Actives",
    customizeFeed: "Personnaliser",
    reorderHint: "Glissez les cartes pour réorganiser votre flux personnel",
    resetOrder: "Réinitialiser l'Ordre",
    loadMore: "Charger Plus",
    noResults: "Aucun élément correspondant trouvé",
    noResultsDesc: "Essayez d'ajuster votre recherche ou d'élargir les catégories.",
    favoritesEmpty: "Aucun favori enregistré",
    favoritesEmptyDesc: "Ajoutez des favoris depuis votre flux pour les consulter ici.",
    trendingRank: "Rang",
    trendingScore: "Vélocité",
    readMore: "Lire l'Article",
    playPreview: "Aperçu Média",
    viewThread: "Voir le Post",
    saveFavorite: "Sauvegarder",
    saved: "Enregistré",
    share: "Partager",
    liked: "Aimé",
    like: "J'aime",
    settingsTitle: "Préférences du Tableau",
    settingsDesc: "Configurez vos catégories et options d'affichage.",
    categoriesTitle: "Catégories Préférées",
    themeTitle: "Apparence & Thème",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    layoutDensity: "Mise en Page",
    autoRefresh: "Flux en Direct",
    saveChanges: "Enregistrer",
    liveUpdatesTitle: "Flux en Direct Actif",
    newUpdatesAvailable: "nouvelles mises à jour disponibles",
    clickToView: "Cliquez pour charger",
  },
  de: {
    dashboardTitle: "PulseDesk",
    dashboardSubtitle: "Personalisiertes Content-Hub",
    navFeed: "Haupt-Feed",
    navTrending: "Trending Radar",
    navFavorites: "Gespeicherte Favoriten",
    navAnalytics: "Lese-Statistiken",
    navSettings: "Einstellungen",
    searchPlaceholder: "Nachrichten, Filme, Posts suchen (Strg + K)...",
    searchAria: "Universelle Suche",
    filterAll: "Alle Streams",
    filterNews: "Nachrichten",
    filterRecommendations: "Empfehlungen",
    filterSocial: "Social Media",
    activeCategories: "Aktive Kategorien",
    customizeFeed: "Anpassen",
    reorderHint: "Karten ziehen, um die Reihenfolge anzupassen",
    resetOrder: "Reihenfolge zurücksetzen",
    loadMore: "Mehr laden",
    noResults: "Keine Treffer gefunden",
    noResultsDesc: "Passen Sie die Suchbegriffe an oder wählen Sie mehr Kategorien.",
    favoritesEmpty: "Noch keine Favoriten gespeichert",
    favoritesEmptyDesc: "Lesezeichen setzen, um Artikel hier schnell wiederzufinden.",
    trendingRank: "Rang",
    trendingScore: "Trend-Score",
    readMore: "Artikel lesen",
    playPreview: "Vorschau abspielen",
    viewThread: "Beitrag ansehen",
    saveFavorite: "Merken",
    saved: "Gemerkt",
    share: "Teilen",
    liked: "Gefällt mir",
    like: "Gefällt mir",
    settingsTitle: "Dashboard Einstellungen",
    settingsDesc: "Kategorien, Layout und Aktualisierungsintervall anpassen.",
    categoriesTitle: "Bevorzugte Kategorien",
    themeTitle: "Erscheinungsbild",
    darkMode: "Dunkelmodus",
    lightMode: "Hellmodus",
    layoutDensity: "Layout-Dichte",
    autoRefresh: "Live-Stream Aktualisierung",
    saveChanges: "Einstellungen speichern",
    liveUpdatesTitle: "Live-Stream Aktiv",
    newUpdatesAvailable: "neue Updates verfügbar",
    clickToView: "Hier klicken",
  },
  ja: {
    dashboardTitle: "PulseDesk",
    dashboardSubtitle: "パーソナライズ・インテリジェンスハブ",
    navFeed: "統合フィード",
    navTrending: "トレンド",
    navFavorites: "ブックマーク",
    navAnalytics: "分析と統計",
    navSettings: "個人設定",
    searchPlaceholder: "ニュース、映画、SNS投稿を検索 (Ctrl + K)...",
    searchAria: "ユニバーサル検索",
    filterAll: "すべてのストリーム",
    filterNews: "ニュース",
    filterRecommendations: "おすすめ作品",
    filterSocial: "SNSの話題",
    activeCategories: "選択中のカテゴリー",
    customizeFeed: "カスタマイズ",
    reorderHint: "ドラッグ＆ドロップでカードを並び替えできます",
    resetOrder: "順序をリセット",
    loadMore: "さらに読み込む",
    noResults: "該当する項目が見つかりません",
    noResultsDesc: "検索キーワードを変更するかカテゴリーフィルターを広げてください。",
    favoritesEmpty: "ブックマークはまだありません",
    favoritesEmptyDesc: "フィード内の気になる項目をブックマークしてここに保存しましょう。",
    trendingRank: "順位",
    trendingScore: "トレンド指数",
    readMore: "記事を読む",
    playPreview: "プレビュー再生",
    viewThread: "投稿を見る",
    saveFavorite: "保存",
    saved: "保存済み",
    share: "共有",
    liked: "いいね済",
    like: "いいね",
    settingsTitle: "ダッシュボード設定",
    settingsDesc: "カテゴリー、レイアウト、自動更新の動作を設定します。",
    categoriesTitle: "関心のあるカテゴリー",
    themeTitle: "外観テーマ",
    darkMode: "ダークモード",
    lightMode: "ライトモード",
    layoutDensity: "表示レイアウト",
    autoRefresh: "リアルタイム自動更新",
    saveChanges: "設定を保存",
    liveUpdatesTitle: "ライブフィード稼働中",
    newUpdatesAvailable: "件の新しい更新があります",
    clickToView: "クリックして読み込む",
  },
};
