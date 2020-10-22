console.log('city-picker', import.meta.url);
function NODE(name, attributes = {}, children = []) {
	let node = document.createElement(name);
	for (let key in attributes)
		node.setAttribute(key, attributes[key]);
	for (let child of children)
		node.appendChild(typeof child == 'string' ? document.createTextNode(child) : child);
	return node;
}
class XML {
	static parse(string, type = 'xml') {
		return new DOMParser().parseFromString(string.replace(/xmlns=".*?"/g, ''), 'text/' + type)
	}
	static stringify(DOM) {
		return new XMLSerializer().serializeToString(DOM).replace(/xmlns=".*?"/g, '')
	}
}
XMLDocument.prototype.stringify = XML.stringify
Element.prototype.stringify = XML.stringify
const HTML = document.createElement('template');
HTML.innerHTML = `<input id='search' on-input='search' placeholder="search cities..." />
	<table id='results'></table>`;
let STYLE = document.createElement('style');
STYLE.appendChild(document.createTextNode(`@import url('https://max.pub/css/publicSans.css');
	:host {
		display: inline-block;
		outline: none;
	}
	input {
		width: 100%;
		background: #333;
		font-size: 22px;
		color: white;
		border: 1px solid #555;
		font-family: publicSans;
		font-weight: 100;
	}
	.country {
		color: gray;
	}
	td {
		font-weight: 100;
	}
	.state {
		color: silver;
	}`));
function QQ(query, i) {
	let result = Array.from(this.querySelectorAll(query));
	return i ? result?.[i - 1] : result;
}
Element.prototype.Q = QQ
ShadowRoot.prototype.Q = QQ
DocumentFragment.prototype.Q = QQ
class WebTag extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open', delegatesFocus: true });
		this.shadowRoot.appendChild(STYLE.cloneNode(true)); //: CSS
		this.$HTM = document.createElement('htm')
		this.shadowRoot.appendChild(this.$HTM)
	}
	async connectedCallback() {
		this.$applyHTML(); //: HTML
		this.$attachMutationObservers();
		this.$attachEventListeners();
		this.$onReady(); //: onReady
	}
	$attachMutationObservers() {
		this.modelObserver = new MutationObserver(events => {
			if ((events[0].type == 'attributes') && (events[0].target == this)) {
			} else {
			}
		}).observe(this, { attributes: true, characterData: true, attributeOldValue: true, childList: true, subtree: true });
	}
	$attachEventListeners() {
		let action = (event, key) => {
			try {
				let target = event.composedPath()[0];
				let action = target.closest(`[${key}]`);
				this[action.getAttribute(key)](action, event, target)
			}
			catch { }
		}
		this.addEventListener('input', e => action(e, 'on-input')); //: onInput
	}
	$applyHTML() {
		this.$view = HTML.content.cloneNode(true)
	}
	$clear(R) {
		while (R.lastChild)
			R.removeChild(R.lastChild);
	}
	get $view() {
		return this.$HTM;
	}
	set $view(HTML) {
		this.$clear(this.$view);
		if (typeof HTML == 'string')
			HTML = new DOMParser().parseFromString(HTML, 'text/html').firstChild
		this.$view.appendChild(HTML);
	}
};
import cities from './cities.min.js';
	class city_picker extends WebTag {
		$onReady() {
			console.log('ci', cities);
			this.results = this.$view.Q('#results', 1);
		}
		search(node) {
			console.log('search', node.value)
			let query = node.value;
			if (query.length < 4) return;
			this.results.innerHTML = '';
			console.log('query now', query, cities)
			for (let country in cities) {
				for (let state in cities[country]) {
					for (let city in cities[country][state]) {
						if (city.toLowerCase().includes(query)) {
							console.log(country, state, city);
							this.results.insertAdjacentHTML('beforeend', `<tr><td class='country'>${country}</td><td class='state'>${state}</td><td>${city}</td></tr>`)
						}
					}
				}
			}
		}
	}
window.customElements.define('city-picker', city_picker)