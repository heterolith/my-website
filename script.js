// 页面加载后执行
document.addEventListener('DOMContentLoaded', function() {
    // ===== 新增：公告弹窗交互逻辑 =====
    // 获取公告相关元素
    const noticeDetailBtn = document.getElementById('noticeDetailBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalCloseBtn = document.getElementById('modalCloseBtn');

    // 打开公告弹窗
    function openModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // 禁止背景滚动
        }
    }

    // 关闭公告弹窗
    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        }
    }

    // 绑定公告弹窗事件
    if (noticeDetailBtn) noticeDetailBtn.addEventListener('click', openModal);
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

    // ===== 原有：Header scroll effect =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ===== 原有：滚动时显示元素 =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section-title h2, .about-text p, .about-image, .skill-card, .project-card, .contact-item, .form-group');
        
        elements.forEach(el => {
            const position = el.getBoundingClientRect();
            if(position.top < window.innerHeight * 0.9) {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
                
                // 特殊动画
                if(el.classList.contains('section-title')) {
                    setTimeout(() => {
                        document.querySelector('.section-title:after').style.opacity = "1";
                        document.querySelector('.section-title:after').style.transform = "scaleX(1)";
                    }, 300);
                }
            }
        });
    }
    
    // 初始调用
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // ===== 原有：锚点滚动（新增适配公告栏高度） =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            // 适配公告栏高度的滚动偏移（40px）
            const offsetTop = targetElement ? targetElement.offsetTop - 40 : 0;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // 移动端点击后关闭菜单
            if(window.innerWidth <= 768) {
                document.querySelector('nav ul').style.display = 'none';
            }
        });
    });
    
    // ===== 原有：表单提交 =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // Here you would normally send the form data to a server
                alert('感谢您的留言！我会尽快回复您。');
                contactForm.reset();
            } else {
                alert('请填写所有必填字段');
            }
        });
    }
    
    // ===== 原有：移动端菜单切换 =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const isVisible = navMenu.style.display === 'flex';
            navMenu.style.display = isVisible ? 'none' : 'flex';
        });
    }
    
    // ===== 原有：初始动画 =====
    setTimeout(() => {
        document.querySelector('.logo-dot').style.transform = "scale(1.5)";
        setTimeout(() => {
            document.querySelector('.logo-dot').style.transform = "scale(1)";
        }, 300);
    }, 1000);
});