export const NAV_ITEMS = [
    {id: 'index', icon: 'home'},
    {id: 'overview', icon: 'description'},
    {id: 'plus', icon: 'diamond'},
    {id: 'changelog', icon: 'history'},
    {id: 'roadmap', icon: 'map'},
    {id: 'help', icon: 'help_center'},
    {id: 'feedback', icon: 'rate_review'}
];

export const SPRING_TRANSITION = {
    type: "spring",
    stiffness: 400,
    damping: 30
};

export const GLASS_STYLE = (isScrolled, isActive = false) => ({
    background: isScrolled || isActive
        ? 'rgba(var(--md-sys-color-surface-container-rgb), 0.96)'
        : 'rgba(var(--md-sys-color-surface-container-rgb), 0.7)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid var(--md-sys-color-outline-variant)',
    boxShadow: isScrolled
        ? '0 10px 40px rgba(var(--md-sys-color-shadow-rgb), 0.18)'
        : '0 4px 16px rgba(var(--md-sys-color-shadow-rgb), 0.08)',
    transform: 'translateZ(0)',
    willChange: 'transform, opacity'
});