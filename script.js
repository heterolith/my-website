document.addEventListener('DOMContentLoaded', function() {
    const noticeDetailBtn = document.getElementById('noticeDetailBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // 打开弹窗
    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    // 关闭弹窗
    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    // ========== 核心新增：首次访问自动弹窗逻辑 ==========
    // 检查浏览器是否支持localStorage（兼容所有现代浏览器）
    const isLocalStorageSupported = typeof localStorage !== 'undefined';
    // 标记键名：记录用户是否已首次访问
    const VISITED_FLAG = 'hasVisitedSite';

    // 首次访问：自动弹窗 + 标记已访问
    if (isLocalStorageSupported) {
        const hasVisited = localStorage.getItem(VISITED_FLAG);
        if (!hasVisited) {
            // 延迟500ms弹窗（避免页面还没加载完就弹，体验更好）
            setTimeout(openModal, 500);
            // 标记为已访问（存入本地，后续不再自动弹）
            localStorage.setItem(VISITED_FLAG, 'true');
        }
    } else {
        // 极端情况：浏览器不支持localStorage（极少），则每次都自动弹
        setTimeout(openModal, 500);
    }

    // ========== 原有交互逻辑保留 ==========
    // 手动点击“查看详情”仍可打开弹窗
    if (noticeDetailBtn) noticeDetailBtn.addEventListener('click', openModal);
    // 点击关闭按钮关闭弹窗
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    // 点击弹窗外部关闭
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    // ESC键关闭弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
            closeModal();
        }
    });
});