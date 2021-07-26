let listTasks = [];
let id = 1;

// C: Create
$("#submit-add").click(function (e) {
  let name = $("#newTask").val();
  let time = $("#time").val();
  let status = $("input[name='status']:checked").val();
  status = status === "true" ? "Done" : "Not Yet";

  const task = {
    id: id,
    name: name,
    time: time,
    status: status,
  };

  listTasks.push(task);

  const addHTML = `
    <div class="view__row">
    <div class="view__row-name center-row">
      <p>${name}</p>
    </div>
    <div class="view__row-time border-left-col center-row">
      <p>${time}</p>
    </div>
    <div class="view__row-status border-left-col center-row">
      <p>${status}</p>
    </div>
    <div class="view__row-action border-left-col center-row">
      <div class="button-action">
        <button type="button" class="action-update" onclick="updateTask(${id})">Update</button>
        <button type="button" class="action-delete" onclick="deleteTask(${id})">Delete</button>
      </div>
    </div>
  </div>
  `;

  $(".view-crud").append(addHTML);
  clearInput();
  id++;
});

// U: Update
function updateTask(id) {
  let index = findIndexTask(id);
  console.log(listTasks);
  $("#newTask").val(listTasks[index].name);
  $("#time").val(listTasks[index].time);
  let status = listTasks[index].status === "Done" ? true : false;
  $("input[name='status']").val(status);

  $("#submit-add").addClass("hide-button");
  $("#submit-update").removeClass("hide-button");
  $("#button-cancel").removeClass("hide-button");
}

// D: Delete
function deleteTask(id) {
  let index = findIndexTask(id);
  $(".view__row").click(function (e) {
    $(this).remove();
  });
  listTasks.splice(index, 1);
  console.log(listTasks);
}

// Search: Để dùng cho Update và Delete
function findIndexTask(numberId) {
  let index;
  for (let i = 0; i < listTasks.length; i++) {
    if (listTasks[i].id === numberId) {
      index = i;
    }
  }
  return index;
}

function clearInput() {
  $("#newTask").val("");
  $("#time").val("");
  $("input[name='status']").attr("checked", false);
}
