import React from 'react';
import { renderRoutes } from 'react-router-config'
import asyncComponent from './async_component.jsx';
// import AppContainer from '../containers/app_container.jsx';
import App from '../components/app.jsx';
import cookie from 'react-cookies';


import {
	HashRouter as Router,
	Route,
	Link
} from 'react-router-dom'

const lstPermission = cookie.load('lstPermission') || [];

const routes = [
	{
		path: '/',
		component: App,
		routes: [
			{
				path: '/',
				exact: true,
				component: asyncComponent(
					() => System.import('../containers/dashboard.jsx').then(module => module.default),
					{ name: 'index' }
				)
			},
			{
				path: '/dashboard',
				component: asyncComponent(
					() => System.import('../containers/dashboard.jsx').then(module => module.default),
					{ name: 'index' }
				)
			},
			{
				path: '/login',
				component: asyncComponent(() => System.import('../containers/login.jsx')
					.then(module => module.default), { name: 'login' })
			},
			{
				path: '/user/change-password/',
				component:
					asyncComponent(
						() => System.import('../containers/change_password.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/resend-active-code',
				component: asyncComponent(() => System.import('../containers/resend_active_code.jsx')
					.then(module => module.default), { name: 'login' })
			},
			{
				path: '/active-account',
				component: asyncComponent(() => System.import('../containers/active_user.jsx')
					.then(module => module.default), { name: 'login' })
			},
			{
				path: '/sign-up',
				component: asyncComponent(() => System.import('../containers/signup.jsx')
					.then(module => module.default), { name: 'sign-up' })
			},
			//Go premium
			{
				path: '/user/go-premium',
				component: asyncComponent(() => System.import('../containers/go_premium.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//Article
			// {
			// 	path: '/article/list-article',
			// 	component: asyncComponent(() => System.import('../containers/userPanel/listArticle.jsx')
			// 		.then(module => module.default), { name: 'name' })
			// },
			{
				path: '/article/view-article/:id?',
				component: asyncComponent(() => System.import('../containers/userPanel/viewArticle.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//Grammar
			{
				path: '/grammar/all-grammar',
				component: asyncComponent(() => System.import('../containers/grammar/grammar_container.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//System control article
			{
				path: '/system-content/list-article',
				component: (lstPermission.indexOf("ARTICLE") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/Topic/listArticle.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/system-content/post-article/:id?',
				component: (lstPermission.indexOf("ARTICLE") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/Topic/postArticle.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			//System control user
			{
				path: '/system-control/list-user',
				component: (lstPermission.indexOf("USER-MANAGER") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/listUser.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			//System control topic
			{
				path: '/system-content/list-article-topic',
				component: (lstPermission.indexOf("ARTICLE-TOPIC") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/Topic/listTopic.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/system-content/post-article-topic/:id?',
				component: (lstPermission.indexOf("ARTICLE-TOPIC") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/Topic/postTopic.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			//System control Article topic content
			{
				path: '/system-content/list-atc',
				component: (lstPermission.indexOf("TOPIC-CONTENT") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/listArticle.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/system-content/post-atc/:id?',
				component: (lstPermission.indexOf("TOPIC-CONTENT") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/postArticle.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			//System control Test
			{
				path: '/system-content/list-test',
				component: (lstPermission.indexOf("LIST-TEST") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/listTest.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/system-content/post-test/:id?',
				component: (lstPermission.indexOf("LIST-TEST") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/postTest.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			//System control Writing Test
			{
				path: '/system-content/list-writing-test',
				component: (lstPermission.indexOf("LIST-TEST") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/listWritingTest.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/system-content/post-writing-test/:id?',
				component: (lstPermission.indexOf("LIST-TEST") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/postWritingTest.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			//List QA
			{
				path: '/forums/list-qa',
				component: asyncComponent(() => System.import('../containers/userPanel/list_QA.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/forums/post-qa/:id?',
				component: asyncComponent(() => System.import('../containers/userPanel/post_QA.jsx')
					.then(module => module.default), { name: 'name' })
			},
			{
				path: '/forums/view-qa/:id?',
				component: asyncComponent(() => System.import('../containers/userPanel/view_QA.jsx')
					.then(module => module.default), { name: 'name' })
			},
			//List Test
			{
				path: '/test/list-test',
				component: (lstPermission.indexOf("TEST") > -1) ?
					asyncComponent(() => System.import('../containers/test/list_test.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/test/view-test/:id?',
				component: (lstPermission.indexOf("TEST") > -1) ?
					asyncComponent(() => System.import('../containers/test/view_test.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			//List Writing Test
			{
				path: '/test/list-writing-test',
				component: (lstPermission.indexOf("TEST") > -1) ?
					asyncComponent(() => System.import('../containers/test/listWritingTest.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/test/do-writing-test',
				component: (lstPermission.indexOf("TEST") > -1) ?
					asyncComponent(() => System.import('../containers/test/doWritingTest.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/test/view-writing-test/:id?',
				component: (lstPermission.indexOf("TEST") > -1) ?
					asyncComponent(() => System.import('../containers/test/viewWritingTest.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},

			//Image
			// {
			// 	path: '/system-content/list-image',
			// 	component: asyncComponent(() => System.import('../containers/adminPanel/listImage.jsx')
			// 		.then(module => module.default), { name: 'name' })
			// },
			{
				path: '/system-content/upload-image',
				component: (lstPermission.indexOf("IMAGE-UPLOAD") > -1) ?
					asyncComponent(() => System.import('../containers/adminPanel/uploadImg.jsx')
						.then(module => module.default), { name: 'name' })
					:
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/system-control/grant-permission/',
				component: (lstPermission.indexOf("IMAGE-UPLOAD") > -1) ?
					asyncComponent(
						() => System.import('../containers/adminPanel/grant_per.jsx').then(module => module.default),
						{ name: 'index' }
					) :
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
			},
			{
				path: '/not-found',
				component: (
					asyncComponent(
						() => System.import('../containers/not_found.jsx').then(module => module.default),
						{ name: 'index' }
					)
				)
			}
		]
	}
]
const RouteRoot = () => (
	<Router>
		{renderRoutes(routes)}
	</Router>
)
export default RouteRoot