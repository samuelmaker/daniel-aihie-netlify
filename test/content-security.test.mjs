import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import markdownToHtml from '../src/libs/markdownToHtml.ts';
import { loadEditBySlug, parsePostMatter } from '../src/libs/getData.ts';

test('front matter cannot select the JavaScript execution engine', () => {
  globalThis.frontMatterExecuted = false;
  for (const language of ['js', 'javascript', 'JavaScript']) {
    assert.throws(() => parsePostMatter(`---${language}\n(globalThis.frontMatterExecuted = true, {title: 'Unsafe'})\n---\ncontent`), /must use YAML/);
  }
  assert.equal(globalThis.frontMatterExecuted, false);
  assert.equal(parsePostMatter('---\ntitle: Safe\n---\ncontent').data.title, 'Safe');
  assert.throws(() => parsePostMatter('---\npayload: !!js/function >\n  function () { return 1; }\n---\ncontent'));
  delete globalThis.frontMatterExecuted;
});

test('CMS HTML cannot supply scripts, event handlers or unsafe frame origins', async () => {
  const output = await markdownToHtml(`
<script>alert(1)</script>
<img src="image.jpg" onerror="alert(1)">
<a href="javascript:alert(1)">unsafe link</a>
<iframe src="https://attacker.example/embed/123" srcdoc="<script>alert(1)</script>"></iframe>
<iframe src="https://www.youtube.com.attacker.example/embed/123"></iframe>
`);
  assert.doesNotMatch(output, /<script|onerror=|href="javascript:|srcdoc=|src="https:\/\/(?:attacker|www\.youtube\.com\.attacker)/i);
});

test('normal Markdown and existing Vimeo and YouTube embeds still render', async () => {
  const output = await markdownToHtml(`**Hello**

<iframe src="https://player.vimeo.com/video/577394041?h=96613d3bf6" width="100%" allowfullscreen></iframe>
<iframe src="https://www.youtube.com/embed/FhqNN1LykWU?si=test" title="Video" allowfullscreen></iframe>`);
  assert.match(output, /<strong>Hello<\/strong>/);
  assert.match(output, /src="https:\/\/player\.vimeo\.com\/video\/577394041\?h=96613d3bf6"/);
  assert.match(output, /src="https:\/\/www\.youtube\.com\/embed\/FhqNN1LykWU\?si=test"/);
});

test('post slugs cannot read Markdown outside their content collection', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'content-security-'));
  const posts = path.join(root, 'posts');
  fs.mkdirSync(posts);
  fs.writeFileSync(path.join(root, 'secret.md'), '---\nslug: ../secret\ntitle: Private\n---\nprivate content');
  fs.writeFileSync(path.join(posts, 'valid.md'), '---\nslug: valid\ntitle: Public\n---\npublic content');
  try {
    for (const slug of ['../secret', '..\\secret', '/secret', 'bad\0slug']) {
      assert.equal(loadEditBySlug(posts, slug), undefined);
    }
    assert.equal(loadEditBySlug(posts, 'valid').title, 'Public');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
