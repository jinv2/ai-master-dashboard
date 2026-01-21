export default async (request, context) => {
  const response = await context.next();

  const contentType = response.headers.get("content-type") || "";

  // 只处理 HTML
  if (!contentType.includes("text/html")) {
    return response;
  }

  let html = await response.text();

  // 防止重复注入
  if (html.includes("telemetry.js")) {
    return new Response(html, response);
  }

  const TELEMETRY_SCRIPT = `
<script>
(function(){
  try{
    fetch("https://MASTER-DASHBOARD.netlify.app/.netlify/functions/collect",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        agent_id: location.hostname,
        path: location.pathname,
        event: "pageview",
        ts: Date.now()
      })
    });
  }catch(e){}
})();
</script>
`;

  // 注入到 </head> 前
  html = html.replace("</head>", `${TELEMETRY_SCRIPT}</head>`);

  return new Response(html, response);
};
