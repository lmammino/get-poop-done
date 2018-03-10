/* global $, tippy, UUID, confetti, store, Favico */
const colors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']

const todoApp = (rootEl, opt = {}) => {
  const todos = opt.todos || []
  let completedTasks = opt.completedTasks || 0
  const onChange = opt.onChange || (() => {})

  const list = rootEl.find('.todo-list')
  const footer = rootEl.find('.footer')
  const todoCount = footer.find('.todo-count')
  const insertInput = rootEl.find('.add-todo-box input')
  const insertBtn = rootEl.find('.add-todo-box button')

  const render = () => {
    let tips
    list.html('')
    if (todos.length === 0) {
      list.html('<div class="nothing"><p>Nothing to do</p><p><small>It\'s good to be lazy 🎉</small></p></div>')
    } else {
      const listContainer = $('<ul></ul>')
      todos.forEach(item => {
        const el = $(`<li id="${item.id}"><a title="Click to mark as done" href="#">${item.text}</a></li>`)
        el.on('click', (e) => {
          e.preventDefault()
          const elId = $(e.target).parent().attr('id')
          if (tips) tips.destroyAll()
          remove(elId)
        })
        el.on('keyup', (e) => {
          if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault()
            const elId = $(e.target).parent().attr('id')
            if (tips) tips.destroyAll()
            remove(elId)
          }
        })
        const link = el.find('a')
        link.on('focus', (e) => {
          $(e.target).attr('title', 'Press [space] or [enter] to mark as done')
        })
        link.on('blur', (e) => {
          $(e.target).attr('title', 'Click to mark as done')
        })
        el.appendTo(listContainer)
      })
      listContainer.appendTo(list)
      tips = tippy(list.find('li').toArray(), {
        dynamicTitle: true,
        placement: 'top',
        animation: 'shift-away',
        arrow: 'up',
        target: 'a',
        trigger: 'focus mouseenter',
        theme: 'poo'
      })
    }

    let footerText = todos.length ? `<strong>${todos.length}</strong> task${todos.length !== 1 ? 's' : ''} to get done!` : ''
    footerText += completedTasks ? ` <strong>${completedTasks}</strong> completed task${completedTasks !== 1 ? 's' : ''}</strong>` : ''
    todoCount.html(footerText)
  }

  const add = (text) => {
    const item = { id: UUID.generate(), text }
    todos.push(item)
    render()
    onChange(todos, completedTasks)
    return item
  }

  const remove = (id) => {
    const elIndex = todos.findIndex((item) => item.id === id)
    const removedItem = todos.splice(elIndex, 1)[0]
    completedTasks++
    // every 10 todos completed spread some confetti!
    if (completedTasks % 10 === 0) {
      confetti(rootEl.get(0), {colors, angle: 45})
    }
    render()
    onChange(todos, completedTasks)
    return removedItem
  }

  const getAll = () => todos
  const getRootEl = () => rootEl

  insertInput.on('keyup', (e) => {
    if (insertInput.val() && e.key === 'Enter') {
      e.preventDefault()
      add(insertInput.val())
      insertInput.val('')
    }
  })

  insertBtn.on('click', (e) => {
    e.preventDefault()
    if (insertInput.val()) {
      add(insertInput.val())
      insertInput.val('')
    }
  })

  render()
  return ({ add, remove, getAll, getRootEl })
}

const returning = store.get('init')
const storedTodos = store.get('todos', [])
const storedCompletedTasks = store.get('completedTasks', 0)

const favicon = new Favico({
  animation: 'popFade', position: 'up'
})
favicon.badge(storedTodos.length)

const app = todoApp($('#app'), {
  todos: storedTodos,
  completedTasks: storedCompletedTasks,
  onChange: (todos, completedTasks) => {
    favicon.badge(todos.length)
    store('todos', todos)
    store('completedTasks', completedTasks)
  }
})
store.set('init', true)

if (!returning) {
// for the first init
  app.add('Buy soy milk')
  app.add('Do homeworks')
  app.add('Prepare material for the talk')
  app.add('Read SPAM emails')
  app.add('Write a module bundler')
  app.add('Tick some todos')
  app.add('Find a better name for this example')
}
