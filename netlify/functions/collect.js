let store = [];

export default async (req) => {
  // 统计模式（中央看板用）
  if (req.method === "GET") {
    const byAgent = {};
    let errors = 0;

    store.forEach(e => {
      byAgent[e.agent_id] = (byAgent[e.agent_id] || 0) + 1;
      if (e.event === "error") errors++;
    });

    return new Response(JSON.stringify({
      total: store.length,
      agents: Object.keys(byAgent).length,
      errorRate: store.length ? ((errors / store.length) * 100).toFixed(1) : 0,
      byAgent: Object.entries(byAgent).map(([agent_id, calls]) => ({
        agent_id,
        calls
      }))
    }), { headers: { "Content-Type": "application/json" }});
  }

  // 客户智能体上报
  const data = await req.json();

  store.push({
    agent_id: data.agent_id,
    event: data.event,
    t: Date.now()
  });

  return new Response("ok");
};
