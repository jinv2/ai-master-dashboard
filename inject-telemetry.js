(function() {
    // 🔴 零依赖探针 - 直接利用浏览器原生能力发送数据
    const CONFIG = {
        url: 'https://sfxpbtqxtshtywbzahlo.supabase.co',
        key: 'sb_publishable_mMtaZpZiaW9FGK3XMkelug_piElFnC8'
    };

    function logView() {
        // 1. 排除本地测试 (localhost)
        if (window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')) {
            console.log('SkyCalc Probe: 本地测试不记录');
            return;
        }

        // 2. 准备数据
        const payload = {
            site_name: document.title || 'Unknown Site',
            url: window.location.href,
            referrer: document.referrer || ''
        };

        // 3. 发送 (使用原生 fetch，不依赖 Supabase 库)
        fetch(`${CONFIG.url}/rest/v1/page_views`, {
            method: 'POST',
            headers: {
                'apikey': CONFIG.key,
                'Authorization': `Bearer ${CONFIG.key}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(payload)
        })
        .then(() => console.log('SkyCalc Probe: 数据已上报'))
        .catch(err => console.warn('SkyCalc Probe Error:', err));
    }

    // 4. 确保页面加载完成后执行
    if (document.readyState === 'complete') {
        logView();
    } else {
        window.addEventListener('load', logView);
    }
})();
