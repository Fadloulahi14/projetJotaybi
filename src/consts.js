// Messages de la conversation
const messagesConversation = [
  { type: 'image', src: '/api/placeholder/200/150', temps: '12:39' },
  { type: 'text', contenu: 'do nittou dara !!!😂', temps: '12:41', isMe: false },
  { type: 'text', contenu: '😂😂😂', temps: '12:40', isMe: true },
  { type: 'text', contenu: 'Wa louma deff', temps: '12:40', isMe: true },
  { type: 'text', contenu: 'guiss naa sa message bi', temps: '12:42', isMe: false },
  { type: 'text', contenu: 'damala bayyi si bir', temps: '12:41', isMe: false },

  { 
    type: 'text', 
    contenu: 'röitissez-moi en vous basant sur mes précédents messages, sans pitié, sans filtre, directement à l\'âme', 
    temps: '11:39', 
    isMe: false,
    jour: 'LUNDI' 
  },

  { 
    type: 'link', 
    contenu: 'github.com', 
    lien: 'https://github.com/codecrafters-io/build-your-own-x?tab=readme-ov-file#build-your-own-bot',
    temps: '08:26', 
    isMe: false,
    jour: 'HIER' 
  },
  { 
    type: 'link', 
    contenu: 'trello.com', 
    lien: 'https://trello.com/invite/b/6840118792d2f147990def2/ATT1612149dd7ca5669ae5e71f6ff72e9c4737A013FB/jootay-bi',
    temps: '12:24', 
    isMe: false,
    jour: 'AUJOURD\'HUI' 
  }
];


const conversations = [
  { nom: "Papa😎😘", message: "", temps: "jeudi", pin: true },
  { nom: "Fadloulahi🥰✅✅ (vous)", message: "https://whatsapp-o-gam.vercel.app/", temps: "Hier", pin: true },
  
];


const style = {

}
const {}=style
export {messagesConversation, conversations};
