// inject jquery manually
var posts = [];
$('.type-post').each((i, e) => {
  let editLink = $(e).find('.row-actions .edit a:first').attr('href');
  let tags = $(e).find('.tags.column-tags').text();

  $.get(editLink, function (r) {
    posts.push({
      title: $(r).find('#title').val(),
      content: $(r).find('#content').val(),
      slug: $(r).find('#sample-permalink a').attr('href').replace(/.*?\d+\/\d+\/\d+\//, '').slice(0, -1),
      tags,
    })
  });
});
'';


function copy(c) {
  var i = $('<textarea>');
  i.val(c);
  i.appendTo('body');
setTimeout(() => {
  i.get(0).select();
  document.execCommand('copy');
},1000);
}

copy(

posts
  .map(p => `##FILE#${p.slug}---
title: ${p.title}
tags: [${p.tags}]
---

${p.content}
`)
  .join('')

)

// node
var all = fs.readFileSync('all.txt');
all = all.toString();
var pieces = all.split(/[#][#]FILE[#]/g);
for (let i = 2; i < pieces.length; ++i) { fs.writeFileSync(pieces[i].split('---')[0] + '.md', pieces[i].slice(pieces[i].indexOf('---')) ); }


// fix titles
var dirs = fs.readdirSync('.');

for (let dir of dirs) {
  if (dir === '.git') continue;
  if (/[.](js|md)/i.test(dir)) continue;
  let folder = fs.readdirSync(dir);
  for (let file of folder) {
    var content = fs.readFileSync(path.join(dir, file));
    content = content.toString().replace(/(title: )([^\n]+)/, (m,p1,p2) =>  p1 + `"${p2}"` );
    fs.writeFileSync(path.join(dir, file), content);
  }
}
