// The undo history is stored in an array and used as a stack.
// The last state saved is the first state removed (LIFO).
const editor = document.getElementById("editor");
const saveBtn = document.getElementById("saveBtn");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");
const message = document.getElementById("message");
const stackList = document.getElementById("stackList");
const stackCount = document.getElementById("stackCount");

const undoStack = [];

function showMessage(text) {
  message.textContent = text;
}

function renderStack() {
  stackList.innerHTML = "";

  if (undoStack.length === 0) {
    const item = document.createElement("li");
    item.className = "empty";
    item.textContent = "No saved states yet.";
    stackList.appendChild(item);
  } else {
    // Show the top of the stack first so it is easy to see what Undo will remove.
    for (let i = undoStack.length - 1; i >= 0; i--) {
      const item = document.createElement("li");
      const preview = undoStack[i].trim() || "(empty text)";
      item.textContent = `State ${i + 1}: ${preview.slice(0, 100)}`;
      stackList.appendChild(item);
    }
  }

  stackCount.textContent = `${undoStack.length} saved state(s)`;
  undoBtn.disabled = undoStack.length === 0;
}

saveBtn.addEventListener("click", () => {
  undoStack.push(editor.value);
  renderStack();
  showMessage("Current text saved to the top of the stack.");
});

undoBtn.addEventListener("click", () => {
  if (undoStack.length === 0) {
    showMessage("The stack is empty, so there is nothing to undo.");
    return;
  }

  editor.value = undoStack.pop();
  renderStack();
  showMessage("Undo complete. The most recently saved state was restored.");
});

clearBtn.addEventListener("click", () => {
  // Save the current text first, so the user can recover it with Undo.
  undoStack.push(editor.value);
  editor.value = "";
  renderStack();
  showMessage("Text cleared. Its previous state was saved, so you can use Undo.");
});

renderStack();
