const MASTER_PASSWORD = "CHANGE_ME_NOW";

function login() {
  const input = document.getElementById("password").value;
  if (input === MASTER_PASSWORD) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadData();
  } else {
    alert("密码错误");
  }
}

async function loadData() {
  const res = await fetch("/.netlify/functions/collect?mode=stats");
  const data = await res.json();

  document.getElementById("totalCalls").innerText =
    "总调用：" + data.total;

  document.getElementById("agents").innerText =
    "活跃智能体：" + data.agents;

  document.getElementById("errors").innerText =
    "错误率：" + data.errorRate + "%";

  const list = document.getElementById("agentList");
  list.innerHTML = "";
  data.byAgent.forEach(a => {
    const li = document.createElement("li");
    li.innerText = `${a.agent_id}：${a.calls}`;
    list.appendChild(li);
  });
}
