function rearrangeBlocks(node) {
	if (node === null) {
		return [];
	}
	
	let blocks = [];
	let contentContainer = null;
	
	if (Array.isArray(node)) {
		// Get blog link
		for (let child of node) {
			if (child.nodeName == 'P') {
				blocks.push(child);
			}
		}
		
		// Get content of that blog
		for (let blockquote of node) {
			if (blockquote.nodeName == 'BLOCKQUOTE') {
				contentContainer = blockquote;
				
				for (let child of blockquote.childNodes) {
					if (child.nodeName == 'P') {
						if (child.querySelector('.tumblr_blog')) {
						} else {
							blocks.push(child);
						}
					} else if (child.nodeName == 'BLOCKQUOTE') {
					} else {
						blocks.push(child);
					}
				}
			}
		}
	} else {
		// Get blog link
		let links = node.querySelectorAll('p>a');
		let quoteLinks = Array.from(node.querySelectorAll('blockquote p>a'));
		let blogLink = null;
		for (let a of links) {
			if (!(quoteLinks.includes(a))) {
				blogLink = a;
			}
		}
		blocks.push(blogLink);
		
		// Get content of that blog
		contentContainer = node.querySelector('blockquote');
		for (let child of contentContainer.childNodes) {
			if (child.nodeName == 'P') {
				if (child.querySelector('.tumblr_blog')) {
				} else {
					blocks.push(child);
				}
			} else if (child.nodeName == 'BLOCKQUOTE') {
			} else {
				blocks.push(child);
			}
		}
	}
	
	console.log(blocks);
	
	// Slap the content at the back, and work on the inner content
	return rearrangeBlocks(contentContainer).concat(blocks);
}

let posts = document.getElementsByClassName('post');
for (let post of posts) {
	let rearrangeList = [];
	let elementList = [];
	for (let child of post.childNodes) {
		if (child.classList && child.classList.contains('text')) {
			rearrangeBlocks(child);
		} else if (child.nodeName == 'DIV') {
			elementList.push(child);
			child.parentNode.removeChild(child);
		} else {
			rearrangeList.push(child);
			child.parentNode.removeChild(child);
		}
	}
	rearrangeBlocks(rearrangeList);
	for (let node of rearrangeList) {
		post.appendChild(node)
	}
	for (let node of elementList) {
		post.appendChild(node)
	}
}