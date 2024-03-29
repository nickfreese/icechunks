//---------iceChunks JS, a stupid simple html builder for Node.

var iceChunks = (function() {
    
    return {
    
    //makes tag without attibutes
    basicTag: function(tag, content){
        return "<" + tag + ">" + content + "<" + "/" + tag + ">";
    },
    //makes tag with attibutes
    paramTag: function(tag, attObj, content){
        var start = "<";
        var end = ">";
        var output = start + tag; 
        for(var key in attObj){
            if(attObj[key] !== ''){
            output += " " + key + "='" + attObj[key] + "'";
            }
            else{
                output += " " + key;
            }
        }
        
        return output + end + content + start + "/" + tag + end;
    },
    //Renders a template into html tags
    renderTemplate: function(template){
        var paramTag = this.paramTag;
            var contentList = "";

            if((typeof template.content !== "string" || !template.content instanceof String) && !Array.isArray(template.content)){
                var childList = '';
                for(var key in template.content){
                childList += this.renderTemplate(template.content[key]);
                }
                contentList = childList;


            }
            else if (Array.isArray(template.content)) {//handle looping
                var childList = '';
                for(var i = 0; i < template.content.length; i++){

                  var temp = {
                    tag: template.tag,
                    content: template.content[i]
                  }
                  if (typeof template.att !== "undefined") {
                    temp.att = template.att;
                  }
      
                  childList += this.renderTemplate(temp);
                }

                contentList = childList;

            }
            else{

                contentList = template.content;
            }

            if(typeof template.att !== undefined && !Array.isArray(template.content)){
            contentList = this.paramTag(template.tag, template.att, contentList);
            }
            else if (!Array.isArray(template.content)){
            contentList = this.basicTag(template.tag, contentList);
            }
        
        return contentList;
    
    },
    //changes the content of an iceChunks element
    addToTemplate: function(template, modify, content){
        var found = 0;
        var recurse = function(template){
            if(found === 0){
            for(var key in template.content){
                if(key == modify){
                    template.content[key].content = content;
                    found = 1;
                    recurse(template);
                }
                else{
                    recurse(template.content[key]);
                }
            }
        }
        else{
            return template;
        }
        }
        recurse(template);
    },
    //sets the content of iceChunks elements from an object which defines which iceChunks elements will get changed.
    setTemplateObj: function(template, contentObj){
        for(var key in contentObj){
           this.addToTemplate(template, key, contentObj[key]);
        }
        return template;
    },
    
    replaceContentVars: function(template, replace){
        template = JSON.stringify(template);
       for(var key in replace){
           var find = "{{" + key + "}}";
           template = template.replace(new RegExp(find, 'g'), replace[key]);           
       }
        return JSON.parse(template);
    }

}

})();

//module.exports = iceChunks;
typeof module !== 'undefined' ? (typeof module.exports !== 'undefined' ? module.exports = iceChunks : null) : (typeof window !== "undefined" ? window.iceChunks  = iceChunks : null); 
