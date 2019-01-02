
import { combineReducers } from 'redux';

import utility from './utility';
import re_use_function from './reuse/reuse';
import bar_reducer from './bar_reducer';
import article from './article';
import img from './image';
import viewQA from './viewQA';
import qa from './qa';
import viewArticle from './viewArticle';
import home from './homepage';
import test from './test';
import topic from './topic';
import art from './art';
import user_test from './user_test';
import user from './user';
import systemControl from './system_control';
import writingTest from './writingTest';
import viewWritingTest from './viewWritingTest';
import writingTestTopic from './writingTestTopic';
const reducers = combineReducers({
	utility: utility,
	bar_reducer: bar_reducer,
	re_use_function: re_use_function,
	article: article,
	img: img,
	viewQA: viewQA,
	viewArticle: viewArticle,
	qa: qa,
	home: home,
	test: test,
	topic: topic,
	art: art,
	user_test: user_test,
	user: user,
	systemControl: systemControl,
	writingTest: writingTest,
	viewWritingTest: viewWritingTest,
	writingTestTopic: writingTestTopic,
});
export default reducers;