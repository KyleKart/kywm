// Define KyWM functionality as a script
class KyWM {
    constructor(kywmCode) {
        this.kywmCode = kywmCode;
    }

    // Function to convert KyWM to HTML
    toHTML() {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.kywmCode, 'application/xml');
        let html = '';

        function processNode(node) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();

                switch (tagName) {
                    case 'kywm':
                        html += '<!DOCTYPE html><html><head>';
                        const title = node.querySelector('info').getAttribute('title');
                        const description = node.querySelector('info').getAttribute('description');
                        const icon = node.querySelector('info').getAttribute('icon');
                        html += `<title>${title}</title>`;
                        html += `<meta name="description" content="${description}">`;
                        if (icon) {
                            html += `<link rel="icon" href="${icon}">`;
                        }
                        html += '</head><body>';
                        html += Array.from(node.childNodes).map(processNode).join('');
                        html += '</body></html>';
                        break;
                    case 'main':
                        html += '<main>';
                        html += Array.from(node.childNodes).map(processNode).join('');
                        html += '</main>';
                        break;
                    case 'txt.h1':
                        html += `<h1>${node.textContent}</h1>`;
                        break;
                    case 'txt.p':
                        html += `<p>${node.textContent}</p>`;
                        break;
                    case 'lnk.p':
                        const hrefP = node.getAttribute('href');
                        html += `<p><a href="${hrefP}">${node.textContent}</a></p>`;
                        break;
                    case 'lnk.h1':
                        const hrefH1 = node.getAttribute('href');
                        html += `<h1><a href="${hrefH1}">${node.textContent}</a></h1>`;
                        break;
                    default:
                        html += node.textContent;
                }
            }

            return html;
        }

        return processNode(doc.documentElement);
    }

    // Additional methods for extracting info or processing KyWM data
    getInfoValue(infoType) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.kywmCode, 'application/xml');

        switch (infoType) {
            case 'title':
                return doc.querySelector('info').getAttribute('title') || '';
            case 'description':
                return doc.querySelector('info').getAttribute('description') || '';
            case 'icon':
                return doc.querySelector('info').getAttribute('icon') || '';
            default:
                return '';
        }
    }
}

// Export KyWM class if needed for module systems
// module.exports = KyWM;
