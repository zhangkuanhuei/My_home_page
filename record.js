const KEY = "my_diary_posts_v1";

function loadPosts() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

function savePosts(posts) {
  localStorage.setItem(KEY, JSON.stringify(posts));
}

function formatDate(d = new Date()) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd} ${hh}:${mi}`;
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[s]));
}

function render() {
  const posts = loadPosts();
  const list = document.getElementById("postList");
  const hint = document.getElementById("hint");

  hint.textContent = `Total: ${posts.length} post(s). Saved in this browser.`;

  if (posts.length === 0) {
    list.innerHTML = `<p class="muted">No posts yet.</p>`;
    return;
  }

  list.innerHTML = posts.map((p, idx) => `
    <div class="post">
      <div class="post-top">
        <div>
          <h3>${escapeHtml(p.title || "Untitled")}</h3>
          <div class="muted">${p.time}</div>
        </div>
        <button class="btn" data-del="${idx}">Delete</button>
      </div>
      <p>${escapeHtml(p.content).replace(/\n/g, "<br>")}</p>
    </div>
  `).join("");

  // delete handlers
  list.querySelectorAll("[data-del]").forEach(btn => {
    btn.addEventListener("click", () => {
      const i = Number(btn.getAttribute("data-del"));
      const next = loadPosts();
      next.splice(i, 1);
      savePosts(next);
      render();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("title");
  const contentEl = document.getElementById("content");
  const saveBtn = document.getElementById("saveBtn");
  const clearBtn = document.getElementById("clearBtn");

  saveBtn.addEventListener("click", () => {
    const title = titleEl.value.trim();
    const content = contentEl.value.trim();

    if (content.length < 1) {
      alert("Please write something.");
      return;
    }

    const posts = loadPosts();
    posts.unshift({
      title,
      content,
      time: formatDate()
    });

    savePosts(posts);
    titleEl.value = "";
    contentEl.value = "";
    render();
  });

  clearBtn.addEventListener("click", () => {
    titleEl.value = "";
    contentEl.value = "";
  });

  render();
});