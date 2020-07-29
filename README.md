- Tools: nvm, visual studio code
- Language/Libraries/framework: Javascript, Nodejs, Reactjs, Nextjs
  - Javascript: ES6 syntax (in previous slide)
  - Nodejs: Install module, start script (npm run ...), import, export
  - Reactjs: component, render function, props, states
  - Nextjs: page component
- Download project
- Install dependencies: `npm install`
- Start dev enviroment: `npm run dev`
- Add simple page component: /about

Day 2
- Nextjs with less & ant design
  - Ant design: https://ant.design/
  - next.config.js: https://github.com/vercel/next.js/tree/canary/examples/with-ant-design-less
- Create home page with antd layout, divide home page component to sub/children component (AppHeader, AppSider)
- Render menu from category list:
  - Create lib api.js: import graphql-request, export function getCategoryList
  - Call getCategoryList from next serverside data-fetching: https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
  - Render AppSider from category list data

Day 3
- Nextjs Link component: `next/link`
- Category page
  - Create route for category page exp. `/categories/18?page=1` by create folder/file /categories/[cid].js
  - Create api function `getCategory` in `/lib/api.js`
  - Get param `cid` and query `page` in static function `getServerSideProps`
  - Call `getCategory` api function in `getServerSideProps` of category page component
  - Render category view
- App layout
  - Create AppLayout component: prop `children` of Component
  - Use AppLayout in `/pages/_app.js` to change global layout ( mean apply for all page)
- App context
  - HOC: https://reactjs.org/docs/higher-order-components.html
  - React hook createContext, useContext: https://reactjs.org/docs/hooks-reference.html#usecontext
  - Components: AppContext, AppLayout, _app.js

Day 4
- Detail page: `/products/[productId]`
- Register
  - Register page: `/register`
  - Form submit: call api register
  - Success: redirect to `/`
  - Fail: set errors to state
- Login
  - Login page: `/login` login.js
  - Form submit: call api login
  - Login success: set token which received to cookie -> get customer profile -> set customer profile to AppContext
  - Login fail: set errors to state