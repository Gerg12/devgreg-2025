"use strict";var registerBlockType=wp.blocks.registerBlockType,_wp$editor=wp.editor,RichText=_wp$editor.RichText,MediaUpload=_wp$editor.MediaUpload,_wp$components=wp.components,Button=_wp$components.Button,TextControl=_wp$components.TextControl,withSelect=wp.data.withSelect;registerBlockType("custom-block-plugin/project-section",{title:"Project Section",icon:"portfolio",category:"common",attributes:{imageUrl:{type:"string",default:""},imageAlt:{type:"string",default:""},blockText:{type:"string",default:""},blockTitle:{type:"string",default:""},allProjectsLink:{type:"string",default:""},projects:{type:"array",default:[]}},edit:withSelect(function(e){var e=e("core").getEntityRecords,t=e("taxonomy","category",{slug:"featured"}),c=[];return{categories:t,projects:(c=t&&0<t.length?e("postType","project",{per_page:5,categories:t[0].id}):c)||[]}})(function(e){var t=e.attributes,c=e.setAttributes,e=e.projects,a=t.imageUrl,l=(t.imageAlt,t.blockText),r=t.blockTitle,t=t.allProjectsLink;return e&&0<e.length&&c({projects:e}),e?React.createElement("div",{className:"project-section__wrapper"},React.createElement("div",{className:"project-section__inner"},React.createElement("div",{className:"project-section__left-column"},React.createElement(MediaUpload,{onSelect:function(e){c({imageUrl:e.url,imageAlt:e.alt})},type:"image",value:a,render:function(e){e=e.open;return React.createElement(Button,{onClick:e},"Select Image")}}),a&&React.createElement("img",{src:a,alt:"Project Image",style:{maxWidth:"100%"}}),React.createElement(RichText,{className:"project-section__text",tagName:"p",value:l,onChange:function(e){c({blockText:e})},placeholder:"Enter block text"})),React.createElement("div",{className:"project-section__right-column"},React.createElement(RichText,{className:"project-section__block-title",tagName:"h2",value:r,onChange:function(e){c({blockTitle:e})},placeholder:"Enter block title"}),React.createElement("ul",{className:"project-section__list"},e&&0<e.length?e.map(function(e){return React.createElement("li",{key:e.id,className:"project-section__item"},React.createElement("h3",{className:"project-section__item-title"},e.title.rendered),React.createElement("div",{className:"project-section__item-row"},React.createElement("div",{className:"project-section__item-subtitle",dangerouslySetInnerHTML:{__html:e.excerpt.rendered}}),React.createElement("a",{href:e.link,className:"project-section__item-link"},"Visit Project")))}):React.createElement("li",null,"No projects found.")),React.createElement(TextControl,{className:"project-section__all-projects-link",value:t,onChange:function(e){c({allProjectsLink:e})},placeholder:"Enter 'See All Projects' link"}),React.createElement("a",{href:t,className:"project-section__all-projects-link-text"},"See All Projects")))):React.createElement("p",null,"Loading projects...")}),save:function(e){var e=e.attributes,t=e.imageUrl,c=e.imageAlt,a=e.blockText,l=e.blockTitle,r=e.allProjectsLink,o=e.projects;return console.log("Attributes in save:",e),React.createElement("div",{className:"project-section__wrapper"},React.createElement("div",{className:"project-section__inner"},React.createElement("div",{className:"project-section__left-column"},t&&React.createElement("img",{src:t,alt:c,className:"project-section__image"}),React.createElement(RichText.Content,{className:"project-section__text",tagName:"p",value:a})),React.createElement("div",{className:"project-section__right-column"},React.createElement(RichText.Content,{className:"project-section__block-title",tagName:"h2",value:l}),React.createElement("ul",{className:"project-section__list"},o&&0<o.length?o.map(function(e){return React.createElement("li",{key:e.id,className:"project-section__item"},React.createElement("h3",{className:"project-section__item-title"},e.title.rendered),React.createElement("div",{className:"project-section__item-row"},React.createElement("div",{className:"project-section__item-subtitle",dangerouslySetInnerHTML:{__html:e.excerpt.rendered}}),React.createElement("a",{href:e.link,className:"project-section__item-link"},"Visit Project")))}):React.createElement("li",null,"No projects found.")),React.createElement("a",{href:r,className:"project-section__all-projects-link-text"},"See All Projects"))))}});
//# sourceMappingURL=project-section.js.map
