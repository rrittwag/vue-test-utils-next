import { createRouter, createWebHistory } from 'vue-router'
import { h, createApp } from 'vue'
import WithRouter from '../components/WithRouter.vue'
import { mount } from '../../src'

const router = () => {
  return createRouter({
    history: createWebHistory(),
    routes: [
      {
        path: '/posts',
        component: {
          render() {
            return h('div', 'This is the posts route')
          }
        }
      },
      {
        path: '/',
        component: {
          render() {
            return h('div', 'This is this home route')
          }
        }
      }
    ]
  })
}

describe('vue-router', () => {
  it('may not be a VTU issue?', async () => {
    const el = document.createElement('div')
    el.id = 'app'
    document.body.appendChild(el)
    const app = createApp(WithRouter)
    app.use(router())
    app.mount('#app')
    console.log(document.body.innerHTML)
  })

  it('router-view is not rendered', async () => {
    window.location.href = '/'
    const wrapper = mount(WithRouter, {
      global: {
        plugins: [router()]
      }
    })

    expect(wrapper.html()).toContain('This is the home route')
    await wrapper.find('[data-testid="to-posts"]').trigger('click')
    expect(wrapper.html()).toContain('This is the posts route')
  })
})