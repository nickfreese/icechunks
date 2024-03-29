# icechunks
## A Stupid Simple JS Templating Module, for NodeJs and Clientside applications

### What makes iceChunk special?

Can you format JSON?  Then you can make an iceChunks template.  When you make an ice chunks template,  you define a tag name, tag attributes, and tag content.  ice chiunk will render your HTML from that information.
Example:
```
var myTemplate = {

    header: {
        tag: 'div',
        att:{
            class: 'header',
            id: 'header'
        },
        content: "<h1>My Header</h1>",
    }

};
```
In the Above example we define a template.  Then we define header which will render to:
```
<div class='header' id='header'><h1>My Header</h1></div>
```
---------------------------------------------------------------------------------------------------------

The obvious question is, isn't it easier to write that as HTML from the get go?

The answer to that is, well, yes.  But The thing about JSON is that you can parse it quickly and easily.
So while some templating languages focus on inserting content into empty slots in prebuilt templates,  iceChunks makes it easy to manipulate, nest templates, and even create them on the fly, in memory.  Since the template is nothing more than a Javascript object, whats stopping you from generating the template itself based on your data.
That level of flexibility gives you the freedom to run wild with your architecture and makes integrating with existing system or external services a breeze.

---------------------------------------------------------------------------------------------------------

```
var myTemplate = {

    header: {
        tag: 'div',
        att:{
            class: 'header',
            id: 'header'
        },
        content: {
            headerText:{
                tag:'h1',
                att:{
                    class: 'main-headet-text',
                    id: 'main-headet-text'
                },
                content:'My Header Text'
            },
            headerSubtext:{
                tag:'h2',
                content:'My Header Sub Text'
            }
        },
    }

};

var renderedContent iceChunks.renderTemplate(myTemplate);

```
---------------------------------------------------------------------------------------------------------


## the content parameter

content can be a string, an object or an array.

String - the content will be rendered directly to the defined element.
Object - Thusis how we next more elements inside elements
Array - this is how we loop with iceChunks. so we can add string or objects to the array and it will render accordingly


## Directly Rendering Elements

you can also directly render elements with ``paramTag()`` and ```basicTag()```

All these functions do is take a tag name, attributes and values, and the content of the tag then return the HTML.

---------------------------------------------------------------------------------------------------------

What about variables inside template content? Easy! use ```{{}}``` and call ```replaceContentVars(<template>, <object defining variabels with key value pairs>);```

---------------------------------------------------------------------------------------------------------

You can also set content of template elements using predfiened objects with ```setTemplateObj(<template>, <key value pairs for content>);```

---------------------------------------------------------------------------------------------------------

And thats the skinny of it of iceChunks