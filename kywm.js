(function() {
    'use strict';

    function decodeHtmlEntities(str) {
        let doc = new DOMParser().parseFromString(str, 'text/html');
        return doc.documentElement.textContent;
    }

    function replaceKyWMTags() {
        let content = document.body.innerHTML;

        let decodedContent = decodeHtmlEntities(content);

        let updatedContent = decodedContent.replace(/<\/?kywm[^>]*>/g, '');

        updatedContent = updatedContent.replace(/<txt\.h1>/g, '<h1>')
                                        .replace(/<\/txt\.h1>/g, '</h1>');

        updatedContent = updatedContent.replace(/<txt\.p>/g, '<p>')
                                       .replace(/<\/txt\.p>/g, '</p>');

        updatedContent = updatedContent.replace(/<lnk\.p([^>]*)>/g, function(match, p1) {
            return `<p><a${p1}>`;
        }).replace(/<\/lnk\.p>/g, '</a></p>');

        updatedContent = updatedContent.replace(/<main>/g, '<body>')
                                       .replace(/<\/main>/g, '</body>');

        document.body.innerHTML = updatedContent;
    }

    window.addEventListener('load', function() {
        replaceKyWMTags();
    });
})();
