import { createElement } from "../compenent.js";

const header = createElement('div', {
  class: ['text-center', 'mb-8']
}, [
  createElement('div', {
    class: ['mb-4', 'flex', 'justify-center']
  }, [
    createElement('div', {
      class: [
        'w-16', 'h-16', 'bg-green-500', 'rounded-full',
        'flex', 'items-center', 'justify-center', 'text-white', 'text-2xl'
      ]
    }, [
      createElement('i', { class: ['fa-solid', 'fa-comments'] }, [])
    ])
  ]),
  createElement('h1', {
    class: ['text-3xl', 'font-bold', 'text-gray-900', 'mb-2']
  }, ['Jotay Bi']),
  createElement('p', {
    class: ['text-gray-600', 'text-lg']
  }, ['Connectez-vous pour commencer à discuter'])
]);

export {header}