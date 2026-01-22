(function() {
    // ✅ 核心配置 (已填入你的 Key)
    const CONFIG = {
        url: 'https://sfxpbtqxtshtywbzahlo.supabase.co',
        key: 'sb_publishable_mMtaZpZiaW9FGK3XMkelug_piElFnC8'
    };

    function logView() {
        // 防止本地测试时刷数据
        if (window.location.hostname === 'localhost') return;

        const payload = {
            site_name: document.title, // 自动抓取网页标题
            url: window.location.href, // 抓取链接
            referrer: document.referrer // 抓取来源
        };

        // 发送数据到 Supabase
        fetch(`${CONFIG.url}/rest/v1/page_views`, {
            method: 'POST',
            headers: {
                'apikey': CONFIG.key,
                'Authorization': `Bearer ${CONFIG.key}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(payload)
        }).catch(err => console.warn('SkyCalc Telemetry Error:', err));
    }

    // 确保页面加载完成后再发送
    if (document.readyState === 'complete') {
        logView();
    } else {
        window.addEventListener('load', logView);
    }
})();
