import React, { useEffect, useState } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import { Row, Col, Input } from 'antd';
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../Component/tocify';
import { css } from '@emotion/css';
import json2md from 'json2md';

const renderer = new marked.Renderer();
let tocify = new Tocify();

interface jsonType {
  [key: string]: string | jsonType[] | string[] | jsonType;
}
const jsonData: jsonType[] = [
  { h1: 'JSON To Markdown' },
  { blockquote: 'A JSON to Markdown converter.' },
  {
    img: [
      { title: 'Some image', source: 'https://example.com/some-image.png' },
      { title: 'Another image', source: 'https://example.com/some-image1.png' },
      {
        title: 'Yet another image',
        source: 'https://example.com/some-image2.png',
      },
    ],
  },
  { h2: 'Features' },
  {
    ul: [
      'Easy to use',
      'You can programmatically generate Markdown content',
      '...',
    ],
  },
  { h2: 'How to contribute' },
  { ol: ['Fork the project', 'Create your branch', 'Raise a pull request'] },
  { h2: 'Code blocks' },
  { p: 'Below you can see a code block example.' },
  {
    code: {
      language: 'js',
      content: ['function sum (a, b) {', '   return a + b', '}', 'sum(1, 2)'],
    },
  },
];
const { TextArea } = Input;
function AddArticle() {
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
    renderer,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 不纠正原始模型任何的不良行为和错误（默认为false）
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    breaks: true, // 允许回车换行（该选项要求 gfm 为true）
    smartLists: false, // 使用比原生markdown更时髦的列表
    smartypants: false, // 使用更为时髦的标点
  });
  const initMD = json2md(jsonData);
  const [articleContent, setArticleContent] = useState(initMD); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState(marked(initMD)); //html内容
  const [change, setChange] = useState(0);
  const changeContent = (e: any) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value).replace(/<pre>/g, "<pre class='hljs'>");
    setMarkdownContent(html);
    setChange(change + 1);
  };
  useEffect(() => {
    tocify = new Tocify();
  }, [change]);
  return (
    <div className="invisible">
      <Row gutter={5}>
        <Col span={24}>
          <br />
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="编辑内容"
                value={articleContent}
              />
            </Col>
            <Col span={6}>
              <div
                className={css({
                  border: '1px solid #d9d9d9',
                  background: '#ffffff',
                  height: '100%',
                })}
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
            <Col span={6}>
              目录
              <div className="toc" key={change}>
                {tocify && tocify.render()}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
