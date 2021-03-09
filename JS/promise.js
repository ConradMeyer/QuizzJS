// Para conseguir un API KEY visita: https://quizapi.io/clientarea/settings/token
const QUESTIONS_API_KEY = "19ZihZYGdDPyC0T42CtpTuhdZighLSzCxaG1q2o0";
const QUIZZ = document.querySelector(".quizz")
const BTN = document.querySelector("#buscar")
const RESET = document.querySelector("#reset")
const INPUT = document.querySelector(".num")

function getQuestions(maxNumberQuestions = 5) {
	return new Promise((resolve, reject) => {
		if (!QUESTIONS_API_KEY)
			throw new Error("An API KEY must be provided on /JS/promise.js line 4 for function getQuestions to work");
		else if (maxNumberQuestions < 1)
			throw new Error("maxNumberQuestions must be greater than 0");
		else {
			fetch(`https://quizapi.io/api/v1/questions?apiKey=${QUESTIONS_API_KEY}&category=code&difficulty=Easy&limit=${maxNumberQuestions}&tags=JavaScript`)
			.then(response => response.json())
			.then(questions =>  resolve(questions))
			.catch(error => reject(error));
		}
	});
}

function pintar(datos) {
	const caja = document.createElement("div")
	caja.setAttribute("class", "resultado")
	QUIZZ.appendChild(caja)

	const pregunta = document.createElement("div")
	pregunta.setAttribute("class", "pregunta")

	const respuestas = document.createElement("div")
	respuestas.setAttribute("class", "respuestas")

	caja.appendChild(pregunta)
	caja.appendChild(respuestas)

	let quest = document.createElement("h2")
	let questText = document.createTextNode(datos.question)
	quest.appendChild(questText)
	pregunta.appendChild(quest)

	let answA = document.createElement("h3")
	let answTextA = document.createTextNode(datos.answers.answer_a)
	answA.ClassName = "answer_a"
	answA.appendChild(answTextA)
	respuestas.appendChild(answA)

	let answB = document.createElement("h3")
	let answTextB = document.createTextNode(datos.answers.answer_b)
	answB.ClassName = "answer_b"
	answB.appendChild(answTextB)
	respuestas.appendChild(answB)

	let answC = document.createElement("h3")
	let answTextC = document.createTextNode(datos.answers.answer_c)
	answC.ClassName = "answer_c"
	answC.appendChild(answTextC)
	respuestas.appendChild(answC)

	let totalAnsw = [answA, answB, answC]
	totalAnsw.forEach(el => el.addEventListener("click", ()=> comparar(el, datos)))

}

function comparar(el, datos){
	console.log(el.ClassName, datos);
	if (el.ClassName == datos.correct_answer) {
		el.setAttribute("class", "right")
	} else {
		el.setAttribute("class", "wrong")
	}
}

BTN.addEventListener("click", ()=>{
	getQuestions(INPUT.value)
		.then(data => data.map(el => pintar(el)))
		.catch(error => console.error(error))
})

RESET.addEventListener("click", ()=> {
	window.location.reload()
	INPUT.value = ""})