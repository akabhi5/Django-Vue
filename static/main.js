function sendRequest(url, method, data) {
  const r = axios({
    method: method,
    url: url,
    data: data,
    xsrfCookieName: "csrftoken",
    xsrfHeaderName: "X-CSRFToken",
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return r;
}

const app = new Vue({
  delimiters: ["[[", "]]"],
  el: "#app",
  data: {
    task: "",
    tasks: [{ title: "one" }, { title: "two" }],
  },
  created() {
    const r = sendRequest("", "get").then((response) => {
      this.tasks = response.data.tasks;
    });
  },
  computed: {
    taskList() {
      const compare = (a, b) => {
        if (a.completed > b.completed) return 1;
        if (a.completed < b.completed) return -1;
        return 0;
      };
      return this.tasks.sort(compare);
    },
  },
  methods: {
    createTask() {
      // to send data use FormData otherwise backend gets empty data
      const vm = this;
      const formData = new FormData();
      formData.append("title", this.task);

      sendRequest("", "post", formData).then((response) => {
        this.tasks.push(response.data.task);
        this.task = "";
      });
    },
    completeTask(id, index) {
      sendRequest(`${id}/complete/`, "post").then((response) => {
        this.tasks.splice(index, 1);
        this.tasks.push(response.data.task);
      });
    },
    deleteTask(id, index) {
      sendRequest(`${id}/delete/`, "post").then((response) => {
        this.tasks.splice(index, 1);
      });
    },
  },
});
