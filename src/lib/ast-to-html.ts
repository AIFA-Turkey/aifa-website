
// Basic Keystatic AST to HTML converter
export function convertKeystaticToHtml(node: any): string {
    if (!node) return '';

    if (Array.isArray(node)) {
        return node.map(convertKeystaticToHtml).join('');
    }

    // Text node
    if (node.text !== undefined) {
        let text = node.text;
        // Apply marks
        if (node.bold) text = `<strong>${text}</strong>`;
        if (node.italic) text = `<em>${text}</em>`;
        if (node.underline) text = `<u>${text}</u>`;
        if (node.strikethrough) text = `<s>${text}</s>`;
        if (node.code) text = `<code>${text}</code>`;
        return text;
    }

    // Element nodes
    const children = node.children ? convertKeystaticToHtml(node.children) : '';

    switch (node.type) {
        case 'paragraph':
            return `<p>${children}</p>`;
        case 'heading':
            return `<h${node.level}>${children}</h${node.level}>`;
        case 'unordered-list':
            return `<ul>${children}</ul>`;
        case 'ordered-list':
            return `<ol>${children}</ol>`;
        case 'list-item':
            return `<li>${children}</li>`;
        case 'link':
            return `<a href="${node.href}" target="_blank" rel="noopener noreferrer">${children}</a>`;
        case 'blockquote':
            return `<blockquote>${children}</blockquote>`;
        case 'divider':
            return `<hr />`;
        default:
            return children;
    }
}
