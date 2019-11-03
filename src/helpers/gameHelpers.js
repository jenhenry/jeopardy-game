import axios from 'axios';
import uuid from 'uuid/v4';
import categories_list from './categories';

const questionUrlBase = 'https://opentdb.com/api.php?';
// API pattern: amount=4&category=20&difficulty=easy&type=multiple
const nameUrlBase = 'https://randomuser.me/api/?nat=us';
// API pattern: results=2&gender=female&inc=name

// randomly choose categories, default to 4
function getCategories(num = 4) {
	let aList = [ ...categories_list ];
	let aCats = [];
	for (let i = 0; i < num; i++) {
		const randNum = Math.floor(Math.random() * aList.length);
		aCats.push(aList[randNum]);
		aList.splice(randNum, 1);
	}
	return aCats;
}
async function getAvatars() {
	const f_data = await axios(`${nameUrlBase}&results=2&gender=female&inc=name`);
	const m_data = await axios(`${nameUrlBase}&results=2&gender=male&inc=name`);

	let avatars = [
		{ avatarImg: 'avatar1', avatarName: f_data.data.results[0].name.first, score: 0 },
		{ avatarImg: 'avatar2', avatarName: f_data.data.results[1].name.first, score: 0 },
		{ avatarImg: 'avatar3', avatarName: m_data.data.results[0].name.first, score: 0 },
		{ avatarImg: 'avatar4', avatarName: m_data.data.results[1].name.first, score: 0 }
	];

	let randomAvatars = [];
	while (avatars.length !== 0) {
		let randI = Math.floor(Math.random() * avatars.length);
		randomAvatars.push(avatars[randI]);
		avatars.splice(randI, 1);
	}

	return randomAvatars;
}
// get the categories, and for each category, retrieve 2 easy and 2 medium questions
async function getCategorySets(list) {
	// choose 4 random categories from category list
	const aCategories = getCategories(list);
	let aCategorySets = [];
	// for each category
	for (let i = 0; i < aCategories.length; i++) {
		let categorySet = { id: aCategories[i].id, title: aCategories[i].title, questions: [] };

		let aQuestions = [];
		let questionValue = 200;

		const response_easy = await axios(
			`${questionUrlBase}amount=2&category=${aCategories[i].id}&difficulty=easy&type=multiple&encode=url3986`
		);

		for (let j = 0; j < response_easy.data.results.length; j++) {
			// for each question
			aQuestions.push(parseQuestion(response_easy.data.results[j], questionValue));

			questionValue += 200;
		}

		const response_medium = await axios(
			`${questionUrlBase}amount=2&category=${aCategories[i].id}&difficulty=medium&type=multiple&encode=url3986`
		);

		for (let jj = 0; jj < response_medium.data.results.length; jj++) {
			// for each question
			aQuestions.push(parseQuestion(response_medium.data.results[jj], questionValue));

			questionValue += 200;
		}

		categorySet.questions = aQuestions;

		aCategorySets.push(categorySet);
	}

	return aCategorySets;
}
function parseQuestion(data, value) {
	// response.easy.data.results[j]
	const answerArray = [ data.correct_answer, ...data.incorrect_answers ];
	let ansSet = [];
	for (let ii = 0; ii < answerArray.length; ii++) {
		ansSet.push({ text: answerArray[ii], isCorrect: false, id: uuid() });
	}
	ansSet[0].isCorrect = true;
	// then randomize the answers
	let randomAnsSet = [];
	while (ansSet.length !== 0) {
		let randIndex = Math.floor(Math.random() * ansSet.length);
		randomAnsSet.push(ansSet[randIndex]);
		ansSet.splice(randIndex, 1);
	}

	return { id: uuid(), text: data.question, value: value, answers: randomAnsSet, answered: false, isCorrect: null };
}

function setCompetitorQuestions() {
	const val1 = [ 200, 200, 200, 200 ];
	const val2 = [ 400, 400, 400, 400 ];
	const val3 = [ 600, 600, 600, 600 ];
	const val4 = [ 800, 800, 800, 800 ];
	return [ ...val1, ...val2, ...val3, ...val4 ];
}

export { getCategorySets, getAvatars, setCompetitorQuestions };
