/**
    @module sig
    @author Michael Hurley <mh@buzzdecafe.com>
 */

exports.defineTags = function(dict) {
    /**
     * Support @sig source tag. Expected value is a String like:
     *     (a -> b) -> [a] -> [b]
     */
    dict.defineTag('sig', {    
        mustHaveValue: true,
        onTagged: function(doclet, tag) {
          doclet.sigs = doclet.sigs || [];
          doclet.sigs.push(tag.value);
        }
    });

};

