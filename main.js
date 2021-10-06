class Todo {
    constructor(todo = {}) {
      this.nombre = todo.nombre || ''
      this.descripcion = todo.descripcion || ''
      this.precio = todo.precio || ''
      this.status = todo.status || false
    }
  }
  
  const app = Vue.createApp({
    data() {
      return {
        newTodo: new Todo(),
        editNombre: '',
        editDescripcion: '',
        editPrecio: '',
        todos: [],
        errorNombre: false,
        errorDescripcion: false,
        errorPrecio: false,
        editIndex: -1,
      }
    },
    methods: {
      addTodo() {
        this.errorNombre = false;
        this.errorDescripcion = false;
        this.errorPrecio = false;
        if (this.newTodo.nombre.length > 0 && this.newTodo.descripcion.length > 0 && parseInt(this.newTodo.precio)>0) {
          this.todos.push(this.newTodo);
          this.newTodo = new Todo()
        } else {
            if(this.newTodo.nombre.length <= 0){
                this.errorNombre = true;
            }
            if(this.newTodo.descripcion.length <= 0){
                this.errorDescripcion = true;
            }

            if(parseInt(this.newTodo.precio) <= 0){
                this.errorPrecio = true;
            }
        }
      },
      setTodo(index) {
        this.editIndex = index;
        this.editNombre = this.todos[index].nombre;
        this.editDescripcion = this.todos[index].descripcion;
        this.editPrecio = this.todos[index].precio;
      },
      saveTodo(index) {
        this.todos[index].nombre = this.editNombre;
        this.todos[index].descripcion = this.editDescripcion;
        this.todos[index].precio = this.editPrecio;
        this.editIndex = -1;
      },
      deleteTodo(index) {
        const confirm = window.confirm('¿Seguro de eliminar este producto?');
        if (confirm) this.todos.splice(index, 1);
      },
      cancel() {
        this.editIndex = -1
      },
      changeStatus(index) {
        this.todos[index].status = !this.todos[index].status;
      }
    }
  })
  
  app.mount('#app')